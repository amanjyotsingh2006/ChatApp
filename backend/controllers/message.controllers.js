import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message, fileUrl, fileType, fileName } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            fileUrl,
            fileType,
            fileName
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage Controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// export const uploadFile = async(req, res) => {}

export const getMessages = async (req, res) => {
    try {
        const { id: UserToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, UserToChatId] }
        }).populate("messages")

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(conversation.messages)
    }

    catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}