/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getComments: async (req, res) => {
    const comments = await Comment.find({});
    res.json({
      success: true,
      message: "Get all comments successfully",
      results: comments,
    });
    try {
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  createComment: async (req, res) => {
    try {
      const { body } = req.body;
      const comment = await Comment.create({
        user: req.userId,
        body,
      }).fetch();
      res.json({
        success: true,
        message: "Comment created successfully",
        result: comment,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  deteleComment: async (req, res) => {
    try {
      const { id } = req.query;
      const comment = await Comment.destroy({ id }).fetch();
      res.json({
        success: true,
        message: "Comment deleted successfully",
        result: comment,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { id } = req.query;
      const { comment } = req.body;
      const commentUpdated = await Comment.update({ id })
        .set({
          ...comment,
        })
        .fetch();
      res.json({
        success: true,
        message: "Comment updated successfully",
        result: commentUpdated,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
