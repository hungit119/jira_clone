/**
 * ProjectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const nodemailer = require("nodemailer");
module.exports = {
  getProject: async (req, res) => {
    try {
      const { id } = req.query;
      const project = await Project.findOne({ id });
      if (project) {
        const users_joined = await User.find({
          where: { id: [...project.users_joined, project.user_created] },
          select: ["username", "avatar"],
        });

        const issues_created = await Issue.find({
          where: { project_owner: project.id },
          select: ["title", "type", "priority", "assignees", "status"],
        });
        res.json({
          success: true,
          message: `get project by id {${id}} done`,
          result: {
            ...project,
            users_joined,
            issues_created,
          },
        });
      } else {
        res.json({
          success: false,
          message: `get project by id {${id}} false`,
        });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
      throw error;
    }
  },
  createProject: async (req, res) => {
    try {
      const { title, url, description, category } = req.body;
      const project = await Project.create({
        title,
        url,
        description,
        category,
        user_created: req.userId,
      }).fetch();
      res.json({
        success: true,
        message: "Project created successfully",
        result: project,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getProjects: async (req, res) => {
    try {
      const projects = await Project.find({
        where: {
          or: [{ user_created: req.userId }, { users_joined: req.userId }],
        },
        sort: "createdAt DESC",
      });
      res.json({
        success: true,
        message: "get all projects successfully",
        result: projects,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { id } = req.query;
      const project = await Project.destroy({ id }).fetch();
      res.json({
        success: true,
        message: "Deleted project with id " + project.id,
        result: project,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  updateProject: async (req, res) => {
    try {
      const { id } = req.query;
      const { project } = req.body;
      const updatedProject = await Project.updateOne({ id })
        .set({
          ...project,
        })
        .fetch();
      if (updatedProject) {
        const users_joined = await User.find({
          where: { id: [...project.users_joined, project.user_created] },
          select: ["username", "avatar", "email"],
        });

        var transporter = nodemailer.createTransport({
          // config mail server
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "hung1522665@gmail.com", //Tài khoản gmail vừa tạo
            pass: "vvurodqhaoerplca", //Mật khẩu tài khoản gmail vừa tạo
          },
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
        });
        var content = "";
        content += `
          <div style="padding: 10px; background-color: #003375">
              <div style="padding: 10px; background-color: white;">
                  <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                  <span style="color: black">You join prtoject</span>
              </div>
          </div>
      `;
        var mainOptions = {
          // thiết lập đối tượng, nội dung gửi mail
          from: "NQH-Test nodemailer",
          to: users_joined[users_joined.length - 1].email,
          subject: "Test Nodemailer",
          text: "Your text is here", //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
          html: content, //Nội dung html mình đã tạo trên kia :))
        };
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent: " + info.response);
          }
        });

        const issues_created = await Issue.find({
          where: { project_owner: id },
          select: ["title", "type", "priority", "assignees", "status"],
        });
        res.json({
          success: true,
          message: `update project by id {${id}} done`,
          result: {
            ...updatedProject,
            users_joined,
            issues_created,
          },
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  createProjectFormDynamic: async (req, res) => {
    try {
      const { data } = req.body;
      const newProject = {
        ...data,
      };
      const project = await Project.create({
        title: newProject.title,
        url: newProject.url,
        description: newProject.description,
        category: newProject.category,
        user_created: newProject.user_created,
      }).fetch();
      res.json({
        success: true,
        message: "Created project",
        result: project,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find({
        sort: ["createdAt desc"],
      });
      res.json({
        success: true,
        message: "Get all project done!",
        result: projects,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  deleteProjecrFormDynamic: async (req, res) => {
    try {
      const { id } = req.query;
      const projectDeleted = await Project.destroyOne({
        id,
      });
      res.json({
        success: true,
        message: "Deleted project form dynamic",
        result: projectDeleted,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getProjectFormDynamic: async (req, res) => {
    try {
      const { id } = req.query;
      const project = await Project.findOne({ id });
      res.json({
        success: true,
        message: "Find project done",
        result: project,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  updateProjectFormDynamic: async (req, res) => {
    try {
      const { id } = req.query;
      const { data } = req.body;
      const projectUpdated = await Project.updateOne({ id }).set(data);
      res.json({
        success: true,
        message: "Updated project",
        result: projectUpdated,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const projects = await Project.find({
        select: ["title"],
      });
      res.json({
        success: true,
        message: "get all projects",
        result: projects.map((pro) => ({
          name: pro.id,
          label: pro.title,
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
      const projects = await Project.find({
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
        message: "filter project",
        result: projects,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  filterAdvance: async (req, res) => {
    try {
      const { advancedSearch } = req.body;
      const projects = await Project.find({
        or: [
          ...advancedSearch.map((adv) => ({
            [adv.column]: { [adv.operator]: adv.value },
          })),
        ],
      });
      res.json({
        success: true,
        message: "Search advance done",
        result: projects,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
