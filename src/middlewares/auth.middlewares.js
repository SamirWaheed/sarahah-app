import {
    jwtMethods,
    Token_Type
} from "../utils/utils.index.js";


export const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new Error("Token required", {
            cause: {
                status: 401
            }
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new Error("Invalid Or Expired Token", {
            cause: {
                status: 401
            }
        });
    }

    const data = jwtMethods.authenticateToken(token, Token_Type.Access)
;
    req.user =data;
    next()
}

export const authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            throw new Error("Unauthorized Access", {
                cause: {
                    status: 403
                }
            });
        }
        next()
    }
}