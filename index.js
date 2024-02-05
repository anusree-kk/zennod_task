const productPrices = {
    "Product A": 20,
    "Product B": 40,
    "Product C": 50
  } 
  function calculateDiscount(cart) {
    let discount = { name: "No discount", amount: 0 }
    if (cart.total > 200) {
      discount = { name: "Flat $10 discount", amount: 10 }
    } else if (cart.totalQuantity > 20) {
      discount = { name: " 10% discount", amount: cart.total * 0.1 }
    } else if (cart.totalQuantity > 30) {
      for (const product in cart.products) {
        if (cart.products[product] > 15) {
          discount = { name: "Tiered 50% discount", amount: (cart.products[product] - 15) * productPrices[product] * 0.5 }
        }
      }
    }return discount;
  } 
  function calculateShippingFee(cart) {
    const packages = parseInt(cart.totalQuantity / 10)
    return packages * 5
  }
  function calculateGiftWrapFee(cart) {
    let giftWrapFee = 0;
    for (const product in cart.products) {
      giftWrapFee += cart.products[product]
    }
    return giftWrapFee
  }
  function processCart() {
    const cart = {
      products: {},
      totalQuantity: 0,
      total: 0
    }
    for (const product in productPrices) {
      const quantity = parseInt(prompt(`Enter quantity of ${product}:`));
      const isGiftWrapped = prompt(`Is ${product} wrapped as a gift? (yes/no):`) === 'yes'
      cart.products[product] = quantity
      cart.totalQuantity += quantity
      cart.total += quantity * productPrices[product]
      if (isGiftWrapped) {
        cart.total += quantity
      }}
    const discount = calculateDiscount(cart)
    const shippingFee = calculateShippingFee(cart)
    const giftWrapFee = calculateGiftWrapFee(cart)
    const total = cart.total - discount.amount + shippingFee + giftWrapFee
  
    console.log("Product Name\tQuantity\tTotal")
    for (const product in cart.products) {
      console.log(`${product}\t\t${cart.products[product]}\t\t${cart.products[product] * productPrices[product]}`)
    }
    console.log(`\nSubtotal: ${cart.total}`)
    console.log(`Discount Applied: ${discount.name} (${discount.amount})`)
    console.log(`Shipping Fee: ${shippingFee}`)
    console.log(`Gift Wrap Fee: ${giftWrapFee}`)
    console.log(`Total: ${total}`)
  }
  processCart()
  