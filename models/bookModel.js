const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({ 
    title: {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    price:{
        type : String,
        required : true
    },



    user_id :{
        type: String,
        required : true
    },

    bookPhotoUrl: {
        type: String,
        required: true
    }

   
} , {
    timestamps: true
})

module.exports = mongoose.model("book",bookSchema)