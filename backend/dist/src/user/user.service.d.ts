import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
    }>;
}
