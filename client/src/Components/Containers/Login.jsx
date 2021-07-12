import React, { useState } from "react";
import axios from "axios";

const Login = ({ setIslogin }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [files, setFiles] = useState([])

  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr();
  };

  const registerSubmit = async (e) => {
    e.preventDefault()
    try {
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "lwinuk4a")
        const res = await axios.post('https://api.cloudinary.com/v1_1/dgbu74ple/image/upload',formData)
        console.log(res)
        const userData =  {
            username: user.name,
            email: user.email,
            password: user.password,
            photoUrl: res.data.secure_url
        }

        console.log(res)
        console.log(userData)

        const subres = await axios.post('/users/register',userData)

       

        setUser({ name: '', email: '', password: ''  })
        setFiles([])
        setErr(subres.data.msg)
     
        

    } catch (err) {
        err.response.data.msg && setErr(err.response.data.msg)
    }

}

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      // console.log(res.data)
      setUser({ email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setErr(res.data.msg);
      setIslogin(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const [onLogin, setOnLogin] = useState(false);

  const style = {
    visibility: onLogin ? "visible" : "hidden",
    opacity: onLogin ? 1 : 0,
  };

  return (
    <section className="login-page">
      <div className="login create-note">
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
          <input
            type="email"
            name="email"
            id="login-email"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInput}
          />

          <input
            type="password"
            name="password"
            id="login-password"
            placeholder="Password"
            required
            value={user.password}
            onChange={onChangeInput}
          />

          <button type="submit">Login</button>

          <p>
            You don't have account ?
            <span onClick={() => setOnLogin(true)}>Register Now</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>

      <div className="register create-note" style={style}>
        <h2>Register</h2>
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            name="name"
            id="register-email"
            placeholder="Name"
            required
            value={user.name}
            onChange={onChangeInput}
          />

          <input
            type="email"
            name="email"
            id="register-email"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInput}
          />

          <input
            type="password"
            name="password"
            id="register-password"
            placeholder="Password"
            required
            value={user.password}
            onChange={onChangeInput}
          />
  <br></br>
          <br></br>
          <div className="row">
            <label htmlFor="file">Profile Picture: </label>
            <input type="file" id="file" name="file"
          
            onChange ={ (e) => { setFiles(e.target.files)} }
         
             />
          </div>

          <button type="submit">Register</button>

          <p>
            Have an account ?
            <span onClick={() => setOnLogin(false)}> Login Now</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
    </section>
  );
};

export default Login;
