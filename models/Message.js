import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default model('Message', MessageSchema);
