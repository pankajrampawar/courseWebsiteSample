import React from "react";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import UserMenubar from './userMenubar';
import image from '../images/learning.jpg'

export default function UserSingup() {

    const navigate = useNavigate();
    
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    })

    console.log(user)

    function handleChange(event) {
        const {id ,value} = event.target;
        setUser((prevState)=>({
            ...prevState,
            [id]: value
        }))
    }

    const handleClick = async () => {
        try{
            const response = await axios.post('http://localhost:3000/users/login', {
                    'username': user.username,
                    'password': user.password
            })
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            alert("logged in successfully");
            navigate('/user/course')
        } catch(error) {
            console.log(error.response.data);
            alert(error.response.data.message);
        }
    }

    function handleSignup() {
        navigate('/user/signup')
    }

    return(
        <div
        style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            height: '100vh',
            width: '100vw'}}
        >
            <div>
                <UserMenubar/>
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "80px"}}>
                <span>
                    Welcome Back!
                </span>
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
            <Card style={{display: "flex", flexDirection: "column", alignContent: "center", gap: "10px", padding: "10px", width:"300px"}}>
                <TextField
                    variant="outlined"
                    label="username"
                    id="username"
                    value={user.username}
                    onChange={handleChange}
                    type="text"
                />
                <TextField
                    variant="outlined"
                    label="password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                    type="password"
                />
                <Button
                    variant="contained"
                    onClick={handleClick}
                >
                    Login
                </Button>
                <div>
                    new here <em style={{color: "blue", textDecoration: "underline", cursor:"pointer"}} onClick={handleSignup}>Signup</em>
                </div>
            </Card>
        </div>
        </div>
    )
}