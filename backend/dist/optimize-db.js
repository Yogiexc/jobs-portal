"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Creating ivfflat indices for vector optimization...');
    await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS job_embedding_idx
        ON "Job"
        USING ivfflat (embedding vector_cosine_ops)
        WITH (lists = 100);
    `);
    await prisma.$executeRawUnsafe(`
        CREATE INDEX IF NOT EXISTS talent_embedding_idx
        ON "TalentProfile"
        USING ivfflat (embedding vector_cosine_ops)
        WITH (lists = 100);
    `);
    await prisma.$executeRawUnsafe('ANALYZE "Job";');
    await prisma.$executeRawUnsafe('ANALYZE "TalentProfile";');
    console.log('Indices created successfully.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=optimize-db.js.map