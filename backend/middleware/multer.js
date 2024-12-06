import multer from 'multer';

// Set up memory storage for Multer, meaning the file will be stored in memory as a buffer
const storage = multer.memoryStorage();

// Configure Multer to handle single file uploads. The field name is "file"
export const singleUpload = multer({ storage }).single('file');


