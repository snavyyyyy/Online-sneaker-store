const product = {
    "ID": uuidv4(),
    "name": "Nike Air Force 1",
    "price": 299.99,
    "isOnDiscount": false,
    "discountedPrice": null,
    "type": "Woman's shoes",
    "description": "Let classic, easy-to-wear AF-1 style rise to the occasion with the Nike Air Force 1 PLT.AF.ORM. Its elegantly shaped and lifted midsole delivers a proud, new voice to the hoops franchise. The leather on the upper breaks in easily and ages to soft perfection while the sculpted collar and pillowy heel keep it comfy. Captivate your audience.",
    "sizes": [38, 39, 40, 41, 42, 43, 44, 45],
    "images": [
      "./images/products/5ae9ae5c-5ef7-4e43-af61-b59f0919dbad/1.png",
      "./images/products/5ae9ae5c-5ef7-4e43-af61-b59f0919dbad/2.png",
      "./images/products/5ae9ae5c-5ef7-4e43-af61-b59f0919dbad/3.png",
      "./images/products/5ae9ae5c-5ef7-4e43-af61-b59f0919dbad/4.png",
      "./images/products/5ae9ae5c-5ef7-4e43-af61-b59f0919dbad/5.png"
    ]
  }
document.getElementById("addProductForm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const productName=document.getElementById("productName");
    if(productName.value.length<3){
      productName.classList.add("is-invalid");
      productName.classList.remove("is-valid");
      return;
    }
    else if(productName.value.length>=3){
      productName.classList.add("is-valid");
      productName.classList.remove("is-invalid");
    }
    const productDescription=document.getElementById("productDescription");
    console.log(productDescription);
    if(productDescription.value==""){
      productDescription.classList.add("is-invalid");
      productDescription.classList.remove("is-valid");
      return;
    }
    else if(!productDescription.value==""){
      productDescription.classList.add("is-valid");
      productDescription.classList.remove("is-invalid");
    }
    const productPrice=document.getElementById("productPrice");
    product.name=productName.value;
    product.description=productDescription.value;
    product.price=productPrice.value;
    await fetch("http://localhost:3000/add-product",{
        method:"POST",
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
       body:JSON.stringify(product)
     })
  })
  
  document.getElementById("calculateFeesForm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const membershipType=document.getElementById("membershipType").value;
    const membershipDuration=document.getElementById("membershipDuration").value;
    const membershipCost=document.getElementById("membershipCost");
    if(membershipDuration=="3"){
      membershipCost.innerHTML=`Membership price: €${membershipType*3}`;
    }
    if(membershipDuration=="6"){
      membershipCost.innerHTML=`Membership price: <s class="text-danger">€${membershipType}</s> €${membershipType*6*0.9}`;
    }
    if(membershipDuration=="12"){
      membershipCost.innerHTML=`Membership price: <s class="text-danger">€${membershipType}</s> €${membershipType*12*0.8}`;
    }
   });
   
   function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}
  