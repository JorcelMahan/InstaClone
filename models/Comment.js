import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model("Comment", CommentSchema);