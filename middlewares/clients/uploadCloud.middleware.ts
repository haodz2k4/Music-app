import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({ 
  cloud_name: 'dwcp8hogw', 
  api_key: '695526995712779',   
  api_secret: '2WXG7M91L4pcWcXBEb8YjpRJXqo' 
});

export const uploadImg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }
      if (req.file) {
        let streamUpload = (req: Request): Promise<any> => {
          return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

            streamifier.createReadStream(req.file!.buffer).pipe(stream);
          });
        };

        async function upload(req: Request) {
          let result = await streamUpload(req);
          if (req.file) {
            req.body[req.file.fieldname] = result.url;
            console.log(result)
          }

          next();
        }

        await upload(req);
      } else {
        next();
        console.log("run here")
      }
    } catch (error) {
      console.log(error);
      req.flash('error', 'upload file thất bại');
    }
}
