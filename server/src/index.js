const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());

mongoose.connect(
  "mongodb+srv://zombrooc:IronM@n0552@cluster0.7vtyh.mongodb.net/Photos?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use((req, res, next) => {
  req.io = io;  
  next();
})

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(
    `⚡️ [server]: Server is running at https://localhost:${PORT}`
  )
});
