import React, {useState , useEffect}from 'react';
import axios from 'axios'
import img from '../../avatar.png'
import {useHistory} from 'react-router-dom'


const EditProfile = () => {

    const history =  useHistory()
    const [profile , setProfile ] = useState({
        username : '',
        email: '',
        photoUrl : ''
    })

    const[files , setFiles] = useState([])
    
    useEffect(()=>{
    const getData = async () => {
       const data = await axios.get('/users/profile' , {
           headers : {Authorization : localStorage.getItem('tokenStore')}
       })
    //    console.log(data.data.user)
       const userdata = data.data.user
    //    console.log("user data",userdata)
    //    console.log("usename",userdata.username)
    //    console.log("email",userdata.email)
    //    console.log("photosurl", userdata.photoUrl)
       if(userdata){
           setProfile({
            username : userdata.username,
            email : userdata.email,
            photoUrl : userdata.photoUrl
           })
       }
    }
    
    getData()
    
    },[]) 

    const onChangeInput =  (e) => {
        const {name , value} = e.target;
        setProfile({...profile , [name]: value})
    }
    
    const editProfile = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {username , email } = profile;
                let newPhotourl = ""
                if(files[0]) {
                    const formData = new FormData()
                    formData.append("file", files[0])
                    formData.append("upload_preset", "lwinuk4a")
                    const res = await axios.post('https://api.cloudinary.com/v1_1/dgbu74ple/image/upload',formData)
                    newPhotourl = res.data.secure_url
                }
                console.log(newPhotourl)
                const updateProfile = {
                    username , email, photoUrl : newPhotourl ? newPhotourl : profile.photoUrl
                }
                console.log(updateProfile)
               const newPro = await axios.put('/users/profileEdit', updateProfile , {
                    headers : {Authorization : localStorage.getItem('tokenStore')}
                })
                console.log('Profile edited', newPro)

                return history.push('/profile')
            }
        } catch (err) {
            console.log(err)
        }
    }



    const backHandler = ()=>{
        return history.push('/profile')
    }
    return (
        <div className="create-note" >
        <h2>Profile</h2>
        <img src={profile.photoUrl} style={{height: "200px"  , width :"200px"}} alt="profile" />
        <br></br>
        <br></br>
        <div className="row" >
                    <label htmlFor="file" >Update Profile Picture: </label>
                    <input type="file"  id="file" 
                    name = "file" 
                    onChange={(e) => {setFiles(e.target.files)}} 
                     />
                </div>
        <br></br>
        <form  autoComplete ="off" onSubmit={editProfile}  >
            <div className="row" >
                <label htmlFor="name" >Name:{profile.username} </label>
                <input type="text" value={profile.username} id="name" placeholder="Name"
                name = "username" onChange = {onChangeInput}   />
            </div>
            <br></br>
            <div className="row" >
                <label htmlFor="email" >Email :{profile.email}  </label>
                <input  type="text" value={profile.email} id="email" placeholder="Email"
                name = "email"  onChange = {onChangeInput}  />
            </div>
            <br></br>
         
            <button  type="submit" >Update</button>
            <button onClick={backHandler}  type="submit" >Back</button>
        </form>
        
    </div>
    )
}

export default EditProfile
