import React from 'react';
import Card  from '@mui/material/Card';
import axios from 'axios';
import userMenubar from './userMenubar';

export default function UserPurchasedCourse() {

    const [courses, setCourses] = React.useState([]);
    
    const getPurchasedCourse = async ()=>{
        const token = await localStorage.getItem('token');
        try {
            if(!token) {
                alert('log in to see purchases');
            } else {
                const response = await axios.get('http://localhost:3000/users/purchasedCourses', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                console.log(response.data)
                setCourses(response.data.purchasedCourses);
            }
        } catch(error) {
            alert('error, try later again.');
        }
    
    }

    React.useEffect(()=>{
        getPurchasedCourse();
    }, []);

    function CourseCard(props) {
       return( <Card sx={{display: 'flex', flexDirection: 'column', width: '200px', gap: '5px'}}>
            <img src={props.img} alt='problem loading image' height="120px"/>
            <span><h4 style={{margin: '0px'}}>{props.title}</h4></span>
            <span style={{color: 'blue'}}><em>details</em></span>
            <span><h4 style={{margin: '0px'}}>review</h4></span>
        </Card>
    )}

    return(
        <div>
           {
            courses.length === 0 ? (<div>Loading...</div>) : (
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '50px', gap: '10px'}}>
                    {courses.map((course)=>{
                        return <CourseCard
                            img= {course.imgLink}
                            key = {course.id}
                            title = {course.title}
                        />
                    })}
                </div>
            )
           }
        </div>
    )
}