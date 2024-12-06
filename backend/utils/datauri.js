import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  // Ensure the file has the necessary properties
  if (!file || !file.buffer || !file.originalname) {
    throw new Error('Invalid file');
  }

  const parser = new DataUriParser();
  
  // Extract file extension from the original file name
  const extName = path.extname(file.originalname).toString();

  // Return the formatted data URI
  return parser.format(extName, file.buffer);
};

export default getDataUri;
