import React from "react";
import Card from "@mui/material/Card"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuBar from "./menuBar";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function AddCourse() {

    const navigate = useNavigate()  

    const token = localStorage.getItem("token")

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    async function checkStatus() {

        if(!token) {
            alert("Log in to add Course");
            navigate('/')
        }
        else {
        const response = await axios.get('http://localhost:3000/admin/checkStatus', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.data.status === 200) {
            setIsLoggedIn(true);
        } else {
            alert("Log in to add courses");
            setIsLoggedIn(false);
        }
        }}

    React.useEffect(()=>{
        checkStatus();
    }, [])

    const [course, setCourse] = React.useState({ 
        title: "",
        description: "",
        imgLink: "",
        price: "",
        published: false,
    })

    function handleChange(event) {
        const {id, value, name} = event.target
        setCourse((prevState)=>({
            ...prevState,
            [name === "published" ? name : id]:value
        }))
    }

    async function handleSubmit() {

        try {
            const response = await axios.post('http://localhost:3000/admin/courses',
                course, {
                headers: {
                    'Authorization': 'Bearer '  + token
                }
            })
            console.log(response.data);
            alert('course added successfully')
            navigate('/admin/getCourse')
        } catch(error) {
            console.log('error');
            alert('server down, plz try again later')
        }
    }
    
    return(
        <div>
            <div>
                <MenuBar/>
            </div>

            {
                isLoggedIn ? (
            <div style={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
            <Card style={{width: "400px", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px"}}>
                <TextField
                    variant="outlined"
                    label="Title"
                    type="text"
                    id="title"
                    value = {course.title}
                    onChange={handleChange}
                    
                />
                <TextField
                    variant="outlined"
                    label="Description"
                    type="text"
                    id="description"
                    value={course.description}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    label="Image Link"
                    type="link"
                    id="imgLink"
                    value={course.imgLink}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    label="price"
                    type="number"
                    id="price"
                    value={course.price}
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="publishing-status">Publisihing status</InputLabel>
                    <Select
                        labelId="publishing-status"
                        name="published"
                        value={course.published}
                        onChange={handleChange}
                    >
                        <MenuItem value={true}>publish</MenuItem>
                        <MenuItem value={false}>hold</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Add Course
                </Button>
            </Card>
        </div>
        ) : (<div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
                <em 
                    style={{
                        color:'blue', 
                        cursor: 'pointer', 
                        textDecoration: 'underline'
                        }} 
                    onClick={()=>{navigate('/admin/login')}}
                >
                    Login
                </em> &nbsp; to add courses
            </div>)}
        </div>
    )
}