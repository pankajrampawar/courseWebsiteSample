import React from "react"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function menuBar () {

    const[isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    async function checkLoginStatus() {
        try {
            const token = await localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                return;
            }
            const response = await axios.get('http://localhost:3000/admin/checkStatus', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
    
            if (response.data.status === 200) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        } catch {
            console.log('token not found, login again')
        }
    }

    React.useEffect(()=>{
        checkLoginStatus();
    }, [])

    const navigate = useNavigate();

    function handleDrawerToggle() {
        setIsDrawerOpen((prevState)=>!prevState)
    }

    function Sandwhich() {return(
        <IconButton
            size="small"
            onClick={handleDrawerToggle}
            sx={{paddingTop: "2px"}}
        >
            <MenuIcon/>
        </IconButton>
    )}
    
    function handleClick() {
       navigate("/admin/login")
    }

    function handleHomeClick() {
        navigate("/")
    }

    function handleSignup() {
        navigate("/admin/signup")
    }

    function handleLogout() {
        localStorage.clear('token');
        navigate('/')
    }
    return ( 
        <nav style={{padding: '10px'}}>
           
            <div style={{display: "flex", gap: "8px"}}>
                 <Sandwhich/> 
                 <span className="logo" onClick={handleHomeClick}>
                    <h3
                        style={{margin: "0px", padding: "0px", paddingTop: "3px"}}
                    >
                        The Learning Hub
                    </h3>
                </span>
            </div>
            {
                isLoggedIn? <div><Button onClick={handleLogout}>Logout</Button></div> :
                <div>
                <Button
                onClick={handleClick}
                >
                    Login
                </Button>
            </div>
            }
            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={handleDrawerToggle}
                sx={{width: "200px", "& .MuiDrawer-paper": {width: 150, paddingTop: 6}}}
            >   
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", gap:"6px"}}>
                <Button
                    onClick={()=>{
                        navigate('/')
                    }}
                >
                    Home
                </Button>

                <Button onClick={handleSignup}>Sign up</Button>
                <Button onClick={handleClick}>Log In</Button>
                <Button>Info</Button>
                <Button onClick={()=>{
                    navigate("/admin/getCourse")
                }}>Courses</Button>
                <Button
                    onClick={()=>{
                        navigate("/admin/addCourse")
                    }}
                >
                    Add Course
                </Button>
           
                <Button>Settings</Button>
            </div>
            </Drawer>
        </nav>
    )
}