import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import ForgotPsw from './Components/Forgotpsw/ForgotPsw';
import Verfication from './Components/Verfication/Verfication';
import Newpass from './Components/Forgotpsw/Newpass';
import Changepsw from './Components/Changepsw/Changepsw';
import Home from './Components/Home/Home';

function App() {
  return (
    <>
     <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/forgot' element={<ForgotPsw/>}/>
        <Route path='/verify' element={<Verfication/>}/>
        <Route path='/resetpsw' element={<Newpass/>}/>
        <Route path='/changepsw' element={<Changepsw/>}/>
        <Route path='/home' element={<Home/>}/>
     </Routes>
     {/* <SignUp/> */}
     {/* <Login/> */}
    </>
  );
}

export default App;
