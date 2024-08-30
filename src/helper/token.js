import jwt from 'jsonwebtoken';

export const generateToken = (data) => {
    const token = jwt.sign({data}, process.env.JWT_SECRET_KEY, { expiresIn:'1h' });
    return token;
};