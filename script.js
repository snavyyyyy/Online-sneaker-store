var happyHourDate = new Date("May 25, 2025 00:00:00").getTime();
let data;
let selectedSize = null;
let items=[];
let selectedItem=null;
const loadProducts = async (url) => {
  const response = await fetch(url);
  return response.json();
};
setInterval(() => {
  var today = new Date().getTime();
  var elapsed = happyHourDate - today;
  var days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  var hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
  document.getElementById(
    "happy-hour-header"
  ).innerHTML = `<span class="text-danger"> HAPPY HOUR TIME LEFT: </span> ${days} DAYS ${hours} HOURS ${minutes} MINUTES ${seconds} SECONDS`;
}, 1000);

setInterval(() => {
  var today = new Date().toLocaleString();
  document.getElementById("date-and-time").innerHTML = `${today}`;
}, 1000);

const loadPopularProducts = async () => {
  data = await loadProducts("products.json");
  if (data) {
    renderProductCards(data,"popular-products");
  }
};

const loadAllProducts=async()=>{
    data=await loadProducts("products.json");
    if(data){
      renderProductCards(data,"all-products");
    }
}

const renderProductCards=(data,parentElement)=>{
  data.forEach((product, index) => {
    document.getElementById(parentElement).innerHTML += `
  <div class="col-md-4 mt-4 justify-content-center d-flex">
  <div class="card d-flex custom-card" onmouseenter="startSlideShow(${index})" onmouseleave="stopSlideShow(${index})">
    <img src="${product.images[0]}" class="card-img-top" alt="${
      product.name
    }" id="product-image-${index}">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text text-success">€${
        product.isOnDiscount
          ? product.discountedPrice +
            ' <s class="text-danger">€' +
            product.price +
            "</s>"
          : product.price
      }</p>
      <a href="productDetails.html?productId=${
        product.ID
      }" class="btn btn-outline-dark">Shop &nbsp;&nbsp;<i class="fa-solid fa-arrow-right"></i></a>
    </div>
  </div>
</div> `;
  });
}

let slideShow;
let maxImages;
const startSlideShow = (index) => {
  let counter = 1;
  const images = data[index].images;
  maxImages = images.length - 1;
  console.log(maxImages);
  const element = document.getElementById(`product-image-${index}`);
  slideShow = setInterval(() => {
    if (counter > maxImages) {
      counter = 0;
    }
    element.style.opacity = 0;
    setTimeout(() => {
      element.src = images[counter];
      element.style.opacity = 1;
      counter++;
    }, 500);
  }, 2000);
};

const stopSlideShow = (index) => {
  const element = document.getElementById(`product-image-${index}`);
  clearInterval(slideShow);
  element.src = data[index].images[0];
};

const onDetailsPageLoad = async () => {
  data = await loadProducts("products.json");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");
  const product = data.find((element) => element.ID === productId);
  selectedItem=product;
  document.getElementById("product-img").src = product.images[0];
  document.getElementById("product-name").innerHTML = product.name;
  document.getElementById("product-type").innerHTML = product.type;
  document.getElementById("product-description").innerHTML=product.description;
  if (product.isOnDiscount) {
    document.getElementById(
      "product-price"
    ).innerHTML = `<s class="text-danger">€${product.price}</s> €${product.discountedPrice}`;
  } else {
    document.getElementById("product-price").innerHTML = "€" + product.price;
  }
  product.sizes.forEach((s) => {
    document.getElementById(
      "product-sizes"
    ).innerHTML += `<button value="${s}" type="button" class="btn btn-outline-dark px-4 d-flex size-button mt-2 py-2 mx-2">${s}</button>`;
  });
  onSizeButtonClick();
  const imageGallery=document.getElementById("image-gallery");
  product.images.forEach((img)=>{
    imageGallery.innerHTML+=` <img class="small-image" style="width: 90px; height: 105px;" src="${img}">`
  })
  onMiniImageHover();
  document.getElementById("number-of-items").innerHTML=localStorage.getItem("item-count")?localStorage.getItem("item-count"):0;
  console.log(product);
};

const onSizeButtonClick = () => {
  const buttons = [...document.getElementsByClassName("size-button")];
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      selectedSize=button.value;
      const alert = document.getElementById("size-alert");
      alert.classList.add("d-none");
      buttons.forEach((b) => {
        b.classList.remove("btn-dark");
        b.classList.add("btn-outline-dark");
      });
      const clickedButton = e.target;
      clickedButton.classList.add("btn-dark");
      clickedButton.classList.remove("btn-outline-dark");
    });
  });
};

const onAddToBagButtonClick = () => {
  if (!selectedSize) {
    const alert = document.getElementById("size-alert");
    alert.classList.remove("d-none");
  }
  else{
  items.push(selectedItem);
  document.getElementById("number-of-items").innerHTML=items.length;
  localStorage.setItem("item-count",items.length);
  document.getElementById("add-to-cart-img").src=selectedItem.images[0];
  document.getElementById("product-details").innerHTML=`
  <p>${selectedItem.name}</p> 
  <p>${selectedItem.type}</p>
  <p>Price:€ ${selectedItem.price}</p> 
  <p>Size:${selectedSize}</p>
  `
  document.getElementById("item-added-success").style.opacity=1;
  setTimeout(()=>{
    document.getElementById("item-added-success").style.opacity=0;
  },3000)}  
};

const onMiniImageHover = ()=>{
  const images=[...document.getElementsByClassName("small-image")];
  images.forEach((i)=>{
    i.addEventListener("mouseenter",(e)=>{
      document.getElementById("product-img").src=e.target.src;
      i.style.opacity=0.7;   
    })
    i.addEventListener("mouseleave",(e)=>{
      i.style.opacity=1;
      
    })
  })
}

