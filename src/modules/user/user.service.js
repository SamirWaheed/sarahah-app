import {
    userRepository
} from "../../database/repository/index.repo.js";
import {
    encryptionMethods
} from "../../utils/utils.index.js";


export const findUser = async (_id) => {

    const user = await userRepository.findById({
        _id
    });

    if (user.phone) {
        user.phone = encryptionMethods.decrypt(user.phone)
    }
    return user
}


export const updateUser = async (_id, body) => {

    const {
        fistName,
        lastName,
        email,
        password,
        gender,
        phone
    } = body;

    //destruct data from body
    // check if user found 
    //check if email does not conflict with another user
    //hashing password
    //encrypt phone
    //update user info
    const user = await userRepository.findById({
        _id
    });

    if (!user) {
        throw new Error('User not found', {
            cause: {
                statusCode: 404
            }
        });
    }
    if (email) {
        const emailConflict = await userRepository.findOne({
            email
        });
        if (emailConflict) {
            throw new Error('Email already in use', {
                cause: {
                    statusCode: 409
                }
            });
        }
    }

    const updatedData = {
        fistName: fistName ?? user.fistName,
        lastName: lastName ?? user.lastName,
        email: email ?? user.email,
        gender: gender ?? user.gender,
        phone: phone ? encryptionMethods.encrypt(phone) : user.phone
    };
    if (password) {
        updatedData.password = await encryptionMethods.hashPassword(password);

    }

    const updatedUser = await userRepository.findAndUpdateDocument(_id, updatedData, {
        new: true,
        runValidators: true
    });

    return updatedUser;
}

export async function softDeleteUser(_id) {
    const deletedUser = await userRepository.softDeleteDocument(_id);

    if (!deletedUser) {
        throw new Error('User not found', {
            cause: {
                statusCode: 404
            }
        });
    }
    return deletedUser
}

export async function restoreDeletedUser(_id) {
    const user = await userRepository.restoreDeletedDocument(_id);

    if (!user) {
        throw new Error('User not found', {
            cause: {
                statusCode: 404
            }
        });
    }
    return user
}

export async function hardDeleteAccount(_id) {

    const deletedAccount = await userRepository.deleteDocument(_id)
    if (!deletedAccount) {
        throw new Error('User not found', {
            cause: {
                statusCode: 404
            }
        });

    }

    return deletedAccount 
}


export async function getUserWithMessages(_id) {
    const userWithMessages = await userRepository.findByIdWithMessages(_id);    
    if (!userWithMessages) {
        throw new Error('User not found', {
            cause: {
                statusCode: 404
            }
        });
        
    }   
    return userWithMessages
}