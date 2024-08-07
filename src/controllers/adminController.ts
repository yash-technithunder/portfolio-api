import {Request, Response} from 'express';
import {validate} from 'class-validator';
import {plainToClass} from 'class-transformer';
import {AdminLoginDto, AdminRegisterDto} from '../utility/dto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin';

const login = async (req: Request, res: Response) => {
    try {
        const loginDto = plainToClass(AdminLoginDto, req.body);
        const errors = await validate(loginDto);
        const admin = await Admin.findOne({email: loginDto.email});
        if (errors.length > 0) {
            const validationErrors = errors.map(error => Object.values(error.constraints || {})).flat();
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }

        const validPassword = await bcrypt.compare(loginDto.password, admin?.password!);
        if (!validPassword) {
            return res.status(401).json({message: 'Invalid password'});
        }
        const token = jwt.sign({id: admin?._id, email: admin?.email}, process.env.TOKEN_SECRET || 'technithunder-backend', {expiresIn: '6h'});

        return res.status(200).json({
            success: true,
            message: 'admin login successfully',
            token: token,
            role: admin?.role
        });
    } catch (err: any) {
        console.error('Error occurred while admin login:', err.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while admin login'
        });
    }
};

const register = async (req: Request, res: Response) => {
    try {
        const userDto = plainToClass(AdminRegisterDto, req.body);
        const errors = await validate(userDto);
        if (errors.length > 0) {
            const validationErrors = errors.map((error: any) => Object.values(error.constraints || {})).flat();
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        userDto.password = hashedPassword;

        const newUser = new Admin(userDto);
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });
    } catch (err: any) {
        console.error('Error occurred while creating user:', err.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating user'
        });
    }
};

const adminController = {
    login,
    register
};
export default adminController;
