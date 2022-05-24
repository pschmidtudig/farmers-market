// rules.js

const { rule } = require('graphql-shield');

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user !== undefined;
  }
);

const canEditData = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user != undefined && ctx.user.permissions.includes("write:all");
  }
);

module.exports = {
  isAuthenticated, canEditData
}