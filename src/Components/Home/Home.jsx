import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';


function Home() {
    
  const navigate=useNavigate()
  const auth=localStorage.getItem('authToken')
const handleremove=()=>{
  localStorage.removeItem('authToken')
  navigate('/')
}

useEffect(() => {
  // Check if auth token exists, if not redirect to login page
  if (!auth) {
    navigate('/');
    console.log("back")
  }
 
}, [auth, navigate]);


  console.log('get toekn:',auth)
  return (
    <>
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
          </Nav>
          
          <Link to='/changepsw'><Button variant="outline-success">Change Password</Button></Link>
            <Button variant="outline-danger" className='ms-4 me-5' onClick={handleremove}>Log Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        
        <img src={require('../../images/welcom.avif')} alt="" className='w-100' height='500px'/> 
    </>
  )
}



export default Home
