const express = require("express");
const { postgraphile } = require("postgraphile");
require("dotenv").config();
const pgManyToManyPlugin = require("@graphile-contrib/pg-many-to-many")
const pgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector")
const dbSettings = require('../data/database.json')

const jwksRsa = require("jwks-rsa");
const jwt = require("express-jwt");
const graphQLShieldPlugin = require('./plugins/graphQLShieldPlugin');


const app = express();

const jwksUri = process.env.AUTH0_DOMAIN + ".well-known/jwks.json"

const checkJwt = jwt.expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: jwksUri
    }),
    credentialsRequired: false, //When false, the API will still process JWT tokens but will not require a user to be authenticated
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
    algorithms: ["RS256"],
});

app.use("/graphql", checkJwt); //Add token-checking process to /graphql endpoint

app.use(
    postgraphile(
        dbSettings.dev,
        "public",
        {
            appendPlugins: [
                pgManyToManyPlugin, // Generates queries to support many to many relationship querying
                pgSimplifyInflectorPlugin, // Simplifies generated query names, for example "allVendors" becomes "vendors",
                graphQLShieldPlugin,
            ],
            watchPg: true,  // Postgraphile updates automatically if you change your postgres schema
            graphiql: true, // Spins up GraphiQL query browser when you start the server
            enhanceGraphiql: true,
            showErrorStack: "json",
            extendedErrors: ["hint", "detail", "errcode"],
            additionalGraphQLContextFromRequest: req => {
                 if(req.auth != undefined) {
                     return {
                         user: {
                             permissions: req.auth.permissions
                         }
                     }
                 }
             }
        }
    )
);

app.listen(process.env.PORT || 3000)