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

//handler that creates a new coursetaken
app.post('/coursetaken', async (req, res) => {
  const courseTakenBody = req.body;
  const collection = db.collection("coursestaken");
  const newCourseTaken = {
    courseName: courseTakenBody.courseName,
    instructor: courseTakenBody.instructor,
    concentration: courseTakenBody.concentration,
    takenIn: courseTakenBody.takenIn,
    notes: courseTakenBody.notes
  };
  try {
      await collection.insertOne(newCourseTaken);
      return res.json(newCourseTaken);
  } catch (e) {
      return res.status(500).send();
  }
});

//handler that returns the list of courses taken
app.get('/coursetaken', async (req, res) => {
  const collection = db.collection("coursestaken");
  const result = await collection.find({}).toArray()
  return res.json(result);
});

//handler that returns a course taken
app.get('/coursetaken/:id', async (req, res) => {
  const courseTakenID = req.params.id;
  const collection = db.collection("coursestaken");
  try {
      const result = await collection.findOne({"_id": new ObjectId(courseTakenID)});
      return res.json(result);
  } catch (e) {
      return res.status(404).send(`no course found with id ${courseTakenID}`);
  }
});

//handler that updates a course taken
app.put('/coursetaken/:id', async (req, res) => {
  const courseTakenID = req.params.postID;
  const updateBody = req.params.body;
  const collection = db.collection("coursestaken");
  try {
      const result = await collection.updateOne({"_id": new ObjectId(courseTakenID)}, {$set: updateBody});
      return res.json(result);
  } catch (e) {
      return res.status(404).send(`no course found with id ${courseTakenID}`);
  }
});

//handler that deletes a course taken
app.get('/coursetaken/:id', async (req, res) => {
  const courseTakenID = req.params.postID;
  const collection = db.collection("coursestaken");
  try {
      const result = await collection.deleteOne({"_id": new ObjectId(courseTakenID)});
      return res.json(result);
  } catch (e) {
      return res.status(404).send(`no course found with id ${courseTakenID}`);
  }
});



// Start the Express server.
function start() {
    const ATLAS_URI="mongodb+srv://Cluster50900:VGBuW19mT1Nc@cluster50900.kohbbut.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(ATLAS_URI);
    //Error reading URI from .env file
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
  