import messageModel from '../models/message.model.js';
import UserModel from '../models/user.model.js';

const getAllUsersandunseenCount = async (req, res) => {
     try {

          // current login user
          const userId = req.user._id;

          // getting all users except login user and remove password feild 
          const allUsers = await UserModel.find({ _id: { $ne: userId } }).select('-password');

          // calculate all unseen message user-wise..
          const unseenMessageCount = {};

          // now we need to go every message whose send for login user and check for seen
          // so there are multiple request and when current resolve then move to next so we need
          // to use promise over here

          const promises = allUsers.filter(async (user) => {

               const messageCount = await messageModel.find({ senderId: user._id, receiverId: userId, seen: false });

               if (messageCount.length > 0) {
                    unseenMessageCount[user._id] = messageCount;
               }
          })

          Promise.all(promises);

          // sending response
          res.status(200).json({
               message: true,
               allusers: allUsers,
               unseenMessageCount
          })

     } catch (error) {
          console.log("Error :: getAllusers", error.message);
          res.status(500).json({
               success: false,
               error : error.messsage
          })
     }
}

// controller for all message for a particular user

const allMessageofUser = async (req, res) => {
     try {
          const selectedUserId = req.params.id;
          const loggedinUserId = req.user._id;

          // we need all those message that is either send by selected user & loggedin User

          const messages = await messageModel.find({
               $or: [{
                 senderId : loggedinUserId, receiverId : selectedUserId
               },
               {
                 senderId : selectedUserId, receiverId : loggedinUserId
               }]
          });

          // now we have to mark seen for all those selected user message
         await messageModel.updateMany({ senderId: selectedUserId, receiverId: loggedinUserId }, { seen: true })
          
          // sending response
          return res.status(200)
               .json({
                    success: true,
                    messages
          })


     } catch (error) {
          res.status(500).json({
               success: false,
               error: error.messsage
          })
     }
}

// controller for mark message as seen

const markMessageasSeen = async (req, res) => {
     try {
          // finding message id
          const { messageId } = req.params;

          await messageModel.findByIdAndUpdate(messageId, { seen: true });

          res.json({ message: true });

     } catch (error) {
          res.status(500).json({
               success: false,
               error: error.messsage
          })
     }
}

// send message controller --


export { getAllUsersandunseenCount, allMessageofUser, markMessageasSeen };