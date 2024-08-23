// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import axios from "axios";
// import path from "path";
// import { fileURLToPath } from "url";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import todoRoutes from "./routes/todoRoutes.js";
// //import recommenderRoutes from "./routes/recommender.js";
// import { register } from "./controllers/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";
// //import { addDocuments, updateUserInteractions, getHybridRecommendations } from "./Recommender_Module.js";

// /* CONFIGURATIONS */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const FLASK_API_URL = 'http://localhost:5000';
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors({
//   origin: "http://localhost:3000",
//   //methods: ["GET", "PUT", "POST", "DELETE"],
//   credentials: true,
//   // preflightContinue: false,
//   // optionsSuccessStatus: 204,
// })
// );
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// mongoose.set("strictQuery", true);
// /* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

// /* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

// /* ROUTES */
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);
// app.use("/todo", todoRoutes);
// //app.use("/api/recommend", recommenderRoutes);

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// app.get('/api/recommend/content', async (req, res) => {
//   try {
//       const user_id = req.query.user_id;
//       const response = await axios.get(`${FLASK_API_URL}/recommend/content`, { params: { user_id } });
//       res.json(response.data);
//   } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch content recommendations' });
//   }
// });

// app.get('/api/recommend/popular', async (req, res) => {
//   try {
//       const user_id = req.query.user_id;
//       const response = await axios.get(`${FLASK_API_URL}/recommend/popular`, { params: { user_id } });
//       res.json(response.data);
//   } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch popular posts' });
//   }
// });

// app.get('/api/recommend/collaborative', async (req, res) => {
//   try {
//       const user_id = req.query.user_id;
//       if (!user_id) {
//         return res.status(400).json({ error: 'user_id parameter is missing' });
//     }
//       const response = await axios.get(`${FLASK_API_URL}/recommend/collaborative`, { params: { user_id } });
//       res.json(response.data);
//   } catch (error) {
//       console.error('Failed to fetch casa recommendations', error);
//       res.status(500).json({ error: 'Failed to fetch collab recommendations' });
//   }
// });

// app.get('/api/recommend/hybrid', async (req, res) => {
//   try {
//       const user_id = req.query.user_id;
//       if (!user_id) {
//           return res.status(400).json({ error: 'user_id parameter is missing' });
//       }

//       // Fetch hybrid recommendations from Flask API
//       const response = await axios.get(`${FLASK_API_URL}/recommend/hybrid`, { params: { user_id } });
//       res.json(response.data);
//   } catch (error) {
//       console.error('Failed to fetch hybrid recommendations', error);
//       res.status(500).json({ error: 'Failed to fetch hybrid recommendations' });
//   }
// });

// /* MONGOOSE SETUP */
// const PORT = process.env.PORT;
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

//     // Post.find().then(posts => {
//     //   addDocuments(posts);
//     // });

//     /* ADD DATA ONE TIME */
//     // User.insertMany(users);
//     // Post.insertMany(posts);
//   })
//   .catch((error) => console.log(`${error} did not connect`));

// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import todoRoutes from "./routes/todoRoutes.js";
// import totalRoutes from "./routes/totalCount.js";
// import recommenderRoutes from "./routes/recommender.js";
// import { register } from "./controllers/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";
// import {
//   addDocuments,
//   updateUserInteractions,
//   getHybridRecommendations,
// } from "./Recommender_Module.js";

// /* CONFIGURATIONS */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     //methods: ["GET", "PUT", "POST", "DELETE"],
//     credentials: true,
//     // preflightContinue: false,
//     // optionsSuccessStatus: 204,
//   })
// );
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// mongoose.set("strictQuery", true);
// /* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

// /* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

// /* ROUTES */
// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);
// app.use("/todo", todoRoutes);
// app.use("/api/recommend", recommenderRoutes);
// app.use("/api/total", totalRoutes);
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.get("/api/recommend/:userId", (req, res) => {
//   const { userId } = req.params;
//   try {
//     const recommendations = getHybridRecommendations(userId);
//     res.json(recommendations);
//   } catch (error) {
//     console.error("Error fetching recommendations", error);
//     res.status(500).send("Error setting up recommender system");
//   }
// });
// app.get("/api/recommender/setup", async (req, res) => {
//   try {
//     const posts = await Post.find();
//     addDocuments(posts);
//     res.send("Recommender system setup completed.");
//   } catch (error) {
//     res.status(500).send("Error setting up recommender system");
//   }
// });

// /* MONGOOSE SETUP */
// const PORT = process.env.PORT;
// mongoose
//   .connect(process.env.MONGO, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

//     Post.find().then((posts) => {
//       addDocuments(posts);
//     });

//     /* ADD DATA ONE TIME */
//     // User.insertMany(users);
//     // Post.insertMany(posts);
//   })
//   .catch((error) => console.log(`${error} did not connect`));

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import notesRoutes from "./routes/notes.js";
import todoRoutes from "./routes/todoRoutes.js";
import totalRoutes from "./routes/totalCount.js";
import notificationsRoute from "./routes/notifications.js";
//import recommenderRoutes from "./routes/recommender.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
// import {
//   addDocuments,
//   updateUserInteractions,
//   getHybridRecommendations,
// } from "./Recommender_Module.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FLASK_API_URL = 'http://localhost:5000'; 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Configure CORS to allow both client and admin dashboard origins

const allowedOrigins = ["http://localhost:3000", "http://localhost:3002"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use("/assets", express.static(path.join(__dirname, "public/assets")));
mongoose.set("strictQuery", true);

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/todo", todoRoutes);
// app.use("/api/recommend", recommenderRoutes);
app.use("/api/total", totalRoutes);
app.use('/notifications', notificationsRoute);
//app.use("/notes", notesRoutes);
app.use("/notes", upload.fields([{ name: 'image', maxCount: 1},{name:'audio', maxCount:1}]),  notesRoutes);
//app.use("/api/recommend", recommenderRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get('/api/recommend/content', async (req, res) => {
  try {
      const user_id = req.query.user_id;
      const response = await axios.get(`${FLASK_API_URL}/recommend/content`, { params: { user_id } });
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch content recommendations' });
  }
});
app.get('/api/recommend/popular', async (req, res) => {
  try {
      const user_id = req.query.user_id;
      const response = await axios.get(`${FLASK_API_URL}/recommend/popular`, { params: { user_id } });
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch popular posts' });
  }
});

app.get('/api/recommend/collaborative', async (req, res) => {
  try {
      const user_id = req.query.user_id;
      if (!user_id) {
        return res.status(400).json({ error: 'user_id parameter is missing' });
    }
      const response = await axios.get(`${FLASK_API_URL}/recommend/collaborative`, { params: { user_id } });
      res.json(response.data);
  } catch (error) {
      console.error('Failed to fetch casa recommendations', error);
      res.status(500).json({ error: 'Failed to fetch collab recommendations' });
  }
});

app.get('/api/recommend/hybrid', async (req, res) => {
  try {
      const user_id = req.query.user_id;
      if (!user_id) {
          return res.status(400).json({ error: 'user_id parameter is missing' });
      }

      // Fetch hybrid recommendations from Flask API
      const response = await axios.get(`${FLASK_API_URL}/recommend/hybrid`, { params: { user_id } });
      res.json(response.data);
  } catch (error) {
      console.error('Failed to fetch hybrid recommendations', error);
      res.status(500).json({ error: 'Failed to fetch hybrid recommendations' });
  }
});


// app.get("/api/recommender/setup", async (req, res) => {
//   try {
//     const posts = await Post.find();
//     addDocuments(posts);
//     res.send("Recommender system setup completed.");
//   } catch (error) {
//     res.status(500).send("Error setting up recommender system");
//   }
// });

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3002; // Default to port 3002 if PORT is not specified
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // Post.find().then((posts) => {
    //   addDocuments(posts);
    // });

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
