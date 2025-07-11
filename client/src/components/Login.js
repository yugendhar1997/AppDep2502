import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    // if (localStorage.getItem("email") && localStorage.getItem("password")) {
    //   emailInputRef.current.value = localStorage.getItem("email");
    //   passwordInputRef.current.value = localStorage.getItem("password");
    // }
    if (localStorage.getItem("token")) {
      // validateToken();
    }
  }, []);

  let validateToken = async () => {
    let dataTosend = new FormData();
    dataTosend.append("token", localStorage.getItem("token"));

    let reqOptions = {
      method: "POST",
      body: dataTosend,
    };

    let JSONData = await fetch(
      ":4444/validateToken",
      reqOptions
    );
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
    if (JSOData.status === "Success") {
      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    }
  };

  let onLogin = async () => {
    let dataTosend = new FormData();
    dataTosend.append("email", emailInputRef.current.value);
    dataTosend.append("password", passwordInputRef.current.value);
    let reqOptions = {
      method: "POST",
      body: dataTosend,
    };

    let JSONData = await fetch(":4444/login", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
    if (JSOData.status === "Success") {
      // localStorage.setItem("email", emailInputRef.current.value);
      // localStorage.setItem("password", passwordInputRef.current.value);
      localStorage.setItem("token", JSOData.data.token);
      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    }
  };

  return (
    <div className="App">
      <form>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input type="email" ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onLogin();
            }}
          >
            Login
          </button>
        </div>
      </form>
      <br></br>
      <Link to={"/signup"}>Signup</Link>
    </div>
  );
}

export default Login;
