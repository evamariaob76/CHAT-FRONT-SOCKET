

export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No tenemos ningúna archivo a subir');
    
    const cloudUrl="https://api.cloudinary.com/v1_1/drwgawhls/image/upload";

    const formData = new FormData();


    formData.append('file', file[0]); 

    formData.append("upload_preset", 'chatEva');
    formData.append("cloud_name", 'drwgawhls');


    try {
 
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });


        if ( !resp.ok ) throw new Error('No se pudo subir imagen')
        const cloudResp = await resp.json();
            console.log(cloudResp);
            console.log(cloudResp.url)
        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }

}