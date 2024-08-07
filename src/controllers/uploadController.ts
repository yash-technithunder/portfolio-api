import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

let imageName = '';

const storage = multer.diskStorage({
  destination: path.join('./image'),
  filename: function (req: any, file: any, cb: any) {
    imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

const upload = multer({
  storage: storage,
}).single('image');

const imageUpload = (req: Request, res: Response) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(500).json({ error: 'Multer Error' });
    } else if (err) {
      console.error('Unknown error:', err);
      return res.status(500).json({ error: 'Unknown Error' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `${process.env.IMAGE_URL}/image/` + imageName;
    res.status(200).json({
      success: 1,
      file: {
        url: imageUrl,
      },
    });
  });
};

const welcome = (req: Request, res: Response) => {
  return res.json({ message: 'Hello, welcome!' });
};

const uploadController = { imageUpload, welcome };

export default uploadController;
