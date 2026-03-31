import {
    User
} from "../../database/models/index.js";

import { encryptionMethods } from "../../utils/utils.index.js";
export const findUser = async (_id) => {

    const user = await User.findById({_id });

    if (user.phone) {
        user.phone = encryptionMethods.decrypt(user.phone)
    }
    return user
}