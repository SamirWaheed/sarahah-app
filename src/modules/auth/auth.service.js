import {
    User
} from "../../database/models/index.js";

import { encryptionMethods ,hashingMethods,jwtMethods} from "../../utils/utils.index.js";


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

    const hashPass = await hashingMethods.hashingPassword(password)
    
    const user =  {
        firstName,
        lastName,
        email,
        password : hashPass,
        gender,
        role
    }

    if(phone){
        user.phone = encryptionMethods.encrypt(phone)
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
  
    
      const verify = await hashingMethods.verifyPassword(user.password,password)

      if (!verify){
        throw new Error("Invalid Password",{cause:{status:409}})
      }
       
      const payload = { id:user._id ,
                        role:user.role
      }
      const token = jwtMethods.generateToken(payload)

      const {password:hashedPass, ...safeUser} = user.toObject();
      return {user:safeUser,token}
}


