//src/middlewares/auth.js
import { verifyToken } from '../utils/jwt.js';

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(403).send({ error: 'Invalid token' });
    }
};
