function saveToCrudCrud(event){
    event.preventDefault();

    const price = event.target.price.value;
    const product = event.target.product.value;
    const category = event.target.category.value;

    const itemDetails = {
        price,
        product,
        category
    }
    
    axios.post("https://crudcrud.com/api/e5102070b43346efa90c0a2d3e2f3fe3/product",itemDetails)
    .then((res)=>{
        showProductDetails(res.data);
    })
    .catch(err=>console.log("ERROR"));

   
}

function showProductDetails(itemDetails){
    const elecItem = document.getElementById('Electronic items');
    const food = document.getElementById('Food');
    const skin = document.getElementById('Skincare');


    const childElement = document.createElement('li');
    childElement.className = 'list-group-item';
    childElement.appendChild(document.createTextNode(`Selling price:${itemDetails.price}, Product Name:${itemDetails.product}, Category:${itemDetails.category}`));

    const delbtn = document.createElement('button');
    delbtn.className = 'btn btn-danger btn-sm float-right delete';
    delbtn.textContent = 'Delete';

    childElement.appendChild(delbtn);

    if(itemDetails.category === 'Electronic items'){
        elecItem.appendChild(childElement);
    }
    if(itemDetails.category === 'Food'){
        food.appendChild(childElement);
    }
    if(itemDetails.category === 'Skincare'){
        skin.appendChild(childElement);
    }

    delbtn.onclick = () =>{
        const userId = itemDetails._id;
        axios.delete(`https://crudcrud.com/api/e5102070b43346efa90c0a2d3e2f3fe3/product/${userId}`)
        .then(()=>{
            if(itemDetails.category === 'Electronic items' ){
                elecItem.removeChild(childElement);
            }
            if(itemDetails.category === 'Food' ){
                food.removeChild(childElement);
            }
            if(itemDetails.category === 'Skincare' ){
                skin.removeChild(childElement);
            }
        })
        .catch(err=> console.log(err));
    }

}

window.addEventListener('DOMContentLoaded', ()=>{
    axios.get("https://crudcrud.com/api/e5102070b43346efa90c0a2d3e2f3fe3/product")
    .then((res)=>{
        for(var i=0;i<res.data.length;i++)
        {
            showProductDetails(res.data[i]);
        }
    })
    .catch(err=>console.log(err));
})