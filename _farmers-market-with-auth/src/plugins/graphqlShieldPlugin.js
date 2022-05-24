const { makeProcessSchemaPlugin } = require("graphile-utils");
const permissions = require('../auth/permissions')
const { wrapSchema } = require('@graphql-tools/wrap')
const { applyMiddleware } = require('graphql-middleware')

module.exports = makeProcessSchemaPlugin(schema => {
    const wrappedSchema = wrapSchema({
        schema: schema,
        transforms: []
    });

    return applyMiddleware(wrappedSchema, permissions)
});