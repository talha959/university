import multer from "multer";
import { v4 as uuid } from "uuid";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../upload");
    },
    filename(req,file,cb){
        const id=uuid();
        const extfileName=file.originalname.split(".").pop();
        const fileName=`${id}.${extfileName}`;
        cb(null,fileName);

    }
});
export const upload = multer({ storage }).single("file");