const routes = require("next-routes")();

routes
    .add("/campaings/new", "/campaings/new")
    .add("/campaings/:address", "/campaings/show")
    .add("/campaings/:address/requests", "/campaings/requests/index")
    .add("/campaings/:address/requests/new", "/campaings/requests/new");

module.exports = routes;