//server.js

const express = require("express");
const { postgraphile } = require("postgraphile");
require("dotenv").config();
const pgManyToManyPlugin = require("@graphile-contrib/pg-many-to-many")
const pgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector")
const dbSettings = require('../data/database.json')

const app = express();

app.use(
    postgraphile(
        dbSettings.dev,
        "public",
        {
            appendPlugins: [
                pgManyToManyPlugin, // Generates queries to support many to many relationship querying
                pgSimplifyInflectorPlugin, // Simplifies generated query names, for example "allVendors" becomes "vendors"
            ],
            watchPg: true,  // Postgraphile updates automatically if you change your postgres schema
            graphiql: true, // Spins up GraphiQL query browser when you start the server
            enhanceGraphiql: true,
            showErrorStack: "json",
            extendedErrors: ["hint", "detail", "errcode"]
        }
    )
);

app.listen(process.env.PORT || 3000)