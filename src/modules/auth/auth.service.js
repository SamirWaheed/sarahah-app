import {jwtConfig} from "../../config/env.config.js";
import {
    userRepository
} from "../../database/repository/index.repo.js";

import {
    encryptionMethods,
    hashingMethods,
    jwtMethods,
    Token_Type
} from "../../utils/utils.index.js";


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


    const checkEmail = await userRepository.findByEmail({
        email
    }, {
        email: 1
    });

    if (checkEmail) {
        throw new Error("Email Already Exist", {
            cause: {
                status: 409
            }
        })
    }

    const hashPass = await hashingMethods.hashingPassword(password)

    const user = {
        firstName,
        lastName,
        email,
        password: hashPass,
        gender,
        role
    }

    if (phone) {
        user.phone = encryptionMethods.encrypt(phone)
    }
    const newUser = await userRepository.createDocument(user);
    return newUser
};

export const login = async (body) => {
    const {
        email,
        password
    } = body;

    const user = await userRepository.findByEmail({
        email
    }, {
        password: 1,
        email: 1,
        role: 1
    });
    console.log(user.email)
    console.log(user.password)
    if (!user) {
        throw new Error("Email not Found", {
            cause: {
                status: 404
            }
        })

    }


    const verify = await hashingMethods.verifyPassword(user.password, password)

    if (!verify) {
        throw new Error("Invalid Password", {
            cause: {
                status: 409
            }
        })
    }

    const payload = {
        id: user._id,
        role: user.role,
        email: user.email
    }

    const {accessToken, refreshToken} = jwtMethods.generateLoginCredentials({
        payload: payload,

        options: {
            accessOptions: {
                expiresIn: jwtConfig[user.role].accessExpirationTime
            },
            refreshOptions: {
                expiresIn: jwtConfig[user.role].refreshExpirationTime
            }

        }
    })
    
   
    const {
        password: hashedPass,
        ...safeUser
    } = user.toObject();
    return {
         accessToken,
        refreshToken,

        user: safeUser
    }
}

export const refreshToken = async(header)=>{

    const {authorization:refreshToken} = header;
    const {decoded} =jwtMethods.authenticateToken({token:refreshToken,tokenType:Token_Type.Refresh});

    const payload = {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email
    }

    const {accessToken} = jwtMethods.generateLoginCredentials({
        payload: payload,
        options: {
            accessOptions: {
                expiresIn: jwtConfig[decoded.role].accessExpirationTime
            }
        },
        requiredToken: Token_Type.Access

    });

        return {accessToken}
}