import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  async function handleSignUpSubmit(e) {
    e.preventDefault();

    const res = await fetch("https://asna-backend.vercel.app/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = res.json();
    if (res.status === 201) {
      navigate("/dashboard");
      toast.success("You are logged in successfully.");
    } else {
      setError(data.error || "Invalid credentials");
      toast.error("Already have an account.");
    }
  }

  function handleEyeClick() {
    setVisible((visible) => !visible);
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
                className="inpFont"
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
                className="inpFont"
              />
            </div>

            <div className="inpField">
              <label className="lable">Password</label>
              <br />
              <div className="password">
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="inpFont"
                />
                <button
                  type="button"
                  onClick={handleEyeClick}
                  className="eyeBtn"
                >
                  {visible ? (
                    <i
                      className="bi bi-eye"
                      style={{
                        position: "absolute",
                        right: "0.1rem",
                        margin: "0.1rem",
                        bottom: "0.1rem",
                      }}
                    ></i>
                  ) : (
                    <i
                      class="bi bi-eye-slash"
                      style={{
                        position: "absolute",
                        right: "0.1rem",
                        bottom: "0.1rem",
                        margin: "0.1rem",
                      }}
                    ></i>
                  )}
                </button>
              </div>
            </div>

            <div className="btnCon">
              <button className="btn" type="submit">
                Sign Up
              </button>
            </div>

            <Link to="/">
              <p>Already have an account? Sign in.</p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
