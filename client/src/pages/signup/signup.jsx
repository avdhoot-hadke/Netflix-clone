import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import signupLogo from "../../assets/logo.png";
import "./signup.css";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../../util/firebase-config";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

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
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      setError(true);
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe when the component is unmounted
  }, [navigate]);

  return (
    <div className="signup-page">
      <div className="signup-nav">
        <img className="signup-logo" src={signupLogo} alt=""></img>

        <div className="ms-auto me-5">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </button>
        </div>
      </div>
      <div className="signup-content">
        <h1>The biggest Indian hits. The best Indian stories.</h1>
        <h1>All streaming here.</h1>
        <p className="mt-3">Watch anywhere. Cancel anytime</p>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form
          className="signup-form "
          data-bs-theme="dark"
          onSubmit={handleSubmit}
        >
          {/* email */}
          <div className="form-floating signup-form-floating ">
            <input
              type="email"
              className="form-control signup-blur-bg rounded-0 rounded-start"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          {/* password */}
          <div className="form-floating signup-form-floating ">
            <input
              type="password"
              className="form-control signup-blur-bg rounded-0 rounded-end border-start-0 "
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />

            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button
            type="submit"
            className="btn btn-danger signup-submit-btn  ms-2"
          >
            Get Started &nbsp;&nbsp;&nbsp;❯
          </button>
        </form>
        {error && (
          <div className="  signup-error">
            SignUp failed. Please check your information and try again.
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
