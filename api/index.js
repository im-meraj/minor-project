const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
// const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB")).catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, 'images')));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

// app.use(
//   express.static(path.join(__dirname, "/client/build"))
// );

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/client/build", "index.html")
//   );
// });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({storage: storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
    return res.status(200).json({message: "Image uploaded successfully"});
});

// app.get("/", (req, res) => {
//     res.send("Welcome to Blog API");
// });

app.listen(process.env.PORT || 4000, ()=>{
    console.log("Server is running on port 4000");
});

