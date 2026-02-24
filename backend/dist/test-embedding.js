"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const job_service_1 = require("./src/job/job.service");
const talent_service_1 = require("./src/talent/talent.service");
const prisma_service_1 = require("./src/prisma/prisma.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    const jobService = app.get(job_service_1.JobService);
    const talentService = app.get(talent_service_1.TalentService);
    let recruiterUser = await prisma.user.findFirst({ where: { role: 'RECRUITER' } });
    if (!recruiterUser) {
        recruiterUser = await prisma.user.create({
            data: {
                name: 'Recruiter Test',
                email: 'recruiter.test@digitefa.com',
                password: 'hash',
                role: 'RECRUITER'
            }
        });
    }
    const newJob = await jobService.create(recruiterUser.id, {
        title: 'Fullstack AI Engineer',
        description: 'Looking for someone who knows NestJS and FastAPI.',
        requirements: ['3+ years exp'],
        skillsNeeded: ['NestJS', 'TypeScript', 'FastAPI', 'Python']
    });
    console.log("Job created:", newJob.title);
    const rawJobs = await prisma.$queryRaw `SELECT id, title, left(embedding::text, 50) as emb FROM "Job" WHERE id = ${newJob.id}`;
    console.log("Raw Job Query Result:", rawJobs);
    await prisma.job.delete({ where: { id: newJob.id } });
    await app.close();
}
bootstrap();
//# sourceMappingURL=test-embedding.js.map