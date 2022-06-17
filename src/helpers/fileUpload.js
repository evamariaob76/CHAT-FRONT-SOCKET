

export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No tenemos ningúna archivo a subir');
    
    const cloudUrl2="https://api.cloudinary.com/v1_1/drwgawhls/upload";

    const cloudUrl =cloudUrl2;
    const formData = new FormData();

    const cloud_name="drwgawhls";
    const upload_preset = "chatEva"; 

    formData.append('file', file[0]); 

    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);


    try {
 
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });


        if ( !resp.ok ) throw new Error('No se pudo subir imagen')
        const cloudResp = await resp.json();
        console.log(cloudResp.secure_url)
        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }

}