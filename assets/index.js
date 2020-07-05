var apiReturn;
var clothings = document.getElementById('clothingProduct')
var accessories = document.getElementById('accessoriesProduct')
var url = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product'


$(document).ready(function(){
    $('.carousel').slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
    });
})














var productsApi = new XMLHttpRequest();
productsApi.open('GET',url,true)
productsApi.send()
productsApi.onreadystatechange = function () {
    if (this.readyState==4 ) {
        apiReturn = JSON.parse(this.responseText)
        createProductCards(0,5,clothings);
        createProductCards(5, apiReturn.length ,accessories);
    }
}

function createProductCards(starts,ends,parent) {
    for (let i = starts; i < ends; i++) {
        var prod = createProduct(apiReturn[i].id,apiReturn[i].photos[0],apiReturn[i].name,apiReturn[i].price,apiReturn[i].brand)
        parent.appendChild(prod)
    }
}

function createProduct(id,img,name,pprice,brand) {

    var product = document.createElement('div')
    var productLink = document.createElement('a')
    var productImg = document.createElement('img')
    var productDesc = document.createElement('div')
    var productName = document.createElement('h3')
    var productBrand = document.createElement('h4')
    var productPrice = document.createElement('p')
    
    product.classList.add('product')
    productLink.classList.add('product-link')
    productImg.classList.add('product-img')
    productPrice.classList.add('product-price')
    productBrand.classList.add('product-brand')
    productName.classList.add('product-name')
    productDesc.classList.add('product-desc')
    
    productImg.src = img
    productNameTxt= name;
    productBrandTxt= brand;
    productPriceTxt= "Rs "+ pprice;
    productLink.href = "details.html?id="+id;

    productPrice.innerText = productPriceTxt
    productBrand.innerText = productBrandTxt
    productName.innerText = productNameTxt
    
    productDesc.appendChild(productName)
    productDesc.appendChild(productBrand)
    productDesc.appendChild(productPrice)

    productLink.appendChild(productImg)

    product.appendChild(productLink)
    product.appendChild(productDesc)
    
    return product
}