"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTestExecutionDTO = exports.CreateTestExecutionDTO = exports.TestResult = void 0;
const class_validator_1 = require("class-validator");
// Enum para el resultado de la ejecución de la prueba
var TestResult;
(function (TestResult) {
    TestResult["PASSED"] = "PASSED";
    TestResult["FAILED"] = "FAILED";
    TestResult["BLOCKED"] = "BLOCKED";
    TestResult["SKIPPED"] = "SKIPPED";
})(TestResult || (exports.TestResult = TestResult = {}));
class CreateTestExecutionDTO {
}
exports.CreateTestExecutionDTO = CreateTestExecutionDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El ID del caso de prueba es requerido" }),
    (0, class_validator_1.IsInt)({ message: "El ID del caso de prueba debe ser un número entero" }),
    __metadata("design:type", Number)
], CreateTestExecutionDTO.prototype, "testCaseId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El ID del ejecutor es requerido" }),
    (0, class_validator_1.IsInt)({ message: "El ID del ejecutor debe ser un número entero" }),
    __metadata("design:type", Number)
], CreateTestExecutionDTO.prototype, "executedBy", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El resultado es requerido" }),
    (0, class_validator_1.IsEnum)(TestResult, {
        message: "El resultado debe ser PASSED, FAILED, BLOCKED o SKIPPED",
    }),
    __metadata("design:type", String)
], CreateTestExecutionDTO.prototype, "result", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "La evidencia debe ser una cadena de texto" }),
    __metadata("design:type", String)
], CreateTestExecutionDTO.prototype, "evidence", void 0);
class UpdateTestExecutionDTO {
}
exports.UpdateTestExecutionDTO = UpdateTestExecutionDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TestResult, {
        message: "El resultado debe ser PASSED, FAILED, BLOCKED o SKIPPED",
    }),
    __metadata("design:type", String)
], UpdateTestExecutionDTO.prototype, "result", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "La evidencia debe ser una cadena de texto" }),
    __metadata("design:type", String)
], UpdateTestExecutionDTO.prototype, "evidence", void 0);
