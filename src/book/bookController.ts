import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Uplaod Cover-Image to Cloudinary
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };
        const coverImageMimeType = files.coverImage[0].mimetype
            .split("/")
            .at(-1);
        const fileName = files.coverImage[0].filename;
        const filePath = path.join(
            __dirname,
            "../../public/data/uploads",
            fileName,
        );
        const uploadCoverImage = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "book-cover",
            format: coverImageMimeType,
        });

        // Uplaod book-file to Cloudinary
        const bookFileName = files.file[0].filename;
        const bookFilePath = path.join(
            __dirname,
            "../../public/data/uploads",
            bookFileName,
        );

        const uploadBookFile = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: "raw",
            filename_override: bookFileName,
            folder: "book-pdfs",
            format: "pdf",
        });
        console.log("uploadBookFile ", uploadBookFile);

        res.json({ message: "Book Listing Created Successfully!" });
    } catch (error) {
        console.log(error);
    }
};

export { createBook };
