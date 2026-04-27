import {
    jwtConfig,
    gcpConfig
} from "../../config/index.js";
import {
    userRepository
} from "../../database/repository/index.repo.js";

import crypto,{randomUUID} from "crypto";
import { authenticateToken } from "../../utils/security/jwt.utils.js";
import { encryptionMethods,hashingMethods, jwtMethods,Token_Type,Provider_Type,blacklistTokens } from "../../utils/utils.index.js";

import {OAuth2Client} from 'google-auth-library';

const client = new OAuth2Client();

const buildTokens = (data)=>{
        const payload = {
        id: data._id,
        role: data.role,
        email: data.email
    }
     const {accessToken, refreshToken} = jwtMethods.generateLoginCredentials({
        payload: payload,
        options: {
            accessOptions: {
                expiresIn: jwtConfig[data.role].accessExpirationTimeSec,
                jwtid: randomUUID()
            },
            refreshOptions: {
                expiresIn: jwtConfig[data.role].refreshExpirationTimeSec,
                jwtid: randomUUID()
            }

        }
    });
    return {accessToken,refreshToken}

    }


const verifyGoogleToken = async (token) => {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: gcpConfig.webClientId
    });
    return ticket.getPayload();
}

const createOrUpdateGoogleUser = async(user,payload)=>{
        const {given_name,family_name,email,sub} = payload;
         if (user) {
       return await userRepository.findAndUpdateDocument({
            _id: user._id,
            data: {
                firstName: given_name,
                lastName: family_name,
                email: email
            },
            options: {
                new: true
            }
        })
    }
    else {
        return await userRepository.createDocument({
            email: email,
            firstName: given_name,
            lastName: family_name,
            provider:Provider_Type.Google,
            googleId: sub,
            password :await hashingMethods.hashingPassword(crypto.randomBytes(12).toString("hex"))
        })
    }
    }

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
                statuscode: 409
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
    if (!user) {
        throw new Error("Email not Found", {
            cause: {
                statusCode: 404
            }
        })

    }


    const verify = await hashingMethods.verifyPassword(user.password, password)

    if (!verify) {
        throw new Error("Invalid Password", {
            cause: {
                statusCode: 409
            }
        })
    }

    const {accessToken,refreshToken} = buildTokens(user)

    const {
        password: hashedPass,
        ...safeUser
    } = user.toObject();
    return {
        tokens:{accessToken,
        refreshToken},

        user: safeUser
    }
}

export const refreshToken = async (header) => {

    const {
        authorization: refreshToken
    } = header;
    const {
        decoded
    } = jwtMethods.authenticateToken({
        token: refreshToken,
        tokenType: Token_Type.Refresh
    });

    const payload = {
        id: decoded.id,
        role: decoded.role,
        email: decoded.email
    }

    const {
        accessToken
    } = jwtMethods.generateLoginCredentials({
        payload: payload,
        options: {
            accessOptions: {
                expiresIn: jwtConfig[decoded.role].accessExpirationTime
            }
        },
        requiredToken: Token_Type.Access

    });

    return {
        accessToken
    }
}


export const gmailSignUp = async (body) => {

    let {
        idToken
    } = body;


    const payload = await verifyGoogleToken(idToken);
   
    if (!payload || !payload.email_verified) {
        throw new Error("Invalid Email ", {
            cause: {
                statusCode: 401
            }
        })
    }
    const user = await userRepository.findOne({
        $or: [{
            email: payload.email,
            googleId: payload.sub
        }],
        provider: Provider_Type.Google
    });

    const userdata = await createOrUpdateGoogleUser({user,payload})

    return buildTokens(userData)
}

export const gmailLogin = async (body) => {
    const {idToken} = body;
    const payload = await verifyGoogleToken(idToken);
    if (!payload || !payload.email_verified) {
        throw new Error("Invalid Email ", {
            cause: {
                statusCode: 401
            }
        })
    }

     const user = await userRepository.findOne({
        $or: [{
            email: payload.email,
            googleId: payload.sub
        }],
        provider: Provider_Type.Google
    });
 if (!user) {
        throw new Error("User Not found ", {
            cause: {
                statusCode: 404
            }
        })
    }
return buildTokens(user)
}


export const logout = async (accessTokenData,refreshToken)=>{

    
    const {decodedData:refreshTokenData} = await authenticateToken(refreshToken,Token_Type.Refresh);
    const {exp:refreshExpiration,jti:refreshTokenId} = refreshTokenData;
     const {exp:accessExpiration,jti:accessTokenId} = accessTokenData;
   
        
    Promise.all([
        blacklistTokens(`Blacklist:${Token_Type.Refresh}:${refreshTokenId}`,refreshExpiration),
        blacklistTokens(`Blacklist:${Token_Type.Access}:${accessTokenId}`,accessExpiration)
    ])

    
    return  true
}