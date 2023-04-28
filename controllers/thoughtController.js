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
                return res.status(404).json({ error_message: 'No thought with this id found' })
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
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id }}
            )
            if (!user) {
                res.json({ thought, error_messsage: "No thought with this username found." });
            } else {
                res.json(thought);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ error_message: 'No thought with this id found' })
            } else if (!user) {
                return res.status(404).json({message: 'Thought deleted, but no users found'});
            } else {
                return res.json({ thought, message: "Thought successfully deleted."});
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
    },
    async postReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $addToSet: { reactions: req.body }},
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ error_message: "No thought with this thought id found." });
            } else {
                return res.json(thought);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId }}},
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ error_message: "No thought with this thought id found." });
            } else {
                return res.json(thought);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}