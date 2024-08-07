import {MulterFile} from './interface';
import * as fs from 'fs';
import path from 'path';

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
