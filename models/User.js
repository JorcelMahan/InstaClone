import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        maxLength: 500
    },
}, {
    timestamps: true
});


export default mongoose.model("User", UserSchema);