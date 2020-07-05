function fetchCart() {
    var cPrev =  localStorage.getItem('cart')
    return cPrev = cPrev? JSON.parse(cPrev) : []
}
function totalInCart(cItems=0) {
    if (!cItems) {
        var inCart = fetchCart()
        for (let i = 0; i < inCart.length; i++) {
            cItems += inCart[i].qty
        }
    }
    var noInCart = document.getElementsByClassName('cart-item-no')[0]
    noInCart.innerHTML = cItems
}
totalInCart()