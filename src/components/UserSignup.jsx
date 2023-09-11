import React from "react";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import UserMenubar from './userMenubar'
import image from '../images/learning.jpg'

export default function UserSingup() {
    
    const navigate = useNavigate();

    const [user, setUser] = React.useState({
        username: "",
        password: ""
    })

    function handleChange(event) {
        const {id ,value} = event.target;
        setUser((prevState)=>({
            ...prevState,
            [id]: value
        }))
    }

    const handleClick = async () => {
        try{
            const response = await axios.post('http://localhost:3000/users/signup', {
                username: user.username,
                password: user.password
            })
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            alert("user Signup successful");
            navigate('/user/course')
        } catch(error) {
            console.log(error.response.data);
            alert(error.response.data.message);
        }
    }

    function handleLogin() {
        navigate("/user/login")
    }

    return(
        <div
        style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            height: '100vh',
            width: '100vw'
        }}
        >
            <div>
                <UserMenubar/>
            </div>
            <span style={{display: "flex", justifyContent: "center", marginTop: " 80px"}}>
                Welcome to <em> The Learning Hub</em>
            </span>
            <div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
            <Card style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "300px", gap: "10px", padding: "10px"}}>
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
                    Signup
                </Button>
                <div>
                    already have an account <em style={{cursor: "pointer", color: "blue", textDecoration: "underline"}} onClick={handleLogin}>Login</em>
                </div>
            </Card>
        </div>
            </div>
        </div>
    )
}