/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const uuid = require("uuid")
module.exports = {
  googleLogin: async (req, res) => {
    const { codeResponse } = req.body;
    const client = new OAuth2Client(
      "403714864826-r8i18vce3ula259ahfq7g12i9trgctf7.apps.googleusercontent.com",
      "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",
      "http://localhost:3001"
    );
    // Exchange the authorization code for an access token and refresh token
    const { tokens } = await client.getToken(codeResponse);
    // Use the access token to make authorized requests to Google APIs
    client.setCredentials(tokens);
    const { data } = await client.request({
      url: 'https://www.googleapis.com/oauth2/v1/userinfo',
    });
    const user = await User.findOne({sid:data.id})
    if (!user) {
      const hashPassword = await bcrypt.hash(`${data.family_name} ${data.given_name}`, 10);
      const user = await User.create({
        sid:data.id,
        email:data.email,
        username:data.name,
        password: hashPassword,
      }).fetch();
      const accessToken = jwt.sign(
        { id: user.sid },
        sails.config.custom.jwt.secret,
        {
          expiresIn: sails.config.custom.jwt.expiresAccessToken,
        }
      );
      const refreshToken = jwt.sign(
        { id: user.sid },
        sails.config.custom.jwt.secret,
        {
          expiresIn: sails.config.custom.jwt.expiresRefreshToken,
        }
      );
      return res.status(200).json({
        success: true,
        message: "Registers successfully",
        result: {
          user,
          accessToken,
          refreshToken,
        },
      });
    }
    else{
      const accessToken = jwt.sign(
        { id: user.sid },
        sails.config.custom.jwt.secret,
        {
          expiresIn: sails.config.custom.jwt.expiresAccessToken,
        }
      );
      const refreshToken = jwt.sign(
        { id: user.sid },
        sails.config.custom.jwt.secret,
        {
          expiresIn: sails.config.custom.jwt.expiresRefreshToken,
        }
      );
      res.status(200).json({
        success: true,
        message: "Login successful",
        result: { user, accessToken, refreshToken },
      });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const decoded = jwt.verify(refreshToken, sails.config.custom.jwt.secret);
      const userRefresh = await User.findOne({ sid: decoded.id });
      if (!userRefresh) {
        res.status(201).json({
          success: true,
          message: "User refresh not found",
        });
      }
      const accessToken = jwt.sign(
        { id: userRefresh.sid },
        sails.config.custom.jwt.secret,
        { expiresIn: sails.config.custom.jwt.expiresAccessToken }
      );
      res.json({
        success: true,
        message: "Refresh token was successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  loadUser: async (req, res) => {
    try {
      const user = await User.findOne({ sid: req.userId });
      if (!user) {
        res.status(201).json({
          success: false,
          message: "User not found",
        });
      }
      res.json({
        success: true,
        message: "Load user successfully",
        result: user,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  register: async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const existedUser = await User.findOne({ email });
      if (existedUser) {
        return res.status(201).json({
          success: false,
          message: "Email already exists",
        });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        sid:uuid.v4(),
        email,
        username,
        password: hashPassword,
      }).fetch();
      const accessToken = jwt.sign(
        { id: user.sid },
        sails.config.custom.jwt.secret,
        {
          expiresIn: sails.config.custom.jwt.expiresAccessToken,
        }
      );
      const refreshToken = jwt.sign(
        { id: user.sid },
        sails.config.custom.jwt.secret,
        {
          expiresIn: sails.config.custom.jwt.expiresRefreshToken,
        }
      );
      return res.status(200).json({
        success: true,
        message: "Registers successfully",
        result: {
          user,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      res.serverError(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(201).json({
          success: false,
          message: "Invalid credentials !",
        });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(201).json({
          success: false,
          message: "Invalid credentials !",
        });
      }
      const accessToken = jwt.sign(
        { id: user.sid },
        sails.config.custom.jwt.secret,
        {
          expiresIn: sails.config.custom.jwt.expiresAccessToken,
        }
      );
      const refreshToken = jwt.sign(
        { id: user.sid },
        sails.config.custom.jwt.secret,
        {
          expiresIn: sails.config.custom.jwt.expiresRefreshToken,
        }
      );
      res.status(200).json({
        success: true,
        message: "Login successful",
        result: { user, accessToken, refreshToken },
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const { userIds } = req.body;
      const users = await User.find({
        where: {
          sid: userIds,
        },
        select: ["avatar", "username"],
      });
      res.json({
        success: true,
        message: "Get users by id successfully",
        result: users,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json({
        success: true,
        message: "get all users done",
        result: users,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  createUser: async (req, res) => {
    const { data } = req.body;
    const newUser = {
      ...data,
    };
    try {
      const existedUser = await User.findOne({ email: newUser.email });
      if (existedUser) {
        return res.status(201).json({
          success: false,
          message: "Email already exists",
        });
      }
      const hashPassword = await bcrypt.hash(newUser.password, 10);
      const user = await User.create({
        sid:uuid.v4(),
        email: newUser.email,
        username: newUser.username,
        password: hashPassword,
        avatar: newUser.avatar,
      }).fetch();
      res.json({
        success: true,
        message: "Created user successfully",
        result: user,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.query;
      const userDeleted = await User.destroyOne({ sid:id });
      res.json({
        success: true,
        message: "Deleted user",
        result: userDeleted,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  findUserFormDynamic: async (req, res) => {
    try {
      const { id } = req.query;
      const user = await User.findOne({ sid:id });
      res.json({
        success: true,
        message: "Finded user",
        result: user,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  updateUserFormDynamic: async (req, res) => {
    try {
      const { id } = req.query;
      const { data } = req.body;
      const userUpdated = await User.updateOne({ sid }).set(data);
      res.json({
        success: true,
        message: "Updated user",
        result: userUpdated,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await User.find({
        select: ["username"],
      });
      res.json({
        success: true,
        message: "get all users",
        result: users.map((user) => ({
          name: user.sid,
          label: user.username,
        })),
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  filter: async (req, res) => {
    try {
      const { searchInput } = req.query;
      const { filterable } = req.body;
      const users = await User.find({
        where: {
          or: [
            ...filterable.map((fil) => ({
              [fil]: { contains: searchInput },
            })),
          ],
        },
      });
      res.json({
        success: true,
        message: "filter user",
        result: users,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  filterAdvance: async (req, res) => {
    try {
      const { advancedSearch } = req.body;
      const users = await User.find({
        or: [
          ...advancedSearch.map((adv) => ({
            [adv.column]: { [adv.operator]: adv.value },
          })),
        ],
      });
      res.json({
        success: true,
        message: "Search advance done",
        result: users,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
