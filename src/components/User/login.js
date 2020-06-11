import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import {useToasts} from 'react-toast-notifications';
import axios from 'axios';
import '../../stylesheets/login.css';

export default function Login() {
  const history = useHistory();
  const {addToast} = useToasts();
  const [state, setState] = useState({
    username: '',
    password: ''
  });
  
  const handleChange = event => {
    setState({...state, [event.target.name]: event.target.value });
  }
  
  const handleClick = async() => {
    const result =await axios.post("http://localhost:8080/login", {
      "username": state.username,
      "password": state.password
    }).then(res => res.data)
      .catch(e => console.log(e))
    if (!result) {return }
    if (result.status === 'success') {
      localStorage.setItem("token", result.token)
      history.push('/toppage')
    }
  }
  
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Binder</Navbar.Brand>
      </Navbar>
      <div className='login-box'>
        <h1>Login</h1>
        <input type="text" name="username" value={state.username} placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" value={state.password} placeholder="Password" onChange={handleChange} />
        <button onClick={handleClick}>ログイン</button>
      </div>
    </div>
  )
}
