require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
let bodyParser = require("body-parser");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const pollRoutes = require("./routes/polls");
app.use("/mypolls", pollRoutes);

app.get("/", (req, res) => {
	res.json({
		message: "API is working",
	});
});

let port = process.env.PORT || 3005;
app.listen(port, () => console.log("server started"));
