import React from "react";
import LandingPage from "./components/landingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSignup from "./components/AdminSignup";
import AddCourse from "./components/AddCourse"
import GetCourse from "./components/GetCourse";
import AdminLogin from "./components/AdminLogin"
import EditCourse from "./components/editCourse";
import UserSingup from "./components/UserSignup";
import UserLogin from "./components/UserLogin";
import UserCourse from "./components/UserCourses";
import UserDashboard from "./components/userDashboard";
import UserPurchasedCourse from './components/userPurchasedCourse';


export default function App() {
  return(
    <div>
         <Router>
    <div>
      <div>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/admin/signup" element={<AdminSignup/>}/>
            <Route path="/admin/login" element={<AdminLogin/>}/>
            <Route path= "/admin/addCourse" element={<AddCourse/>}/>
            <Route path="/admin/getCourse" element={<GetCourse/>}/>
            <Route path="/admin/editCourse" element={<EditCourse/>}/>

            {/* user routes */}
            <Route path="/user" element={<UserDashboard/>}/>
            <Route path="/user/signup" element={<UserSingup/>}/>
            <Route path="/user/login" element={<UserLogin/>}/>
            <Route path="/user/course" element={<UserCourse/>}/>
            <Route path='/user/purchasedCourse' element={<UserPurchasedCourse/>} />
          </Routes>
      </div>
    </div>
    </Router>
    </div>
  )
}