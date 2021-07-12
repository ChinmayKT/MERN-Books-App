import React , {useState , useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import img from '../../book.png'

const ReadMemory = ({match}) => {

    const [book ,setBook] = useState({
        title : '',
        description: '' ,
        price: '',
        id: '',
        bookPhotoUrl: ''
    })

    const [files, setFiles] = useState([])

    const history =  useHistory()

    useEffect(()=>{
        const getBook = async () => {
            const token = localStorage.getItem('tokenStore')
            console.log("edit", token)
            if(match.params.id){
                const res= await axios.get(`/api/books/${match.params.id}` , {
                    headers: {Authorization : token}
                })
                // console.log(match.params.id)
                // console.log(res)
                // console.log(res.data)
                // console.log(res.data.book)
             const Data = res.data.book
                console.log(Data.price)

                setBook({ 
                    title : Data.title, 
                    description : Data.description,
                    price : Data.price ,
                    id : Data._id , 
                    bookPhotoUrl : Data.bookPhotoUrl

                })
            }
        }
        getBook()
    },[match.params.id])



    const onChangeInput =  (e) => {
        const {name , value} = e.target;
        setBook({...book , [name]: value})
    }


    const editBook = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title , description , price , id } = book;
                let newBookPhotoUrl = ''
                if(files[0]) {
                    const formData = new FormData()
                    formData.append("file", files[0])
                    formData.append("upload_preset", "lwinuk4a")
                    const res = await axios.post('https://api.cloudinary.com/v1_1/dgbu74ple/image/upload',formData)
                    newBookPhotoUrl = res.data.secure_url
                }
                console.log(newBookPhotoUrl)
              
                const newBook = {
                    title , description , price , bookPhotoUrl  : newBookPhotoUrl ? newBookPhotoUrl : book.bookPhotoUrl
                }
                console.log(newBook)

                await axios.put(`/api/books/${id}`, newBook , {
                    headers : {Authorization:token}
                })
                console.log('Book edited added')

                return history.push('/')
      
            }
        } catch (err) {
            // window.location.href = '/';
            console.log(err)
        }
    }

    const bookBack = () => {
        history.push('/')
    }

    return (
        <div className="create-note" >
            <h2>Edit BOOk</h2>
            <br></br>
            <form onSubmit={editBook} autoComplete ="off"  >
                <div class="row" >
                    <label htmlFor="title" >Title : {book.title}</label>
                    <input type="text" value={book.title} id="title" placeholder="title"
                    name = "title" onChange = {onChangeInput} />
                </div>
<br></br>
                <div class="row" >
                    <label htmlFor="description" >Description</label>
                    <br></br>
                    <br></br>
                    <textarea type="text" value={book.description} id="description" placeholder="Description"
                    name = "description"  row="10" onChange={onChangeInput} />
                </div>

            <br></br>
                <div className="row" >
                    <label htmlFor="price" >Price : {book.price} ₹</label>
                    <input type="number" value={book.price} id="price" placeholder="Price"
                    name = "price" required onChange = {onChangeInput} />
                </div>
<br></br>
                <img src={book.bookPhotoUrl} style={{height: "200px"  , width :"200px"}} alt="book"/>
                <div className="row" >
                    <label htmlFor="file" >Update Book Image: </label>
                 
                    <input type="file" id="file" 
                    name = "file"  onChange={(e) => {setFiles(e.target.files)}}
                     />
                </div>

                <button  type="submit" >Update</button>
                <button onClick={bookBack} type="submit" >Back</button>
            </form>
            
        </div>
    )
}

export default ReadMemory
