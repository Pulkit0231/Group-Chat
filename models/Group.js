import { Schema, model } from 'mongoose';

const GroupSchema = new Schema({
    name: { type: String, required: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model('Group', GroupSchema);
