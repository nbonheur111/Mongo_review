
//grab id of this product
//use id to get data from collection
//display in html
console.log("single product js connected. right? right?")

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



    //1. create elements
    //function that will select the html and append info from the server

    const displayDbDatatoHTML = (tag) => {
        let containerElement = document.getElementById("container");
        return  containerElement.appendChild(tag)

    }
    
    // 1.1 display name
    let pTag = document.createElement("p");
    pTag.textContent = finalData.name;
    pTag.style.fontWeight = 'bold'

    //1.2 availability of the item
    // let inStockTag = document.createElement("p")

    // const changeProductStatus = () => {
     
    //                if(finalData.inventory > 5){
    //         inStockTag.textContent = `✅ in Stock: ${finalData.inventory} items available`
    //         inStockTag.style.color = 'green'
    //     }else if(finalData.inventory > 0 && finalData.inventory <= 5){
    //         inStockTag.textContent = `⌛️ Almost Gone! Only ${finalData.inventory} items`
    //         inStockTag.style.color = 'red'
    //     }else {
    //         inStockTag.textContent = `⛔️ OUT OF STOCK`
    //         inStockTag.style.color = 'red'
    //         buyBtn.disabled = true;
    //     }
           


    // }
   


    //1.3 create img tag and add the photo to it
    let imgTag = document.createElement('img')
    imgTag.src = finalData.photo

    //1.4 price
    let priceTag = document.createElement('p')
    priceTag.textContent = `Price: $${finalData.price}`
    priceTag.style.color = 'red'
    priceTag.style.fontWeight = 'bold'
    
    //1.5 buy button
    let buyBtn = document.createElement("button")
    buyBtn.textContent = `Buy`
    buyBtn.style.backgroundColor = 'lightblue'

    //1.5.1  buy button functionality and visibility
    

    let inStockTag =document.createElement("p")

    //first check if we have at least one item in store

    if(finalData.inventory <= 0){
        buyBtn.disabled = true;
        inStockTag.textContent = `⛔️ OUT OF STOCK`
        inStockTag.style.color = 'red'
    } else{
        inStockTag.textContent = `✅ in Stock: ${finalData.inventory} items available`
        inStockTag.style.color = "green"
    }
   

    buyBtn.addEventListener('click', async() => {
        
        //  window.location.reload();

        let availableUnits = finalData.inventory -1;
        finalData.inventory -= 1
        
        if(availableUnits > 5){
            inStockTag.textContent = `✅ in Stock: ${availableUnits} items available`
            inStockTag.style.color = 'green'
        }else if( availableUnits <= 5 && availableUnits > 0){
            inStockTag.textContent = `⌛️ Almost Gone! Only ${availableUnits} items`
            inStockTag.style.color = 'red'

        }else if(availableUnits <= 0){
            inStockTag.textContent = `⛔️ OUT OF STOCK`
            inStockTag.style.color = 'red'
            buyBtn.disabled = true;
        }


 
       let newInventory = {inventory: availableUnits}
       let response = await fetch(`http://localhost:5000/update_quantity/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newInventory)
    })
    let newData = await response.json();


    })



    //1.6 description of the item
    let descriptionTag = document.createElement("p") 
    descriptionTag.textContent = finalData.description
    


    console.log(finalData)
    //2 display above created elements on the page
    displayDbDatatoHTML(pTag)
    displayDbDatatoHTML(inStockTag)
    
    displayDbDatatoHTML(imgTag)
    displayDbDatatoHTML(priceTag)
    displayDbDatatoHTML(descriptionTag)
    displayDbDatatoHTML(buyBtn)

  }
  getClickedProduct()