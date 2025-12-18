import { type Request } from "express";
import catchAsync from "../library/catch_async";

const getFilePath = (req: Request, path: string) => {

  path = path.replace("public", "static");
  // const absolutePath = `https://....com/${path}`;
  const absolutePath = `${req.protocol}://${req.hostname}:3000/${path}`;
  return absolutePath;
};

export default catchAsync(async (req: Request, _, next) => {
  const isRunningProduction = process.env.NODE_ENV === "production";

  /*  NOTE: if We Have Single File => upload.single() */
  if (req.file) {
    const file: Express.MulterS3.File = req.file as Express.MulterS3.File;
    req.body[file.fieldname] = isRunningProduction ? file.location : getFilePath(req, file.path);
  } else if (req.files instanceof Array && req.files.length > 0) {
    /* If We Got Array Of Images => upload.array() */
    const files = req.files as Express.MulterS3.File[];
    req.body[req.files[0]!.fieldname] = files.map((e: Express.MulterS3.File) =>
      isRunningProduction ? e.location : getFilePath(req, e.path),
    );
  } else if (req.files) {
    /* if We Got Multiple Fields => upload.fields() - */

    /* Extracting Files */
    const files = req.files as {
      [fieldname: string]: Express.MulterS3.File[];
    };

    /* Extracting Keys */
    const fileKeys = Object.keys(files);
    fileKeys.forEach((e) => {
      /* Getting Path */
      const docFile = files[e]!.map((e) => isRunningProduction ? e.location : getFilePath(req, e.path));
      /* Storing filepath in req.body & if we have only 1 file don't store it as array else it would be array */
      docFile.length <= 1
        ? (req.body[e] = docFile[0])
        : (req.body[e] = docFile);
    });
  }
  delete req.body.file;
  delete req.body.files;
  delete req.body.s3;

  next();
});

export const businessMulterToBody = catchAsync(async (req: Request, _, next) => {
  const files = req.files as Express.MulterS3.File[];
  if (!files || files.length === 0) {
    return next();
  }

  req.body.images = files.filter((file) => file.fieldname !== "logo").map((file, i) => ({ image: file.location, ...req.body.images[i] }));

  req.body.logo = files.find((file) => file.fieldname === "logo")?.location;

  delete req.body.s3
  delete req.body.file

  next()
});

export const stayMulterToBody = catchAsync(async (req: Request, _, next) => {
  const files = req.files as Express.MulterS3.File[];
  if (!files || files.length === 0) {
    return next();
  }

  req.body.images = files.map((file, i) => {
    return { image: file.location, ...req.body.images[i] }
  });

  delete req.body.s3
  delete req.body.file

  next()

});
