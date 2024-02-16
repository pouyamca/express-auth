import { Request, Response, NextFunction } from 'express';
import multer, { Field, FileFilterCallback } from "multer";
import config from '../configs';



export const Upload = (fileSize: number | string = config.basicFileSize, fileMimeType: string[] = JSON.parse(config.basicMime)) => multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {


      cb(null, 'uploads/photos');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + '_' + file.originalname)  //+ path.extname(file.originalname));
    }
  }),

  limits: {
    // files: 5,  
    // fileSize: +fileSize*(1024 * 1024)

  },
  fileFilter: (req, file, cb) => {


    let mime = file?.mimetype || ''
    if (!fileMimeType.includes(mime)) {
      return cb(new Error('file is not allowed'))
    }

    cb(null, true)

  }
});





const FileUpload = (fieldName: string | string[]): MethodDecorator => {

  let fields: Field[] = (typeof fieldName === 'string' && !Array.isArray(fieldName)) ?
    [{ name: fieldName, maxCount: 1 }]
    :

    fieldName.map((item: string, index: number) => {
      return { name: item, maxCount: 1 }
    })


  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const routeHandler = descriptor.value;

    descriptor.value = (req: Request, res: Response, next: NextFunction) => {
      Upload().fields(fields)(req, res, (err) => {
        if (err) {
          console.log(err)
          return res.status(400).json({ error: err.message });
        }
        routeHandler.call(this, req, res, next);
      });
    };

    return descriptor;
  };

}

export default FileUpload
