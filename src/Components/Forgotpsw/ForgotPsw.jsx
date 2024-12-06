import React from 'react';
import Form from 'react-bootstrap/Form';
import './Forgot.css';
import '../../App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setEmail, setOtp } from '../Slice/AuthSlice';

const init = {
    email: '',
};

const validate = Yup.object({
    email: Yup.string().email().required('Email Must be Required...'),
});

function ForgotPsw() {
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: init,
        validationSchema: validate,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:8000/sendotp', {
                    email: values.email,
                });
                
                // Handle successful response
                console.log(response.data);
                const otpvalue=response.data.otp
                // const emailvalue=response.data.email
                console.log('otps',otpvalue)
                console.log('email ----',values.email)
                dispatch(setOtp(otpvalue))
                dispatch(setEmail(values.email))
                navigate('/verify'); // Navigate to the verify page
            } catch (error) {
                // Handle error response
                console.error('Error sending OTP:', error);
                alert('Failed to send OTP. Please try again.');
                alert(error.response.data.message)
            }
        },
    });

    return (
        <>
            <div className="container">
                <div className="row signup">
                    <div className="col-lg-6">
                        <img src={require('../../images/send.webp')} alt="" className="w-100 mt-5" />
                    </div>
                    <div className="col-lg-6 signup-sec p-4 ps-5 pe-5">
                        <div>
                            <h3 className="text-center mb-3">Forgot Password</h3>
                            <Form onSubmit={handleSubmit}>
                                <FloatingLabel controlId="floatingInput" label="Email" className="mb-3 form_sec">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        className="form_sec"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email ? (
                                        <div className="text-danger text-center error">{errors.email}</div>
                                    ) : null}
                                </FloatingLabel>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">
                                        Send OTP
                                    </button>
                                </div>
                                <p className="text-center mb-0 mt-3 fs-6 text-black">
                                    If You forgot your email, you can contact
                                </p>
                                <p className="text-center fs-5">
                                    <Link className="link_sec" to="/">
                                        Back to Login
                                    </Link>
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPsw;
