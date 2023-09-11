import React from "react"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function UserMenubar() {

    const navigate = useNavigate()
    
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [isLoggedin, setIsLoggedin] = React.useState(false);

    async function checkLogin() {
        const token = await localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/user/status', {
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        })
        if (response.data.message === 'ok') {
            setIsLoggedin(true);
        } else {
            setIsLoggedin(false);
        }
    }

    React.useEffect(()=>{
        checkLogin();
    }, [])

    function Sandwhich() {
        return (
            <IconButton
            size="small"
            onClick={handleDrawerToggle}
            sx={{padding: "2px"}}
            >
                <MenuIcon/>
            </IconButton>
        )
    }

    function handleDrawerToggle() {
        setIsDrawerOpen((prevState)=>(!prevState));
    }

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        window.location.reload();
    }

    return(
      <nav>
        <div style={{display: "flex", gap: "8px"}}>
            <Sandwhich/> 
            <span className="logo">
                <h3 
                    style={{margin: "0px", padding: "0px", paddingTop: "3px"}}
                    onClick={()=>{navigate('/user')}}
                >
                    The Learning Hub
                </h3>
            </span>
        </div>

        {
            isLoggedin ? (
                <div>
                    <Button
                        onClick={handleLogout}
                    >Logout</Button>
                </div>
            ) :
            (<div>
                <Button
                    onClick={()=>{navigate('/user/login')}}
                >
                    Login
                </Button>
            </div>)
        }
        {/* here is the drawer code*/}

        <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={handleDrawerToggle}
            sx={{Width:"300px",  "& .MuiDrawer-paper": {width: 150, paddingTop: 6}}}
        >
            <div style={{display: "flex", flexDirection: "column",justifyContent:"center" ,gap: "10px"}}>
                <Button
                    onClick={()=>{navigate("/user")}}
                >
                    Home
                </Button>
                
                <Button
                    onClick={()=>{navigate('/user/signup')}}
                >
                    Signup
                </Button>
                
                <Button
                    onClick={()=>{navigate("/user/course")}}
                >
                    All courses
                </Button>
                
                <Button
                    onClick={()=>{navigate('/user/purchasedCourse')}}
                >
                    Purchases
                </Button>
                
                <Button
                >
                    Help
                </Button>
            </div>
        </Drawer>
      </nav>
    )
}