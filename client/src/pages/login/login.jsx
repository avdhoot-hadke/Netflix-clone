import "./login.css";
import { useNavigate } from "react-router-dom";
import signupLogo from "../../assets/Netflix_Logo_RGB.png";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../util/firebase-config";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe when the component is unmounted
  }, [navigate]);

  function handleChange(e) {
    e.preventDefault();
    const { value, name } = e.target;

    setValues((prevValue) => {
      if (name === "email") {
        return {
          email: value,
          password: prevValue.password,
        };
      } else if (name === "password") {
        return {
          email: prevValue.email,
          password: value,
        };
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    console.log(values);
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      setError(true);
      console.error("Error:", error.message);
    }
  }
  return (
    <div className="login-page">
      <div className="login-nav">
        <img className="login-logo" src={signupLogo} alt=""></img>
      </div>
      <div className="login-form-div" data-bs-theme="dark">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>

          {/* Email */}
          <div className="form-floating login-form-floating">
            <input
              type="email"
              className="form-control login-blur-bg rounded-1 mb-3 border-0 shadow-none"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          {/* Password */}
          <div className="form-floating login-form-floating">
            <input
              type="password"
              className="form-control login-blur-bg  rounded-1 border-0 shadow-none"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button type="submit" className="btn btn-danger login-submit-btn  ">
            Sign In
          </button>
          <p className="mt-5">
            New to Netflix?{" "}
            <span>
              <a
                href="/signup"
                className="login-signup"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up now.{" "}
              </a>
            </span>
          </p>
          {error && (
            <div className="text-center  login-error">
              Sign In failed. Please check your information and try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
