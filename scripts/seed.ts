

const {PrismaClient} = require('@prisma/client');
const db = new PrismaClient()

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: "frontend"},
                {name: "typescript"},
                {name: "python"},
                {name: "java"},
                {name: "c"},
                {name: "c++"},
                {name: "c#"},
                {name: "php"},
                {name: "sql"},
                {name: "html"},
                {name: "css"},
              

                
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