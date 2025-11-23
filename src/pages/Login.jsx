import "./login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://localhost:2000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (data.token) {
      login(data.token);
      navigate("/dashboard"); // Success, go to landing page
    } else {
      alert("Login failed!");
    }
  };

  

  return (
    <main>
      <h2 className="textCenter workasana">Workasana</h2>
      <div className="loginCon">
        <h3 className="textCenter">Log in to your account</h3>
        <p className="textCenter">Please enter your details</p>

        <div className="fields">
          <form onSubmit={handleSubmit}>
            <div className="inpField">
              <label htmlFor="em">Email</label>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                id="em"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inpField">
              <label htmlFor="pass">Password</label>
              <br />
              <div className="password">
                <input
                  type="text"
                  placeholder="Password"
                  id="pass"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />
                <i
                  className="bi bi-eye"
                  style={{ position: "absolute", right: "5rem", margin: '0.1rem'}}
                ></i>
              </div>
            </div>

            <div className="btnCon">
              <button className="btn" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
