/**
 * PriorityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async (req, res) => {
    try {
      const priorities = await Priority.find({});
      res.json({
        success: true,
        message: "get priority done",
        result: priorities,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
