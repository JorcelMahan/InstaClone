import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    publication: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Publication"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
});


export default mongoose.model("Like", LikeSchema);