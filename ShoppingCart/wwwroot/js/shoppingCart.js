
// js for index.cshtml

var cartItems = []; // Initialize an array to store cart items
var cartTotal = 0; // Initialize the cart total

// when add to cart button is pressed add the items below the <hr> element
function addToCart(productTitle, price) {
    var cartDiv = document.getElementById('cart');
    var cartItem = document.createElement('div');
    cartItem.innerHTML = productTitle + '<br>' + ' <button type="button" class="btn btn-danger" onclick="removeFromCart(this, ' + price + ')">Remove</button>';
    cartDiv.appendChild(cartItem);

    // Update total
    cartItems.push(productTitle);
    cartTotal += price;
    updateTotal();
}

// remove the item from below when the button is clicked
function removeFromCart(button, price) {
    var cartDiv = document.getElementById('cart');
    var cartItem = button.parentNode;
    cartDiv.removeChild(cartItem);

    // Update total
    cartTotal -= price;
    updateTotal();
}

// updates the total to include all the added items
function updateTotal() {
    var totalDiv = document.getElementById('total');
    totalDiv.innerText = 'Total: $' + cartTotal.toFixed(2);
}

//send the items to the checkout result page and redirect to it
function checkout() {
    window.location.href = "/Home/CheckoutResult?cartItems=" + encodeURIComponent(JSON.stringify(cartItems)) + "&cartTotal=" + encodeURIComponent(cartTotal);
}