"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const server_1 = require("./server");
(() => {
    main();
})();
function main() {
    new server_1.Server().start();
}
