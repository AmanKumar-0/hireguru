// Express
const express = require("express");
const app = express();

// Dotenv
require("dotenv").config();

// Cors
const cors = require("cors");

// MongoDB
const mongoose = require("mongoose");
try {
  
  mongoose.connect(
    process.env.MONGO_DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("MongoDB is connected");

} catch (error) {
  console.log("error",error)
}

// Routes
const authRoutes = require("./routes/auth/auth");
const adminJobRoutes = require("./routes/admin/job");
const userJobRoutes = require("./routes/user/job");
const userProfileRoutes = require("./routes/user/profile");
const userApplicationRoutes = require("./routes/user/application");
const adminApplicationRoutes = require("./routes/admin/application");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('files'))

app.use("/api/auth", authRoutes);

app.use("/api/admin/job", adminJobRoutes);
app.use("/api/admin/application", adminApplicationRoutes);

app.use("/api/user/job", userJobRoutes);
app.use("/api/user/application", userApplicationRoutes);
app.use("/api/user", userProfileRoutes);


const PORT = process.env.PORT || 4000;
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  // app.use(express.static("client/build"));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname + "/client/build/index.html"));
  // });
  app.use(express.static(path.join(__dirname, './frontend', 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend', 'build', 'index.html'));
  })
}


app.listen(PORT, () => {
  console.log("Server started on port 4000");
});
