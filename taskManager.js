// Import MongoDB client
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URI
const uri = "mongodb+srv://chelsea:qwertyuiop@clusterchelsea.n01ti.mongodb.net/?retryWrites=true&w=majority&appName=ClusterChelsea";

// Create a new MongoDB client
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect to MongoDB Atlas
        await client.connect();
        console.log("Successfully connected to MongoDB Atlas");

        // Select database and collection
        const database = client.db('taskManagerDB');
        const tasksCollection = database.collection('tasks');

        // Insert a new task
        const newTask = {
            title: "Complete MongoDB CRUD activity",
            description: "Write a Node.js script that performs CRUD operations in MongoDB Atlas",
            completed: false,
            dueDate: "2024-11-15"
        };
        const insertResult = await tasksCollection.insertOne(newTask);
        console.log(`New task inserted with ID: ${insertResult.insertedId}`);

        // Insert multiple tasks
        const multipleTasks = [
            { title: "Task 1", description: "First task description", completed: false, dueDate: "2024-11-10" },
            { title: "Task 2", description: "Second task description", completed: false, dueDate: "2024-11-20" },
            { title: "Task 3", description: "Third task description", completed: false, dueDate: "2024-11-25" }
        ];
        const multipleInsertResult = await tasksCollection.insertMany(multipleTasks);
        console.log(`Multiple tasks inserted with IDs: ${multipleInsertResult.insertedIds}`);

        // Query all tasks
        const tasks = await tasksCollection.find().toArray();
        console.log("All tasks:", tasks);

        // Update a task
        const updateResult = await tasksCollection.updateOne(
            { title: "Complete MongoDB CRUD activity" },
            { $set: { completed: true } }
        );
        console.log(`${updateResult.modifiedCount} task(s) updated`);

        // Delete a task
        const deleteResult = await tasksCollection.deleteOne({ title: "Task 1" });
        console.log(`${deleteResult.deletedCount} task(s) deleted`);

        // Query tasks with due dates in the future
        const futureTasks = await tasksCollection.find({ dueDate: { $gt: "2024-11-01" } }).toArray();
        console.log("Future tasks:", futureTasks);

    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}

run().catch(console.dir);
