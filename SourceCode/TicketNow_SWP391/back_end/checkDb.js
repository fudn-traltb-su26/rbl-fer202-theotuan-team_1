import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

async function checkDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully.");
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("\nCollections and Document Counts:");
    for (let collection of collections) {
      const count = await mongoose.connection.db.collection(collection.name).countDocuments();
      console.log(`- ${collection.name}: ${count} documents`);
    }
    await mongoose.disconnect();
    console.log("\nDatabase check complete.");
  } catch (error) {
    console.error("Error checking database:", error);
  }
}

checkDatabase();
