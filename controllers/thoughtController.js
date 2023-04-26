const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ error_message: 'No user with this id found' })
            } else {
                return res.json(thought);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async postThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id }}
            )
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ error_message: 'No user with this id found' })
            } else {
                return res.json({ thought, message: "User successfully deleted."});
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { thoughtText: req.body.thoughtText },
                { username: req.body.username },
                { new: true }
            )
            return res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}