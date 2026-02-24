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
exports.TalentController = void 0;
const common_1 = require("@nestjs/common");
const talent_service_1 = require("./talent.service");
const update_talent_dto_1 = require("./dto/update-talent.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const swagger_1 = require("@nestjs/swagger");
let TalentController = class TalentController {
    talentService;
    constructor(talentService) {
        this.talentService = talentService;
    }
    async getProfile(user) {
        const data = await this.talentService.getProfile(user.id);
        return { success: true, message: 'Profile retrieved', data };
    }
    async updateProfile(user, dto) {
        const data = await this.talentService.updateProfile(user.id, dto);
        return { success: true, message: 'Profile updated', data };
    }
    async deleteProfile(user) {
        const data = await this.talentService.deleteProfile(user.id);
        return { success: true, message: 'Profile deleted', data };
    }
};
exports.TalentController = TalentController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.Role.TALENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TalentController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)(),
    (0, roles_decorator_1.Roles)(client_1.Role.TALENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_talent_dto_1.UpdateTalentDto]),
    __metadata("design:returntype", Promise)
], TalentController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)(),
    (0, roles_decorator_1.Roles)(client_1.Role.TALENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TalentController.prototype, "deleteProfile", null);
exports.TalentController = TalentController = __decorate([
    (0, swagger_1.ApiTags)('Talent Profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('talent/profile'),
    __metadata("design:paramtypes", [talent_service_1.TalentService])
], TalentController);
//# sourceMappingURL=talent.controller.js.map