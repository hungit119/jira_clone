/**
 * Project.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: { type: "string", required: true },
    url: { type: "string", required: true },
    description: { type: "string" },
    category: { type: "string", required: true },
    users_joined: { type: "json", defaultsTo: [] },
    issues_created: { type: "json", defaultsTo: [] },
    user_created: { type: "string", required: true },
  },
};
