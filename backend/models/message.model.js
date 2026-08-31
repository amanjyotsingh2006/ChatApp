import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    message: {
        type: String,
        default: ""
    },
    fileUrl: {
        type: String, default: ""
    },
    fileType: {
        type: String, default: ""
    },
    fileName: {
        type: String, default: ""
    },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;