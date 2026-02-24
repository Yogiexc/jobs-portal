import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                name: string;
                email: string;
                role: import(".prisma/client").$Enums.Role;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
            accessToken: string;
        };
    }>;
}
