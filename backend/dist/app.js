"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const config_1 = require("./config");
const routes_1 = require("./routes");
const server_1 = require("./server");
(() => {
    main();
})();
function main() {
    new server_1.Server({
        port: config_1.envs.PORT,
        routes: routes_1.AppRoutes.routes,
    }).start();
}
