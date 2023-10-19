import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true
});

export default mongoose.model("Publication", PublicationSchema);