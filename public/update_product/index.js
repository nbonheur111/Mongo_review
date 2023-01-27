
console.log("Oh I am already linked to update product page");

let containerElement = document.getElementById("container");

const getData = async () =>{
    let data = await fetch('/all_products');
    data.json().then((parsedData) => {
        console.log(parsedData);

        parsedData.forEach(object => {
            //red if inventory is under 5 items left

            let quantityPTag = document.createElement("p");
                quantityPTag.textContent = `${object.inventory} remaining`

            let img = document.createElement("img")
                img.src = object.photo
                img.databaseId = object._id

            let pTag = document.createElement("p");
                pTag.textContent = object.name;

                //create delete and edit button 
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete"
            deleteBtn.style.backgroundColor = "red"

            let editBtn = document.createElement("button");
            editBtn.textContent = "Edit this product"
            editBtn.style.color = "blue"


            if(object.inventory <= 5){
                pTag.style.color = "red"
            }else if(object.inventory <= 0){
                //make the buy button disapear
            }else {
                pTag.style.color = "green"

            }

            containerElement.appendChild(pTag);
            containerElement.appendChild(img)
            containerElement.appendChild(quantityPTag)
            containerElement.appendChild(editBtn)
            containerElement.appendChild(deleteBtn)

            //edit & delete buttons functionality

            //edit button

            editBtn.addEventListener('click', async(event) => {
                let productID = event.target.databaseId;
                window.location.href = `./edit_product?idInQuery=${object._id}`
            })
            
            //delete Button
            deleteBtn.addEventListener('click', async(event) => {
                let productId = object._id;
                let response = await fetch(`http://localhost:5000/delete_product/${productId}`, {
                    method: "DELETE"
  
                })

            })
            
            
        });
    })
}
getData()




