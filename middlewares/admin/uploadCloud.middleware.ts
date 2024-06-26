import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import streamifier from 'streamifier';
cloudinary.config({ 
  cloud_name: 'dwcp8hogw', 
  api_key: '695526995712779', 
  api_secret: '2WXG7M91L4pcWcXBEb8YjpRJXqo' 
});
const streamUpload = (buffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({
      resource_type: "auto"
    },(error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "Không có file upload" });
  }

  try {
    const uploadPromises: Promise<void>[] = [];

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    for (const field in files) {
      const fileArray = files[field];
      for (const file of fileArray) {
        uploadPromises.push(
          streamUpload(file.buffer).then((result) => {
            req.body[field] = result.url;
          })
        );
      }
    }

    await Promise.all(uploadPromises);

    next();
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};
