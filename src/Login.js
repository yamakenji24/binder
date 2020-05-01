import React, {useState} from 'react';
import './stylesheets/login.css';

function Login() {
  //const Login = () => {
  const [state, setState] = useState({
    user: '',
    pass: ''
  });

  const handleChange = event => {
    setState({...state, [event.target.name]: event.target.value });
  }
  
  const handleClick = () => {
    alert(state.pass);
  }
  
  return (
    <div className="login-box">
      <h1>Login</h1>
      <input type="text" name="user" value={state.name} placeholder="Username" onChange={handleChange} />
      <input type="password" name="pass" value={state.pass} placeholder="Password" onChange={handleChange} />
      <button onClick={handleClick}>ログイン</button>
    </div>
  )
}

export default Login;
