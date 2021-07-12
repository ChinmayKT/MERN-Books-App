import React, {useState , useEffect}from 'react';
import axios from 'axios'

import {Link }from 'react-router-dom';

const Profile = () => {

    const [profile , setProfile ] = useState({
            username : '',
            email: '',
            password: '',
            photoUrl : ''
    })

    useEffect(()=>{
       const getData = async () => {
           const data = await axios.get('/users/profile' , {
               headers : {Authorization : localStorage.getItem('tokenStore')}
           })
           console.log(data.data.user)
           const userdata = data.data.user
           console.log(userdata.username)
           console.log(userdata.email)
           console.log(userdata.photoUrl)
           if(userdata){
               setProfile({
                   username : userdata.username,
                   email : userdata.email,
                   password: userdata.password,
                   photoUrl : userdata.photoUrl
               })
           }
       }

       getData()

    },[])

    return (
        <div className="create-note" >
            <h2>Profile</h2>
            <br></br>
            <img src={profile.photoUrl} style={{height: "200px"  , width :"200px"}} alt="profile"/>
            <br></br>
            <br></br>
            <form  autoComplete ="off"  >
                <div className="row" >
                    <label htmlFor="name" >Name: {profile.username} </label>
                
                </div>
                <br></br>
                <div className="row" >
                    <label htmlFor="email" >Email : {profile.email} </label>
               
                </div>
             
              
                <br></br>
                <Link className="edit" to="/profileEdit"> Edit Profile</Link>
            </form>
            
        </div>
    )
}

export default Profile
