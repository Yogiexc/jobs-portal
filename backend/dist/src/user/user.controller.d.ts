import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: {
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            id: string;
            createdAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        message: string;
        data: {
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            id: string;
            createdAt: Date;
        };
    }>;
}
