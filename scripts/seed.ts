import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  try {
    console.log("Start seeding SQL & Database Essentials course...");

    // 1. Upsert Category
    const category = await db.category.upsert({
      where: { name: "Computer Science" },
      update: {},
      create: { name: "Computer Science" },
    });

    // 2. Upsert Programming Language (SQL)
    const sqlLanguage = await db.programminLanguage.upsert({
      where: {
        name_version: {
          name: "sql",
          version: "PostgreSQL 15",
        },
      },
      update: {},
      create: {
        name: "sql",
        version: "PostgreSQL 15",
      },
    });

    // 3. Upsert Instructor User
    const user = await db.user.upsert({
      where: { email: "admin@skillup.com" },
      update: {},
      create: {
        name: "SkillUp Instructor",
        email: "admin@skillup.com",
        role: "admin",
      },
    });

    // 4. Create SQL Course
    const course = await db.course.create({
      data: {
        title: "SQL & Relational Databases Essentials",
        description:
          "Master foundational SQL queries, database filtering, table joins, and data aggregation techniques with interactive tasks.",
        userId: user.id,
        userName: user.name,
        price: 0,
        isPublished: true,
        categoryId: category.id,
        level: "Beginner",
      },
    });

    // 5. Create Chapters for SQL Course
    await db.chapter.createMany({
      data: [
        {
          title: "Basic SELECT Queries & Filtering",
          description:
            "Learn how to fetch records from database tables using SELECT and filter results with WHERE clauses.",
          taskDescription:
            "Write a SQL query to select the 'name' and 'email' columns from the 'users' table where the 'role' is equal to 'admin'.",
          taskCriteria:
            "Use SELECT name, email FROM users WHERE role = 'admin';",
          codeSnippet:
            "-- Write your SQL query below\n",
          explanation:
            "The SELECT statement specifies which columns to retrieve, while the WHERE clause filters rows matching specific conditions.",
          rightAnswer:
            "SELECT name, email FROM users WHERE role = 'admin';",
          position: 1,
          isPublished: true,
          isFree: true,
          courseId: course.id,
          programmingLanguageId: sqlLanguage.id,
        },
        {
          title: "Sorting & Limiting Results",
          description:
            "Control the display order of database rows using ORDER BY and restrict row count with LIMIT.",
          taskDescription:
            "Select all columns from the 'products' table, order the results by 'price' in descending order (DESC), and limit the result to the top 5 items.",
          taskCriteria:
            "Query must use SELECT * FROM products ORDER BY price DESC LIMIT 5;",
          codeSnippet:
            "-- Write your SQL query below\n",
          explanation:
            "ORDER BY price DESC sorts records from highest to lowest, and LIMIT 5 restricts the output set.",
          rightAnswer:
            "SELECT * FROM products ORDER BY price DESC LIMIT 5;",
          position: 2,
          isPublished: true,
          isFree: true,
          courseId: course.id,
          programmingLanguageId: sqlLanguage.id,
        },
        {
          title: "Aggregate Functions & GROUP BY",
          description:
            "Perform calculations across multiple records using COUNT, SUM, AVG, and GROUP BY.",
          taskDescription:
            "Calculate the total number of orders for each user. Select 'user_id' and the count of orders as 'total_orders' from the 'orders' table, grouped by 'user_id'.",
          taskCriteria:
            "Use SELECT user_id, COUNT(*) AS total_orders FROM orders GROUP BY user_id;",
          codeSnippet:
            "-- Write your SQL aggregate query below\n",
          explanation:
            "GROUP BY collapses rows that share the same user_id into summary rows so aggregate functions like COUNT() can compute statistics.",
          rightAnswer:
            "SELECT user_id, COUNT(*) AS total_orders FROM orders GROUP BY user_id;",
          position: 3,
          isPublished: true,
          isFree: false,
          courseId: course.id,
          programmingLanguageId: sqlLanguage.id,
        },
        {
          title: "Joining Relational Tables (INNER JOIN)",
          description:
            "Combine rows from two or more tables based on a related column using INNER JOIN.",
          taskDescription:
            "Write a query to combine 'orders' and 'users' tables. Select 'users.name' and 'orders.total_price' using an INNER JOIN on 'users.id = orders.user_id'.",
          taskCriteria:
            "Use INNER JOIN or JOIN to link users and orders based on foreign key relationships.",
          codeSnippet:
            "-- Write your JOIN query below\n",
          explanation:
            "INNER JOIN matches primary keys from one table with foreign keys in another to merge corresponding records.",
          rightAnswer:
            "SELECT users.name, orders.total_price FROM orders INNER JOIN users ON users.id = orders.user_id;",
          position: 4,
          isPublished: true,
          isFree: false,
          courseId: course.id,
          programmingLanguageId: sqlLanguage.id,
        },
      ],
    });

    console.log("Successfully seeded SQL & Database Essentials course!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await db.$disconnect();
  }
}

main();
