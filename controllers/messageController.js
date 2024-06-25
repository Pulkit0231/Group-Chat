import Message from '../models/Message.js';

export async function getMessages(req, res) {
    const { groupId } = req.params;
    try {
        const messages = await Message.find({ group: groupId }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
