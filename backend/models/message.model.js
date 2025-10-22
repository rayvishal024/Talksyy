import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
     senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref : 'user'
     },
     receaveId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
     },
     message: {
          type : String
     },
     image: {
          type : String
     }
}, { timestamps: true });

const messageModel = mongoose.model('Message', messageSchema);

export default messageModel;