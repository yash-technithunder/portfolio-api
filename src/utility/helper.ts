import {MulterFile} from './interface';
import * as fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import {v2 as cloudinary, UploadApiResponse} from 'cloudinary';
dotenv.config();

export const uploadImage = (file: MulterFile) => {
    const cwd = process.cwd();
    const uploadDir = path.join(cwd, 'image');
    const uploadPath = path.join(uploadDir, file?.originalname);
    try {
        fs.writeFileSync(uploadPath, file?.buffer);
        return `${process.env.IMAGE_URL}/image/${file?.originalname}`;
    } catch (err: any) {
        throw new Error('Failed to upload image: ' + err.message);
    }
};
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export const uploadImageToCloudinary = (file: Express.Multer.File): Promise<string> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({resource_type: 'auto'}, (error, result: UploadApiResponse | undefined) => {
                if (error) {
                    return reject(error);
                }
                if (result && result.secure_url) {
                    resolve(result.secure_url);
                } else {
                    reject(new Error('Failed to retrieve the image URL from Cloudinary.'));
                }
            })
            .end(file.buffer);
    });
};
