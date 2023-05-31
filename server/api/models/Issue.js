/**
 * Issue.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    type: { type: "string", required: true },
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    comments: { type: "json", defaultsTo: [] },
    status: { type: "string", required: true },
    assignees: { type: "json", defaultsTo: [] },
    reporter: { type: "string", required: true },
    priority: { type: "string", required: true },
    original_estimate: { type: "integer" },
    project_owner: { type: "string", required: true },
  },
};
