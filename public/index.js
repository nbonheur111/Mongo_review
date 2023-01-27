console.log("Is this thing even working?")

let submitBtn = document.getElementById("submit-button");

submitBtn.addEventListener('click', async ()=> {
    let productNameStr = document.getElementById("product-name-input").value;
    let priceNum = +document.getElementById("product-price-input").value;
    let currentInventoyNum = +document.getElementById("inventory-input").value;
    let productDescriptionStr = document.getElementById("product-description-input").value;
    let productPhotoStr = document.getElementById("product-photo-input").value;


    const product = {
        productNameStr,
        priceNum,
        currentInventoyNum,
        productDescriptionStr,
        productPhotoStr
    }
    console.log(product);
    
    let response = await fetch('http://localhost:5000/create_product', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    
    let uploadStatusTag = document.getElementById("upload-status");
    console.log(response.status);
    
    if(response.status === 200){
        console.log(response);
        console.log("Product Created!")
        uploadStatusTag.textContent = "Product Created";
        uploadStatusTag.style.color = "green"
    }else {
        console.log(response);
        console.log(" Product not created")
        uploadStatusTag.textContent = " Product not created"
        uploadStatusTag.style.color = "red"
    }
});

//linking server and fe to display all products in store
let displayProductsBtn = document.getElementById("display-all-products");
displayProductsBtn.addEventListener('click', () =>{
    window.location.href = "./display_product"
})


//Go back home
let homeBtn = document.getElementById("homepage");
homeBtn.addEventListener('click', async() => {
    window.location.href = '/display_product'
})

//To about page
let aboutBtn = document.getElementById("about")
aboutBtn.addEventListener('click', () => {
    window.location.href = '/about'
})