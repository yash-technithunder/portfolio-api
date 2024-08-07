import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import Admin from '../models/admin';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: 'Unauthorized: No token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'technithunder-backend') as JwtPayload;

        const admin = await Admin.findById(decoded.id);

        if (admin?.role === 'Admin') {
            next();
        } else {
            return res.status(403).json({
                message: 'Only Admin are allowed to access requested resource'
            });
        }
    } catch (error) {
        if ((error as Error).message === 'jwt expired') {
            res.status(500).json({
                message: 'Session Expired please login again ',
                error: (error as Error).message
            });
        }
        res.status(500).json({
            message: 'Internal Server Error ',
            error: (error as Error).message
        });
    }
};

export const isWriter = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: 'Unauthorized: No token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'technithunder-backend') as JwtPayload;
        const writer = await Admin.findById(decoded.id);
        if (writer?.role === 'Writer') {
            next();
        } else {
            return res.status(403).json({
                message: 'Only Writer are allowed to access requested resource'
            });
        }
    } catch (error) {
        if ((error as Error).message === 'jwt expired') {
            res.status(500).json({
                message: 'Session Expired please login again ',
                error: (error as Error).message
            });
        }
        res.status(500).json({
            message: 'Internal Server Error ',
            error: (error as Error).message
        });
    }
};

export const isAdminOrWriter = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: 'Unauthorized: No token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'technithunder-backend') as JwtPayload;
        const user = await Admin.findById(decoded.id);
        if (user?.role === 'Writer' || user?.role === 'Admin') {
            next();
        } else {
            return res.status(403).json({
                message: 'Only Writer and Admin are allowed to access requested resource'
            });
        }
    } catch (error) {
        if ((error as Error).message === 'jwt expired') {
            res.status(500).json({
                message: 'Session Expired please login again ',
                error: (error as Error).message
            });
        }
        res.status(500).json({
            message: 'Internal Server Error ',
            error: (error as Error).message
        });
    }
};
