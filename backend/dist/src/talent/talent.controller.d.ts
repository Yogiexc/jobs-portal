import { TalentService } from './talent.service';
import { UpdateTalentDto } from './dto/update-talent.dto';
export declare class TalentController {
    private readonly talentService;
    constructor(talentService: TalentService);
    getProfile(user: any): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                name: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            skills: string[];
            education: string | null;
            experience: string | null;
            userId: string;
        };
    }>;
    updateProfile(user: any, dto: UpdateTalentDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            skills: string[];
            education: string | null;
            experience: string | null;
            userId: string;
        };
    }>;
    deleteProfile(user: any): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            skills: string[];
            education: string | null;
            experience: string | null;
            userId: string;
        };
    }>;
}
