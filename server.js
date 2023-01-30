const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const MyProduct = require('./models/product');


const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.ulvph39.mongodb.net/Shop?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
// function will activate once to let us know we are connected
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo...');
});

//route to display all items in store

app.get('/all_products', async(req, res) => {
    let response = await MyProduct.find({})
    console.log(response);
    res.json(response);

})

//route to create new products
app.post('/create_product', async (req, res) => {
    const {productNameStr: name, priceNum: price, currentInventoyNum: inventory, productDescriptionStr: description, productPhotoStr: photo} = req.body;
    console.log(req.body)
    let returnedValue = await MyProduct.create({
        name,
        price,
        inventory,
        description,
        photo
    });

    console.log(returnedValue)
    if(returnedValue){
        console.log("Item Created Successfully!")
    }
    res.send(returnedValue)
})
//find product using its parameter

app.get('/find_single_product/:idOfProduct', async (req, res) => {
    let id = req.params.idOfProduct 
    console.log(id);
    
    let response = await MyProduct.findById(id)
    console.log("response from collection", response);
    res.json(response)
})


//update product with front end input
app.put('/update_product/edit_product/', async(req, res) => {

    let id = req.body.id

    console.log("body", req.body)
    
    const {productNameStr: name, priceNum: price, currentInventoyNum: inventory, productDescriptionStr: description, productPhotoStr: photo} = req.body;
    let newValuesObject ={
        name,
        price,
        inventory,
        description,
        photo
    }

    let response = await MyProduct.findByIdAndUpdate(id, newValuesObject, {new:true})
    console.log(response)
    res.send(response)
})

//delete button
app.delete('/delete_product/:idOfProduct', async(req, res) => {
    let id = req.params.idOfProduct
    
    let response = await MyProduct.findByIdAndDelete(id);
    console.log(response);
    res.send({data: `${response.name} is deleted from the database`})
})

//buy button
app.put('/update_quantity/:idOfProduct', async (req, res) => {
    let id = req.params.idOfProduct
    console.log(" You know what is",id)
    console.log(req.body)
    let response = await MyProduct.findByIdAndUpdate(id, req.body, {new:true});
    console.log(response)
    res.json(response);


})


app.listen(5000, () => {
    console.log(`Server is Listening on 5000...`)
})
