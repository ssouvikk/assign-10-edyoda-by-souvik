var apiReturn;
var pId = location.search.split('=')[1];
var url = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/'

var productsApi = new XMLHttpRequest();
productsApi.open('GET',url+pId,true)
productsApi.send()
productsApi.onreadystatechange = function () {
    if (this.readyState==4 ) {
        apiReturn = JSON.parse(this.responseText)
        renderText()
        renderImg()
    }
}

function renderText() {
    var pName = document.getElementsByTagName('h1')[0]
    var pBrand = document.getElementsByClassName('product-brand')[0]
    var pPrice = document.getElementsByClassName('price')[0]
    var description = document.getElementsByClassName('description')[0]
    description.innerHTML = apiReturn.description
    pPrice.innerHTML = 'Price: Rs <span>'+ apiReturn.price +'</span>'
    pBrand.innerHTML = apiReturn.brand
    pName.innerHTML= apiReturn.name
}

function renderImg() {
    var bigImgDiv = document.getElementsByClassName('product-img')[0]
    var bigImg = document.createElement('img')
    bigImg.src = apiReturn.photos[0]
    bigImg.alt = apiReturn.name
    bigImgDiv.appendChild(bigImg)
    var allImg = document.getElementsByClassName('product-multi-img')[0]
    for (let i = 0; i < apiReturn.photos.length; i++) {
        var singleImg = document.createElement('img')
        singleImg.src =  apiReturn.photos[i]
        singleImg.alt =  apiReturn.name
        singleImg.addEventListener('click',toggleActive)
        if (i==0) {
            singleImg.classList.add('active-img')
        }
        allImg.appendChild(singleImg)
    }
}

function toggleActive() {
    var bigImg = document.querySelector('.product-img img')
    bigImg.src = this.src;
    var activeNow = document.querySelector('.product-multi-img .active-img')
    activeNow.classList.remove('active-img')
    this.classList.add('active-img')
}

var addToCartBtn = document.getElementsByClassName('add-to-cart')[0]
addToCartBtn.addEventListener('click',addToCart)

function addToCart() {
    var prevCart = fetchCart()
    var totalQty = 0;
    var updated = false
    for (let i = 0; i < prevCart.length; i++) {
        if(prevCart[i].id==pId){
            prevCart[i].qty += 1 
            updated = true;
        }
        totalQty += prevCart[i].qty
    }
    if(!updated){
        value ={
            id:pId,
            qty:1,
            price: apiReturn.price,
            img:apiReturn.photos[0],
            name: apiReturn.name
        }
        prevCart.push(value)
        totalQty++
    }
    localStorage.setItem('cart',JSON.stringify(prevCart))
    totalInCart(totalQty)
}