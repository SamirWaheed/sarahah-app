import jwt from 'jsonwebtoken';
import {
    jwtConfig
} from '../../config/env.config.js';
import {
    User_Role, Token_Type
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


export const authenticateToken = (token, tokenType) => {

        const decodedData = decodeToken(token);
        
        if (!decodedData) {
        throw new Error("Invalid Or Expired Token", {
            cause: {
                status: 401
            }
        });
    }

    const signature = detectSignatureByTypeAndRole({
        role: decodedData.role,
        tokenType
    });
    if (!signature) {
        throw new Error("Invalid Signature", {
            cause: {
                status: 403
            }
        });

    }
 const decoded = verifyToken({
        token,
        secret: signature
    });

    if (!decoded) {
        throw new Error("Invalid Or Expired Token", {
            cause: {
                status: 401
            }
        });

}

    return {decoded}

}

export const generateLoginCredentials = ({ payload, options,requiredToken}) => {

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
        options :options.accessOptions

    });
     refreshToken = generateToken({
        payload,
        secret: signature.refreshSignature,
        options:options.refreshOptions
    });
        break;
    }
    return {accessToken,refreshToken}
}

export const detectSecretByRole = ({
    role
}) => {
    let signature;
    switch (role) {
        case User_Role.Admin:
            signature = jwtConfig.admin;
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
    console.log(signatures)
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
            throw new Error("Invalid Token Type", {
                cause: {
                    status: 400
                }
            })
    }
    return tokenSignature;
}