import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';



export const LoginPage = () => {
const {login} = useContext(AuthContext);

    const [form, setForm] = useState({
    email:'',
    password:'',
    rememberMe: false
});
useEffect(() => {
  const email=localStorage.getItem('email');
  if(email){
    setForm((form)=>({
        ...form,
        email,
        rememberMe:true,  
    }))
  }
}, [])

const onChange =({target})=>{
    const {name, value}= target;
    setForm({
        ...form,
        [name]: value
    })

};

const onSubmit= async (e)=>{
    e.preventDefault();
    if(form.rememberMe){
        localStorage.setItem('email', form.email)
    }
    else{
        localStorage.removeItem('email')
    }
    const{email, password}= form;

    const ok = await login(email,password);
    if(!ok){
        Swal.fire('Error', 'Verifique usuario y/o contraseña', 'error')

    }
}

const toogleCheck= ()=>{
    setForm({
        ...form,
        rememberMe: !form.rememberMe
    })
};

const todoOK=()=>{
    return( form.email.length > 0 && form.password.length >0) ? true : false;
}

    return (



    <div className='container-xxl  container 'style={{ margin:'0%', padding:'0%'}} id="">
        <div className='form-group'> 
                <div className="img ">            

        <div className='form-group'> 
        <img src ="https://res.cloudinary.com/drwgawhls/image/upload/v1655289112/chat/j8idqcxbbxwhcxymelpw.png" alt='imagenLogin' className='img-fluid'/>         
        </div>
</div>
        </div>
        <div className='form-group'> 
        <form 
               onSubmit={onSubmit}>
            <span className="login100-form-title mb-3 responsive">
                 Ingreso
            </span>

            <div className="form-group">
                <input 
                    className="input100 responsive" 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    value={form.email}
                    onChange={onChange} />
                <span className="focus-input100"></span>
            </div>


            <div className="form-group">
                <input
                     className="input100 responsive" 
                     type="password" 
                     name="password" 
                     placeholder="Password"
                     value={form.password}
                     onChange={onChange} />
                <span className="focus-input100"></span>
            </div>

                <div className="form-group"
                     onClick={()=>toogleCheck()}>
                    <input 
                        className="input-checkbox100" 
                        id="ckb1" 
                        type="checkbox" 
                        name="rememberMe"
                        checked={form.rememberMe}
                        readOnly

                         />
                </div>
                         <div className='row '>
                            <div style={{paddingLeft:'5%'}}></div>
                                 <label className="label-checkbox100 responsive">
                                    Recordarme
                                </label>
                            <div className= 'center-block' style={{paddingLeft:'30%'}}>
                                <Link to="/auth/register" className="txt1 responsive">
                                    Nueva cuenta?
                                </Link>             
                        </div>
      
                         </div>
              

   

            <div className="center-block " style={{paddingTop:'5%'}}>
                <button type="submit" className="login100-form-btn responsive" disabled={!todoOK()}>
                    Ingresar
                </button>
            </div>

        </form>
    </div>
    </div>
    

   )
}