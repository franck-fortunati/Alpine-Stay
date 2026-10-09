import multer from 'multer';
import path from 'path';

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/img/uploads/');
    },
    filename: (req, file, callBack) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callBack(null, uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({ storage });