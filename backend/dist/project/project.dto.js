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
exports.UpdateProjectDTO = exports.CreateProjectDTO = void 0;
const class_validator_1 = require("class-validator");
class CreateProjectDTO {
}
exports.CreateProjectDTO = CreateProjectDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El nombre del proyecto es requerido" }),
    (0, class_validator_1.IsString)({ message: "El nombre debe ser una cadena de texto" }),
    __metadata("design:type", String)
], CreateProjectDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "La descripción debe ser una cadena de texto" }),
    __metadata("design:type", String)
], CreateProjectDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El ID del propietario es requerido" }),
    (0, class_validator_1.IsInt)({ message: "El ID del propietario debe ser un número entero" }),
    __metadata("design:type", Number)
], CreateProjectDTO.prototype, "ownerId", void 0);
class UpdateProjectDTO {
}
exports.UpdateProjectDTO = UpdateProjectDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "El nombre debe ser una cadena de texto" }),
    __metadata("design:type", String)
], UpdateProjectDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "La descripción debe ser una cadena de texto" }),
    __metadata("design:type", String)
], UpdateProjectDTO.prototype, "description", void 0);
