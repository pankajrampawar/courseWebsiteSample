import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useNavigate} from 'react-router-dom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import IconButton from '@mui/material/IconButton';
import MenuBar from './menuBar';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

export default function GetCourse() {

    const navigate = useNavigate();
    const [courses, setCourses] = React.useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    async function checkIsLoggedIn() {
        try {
            const token = await localStorage.getItem('token');
            if(!token) {
                setIsLoggedIn(false)
                return;
            }
            const response = await axios.get('http://localhost:3000/admin/checkStatus',{
                headers: {
                    'Authorization': 'Bearer: ' + token
                }
            }
            )
            console.log(response.data)
            if (response.data.status === 200) {
                setIsLoggedIn(true);
            }
            else {
                setIsLoggedIn(false);
            }
        } 
        catch(error) {
            console.log("sign in required for further action")
        }
    }
    React.useEffect(()=>{
        checkIsLoggedIn();
    }, [])
    

    React.useEffect(()=>{
        async function fetchCourse() {
            try{
                const token = localStorage.getItem("token");
                if(!token) {
                    console.error("token not available")
                    return;
                }

                const response = await fetch("http://localhost:3000/admin/courses", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "bearer: " + token
                    }
                });

                if(!response.ok) {
                    throw new Error(response.statusText)
                }

                const data = await response.json();
                console.log("data from the API: " , data)
                setCourses(data.courses);
            } catch(error) {
                console.error('Error', error.message);
            }
        }
        fetchCourse();
    }, []) 

    const hanldeDelete = async (id)=>{
        try {
            const token = await localStorage.getItem('token')
            const response = await axios.delete(`http://localhost:3000/admin/delete/${id}`, {
                headers: {
                    'Authorization' : 'Bearer ' + token
                }
            })
            
            console.log(response.data);
            alert(response.data.message)
            setCourses((prevCourses) => prevCourses.filter(course => course.id !== id));
        } catch(error) {
            console.log(error);
            alert(error.response.data);
        }
    }

    const handleEdit = async (props)=>{
        const localCourse = JSON.stringify(props)
        await localStorage.setItem('course', localCourse);
        navigate(`/admin/editCourse`)
    }

    function CourseCard(props) {
        return(
             <Card sx={{display: "flex", flexDirection: "column",width: "200px", padding: "5px", gap: "2px"}}>
                    <img src={props.imgLink} height='110px'/>
                <div style={{fontWeight: "bold"}}>
                    {props.title}
                </div>
                    <span>{props.price}</span>
                    <span style={{color: "blue", textDecoration: "underline"}}>Details</span>
                <div style={{display: "flex", gap: "4px"}}>
                <Button 
                    sx={{width: "95px"}}
                    variant="contained"
                    onClick={()=>{handleEdit(props)}}
                >
                    Edit
                </Button>
                <Button 
                    sx={{widht: "95px"}}
                    variant="contained" 
                    onClick={()=>{hanldeDelete(props.id)}}
                >
                        Delete
                </Button>
                </div>
            </Card>
        )
    }
    
    return(
     <div>
        <div>
            <MenuBar/>
        </div>
        <div style={{display: "flex", padding: "50px"}}>
            {
                isLoggedIn &&  
                courses.length === 0 ? (<div>No courses yet.. <em style={{color:'blue', textDecoration:'underline', cursor:'pointer'}} onClick={()=>{navigate('/admin/addCourse')}}>Add course</em></div>) : (
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent:'center', gap: '20px'}}>
                    {courses.map((course) =>{
                    return <CourseCard 
                        key={course.id}
                        id={course.id}
                        imgLink={course.imgLink} 
                        title={course.title} 
                        price={course.price} 
                        description={course.description} 
                        published={course.published}
                    />
                })}
                </div>)
            }

            {
                !isLoggedIn && <div><em style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={()=>{navigate('/admin/login')}}>Login</em> &nbsp;to see the courses</div>
            }
            
            <div>
            {
                courses.length === 0 ? (<div></div>) : (<div style={{marginTop: "80px", marginLeft: "40px"}}>
                <Tooltip title='Add course'>
                <IconButton
                     onClick={()=>{
                        navigate('/admin/addCourse');
                    }} 
                >
                <AddCircleRoundedIcon 
                    style={{fontSize: 38}}
                />
                </IconButton>
                </Tooltip>
            </div>)
            }
            </div>
            
        </div>
     </div>
    )
}