const express = require('express');
const router = express.Router();
const { connectToDatabase, closeDatabaseConnection, insertUser } = require('../mongodb');

router.post("/", async (req, res) => {
    try {
        await connectToDatabase()
        const anonymousUser = req.body;
        console.log("Received user data", anonymousUser);

        // Insert the user into the database using the function from db.js
        const insertedId = await insertUser(anonymousUser);

        res.json({ message: "User inserted successfully", insertedId });
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await closeDatabaseConnection();
    }
});

module.exports = router;
