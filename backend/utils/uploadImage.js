import cloudinary from "../config/cloudinary.js";

// upload image to cloudinary
export const uploadImage = async (filePath) => {
     try {
          const result = await cloudinary.uploader.upload_stream(filePath, {
               folder: "Talksyy"
         });   
          
          // returning url of uploaded image
          return result.url;

     } catch (error) {
          console.log("UploadImage Error :: Error While Uploading Image ", error.message);
     }
}