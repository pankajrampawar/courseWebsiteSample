import React from 'react';
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import axios from 'axios';
import UserMenubar from './userMenubar'

export default function UserCourse() {

    const [courses, setCourses] = React.useState([]);
    const token = localStorage.getItem("token");

    const getCourse = async () => {
        try {
            const response = await axios.get("http://localhost:3000/users/courses", {
                headers: {
                    'Authorization': "Bearer " + token
                }
            })
            console.log(response.data);
            setCourses(response.data.courses);
        } catch(error) {
            console.log(error.response);
        }
    }

    React.useEffect(()=>{
        getCourse();
    }, []);

    const [purchasedCourses, setPurchasedCourse] = React.useState([]);

    const handlePurchase = async (id)=>{
        console.log(id)
        const present = purchasedCourses.find(c => c === id);
        if (present) {
            alert("you have already bought the following course.");
        } else {
            console.log(token)
            try {
                const response = await axios.post(`http://localhost:3000/users/courses/${id}`,
                {},
                 {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });
                console.log(response);
                setPurchasedCourse((prevState)=>([
                    ...prevState,
                    id
                ]))
                alert("Course Purchased successfully");
            } catch(error) {
                alert('some error occured, plz try again later')
                console.log(error.response.data)
                return;
            }
        }
    }


    const CourseCard = (props)=>{
        return (
            <Card sx={{display: "flex", flexDirection: "column",width: "200px", gap: '2px', padding: '5px'}}>
                <img src={props.imglink} alt="course Logo" height='120px'/>
                <div style={{fontWeight: "bold"}}>
                <span>{props.title}</span>
                </div>
                <span style={{cursor: "pointer", color: "blue"}}><em>Details</em></span>
                <span>Rs. {props.price}</span>
                <Button
                    variant="contained"
                    onClick={()=>{handlePurchase(props.id)}}
                >
                    Purchase
                </Button>
            </Card>
        )
    }

   

    return(
        <div>
        <div>
            <UserMenubar/>
            
        </div>
        <div style={{display: "flex", flexWrap: "wrap", alignContent: "center", padding: "50px", gap: '30px', alignSelf: 'center', justifyContent: 'center'}}>
            {courses.map((course)=>{
              return( <CourseCard key={course.id} id={course.id} imglink={course.imgLink} title={course.title} price={course.price} />)
            })}        
        </div>
        </div>
    )
}