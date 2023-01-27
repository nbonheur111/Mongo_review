const mongoose = require('mongoose');

//product schema(structure of our data)

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    inventory: { type: Number, required: true},
    description: {type: String},
    photo: {type: String, required:true},
}, 
{timestamps: true}
)
const MyProduct = mongoose.model('products', productSchema);

module.exports = MyProduct;