import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import './Forgot.css';
import '../../App.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const init={
    email:'',
    password:'',
    cpassword:''
}

const validate=Yup.object({
    password:Yup.string().max(8).matches(/^[aA-zZ0-9]+$/).required('Follow Can be Password...'),
    cpassword:Yup.string().oneOf([Yup.ref('password'),null],"password are not same")
})

function Newpass() {
    const [sign, setsign] = useState();
    const [redirect, setRedirect] = useState(false); 
    // const email = JSON.parse(localStorage.getItem('user'));
    const email = useSelector((state) => state.counter.email);
    const otps=useSelector((state)=>state.counter.otp);
    



    // console.log('verify:',verifydata)
    const {values,handleBlur,handleChange,handleSubmit,errors,touched}=useFormik({
        initialValues:init,
        validationSchema:validate,
        onSubmit:async (values)=> {
            console.log("0000000",values.password)

            const verifydata={
                email,
                newPassword:values.password,
                otp:otps
                // password: values.password
            }
             try {
                const response = await axios.post('http://localhost:8000/resetpsw',verifydata);
                setsign(response.data);
                console.log("Reset successful:", response.data);
                setRedirect(true); // Redirect after successful response
            } catch (error) {
                console.error("reset failed:", error.response?.data || error.message);
                alert(error.response.data.message)
            }
           
            
        }
    })
    // console.log(values)
    if (redirect) {
        return <Navigate to="/" replace={true} />;
    }
    

  return (
    <>
        <div className="container">
                <div className="row signup">
                    <div className="col-lg-6">
                        <img src={require('../../images/forgot.webp')} alt="" className='w-100 mt-5' />
                    </div>
                    <div className="col-lg-6 signup-sec p-4 ps-5 pe-5">
                        <div>
                            <h3 className='text-center mb-3'>Reset Your Password</h3>
                            <Form onSubmit={handleSubmit}>

                                <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 form_sec">
                                    <input type="password" placeholder="Password" name='password' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                                    {errors.password && touched.password ?(<div className='text-danger text-center error'>{errors.password}</div>):null}
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3 form_sec">
                                    <input type="password" placeholder="Password" name='cpassword' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.cpassword}/>
                                    {errors.cpassword && touched.cpassword ?(<div className='text-danger text-center error'>{errors.cpassword}</div>):null}
                                </FloatingLabel>
                                <div className='d-flex justify-content-center'>
                                    <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">Save</button>
                                </div>
                                {/* <p className='text-center mb-0 mt-3 fs-6 text-black'>If You forgot your email, you can contact</p>
                                <p className='text-center fs-5'><Link className='link_sec' to='/'>Back to Login</Link></p> */}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Newpass
