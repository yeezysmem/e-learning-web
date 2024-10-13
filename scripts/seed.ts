


const {PrismaClient} = require('@prisma/client');
const db = new PrismaClient()

async function main() {
    try {
        await db.programminLanguage.createMany({
            data: [
                {name: "Python"},
                {name: "JavaScript"},
            ]
        });
        console.log("Seeding finished")
    } catch (error) {
        console.error("Error seeding the database categories",error)
    } finally {
        await db.$disconnect()
    }
}

main()