import React from "react";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function SignCard(props) {

    const navigate = useNavigate();
    
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    })

    console.log(user)

   const handleClick = async (event) => {
    event.preventDefault();
    if (props.function === "Login") {
      try {
        const response = await axios.post("http://localhost:3000/admin/login", {
            username: user.username,
            password: user.password
        })

        console.log(response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
        alert("user logged in successfully");
        navigate('/admin/getCourse')
      } catch(error) {
        if (error.response && error.response.status === 403) {
            alert("user not found, plz signup");
            console.log(error.response)
        } else {
            alert("an unknown error occured");
        }
      }
    } else if (props.function === "Sign up") {
        try {
            const response = await axios.post("http://localhost:3000/admin/signup", {
                username: user.username,
                password: user.password
            })
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            alert("user sign up succesfull");
            navigate('/admin/getCourse')
        } catch(error) {
            if(error.response && error.response.status === 403) {
                alert("username already exists");
                console.log("unknown error occured");
            }
        }
    }
    }

    function handleChange(event) {
        const {id, value} = event.target;
        setUser((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    function handleSignup() {
        navigate("/admin/signup")
    }

    function handleLogin() {
        navigate("/admin/login")
    }
    
    return(
    <div style={{
        display: "flex", 
        justifyContent:"center", 
        marginTop: "150px",
        }} className="sign-card">
        <Card style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "300px", gap: "10px", padding: "10px"}}>
            <TextField 
                variant="outlined" 
                label="email" 
                type="email" 
                id="username"
                onChange={handleChange}
                value={user.username}
            />
            <TextField 
                variant="outlined" 
                label="password" 
                id="password"
                type="password" 
                onChange={handleChange}
                value={user.password}
            />
            <Button 
                variant="contained" 
                onClick={handleClick}>
                {props.function}
            </Button>
            <div>
                {props.function === "Login" && 
                <div>
                 new here <em onClick={handleSignup} style={{cursor: "pointer", color: "blue", textDecoration: "underline"}}>sign up</em>   
                </div>}
                {
                    props.function === "Sign up" && 
                    <div>
                        already have an account <em style={{cursor: "pointer", color: "blue", textDecoration: "underline"}} onClick={handleLogin}>Login</em>
                    </div>
                }
            </div>
        </Card>
    </div>
)}