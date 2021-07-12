import React, {useState , useEffect}from 'react';
import {Link} from 'react-router-dom'
import {AiFillDelete} from 'react-icons/ai'

import img from '../../book.png'

import axios from 'axios'

const Home = () => {

    const [books ,setBooks] = useState([])
    const [token , setToken] = useState('')

    const getBooks = async(token)=> {
        const res = await axios.get('/api/books', {
            headers : {Authorization : token}
        })

        console.log(res.data)
        setBooks(res.data)
    }

    useEffect(()=>{
        const token  = localStorage.getItem('tokenStore')
        console.log(token)
        setToken(token)
        if(token){
            getBooks(token)
        }

    },[])

    const deleteBook = async  (id) => {
   let x = window.confirm("Are you sure to delete this Book ?");
    if (x) {
    
    
    try {
        if(token){
            
            await axios.delete(`/api/books/${id}`,{
                headers : {Authorization : token}
            })
            getBooks(token)
            console.log(id,'deleted')
            alert("Book Will be Deleted");
        }

        
    } catch (error) {
        console.log("eroor in deleting")
        window.location.href = '/';
    }
   
  } else {
    alert("Action canceled");
  }

        
      
    }

    return (
        <div className="note-wrapper" >
            {
                books.map(book =>
                    
                    (
                    
                    <div className="card" key={book._id} >
                            <h4 title={book.title} >
                               {book.title}
                            </h4>
                            <div>
                                <img src={book.bookPhotoUrl} style={{height: "200px"  , width :"200px"}} alt="book" />
                            </div>
                            <div className="text-wrapper" >
                            <p>{book.description}</p>
                            </div>
                           
                    
            
                        <p className="date">Price :{book.price} ₹</p>
                        <div className="card-footer" >
                          
                            <Link to={`read/${book._id}`} className="read" > Details</Link>


                            <Link to={`edit/${book._id}`} className="edit" > Edit</Link>
                        </div>
                        <button className="close" onClick={() => deleteBook(book._id)} ><AiFillDelete  size="2em" /></button>
                    </div>
                    
                    )
                )
            }
               
        </div>
    )
}

export default Home
