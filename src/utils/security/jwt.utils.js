import jwt from 'jsonwebtoken';
import {
    jwtConfig
} from '../../config/env.config.js';
import {
    User_Role,
    Token_Type,
    stringServices
} from '../utils.index.js';



export const generateToken = ({
    payload,
    secret,
    options
}) => {

    return jwt.sign(payload, secret, options)
}

export const verifyToken = ({
    token,
    secret
}) => {
    return jwt.verify(token, secret)
}

export const decodeToken = (token) => {
    return jwt.decode(token)
}


export const  authenticateToken = async(token, tokenType) => {
    
    const data = decodeToken(token);
    
    if (!data) {
       throw new Error("Invalid Or Expired Token",{cause:{statusCode:401}})
    }
 
    const {tokenSignature} = detectSignatureByTypeAndRole({  role:data.role,tokenTypes:tokenType});
   
    if (!tokenSignature) {
      
          throw new Error("Invalid Signature",{cause:{statusCode:403}})

    }
    
    const decodedData = verifyToken({token,secret:tokenSignature});

    if (!decodedData) {
     
         throw new Error("Invalid Or Expired Token",{cause:{statusCode:401}})

    }
    
    const isBlacklisted = await stringServices.getKey({key:`Blacklist:${tokenType}:${decodedData.jti}`})
    console.log(isBlacklisted)
    if(isBlacklisted){
        throw new Error("Token has been blacklisted",{cause:{statusCode:401}})
    }
   
    return {decodedData}

}

export const generateLoginCredentials = ({
    payload,
    options,
    requiredToken
}) => {

    const signature = detectSignatureByTypeAndRole({
        role: payload.role,
        both: true
    });

    let accessToken, refreshToken;

    switch (requiredToken) {
        case Token_Type.Access:
            accessToken = generateToken({
                payload,
                secret: signature.accessSignature,
                options: options.accessOptions
            });
            break;

        case Token_Type.Refresh:
            refreshToken = generateToken({
                payload,
                secret: signature.refreshSignature,
                options: options.refreshOptions
            });
            break;

        default:
            accessToken = generateToken({
                payload,
                secret: signature.accessSignature,
                options: options.accessOptions

            });
            refreshToken = generateToken({
                payload,
                secret: signature.refreshSignature,
                options: options.refreshOptions
            });
            
           
    }
    return {
        accessToken,
        refreshToken
    }
}

export const detectSecretByRole = ({
    role
}) => {
    let signature;
    switch (role) {
        case User_Role.Admin:
            signature =jwtConfig.admin ;
            break;
        case User_Role.User:
            signature = jwtConfig.user;
            break;
        default:
            signature = jwtConfig.user;
    }

    return signature;
}

export const detectSignatureByTypeAndRole = ({
    role,
    tokenTypes,
    both = false
}) => {

    const signatures = detectSecretByRole({
        role
    });
   
    let tokenSignature;

    if (both) {
        return signatures;
    }

    switch (tokenTypes) {
        case Token_Type.Access:
            tokenSignature = signatures.accessSignature;
            break;
        case Token_Type.Refresh:
            tokenSignature = signatures.refreshSignature;
            break;
        default:
            throw new Error("Invalid Token Type",{cause:{statusCode:400}})
    }
    
    return {tokenSignature};
}