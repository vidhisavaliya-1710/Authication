import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import './Changepsw.css';
import '../../App.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const init={
    password:'',
    newPassword:'',
    cpassword:''
}

const validate=Yup.object({
    password:Yup.string().max(8).matches(/^[aA-zZ0-9]+$/).required('Follow Can be Password...'),
    newPassword:Yup.string().max(8).matches(/^[aA-zZ0-9]+$/).required('Follow Can be Password...'),
    cpassword:Yup.string().oneOf([Yup.ref('newPassword'),null],"password are not same")
})

function Changepsw() {


    const [sign, setsign] = useState();
    const [redirect, setRedirect] = useState(false); 
    const email = useSelector((state) => state.counter.email);

    

    console.log('changeemail-----',email)
    const {values,handleBlur,handleChange,handleSubmit,errors,touched}=useFormik({
        initialValues:init,
        validationSchema:validate,
        onSubmit:async (values)=>{
            console.log("0000000",values)
           const newPassword=values.newPassword

            const changedata={
                email:email,
                password:values.password,
                newPassword                
                // password: values.password
            }

            console.log('newpsw:',changedata)
             try {
                const response = await axios.post('http://localhost:8000/changepsw',changedata);
    
                setsign(response.data);
                console.log("Reset successful:", response.data);
                setRedirect(true); // Redirect after successful response
            } catch (error) {
                console.error("reset failed:", error.response?.data || error.message);
            }
        }
    })
    // console.log(values)

    if (redirect) {
        return <Navigate to="/home" replace={true} />;
    }

  return (
    <>
       <div className="container">
                <div className="row signup">
                    <div className="col-lg-6">
                        <img src={require('../../images/verify.webp')} alt="" className=' mt-5' />
                    </div>
                    <div className="col-lg-6 signup-sec p-4 ps-5 pe-5">
                        <div>
                            <h3 className='text-center mb-3'>Change Your Password</h3>
                            <Form onSubmit={handleSubmit}>

                                <FloatingLabel controlId="floatingInput" label="Current Password" className="mb-3 form_sec">
                                    <input type="password" placeholder="Current Password" name='password' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                                    {errors.password && touched.password ?(<div className='text-danger text-center error'>{errors.password}</div>):null}
                                </FloatingLabel>
                                
                                <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 form_sec">
                                    <input type="password" placeholder="Password" name='newPassword' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.newPassword}/>
                                    {errors.password && touched.password ?(<div className='text-danger text-center error'>{errors.password}</div>):null}
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3 form_sec">
                                    <input type="password" placeholder="Password" name='cpassword' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.cpassword}/>
                                    {errors.cpassword && touched.cpassword ?(<div className='text-danger text-center error'>{errors.cpassword}</div>):null}
                                </FloatingLabel>
                                <div className='d-flex justify-content-around'>
                                    <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">Save</button>
                                    <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">Cancle</button>
                                </div>
                                {/* {/* <p className='text-center mb-0 mt-3 fs-6 text-black'>If You forgot your email, you can contact</p> */}
                                <p className='text-center fs-5'><Link className='link_sec' to='/'>Back to Login</Link></p> 
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Changepsw
