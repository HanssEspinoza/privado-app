"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./auth/routes");
const routes_2 = require("./project/routes");
const routes_3 = require("./testPlan/routes");
const routes_4 = require("./testCase/routes");
const routes_5 = require("./testExecution/routes");
const routes_6 = require("./defect/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // Definir rutas principales
        router.use("/api/auth", routes_1.AuthRoutes.routes);
        router.use("/api/projects", routes_2.ProjectRoutes.routes);
        router.use("/api/test-plans", routes_3.TestPlanRoutes.routes);
        router.use("/api/test-cases", routes_4.TestCaseRoutes.routes);
        router.use("/api/test-executions", routes_5.TestExecutionRoutes.routes);
        router.use("/api/defects", routes_6.DefectRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
