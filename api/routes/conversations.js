const router = require('express').Router();
const Conversation = require('../models/Conversation');

// New Conversation

router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        return res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get Conversation of a user

router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        return res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;