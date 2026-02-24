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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const common_1 = require("@nestjs/common");
const application_service_1 = require("./application.service");
const create_application_dto_1 = require("./dto/create-application.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const swagger_1 = require("@nestjs/swagger");
let ApplicationController = class ApplicationController {
    applicationService;
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    async apply(user, dto) {
        const data = await this.applicationService.apply(user.id, dto);
        return { success: true, message: 'Application submitted successfully', data };
    }
    async getMyApplications(user) {
        const data = await this.applicationService.getMyApplications(user.id);
        return { success: true, message: 'Your applications retrieved', data };
    }
    async getJobApplicants(jobId, user) {
        const data = await this.applicationService.getJobApplicants(user.id, jobId);
        return { success: true, message: 'Applicants retrieved', data };
    }
};
exports.ApplicationController = ApplicationController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.Role.TALENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_application_dto_1.CreateApplicationDto]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "apply", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, roles_decorator_1.Roles)(client_1.Role.TALENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "getMyApplications", null);
__decorate([
    (0, common_1.Get)('job/:jobId'),
    (0, roles_decorator_1.Roles)(client_1.Role.RECRUITER),
    __param(0, (0, common_1.Param)('jobId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "getJobApplicants", null);
exports.ApplicationController = ApplicationController = __decorate([
    (0, swagger_1.ApiTags)('Applications'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApplicationController);
//# sourceMappingURL=application.controller.js.map