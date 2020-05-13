import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    assigned_tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

export const User = mongoose.model("User", userSchema);
