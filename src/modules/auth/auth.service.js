import { userRepository } from "../../database/repository/index.repo.js";

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


    const checkEmail = await userRepository.findByEmail({email},{email:1});

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
    const newUser = await userRepository.createDocument(user);
    return newUser
};

export const login = async (body)=>{
    const {email,password} = body;

    const user = await userRepository.findByEmail({email},{password:1,email:1});
    console.log(user.email)
    console.log(user.password)
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


