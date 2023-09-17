import express from "express";
import { Db, MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config(".env");

const app = express();
const port = 8080; // Default port to listen on.
let db: Db;

// Middleware.
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// ====================================================================
// Routes
// ====================================================================

// Start the Express server.
function start() {
    // const ATLAS_URI="mongodb+srv://Cluster50900:<VGBuW19mT1Nc>@cluster50900.kohbbut.mongodb.net/?retryWrites=true&w=majority"
    const ATLAS_URI="mongodb+srv://Cluster50900:VGBuW19mT1Nc@cluster50900.kohbbut.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(ATLAS_URI);
    //const client = new MongoClient(process.env.ATLAS_URI);
    client
      .connect()
      .then(() => {
        console.log("Connected successfully to server");
        db = client.db("database");
        app.listen(port, () => {
          console.log(`server started at http://localhost:${port}`);
        });
      })
      .catch((err) => {
        console.log("error connecting to mongoDB!", err);
      });
  }
  
  start();
  