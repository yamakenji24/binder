import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import * as UserMutation from '../queries';
import '../stylesheets/login.css';

function Login() {
  const [state, setState] = useState({
    username: '',
    password: ''
  });
  const [login] = useMutation(
    UserMutation.LOGIN, {
      onCompleted({login}) {
        console.log(login)
        // localStorage.setItem('token', login as string)
      }
    }
  )
  
  const handleChange = event => {
    setState({...state, [event.target.name]: event.target.value });
  }
  
  const handleClick = () => {
    login({
      variables: {
        loginInput: {
          username: state.username,
          password: state.password
        }
      }
    })
  }
  
  return (
    <div className="login-box">
      <h1>Login</h1>
      <input type="text" name="username" value={state.username} placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" value={state.password} placeholder="Password" onChange={handleChange} />
      <button onClick={handleClick}>ログイン</button>
    </div>
  )
}

export default Login;
