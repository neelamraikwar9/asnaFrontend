import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  async function handleSignUpSubmit(e) {
    e.preventDefault();
    setError(null);

    const res = await fetch("http://localhost:2000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = res.json();
    if (res.status === 201) {
      navigate("/dashboard");
    } else {
      setError(data.error || "Signup failed");
    }
  }

  return (
    <main>
      <h2 className="textCenter workasana">Workasana</h2>
      <div className="loginCon">
        <h3 className="textCenter">Register your account</h3>
        <p className="textCenter">Please enter your details</p>

        <div className="fields">
          <form onSubmit={handleSignUpSubmit}>
            <div className="inpField">
              <label className="lable" style={{ marginRight: "11rem" }}>
                Name
              </label>
              <br />
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="inpField">
              <label className="lable" style={{ marginRight: "11.3rem" }}>
                Email
              </label>
              <br />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="inpField">
              <label className="lable">Password</label>
              <br />
              <div className="password">
              <input
                type="type"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className="bi bi-eye"
                style={{
                  position: "absolute",
                  right: "5rem",
                  margin: "0.1rem",
                }}
                // onClick={handleEyeClick}
              ></i> 

              </div>
            </div>

            <div className="btnCon">
              <button className="btn" type="submit">
                Sign Up
              </button>
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}

            <Link to="/">
              <p>Already have an account Sign in!</p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
