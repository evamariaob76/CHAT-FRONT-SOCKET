


export const fileDelete = async( file ) => {
    if ( !file ) throw new Error('No tenemos ningúna archivo a borrar');
    
    //const cloudUrl="https://api.cloudinary.com/v1_1/drwgawhls/images/upload";


    const formData = new FormData();

    const cloud_name="drwgawhls";
    const upload_preset ="chatEva"; 

    formData.append('file', file[0]); 

    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);
    formData.append("folder", 'chat');

    try {
 
formData.delete(file)

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }

}