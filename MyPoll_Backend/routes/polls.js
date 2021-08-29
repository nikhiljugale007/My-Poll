const express = require("express");
const router = express.Router();
const Poll = require("../model/poll");

// Get all subscribers
router.get("/", async (req, res) => {
	try {
		const polls = await Poll.find();
		res.json(polls);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Create one subscriber
router.post("/", async (req, res) => {
	const tempPoll = new Poll({
		title: req.body.title,
		options: req.body.options,
		totalVotes: 0,
	});

	try {
		const newPoll = await tempPoll.save();
		res.status(201).json(newPoll);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Get one subscriber
router.get("/:id", getPoll, (req, res) => {
	res.json(res.poll);
});

// Update one subscriber
router.patch("/:id", getPoll, async (req, res) => {
	res.poll.title = req.body.title;
	res.poll.options = req.body.options;
	res.poll.totalVotes = res.poll.totalVotes + 1;
	try {
		const updatedPoll = await res.poll.save();
		res.json(updatedPoll);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete one subscriber
router.delete("/:id", getPoll, async (req, res) => {
	try {
		await res.poll.remove();
		res.json({ message: "Deleted This Poll" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getPoll(req, res, next) {
	try {
		poll = await Poll.findById(req.params.id);
		if (poll == null) {
			return res.status(404).json({ message: "Cant find subscriber" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.poll = poll;
	next();
}

module.exports = router;
