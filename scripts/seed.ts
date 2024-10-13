


const {PrismaClient} = require('@prisma/client');
const db = new PrismaClient()

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: "Français A1"},
                {name: "Français A2"},
                {name: "Français B1"},
                {name: "Français B2"},
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