"use strict";

var routes = require("next-routes")();

routes.add("/campaings/new", "/campaings/new").add("/campaings/:address", "/campaings/show").add("/campaings/:address/requests", "/campaings/requests/index").add("/campaings/:address/requests/new", "/campaings/requests/new");

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVMsQUFBZjs7QUFFQSxPQUNLLEFBREwsSUFDUyxBQURULGtCQUMyQixBQUQzQixrQkFFSyxBQUZMLElBRVMsQUFGVCx1QkFFZ0MsQUFGaEMsbUJBR0ssQUFITCxJQUdTLEFBSFQsZ0NBR3lDLEFBSHpDLDZCQUlLLEFBSkwsSUFJUyxBQUpULG9DQUk2QyxBQUo3Qzs7QUFNQSxPQUFPLEFBQVAsVUFBaUIsQUFBakIiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL3NtMTAxL0RvY3VtZW50cy9wcm9qZWN0cy9kYXBwLXR1dG9yaWFsLzQtY3Jvd2QtZnVuZCJ9