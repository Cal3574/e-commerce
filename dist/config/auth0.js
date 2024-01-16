"use strict";
require("dotenv").config();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: "http://localhost:8000",
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: "https://dev-sjps0oic3hhjsd6v.us.auth0.com",
    redirect_uri: "http://localhost:8000/callback",
};
module.exports = config;
