import {
    User
} from "../../database/models/index.js";

import { encrypt,decrypt } from "../../utils/encryption.utils.js";
import { hashingPassword,verifyPassword } from "../../utils/hashing.utils.js";

export const signUp = async (body) => {

    const {
        firstName,
        lastName,
        email,
        password,
        gender,
        role,
        phone
    } = body;


    
    const checkEmail = await User.findOne({
        email
    }, {
        email: 1,
        _id: 0
    });

    if (checkEmail) {
        throw new Error("Email Already Exist", {
            cause: {
                status: 409
            }
        })
    }

    const hashPass = await hashingPassword(password)
    
    const user =  {
        firstName,
        lastName,
        email,
        password : hashPass,
        gender,
        role
    }

    if(phone){
        user.phone = encrypt(phone)
    }
    const newUser = await User.create(user);
    return newUser
};

export const login = async (body)=>{
    const {email,password} = body;

    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new Error("Email not Found", {
            cause: {
                status: 404
            }
        })
        
    }
    console.log(user.password)
    
      const verify = await verifyPassword(user.password,password)

      if (!verify){
        throw new Error("Invalid Password",{cause:{status:409}})
      }

      return user
}


export const findUser = async(_id)=>{

    const user = await User.findById({_id});

    if(user.phone){
       user.phone = decrypt(user.phone)
    }
    return user
}