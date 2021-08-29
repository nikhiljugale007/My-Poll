const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	options: {
		type: Array,
		default: [],
	},
	totalVotes: {
		type: Number,
	},
});

module.exports = mongoose.model("Poll", pollSchema);
