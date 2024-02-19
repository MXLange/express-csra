import jwt from 'jsonwebtoken';

export default class JwtAuth {
    generateToken(dataJSON) {
        const token = jwt.sign(dataJSON, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        });
        return token;
    }

    checkTokenValidity(token) {
        const validatedToken = jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err) {
                return false;
            }
            return decoded;
        });
        return validatedToken;
    }
}