
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
            deleteBtn.style.padding = '10px'
            deleteBtn.style.margin = '3px solid green'
            deleteBtn.style.borderRadius = '15%';

            let editBtn = document.createElement("button");
            editBtn.textContent = "Edit this product"
            editBtn.style.color = "blue"
            editBtn.style.padding = '10px'
            editBtn.style.margin = '1px solid green'
            editBtn.style.borderRadius = '15%';

            let lineTag = document.createElement("br")
            lineTag.textContent = `<br> <br><br><br>`
        



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
            containerElement.appendChild(lineTag)

            //edit & delete buttons functionality

            //edit button

            editBtn.addEventListener('click', async(event) => {
                let productID = event.target.databaseId;
                window.location.href = `./edit_product?idInQuery=${object._id}`
            })
            
            //delete Button
            deleteBtn.addEventListener('click', async(event) => {
                let userPreference = '';
                let popUpMessageTag = document.createElement("p")
                
                if(confirm(`Are you sure you want to delete ${object.name} from the store?`) == true){
                    let productId = object._id;
                    let response = await fetch(`http://localhost:5000/delete_product/${productId}`, {
                        method: "DELETE"
      
                    })
                    userPreference = `
                    The item has been deleted.
                    `
                    window.location.href = '../display_product'
                    
                }else {
                    userPreference = `${object.name} not deleted`
                    
                }
                alert(userPreference)

            })
            
            
        });
    })
}
getData()




