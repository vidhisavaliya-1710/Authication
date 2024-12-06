import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './SignUp.css';
import '../../App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


const init = {
    name: '',
    email: '',
    password: ''
};

const validate = Yup.object({
    name: Yup.string().min(2).max(10).required('Name Must be Required...'),
    email: Yup.string().email().required('Email Must be Required...'),
    password: Yup.string().max(8).matches(/^[aA-zZ0-9]+$/).required('Follow Can be Password...')
});

function SignUp() {
    const [sign, setsign] = useState();
    const [redirect, setRedirect] = useState(false); 
    const navigate=useNavigate()
    const auth=localStorage.getItem('authToken');
    


    useEffect(() => {
        // Check if auth token exists, if not redirect to login page
        if (auth) {
          navigate('/home');
          console.log("back")
        }
       
      }, [auth, navigate]);


    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: init,
        validationSchema: validate,
        onSubmit: (values) => {
            axios({
                method: 'post',
                url: 'http://localhost:8000/signup',
                data: {
                    name: values.name,
                    email: values.email,
                    password: values.password
                }
            })
            .then(response => {
                setsign(response.data);
                console.log("Signup successful:", response.data);
                setRedirect(true); 
            })
            .catch(error => {
                console.error("Signup failed:", error);
                alert(error.response.data.message)
            });
        }
    });

    if (redirect) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <>
            <div className="container">
                <div className="row signup">
                    <div className="col-lg-6">
                        <img src={require('../../images/regs.png')} alt="" className='w-100 mt-5' />
                    </div>
                    <div className="col-lg-6 signup-sec p-4 ps-5 pe-5">
                        <div>
                            <h3 className='text-center mb-3'>SignUp</h3>
                            <Form onSubmit={handleSubmit}>
                                
                                <FloatingLabel controlId="floatingInput" label="Name" className="mb-2 form_sec">
                                    <input type="text" placeholder="Name" name='name' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.name}/>
                                    {errors.name && touched.name ?(<div className='text-danger text-center error'>{errors.name}</div>):null}
                                </FloatingLabel>
                                
                                <FloatingLabel controlId="floatingInput" label="Email" className="mb-2 form_sec">
                                    <input type="email" placeholder="Email" name='email' className='form_sec form-control' onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                                    {errors.email && touched.email ?(<div className='text-danger text-center error'>{errors.email}</div>):null}
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 form_sec">
                                    <input type="password" placeholder="Password" name='password' className='form_sec form-control'  onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                                    {errors.password && touched.password ?(<div className='text-danger text-center error'>{errors.password}</div>):null}
                                </FloatingLabel>
                                <div className='d-flex justify-content-center'>
                                    <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">Sign in</button>
                                </div>
                                <p className='text-center mt-3 fs-5'>Already Have an Account?<Link className='link_sec' to='/'>Login</Link></p>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
