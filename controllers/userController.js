const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ error_message: 'No user with this id found' })
            } else {
                return res.json(user);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async postUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ error_message: 'No user with this id found' })
            } else {
                await Thought.deleteMany({ _id: { $in: user.thoughts }});
                return res.json({ message: "User and user thoughts successfully deleted."});
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { username: req.body.username },
                { email: req.body.email },
                { new: true }
            );
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}