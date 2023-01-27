console.log("EDIT MEEEE")

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let id = params.idInQuery;
  console.log(id)

  const getClickedProduct = async () => {
    let response = await fetch(`/find_single_product/${id}`)
                            //http:localhost:5000/find_single_product/${id} was repeating itself
    let finalData = await response.json();
    console.log(finalData)

    let containerElement = document.getElementById("container")
    let anotherContainerElement = document.getElementById("another-container")

    //old values
    //name
    let pTag = document.createElement("p");
    pTag.textContent = `Name: ${finalData.name}`;
   
    //price
    let priceTag = document.createElement("p");
    priceTag.textContent = `Price: $${finalData.price}`;
   
    //inventory
    let inventoryTag = document.createElement("p");
    inventoryTag.textContent = `Available: ${finalData.inventory} units`;
    

    //Description
    let descriptionTag = document.createElement("p");
    descriptionTag.textContent = `Description: ${finalData.description}`;
    
    //photo
    let photoTag = document.createElement("p");
    photoTag.textContent = `Photo origin: ${finalData.photo}`;

    let pNewValuesHeader = document.createElement('h1')
    pNewValuesHeader.textContent = `New Values for ${finalData.name}`
    pNewValuesHeader.style.color = 'green'
   


    containerElement.appendChild(pTag)
    containerElement.appendChild(priceTag);
    containerElement.appendChild(inventoryTag);
    containerElement.appendChild(descriptionTag);
    containerElement.appendChild(photoTag);
    containerElement.appendChild(pNewValuesHeader)

}
getClickedProduct()


//grab new values from HTML(edit_product page)
let submitBtn = document.getElementById("submit-button");

submitBtn.addEventListener('click', async ()=> {
    let productNameStr = document.getElementById("product-name-input").value;
    let priceNum = +document.getElementById("product-price-input").value;
    let currentInventoyNum = +document.getElementById("inventory-input").value;
    let productDescriptionStr = document.getElementById("product-description-input").value;
    let productPhotoStr = document.getElementById("product-photo-input").value;


    const product = {
        id,
        productNameStr,
        priceNum,
        currentInventoyNum,
        productDescriptionStr,
        productPhotoStr
    }
    console.log(product);
    
    let response = await fetch('/update_product/edit_product/', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    
    let uploadStatusTag = document.getElementById("upload-status");
    console.log(response.status);
    
    if(response.status === 200 && response!= null){
        console.log(response);
        console.log("Product Updated!")
        uploadStatusTag.textContent = "Product Updated";
        uploadStatusTag.style.color = "green"
    }else {
        console.log(response);
        console.log(" Product not updated")
        uploadStatusTag.textContent = " Product not updated"
        uploadStatusTag.style.color = "red"
    }
});

