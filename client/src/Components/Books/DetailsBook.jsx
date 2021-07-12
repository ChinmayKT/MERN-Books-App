import React , {useState , useEffect} from 'react';
import axios from 'axios';
import img from '../../book.png'


const DetailsBook = ({match}) => {

    const [book ,setBook] = useState({
        title : '',
        description : '' ,
        price : '',
        id: '',
        bookPhotoUrl: ''
    })

   

    useEffect(()=>{
        const getBook = async () => {
            const token = localStorage.getItem('tokenStore')
            console.log("read " , token)
            if(match.params.id){
                const res= await axios.get(`/api/books/${match.params.id}` , {
                    headers: {Authorization : token}
                })

                console.log(match.params.id)
                console.log(res)
                console.log(res.data)
                console.log(res.data.book)
                

                const Data = res.data.book

                setBook({ 
                    title : Data.title, 
                    description: Data.description,
                    price : Data.price ,
                    id : Data._id,
                    bookPhotoUrl: Data.bookPhotoUrl

                })
            }
        }
        getBook()
    },[match.params.id])

    return (
        <div className="bookcontainer">
            <div>
            <h1>Books Details</h1>
           
            <br></br>
            <div className="row " >
                <div className="read-top" >
                    <label htmlFor="title" ><h2>Title :{book.title} </h2></label>  
                    
                </div> 
            </div>
            <br></br>
          
            <div className="row" >
            <div>
                <img src={book.bookPhotoUrl} style={{height: "300px"  , width :"300px"}} alt="book" />
                <br></br>
                <br></br>
                <label htmlFor="price" ><h4>Price : {book.price} ₹</h4></label>
                <br></br>
                <label htmlFor="description" > <h4>Description: {book.description} </h4> </label>
            </div>
               
            </div>   
            </div>             
        </div>
    )
}

export default DetailsBook 
