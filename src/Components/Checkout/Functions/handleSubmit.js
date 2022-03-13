
export const handleSubmit = (userInfo, carts, allValid) => {
  console.log(userInfo, carts, allValid)

  if (!allValid.name && !allValid.email && !allValid.tels && !allValid.address){
    console.log(userInfo, carts, allValid)
    const products = []
    carts.forEach(cart => {
      products.push({
        'product_id':cart.product['product_id'],
        'product_price': cart.product['product_price'],
        'quantity': cart.quantity,
        'size': cart.size
      })
    })
    const payload = {
      ...userInfo,
      'products': products
    }
    console.log(payload)
  }
}
