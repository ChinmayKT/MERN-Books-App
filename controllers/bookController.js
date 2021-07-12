const Books = require('../models/bookModel')


const bookController = { 
    getBooks : async  (req,res)=> {

        try {
            const books = await Books.find({user_id: req.user.id })
            res.json(books)
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    createBook : async  (req,res)=> {
        try {
            const {title , description , price , bookPhotoUrl } = req.body 
            const newBook = new Books({
                title ,
                description,
                price,
                user_id : req.user.id, 
                bookPhotoUrl
            })
          
            await newBook.save()
          
            res.json({name: req.user.name, title:title, msg:'Book added'})
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }

    }, 

    deleteBook : async  (req,res)=> {
        try {
            await Books.findByIdAndDelete(req.params.id)
            res.json({msg : "Book Deleted"})      
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    updateBook : async  (req,res)=> {
        try {
            const {title , description , price , bookPhotoUrl} = req.body
            await Books.findOneAndUpdate({_id:req.params.id},{
                title,
                description,
                price,
                bookPhotoUrl
            })

            res.json({msg:"Book updated"})
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    }
    , 

    getBook : async  (req,res)=> {
        try {
            const book = await Books.findById(req.params.id)
            res.json({book: book})
            
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
    },

    

}


module.exports = bookController