var allInCart = fetchCart()
var totalAmt = 0
var addWith = document.getElementsByClassName('products-list')[0]

for (let i = 0; i < allInCart.length; i++) {
    // var card = createCartCard(allInCart[i].name,allInCart[i].price,allInCart[i].qty,allInCart[i].img)
    // addWith.appendChild(card)
}

// document.getElementById('itemInCart').innerText = allInCart.length
// document.getElementsByClassName('total-amt')[0].innerText = totalAmt

function createCartCard(pName,pPrice,pQty,pImg) {
    var price = pQty * pPrice
    totalAmt += price

    var cartProduct = document.createElement('div')
    var div1 = document.createElement('div')
    var checkoutProductImg = document.createElement('img')
    var div2 = document.createElement('div')
    var h4 = document.createElement('h4')
    var p1 = document.createElement('p')
    var p2 = document.createElement('p')

    cartProduct.classList.add('cart-product')
    checkoutProductImg.classList.add('checkout-product-img')
    h4.classList.add('checkout-prod-name')
    
    h4.innerHTML = pName
    checkoutProductImg.alt = pName
    checkoutProductImg.src = pImg
    p1.innerHTML = "Qty: "+ pQty
    p2.innerHTML = "Amount: Rs <span>"+ price +"</span>"

    div1.appendChild(checkoutProductImg)
    div2.appendChild(h4)
    div2.appendChild(p1)
    div2.appendChild(p2)

    cartProduct.appendChild(div1)
    cartProduct.appendChild(div2)

    return cartProduct
}






var apiReturn;
var pId = location.search.split('=')[1];
var url = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/'

var productsApi = new XMLHttpRequest();
productsApi.open('GET',url+pId,true)
// productsApi.send()
productsApi.onreadystatechange = function () {
    if (this.readyState==4 ) {
        apiReturn = JSON.parse(this.responseText)
    }
}