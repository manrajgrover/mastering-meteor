Meteor.methods({
    newMessage: function(message){
        message.timestamp = new Date();
        check(message, {
            text: String,
            chatId: String
        });
        let messageId = Messages.insert(message);
        Chats.update(message.chatId, {
            $set: {
                lastMessage: message
            }
        });
        return messageId;
    }
});