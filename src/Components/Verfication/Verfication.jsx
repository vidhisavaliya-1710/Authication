import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './Verficaton.css';
import '../../App.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Verfication() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = useSelector((state) => state.counter.email);
// const email = JSON.parse(localStorage.getItem('user'));
const otps=useSelector((state)=>state.counter.otp);

  console.log("email:",email)
  console.log("OTP:",otps)

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    console.log(otp)
  };

  // const datas=async()=>{
  //   const response = await axios.post('http://localhost:8000/verify', { otp,email });
  //   console.log("response",response)
  //       if (response.data.status) {
            
  //           // If OTP is valid, navigate to reset password page
  //           navigate('/resetpsw');
  //       } else {
  //           // If OTP is invalid, show error message
  //           setError('Invalid OTP. Please try again.');
  //           alert(error.response.data.message)
  //       }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log('input',otp)
try {
    // Send the entered OTP to the server for validation
    // datas()
    const response = await axios.post('http://localhost:8000/verify', { otp,email });
    console.log("response",response)
        if (response.data.status) {
            
            // If OTP is valid, navigate to reset password page
            navigate('/resetpsw');
        } else {
            // If OTP is invalid, show error message
            setError('Invalid OTP. Please try again.');
            alert(error.response.data.message)
        }
    
} catch (error) {
    setError('Something went wrong. Please try again.');
    console.error(error);
    alert(error.response.data.message)
}
    
    
  };

  return (
    <div className="container">
      <div className="row signup">
        <div className="col-lg-6">
          <img src={require('../../images/otp.webp')} alt="" className='w-100 mt-5' />
        </div>
        <div className="col-lg-6 signup-sec p-4 ps-5 pe-5">
          <div>
            <h3 className='text-center mb-3'>Verification Code</h3>
            <p>Please enter the verification code sent to the email.</p>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingInput" label="OTP" className="mb-3 form_sec">
                <Form.Control
                  type="text"
                  placeholder="OTP"
                  className='form_sec'
                  value={otp}
                  onChange={handleOtpChange}
                />
              </FloatingLabel>
              {error && <p className="text-danger text-center">{error}</p>}
              <div className='d-flex justify-content-center'>
                <button type="submit" className="border-0 fs-5 mt-2 p-1 ps-3 pe-3 text-white btns rounded">
                  Confirm
                </button>
              </div>
              <p className='text-center fs-6 mt-2'>
                Didn't receive an OTP? <Link className='link_sec' to='/forgot'>Resend Code?</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verfication;
