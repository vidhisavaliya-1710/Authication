import React, { useEffect, useState, useCallback } from 'react'
import Form from 'react-bootstrap/Form';
import './Login.css';
import '../../App.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setEmail } from '../Slice/AuthSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';


const init={
    email:'',
    password:''
}

const validate=Yup.object({
    email:Yup.string().email().required('Email Must be Required...'),
    password:Yup.string().max(8).matches(/^[aA-zZ0-9]+$/).required('Follow Can be Password...')
})


function Login() {

    const [login,setlogin]=useState()
    const [redirect, setRedirect] = useState(false);
    const [provider, setProvider] = useState('');
    const [profile, setProfile] = useState(null);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const auth=localStorage.getItem('authToken');

    useEffect(() => {
        // Check if auth token exists, if not redirect to login page
        if (auth) {
          navigate('/home');
          console.log("back")
        }
       
        
        
       
      }, [auth, navigate]);

    const {values,handleBlur,handleChange,handleSubmit,errors,touched,reset}=useFormik({
        initialValues:init,
        validationSchema:validate,
        onSubmit:(values)=>{
            axios({
                method: 'post',
                url: 'http://localhost:8000/login',
                data: {
                    name: values.name,
                    email: values.email,
                    password: values.password
                }
            })
            .then(response => {

                
                const token = response.data.token; // Extract the token
                localStorage.setItem('authToken', token);
                // localStorage.setItem('login',true);

                setlogin(response.data);
                console.log("Login successful:", response.data);
                console.log('login email:',values.email)
                console.log('token:',response.data.token)
                dispatch(setEmail(values.email))
                // localStorage.setItem('user', JSON.stringify(response.data.data.email));
                setRedirect(true); 
                alert(response.data.message)           
                
            })
            .catch(error => {
                console.error("Login failed:", error);
                alert(error.response.data.message)
            });

           
            
        }

        
    })
    // console.log(values)

    if (redirect) {
        return <Navigate to="/home" replace={true} />;
    }

    const client_id='1045466982465-hkienvmgnel523u8jgd1m3quspas8q66.apps.googleusercontent.com';


    console.log("client_id",client_id)

    const onLoginStart = () => {
        console.log('Google login started...');
        // alert('Google login started...');
    };

    // Function: Trigger when Google Login succeeds
    const onResolve = ({ provider, data }) => {
        if (provider && data) {
            setProvider(provider);
            setProfile(data);
            console.log('Google Login Success:', provider, data);
            // alert(`Welcome, ${data.name}!`);
            localStorage.setItem('authToken', data.access_token || data.sub);

            // Dispatch email to Redux store
            dispatch(setEmail(data.email));
            navigate('/home');
        } else {
            console.error('Google login failed: No provider or data.');
        }
    };

    // Function: Trigger when Google Login fails
    const onReject = (err) => {
        console.error('Google Login Failed:', err);
        alert('Google login failed. Please try again.');
    };

    // const REDIRECT_URI = 'http://localhost:3000'

    // console.log("REDIRECT_URI",REDIRECT_URI)


  return (
    
    <>
      <div className="container">
                <div className="row signup">
                    <div className="col-lg-6">
                        <img src={require('../../images/login.png')} alt="" className='w-100 mt-5' />
                    </div>
                    <div className="col-lg-6 signup-sec p-4 ps-5 pe-5">
                        <div>
                            <h3 className='text-center mb-3'>Login</h3>
                            <Form onSubmit={handleSubmit}>
                                
                                <FloatingLabel controlId="floatingInput" label="Email" className="mb-2 form_sec">
                                    <input type="email" placeholder="Email" name='email' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                                    {errors.email && touched.email ?(<div className='text-danger text-center error'>{errors.email}</div>):null}
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 form_sec">
                                    <input type="password" placeholder="Password" name='password' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                                    {errors.password && touched.password ?(<div className='text-danger text-center error'>{errors.password}</div>):null}
                                </FloatingLabel>
                                <div className='d-flex justify-content-center'>
                                    <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">LogIn</button>
                                    
                                </div>
                                <Link to='forgot'><p className='text-center mb-0 mt-3 fs-6 link_sec'>Forgot Password?</p></Link>
                                <p className='text-center fs-5'>Don't Have an Account?<Link className='link_sec' to='/signup'>SignUp</Link></p>
                            </Form>


                            
                            <LoginSocialGoogle
                client_id={client_id}  // Make sure to set this in .env
                onLoginStart={onLoginStart}
                scope="openid profile email"
                onResolve={onResolve}
                onReject={onReject}
            >
                <GoogleLoginButton />
            </LoginSocialGoogle>
           
            
                            </div>
                          
                        </div>
                    </div>
                </div>
          
    </>
  )
}

export default Login