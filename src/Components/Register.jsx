import React, { useState,useEffect } from 'react';
import { getAuth,auth, createUserWithEmailAndPassword } from "./FirebaseConfig"
import { getDatabase, ref, set } from "firebase/database";
import './Login.css';
import { Link,useNavigate } from 'react-router-dom';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail1] = useState('');
  const [password, setPass] = useState('');
  const [confirmPassword, setConfirmPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const[successMessage,setSuccessMessage]=useState('')
  const navigate =useNavigate();
  const[isFormValid,setIsFormValid]=useState(true)
  const [isLoading, setIsLoading] = useState(false); 

//    useEffect(()=>{
// if(userName&& email && password && confirmPassword && password===confirmPassword){
//     setIsFormValid(false)
// }
// else{
//     setIsFormValid(true)
// }

//    },[userName,email,password,confirmPassword])


  const handleRegister = async(e) => {
    e.preventDefault(); 
    setErrorMessage('')
    setSuccessMessage('')
    setIsLoading(true);  // Set loading to true
    setIsFormValid(false);
    if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Save username to the database under the user's UID
        const db = getDatabase();
        await set(ref(db, `users/${user.uid}`), {
          username: userName
        });
    
        setSuccessMessage('Registration successful');
        setUserName('');
        setEmail1('');
        setPass('');
        setConfirmPass('');
    
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className='login-page'>
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="col-md-4">
          <h2 className="text-center mb-4 label">Sign Up</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label label">Username</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUserName(e.target.value)}
                id="username"
                placeholder="Enter username"
                value={userName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label label">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail1(e.target.value)}
                id="email"
                placeholder="Enter email"
                value={email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label label">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPass(e.target.value)}
                id="password"
                placeholder="Password"
                value={password}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfirmPass(e.target.value)}
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
              />
            </div>
            <button
                            type="submit"
                            disabled={!isFormValid || isLoading}  
                            className="btn btn-primary w-100"
                        >

                            {isLoading ? (
                                <div className="loader"></div>  
                            ) : (
                                'Login'
                            )}
                        </button>
            <div className="text-center mt-3">
              <p className="label">Already have an account?
                <Link to="/" className="link"> Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
