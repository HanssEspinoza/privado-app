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
exports.UpdateDefectDTO = exports.CreateDefectDTO = exports.DefectStatus = void 0;
const class_validator_1 = require("class-validator");
// Enum para el estado del defecto
var DefectStatus;
(function (DefectStatus) {
    DefectStatus["OPEN"] = "OPEN";
    DefectStatus["IN_PROGRESS"] = "IN_PROGRESS";
    DefectStatus["RESOLVED"] = "RESOLVED";
    DefectStatus["CLOSED"] = "CLOSED";
})(DefectStatus || (exports.DefectStatus = DefectStatus = {}));
class CreateDefectDTO {
}
exports.CreateDefectDTO = CreateDefectDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El título del defecto es requerido" }),
    (0, class_validator_1.IsString)({ message: "El título debe ser una cadena de texto" }),
    __metadata("design:type", String)
], CreateDefectDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "La descripción debe ser una cadena de texto" }),
    __metadata("design:type", String)
], CreateDefectDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El estado es requerido" }),
    (0, class_validator_1.IsEnum)(DefectStatus, {
        message: "El estado debe ser OPEN, IN_PROGRESS, RESOLVED o CLOSED",
    }),
    __metadata("design:type", String)
], CreateDefectDTO.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El ID del reportador es requerido" }),
    (0, class_validator_1.IsInt)({ message: "El ID del reportador debe ser un número entero" }),
    __metadata("design:type", Number)
], CreateDefectDTO.prototype, "reportedBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: "El ID del asignado debe ser un número entero" }),
    __metadata("design:type", Number)
], CreateDefectDTO.prototype, "assignedTo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: "El ID del caso de prueba debe ser un número entero" }),
    __metadata("design:type", Number)
], CreateDefectDTO.prototype, "testCaseId", void 0);
class UpdateDefectDTO {
}
exports.UpdateDefectDTO = UpdateDefectDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "El título debe ser una cadena de texto" }),
    __metadata("design:type", String)
], UpdateDefectDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "La descripción debe ser una cadena de texto" }),
    __metadata("design:type", String)
], UpdateDefectDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(DefectStatus, {
        message: "El estado debe ser OPEN, IN_PROGRESS, RESOLVED o CLOSED",
    }),
    __metadata("design:type", String)
], UpdateDefectDTO.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: "El ID del asignado debe ser un número entero" }),
    __metadata("design:type", Number)
], UpdateDefectDTO.prototype, "assignedTo", void 0);
