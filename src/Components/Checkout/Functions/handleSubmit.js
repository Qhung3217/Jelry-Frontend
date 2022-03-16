

function fetchInvoiceDetailStore(data){
  const url = 'http://jelry.test/api'
  let urlReq = url + '/invoice'
  fetch(urlReq, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data=>data)
    .catch(err=>console.log(err))
}


export const handleSubmit = (userInfo, carts, allValid) => {
  console.log(userInfo, carts, allValid)

  if (!allValid.name && !allValid.email && !allValid.tels && !allValid.address && !allValid.province && !allValid.ward && !allValid.district){
    console.log(userInfo, carts, allValid)
    const products = []
    carts.forEach(cart => {
      products.push({
        'id':cart.product['product_id'],
        'price': cart.product['product_price'],
        'quantity': cart.quantity,
        'size': cart.size
      })
    })
    const payload = {
      ...userInfo,
      'products': products
    }
    console.log(payload)
    const message = fetchInvoiceDetailStore(payload)
    return message
  }
  
}
