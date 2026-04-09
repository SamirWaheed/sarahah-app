import {messageRepository} from '../../database/repository/index.repo.js';

export const createMessage = async (messageData,receiverId) => {
    const {content} = messageData;

    if(!receiverId ){
        throw new Error("Receiver ID is required")
    }
    

    const message = await messageRepository.createDocument({
        content,
        receiver: [receiverId]
    });

    return message;
}