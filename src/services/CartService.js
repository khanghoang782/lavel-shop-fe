


export function getCartData(){
    const data = localStorage.getItem("CART_DATA");

    return data?JSON.parse(data):[];
}
function saveCartData(data){
    localStorage.setItem("CART_DATA",JSON.stringify(data));
}
export function saveItem(product,quantity){
    //console.log(product);
    if(quantity>0){
        let cart=getCartData();
        const checkItemExist = cart.findIndex((item) => item.product_id === product.id);

        if(checkItemExist>-1){
            cart[checkItemExist].quantity+=quantity||1;
        }else {
            cart.push({product_id:product.id,product_name:product.product_name,product_price:product.price,quantity:quantity});
        }
        saveCartData(cart);
    }
}
export function deleteItem(id){
    let cart=getCartData();
    cart = cart.filter(item => item.product_id !== Number(id));

    saveCartData(cart);
}
export function getTotal(){
    let cart=getCartData();
    let sum=0;
    cart.forEach(item=>{
        sum+=item.product_price*item.quantity;
    });
    return sum;
}
