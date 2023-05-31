/**
 * IssueController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  getIssue: async (req, res) => {
    const { id } = req.query;
    const issue = await Issue.findOne({ id });
    const assignees = await User.find({
      where: { id: issue.assignees },
      select: ["username", "avatar"],
    });
    const reporter = await User.findOne({
      where: { id: issue.reporter },
      select: ["username", "avatar"],
    });
    res.json({
      success: true,
      message: "Get issue by id done",
      result: {
        ...issue,
        assignees,
        reporter,
      },
    });
    try {
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getIssues: async (req, res) => {
    try {
      const { project_id } = req.query;
      const issues = await Issue.find({
        where: {
          project_owner: project_id,
        },
      });

      res.json({
        success: true,
        message: "get issues for project ",
        result: { issues },
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  createIssue: async (req, res) => {
    const { project_id } = req.query;
    try {
      const {
        type,
        title,
        description,
        status,
        assignees,
        reporter,
        priority,
        original_estimate,
      } = req.body;
      const issue = await Issue.create({
        type,
        title,
        description,
        status,
        assignees,
        reporter,
        priority,
        original_estimate,
        project_owner: project_id,
      }).fetch();
      res.json({
        success: true,
        message: "Issue created successfully",
        result: issue,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  updateIssue: async (req, res) => {
    try {
      const { id } = req.query;
      const { status } = req.body;
      const issueUpdated = await Issue.updateOne({ id }).set({
        status,
      });
      res.json({
        success: true,
        message: "Updated issue",
        result: issueUpdated,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  putIssue: async (req, res) => {
    try {
      const { id } = req.query;
      const newdata = req.body.newdata;
      const issuePut = await Issue.updateOne({ id }).set(newdata);
      res.json({
        success: true,
        message: "update issue done",
        result: issuePut,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  deleteIssue: async (req, res) => {
    try {
      const { id } = req.query;
      const issueDeleted = await Issue.destroyOne({ id });
      res.json({
        success: true,
        message: "Deletd issue successfully",
        result: issueDeleted,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  searchIssues: async (req, res) => {
    try {
      const { project_id, searchValue } = req.query;
      const issues = await Issue.find({
        where: {
          project_owner: project_id,
          or: [
            { title: { contains: searchValue } },
            { description: { contains: searchValue } },
            { type: { contains: searchValue } },
            // add more conditions as needed
          ],
        },
      }).sort("updatedAt DESC");
      res.json({
        success: true,
        message: "search issues done",
        result: issues,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  filterIssues: async (req, res) => {
    try {
      const { project_id } = req.query;
      const { onlyMyIssues, recentUpdateIssues, searchInputIssues, assignees } =
        req.body.searchCondition;
      const searchCriterial = {
        project_owner: project_id,
        or: [
          { title: { contains: searchInputIssues } },
          { description: { contains: searchInputIssues } },
        ],
      };

      if (onlyMyIssues) {
        searchCriterial.assignees = onlyMyIssues;
      }
      if (recentUpdateIssues) {
        searchCriterial.updatedAt = {
          ">=": new Date().setDate(new Date().getDate() - 2),
        };
      }
      if (assignees.length > 0) {
        searchCriterial.assignees = assignees;
      }
      const issues = await Issue.find(searchCriterial);
      res.json({
        success: true,
        message: "Filter Issues",
        result: issues,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  createIssueFormDynamic: async (req, res) => {
    try {
      const { data } = req.body;
      const newIssue = {
        ...data,
      };
      const issue = await Issue.create({
        type: newIssue.type,
        title: newIssue.title,
        description: newIssue.description,
        status: newIssue.status,
        reporter: newIssue.reporter,
        priority: newIssue.priority,
        project_owner: newIssue.project_owner,
        original_estimate: newIssue.original_estimate,
      }).fetch();
      res.json({
        success: true,
        message: "Created issue",
        result: issue,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getAllIssues: async (req, res) => {
    try {
      const issues = await Issue.find({});
      res.json({
        success: true,
        message: "Get all issues done",
        result: issues,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  deleteIssueFormDynamic: async (req, res) => {
    try {
      const { id } = req.query;
      const issueDeleted = await Issue.destroyOne({
        id,
      });
      res.json({
        success: true,
        message: "Deleted issue",
        result: issueDeleted,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  findIssueFormDynamic: async (req, res) => {
    try {
      const { id } = req.query;
      const issue = await Issue.findOne({ id });
      res.json({
        success: true,
        message: "Finded issue",
        result: issue,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  updateIssueFormDynamic: async (req, res) => {
    try {
      const { id } = req.query;
      const { data } = req.body;
      const issue = await Issue.updateOne({ id }).set(data);
      res.json({
        success: true,
        message: "Updated issue",
        result: issue,
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
      const issues = await Issue.find({
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
        message: "filter issues",
        result: issues,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
  filterAdvance: async (req, res) => {
    try {
      const { advancedSearch } = req.body;
      const issues = await Issue.find({
        or: [
          ...advancedSearch.map((adv) => ({
            [adv.column]: { [adv.operator]: adv.value },
          })),
        ],
      });
      res.json({
        success: true,
        message: "Search advance done",
        result: issues,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
