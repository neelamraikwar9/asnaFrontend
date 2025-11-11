import './login.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';



const Login = () => {
    const [secret, setSecret] = useState('');
    // const [email, setEmail] = useState('');


    const handleSignIn = async() => {
        const response = await fetch("http://localhost:2000/admin/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ secret }),
        });

        const data = await response.json();
        console.log(data); 
        
    }
  return (
    <main>
    <h2 className="textCenter workasana">Workasana</h2>
    <div className="loginCon">
        <h3 className="textCenter">Log in to your account</h3>
        <p className="textCenter">Please enter your details</p>
        <div className='fields'>
        <div className="inpField">
        {/* <label htmlFor="em">Email</label>
        <br/>
        <input type="email" placeholder="Enter your email" id="em" value={email} onChange={(e) => setEmail(e.target.value)}/> */}
        </div>
        <div className="inpField">
        <label htmlFor="pass">Password</label>
        <br/>
        <div className="password">
        <input type="text" 
        // placeholder="Password" 
        id="pass" value={secret} onChange={(e) => setSecret(e.target.value)}/> 
        <i className="bi bi-eye"  style={{position: 'absolute', right: '0.5rem'}}></i>
        </div>
        </div>
        </div>
        <div className="btnCon">
        <button className="btn" onClick={handleSignIn}>Sign in</button>
        </div>
    </div>

    </main>
  )
}

export default Login;