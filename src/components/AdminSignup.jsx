import React from "react";
import SignCard from "./signCard"
import MenuBar from "./menuBar";
import image from '../images/learning.jpg'

export default function AdminSignup(){return(
    <div style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw'
    }}>
        <div>
            <MenuBar/>
        </div>
        <SignCard function="Sign up"/>
    </div>
)}