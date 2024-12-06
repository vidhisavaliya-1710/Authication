import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Validated() {

    const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = useSelector((state) => state.counter.email);
// const email = JSON.parse(localStorage.getItem('user'));
const otps=useSelector((state)=>state.counter.otp);

    const datas=async()=>{
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
      }

  return (
    <div>
      
    </div>
  )
}

export default Validated
