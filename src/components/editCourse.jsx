import React from "react";
import Card from "@mui/material/Card"
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import axios from "axios";
import MenuBar from './menuBar';
import { useNavigate } from "react-router-dom";

export default function EditCourse() { 

    const navigate = useNavigate();
    
    const [id, setId] = React.useState()
    const [course, setCourse] = React.useState({
        title: "",
        description: "",
        imgLink: "",
        price: "",
        published: ""
    })

    React.useEffect(()=>{
        function getLocalCourse() {
            const localCourse = localStorage.getItem('course')
            const fetchedCourse = JSON.parse(localCourse)
            console.log(fetchedCourse);
            setId(fetchedCourse.id)
            setCourse((prevState)=>({
                ...prevState,
                title: fetchedCourse.title,
                description: fetchedCourse.description,
                imgLink: fetchedCourse.imgLink,
                price: fetchedCourse.price,
                published: fetchedCourse.published
            }))
        }
        getLocalCourse();
    }, [])
    
    const handleChange = (e) => {
        const {id, value, name} = e.target;
        setCourse((prevState)=>({
            ...prevState,
            [name === "published" ? name : id] : value
        }))
    }

    const saveEditedChanges = async (id)=>{
        const token = await localStorage.getItem("token")
        const response = await axios.put(`http://localhost:3000/admin/courses/${id}`,course, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        alert(response.data.message)
        localStorage.removeItem(course);
        navigate('/admin/getCourse')
    }

    return(
    <div>
        <div>
            <MenuBar/>
        </div>
        <div style={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
        <Card sx={{display: "flex", justifyContent:"center", gap: "8px", flexDirection: "column", width: "400px", padding: "15px"}}>
            <TextField
                variant="outlined"
                label="title"
                type="text"
                id="title"
                value={course.title}
                onChange={handleChange}
            />
             <TextField
                variant="outlined"
                label="description"
                type="text"
                id="description"
                value={course.description}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                label="Image link"
                type="link"
                id="imgLink"
                value={course.imgLink}
                onChange={handleChange}
            />
            <TextField
                variant= "outlined"
                label="price"
                type="text"
                id="price"
                value={course.price}
                onChange={handleChange}
            />

            <FormControl>
                <InputLabel id="publish-input">Publishing status</InputLabel>
                <Select
                    labelId="publish-input"
                    name="published"
                    value={course.published}
                    onChange={handleChange}
                >
                    <MenuItem value={false} >Hold</MenuItem>
                    <MenuItem value={true}>Publish</MenuItem>
                </Select>
            </FormControl> 

            <div style={{marginTop: "4px"}}>
                <Button
                    variant="contained"
                    onClick={()=>{saveEditedChanges(id)}}
                >
                    Save
                </Button>
            </div>
        </Card>
    </div>
    </div>
)}