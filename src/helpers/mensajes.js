    const baseUrl = process.env.REACT_APP_API_URL;

    
    /*const totalMensajes = async (  method='GET')=>{
        const para = '62b2c3e480b40a53a17aafb9'
        const resp = await fetch(`mensajes/leidos/${para}`);
        const url =`${baseUrl}/${resp}`;

        const token = localStorage.getItem('token' || '');
if(method ==='GET'){
     try {
 
        const resp = await fetch(url, {
            headers:{
                'x-token':token
            }
        });
        return await resp.json();

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }
}   
     }*/
const totalMensajes = async (  method='GET')=>{
        const para = '62b2c3e480b40a53a17aafb9'
        const resp = `mensajes/leidos/${para}`;
        const url =`${baseUrl}/${resp}`;
console.log(url)
  await   fetch(url)
        .then(response => response.json())  
     }

    