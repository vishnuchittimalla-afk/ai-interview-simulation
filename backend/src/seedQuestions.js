require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Question = require("./models/Question");

const questions = [
    {
        questionText: "What is inheritance in Java?",
        category: "Java",
        difficulty: "easy",
        expectedKeywords: [
            "parent class",
            "child class",
            "extends",
            "reusability"
        ],
        expectedConcepts: [
            "inheritance",
            "code reuse"
        ]
    },

    {
        questionText: "What is the difference between ArrayList and LinkedList?",
        category: "Java",
        difficulty: "medium",
        expectedKeywords: [
            "ArrayList",
            "LinkedList",
            "random access",
            "insertion",
            "deletion"
        ],
        expectedConcepts: [
            "array-based storage",
            "linked nodes",
            "access performance"
        ]
    },

    {
        questionText: "What is a REST API?",
        category: "Backend",
        difficulty: "easy",
        expectedKeywords: [
            "HTTP",
            "client",
            "server",
            "GET",
            "POST"
        ],
        expectedConcepts: [
            "stateless communication",
            "resources",
            "HTTP methods"
        ]
    },

    {
        questionText: "What is middleware in Express.js?",
        category: "Node.js",
        difficulty: "medium",
        expectedKeywords: [
            "request",
            "response",
            "next",
            "middleware"
        ],
        expectedConcepts: [
            "request processing",
            "next function"
        ]
    },

    {
        questionText: "What is normalization in DBMS?",
        category: "DBMS",
        difficulty: "medium",
        expectedKeywords: [
            "redundancy",
            "dependencies",
            "normal forms"
        ],
        expectedConcepts: [
            "data organization",
            "reducing redundancy"
        ]
    }
];

const seedQuestions = async () => {
    try {
        await connectDB();

        await Question.deleteMany();

        await Question.insertMany(questions);

        console.log("Questions seeded successfully");

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding questions:", error);
        process.exit(1);
    }
};

seedQuestions();