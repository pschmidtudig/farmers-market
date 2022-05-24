// permissions.js

const rules = require('./rules')
const { shield, allow } = require('graphql-shield')

const permissions = shield({
  Vendor: {
    email: rules.isAuthenticated
  },
  Mutation: rules.canEditData
},
  { fallbackRule: allow },
);

module.exports = permissions;