import React , {useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const CreateBook = () => {

    const [book ,setBook] = useState({
        title : '',
        description : '' ,
        price : ''
    })

    const [files, setFiles] = useState([])

    const history =  useHistory()

    const onChangeInput =  (e) => {
        const {name , value} = e.target;
        setBook({...book , [name]: value})
    }

    const createBook = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title , description , price } = book;
                const formData = new FormData()
                formData.append("file", files[0])
                formData.append("upload_preset", "lwinuk4a")
                const res = await axios.post('https://api.cloudinary.com/v1_1/dgbu74ple/image/upload',formData)

                const newBook = {
                    title , description , price , bookPhotoUrl : res.data.secure_url
                }
                console.log(newBook)

                const sub = await axios.post('/api/books', newBook , {
                    headers : {Authorization:token}
                })

                console.log(sub)
                console.log('memory added')

                return history.push('/')
              
            }
        } catch (err) {
            window.location.href = '/';
        }
    }



    return (
        <div className="create-note" >
            <h2>Add Book</h2>
            <form onSubmit={createBook} autoComplete ="off"  >
            <br></br>
                <div className="row" >
                    <label htmlFor="title" >Title</label>
                    <input type="text" value={book.title} id="title" placeholder="Title"
                    name = "title" required onChange = {onChangeInput} maxlength = "36"  />
                </div>
                <br></br>
                <div className="row" >
                    <label htmlFor="content" >Description</label>
                    <br></br>
                    <br></br>
                    <textarea type="text" value={book.description} id="content" placeholder="Description"
                    name = "description" required row="10" onChange={onChangeInput}/>
                </div>
                <br></br>

                <div className="row" >
                    <label htmlFor="price" >Price : {book.price}₹</label>
                    <input type="number" value={book.price} id="price" placeholder="Price"
                    name = "price" required onChange = {onChangeInput} />
                </div>
                <br></br>
                <div className="row" >
                    <label htmlFor="file" >Book Image: </label>
                    <input type="file" id="file" 
                    name = "file"  onChange={(e) => {setFiles(e.target.files)}} />
                </div>

                <button  type="submit" >Save</button>
            </form>
            
        </div>
    )
}

export default CreateBook
