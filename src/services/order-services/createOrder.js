const Address = require('../../models/address-model');
const Order = require('../../models/order-model');
const OrderItem = require('../../models/orderitem-model');
const thirdCartService = require("../cart-services/findUserCart");

// async function createOrder(user, shippAddress) {
//     let address;
//     if (shippAddress._id) {
//       let existedAddress = await Address.findById(shippAddress._id);
//       address = existedAddress;
//     } else {
//       address = new Address(shippAddress);
//       address.user = user;
//       await address.save();
  
//       user.addresses.push(address);
//       await user.save();
//     }
  
//     const cart = await thirdCartService.findUserCart(user._id);
//     const orderItems = [];
  
//     for (const item of cart.cartItems) {
//       const orderItem = new OrderItem({
//         price: item.price,
//         product: item.product,
//         quantity: item.quantity,
//         size: item.size,
//         userId: item.userId,
//         discountedPrice: item.discountedPrice,
//       });
  
//       const createdOrderItem = await orderItem.save();
//       orderItems.push(createdOrderItem);
//     }
  
//     const createdOrder = new Order({
//       user,
//       orderItems,
//       totalPrice: cart.totalPrice,
//       totalDiscountedPrice: cart.totalDiscountedPrice,
//       discount: cart.discount,
//       totalItem: cart.totalItem,
//       shippingAddress: address,
//       orderDate: new Date(),
//       orderStatus: "PENDING", // Assuming OrderStatus is a string enum or a valid string value
//       "paymentDetails.status": "PENDING", // Assuming PaymentStatus is nested under 'paymentDetails'
//       createdAt: new Date(),
//     });
  
//     const savedOrder = await createdOrder.save();
  
//     // for (const item of orderItems) {
//     //   item.order = savedOrder;
//     //   await item.save();
//     // }
  
//     return savedOrder;
//   }

// module.exports = { createOrder };
async function createOrder(user, shippAddress) {
    let address;
    if (shippAddress._id) {
        let existedAddress = await Address.findById(shippAddress._id);
        address = existedAddress;
    } else {
        address = new Address(shippAddress);
        address.user = user;
        await address.save();

        // Initialize the addresses array if it is undefined
        if (!user.addresses) {
            user.addresses = [];
        }

        user.addresses.push(address);
        await user.save();
    }

    const cart = await thirdCartService.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.product.price,
            product: item.product._id,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.product.discountedPrice,
        });
console.log(orderItem);

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippAddress: address,
        orderDate: new Date(),
        orderStatus: "PENDING",
        "paymentDetails.status": "PENDING",
        createdAt: new Date(),
    });

    const savedOrder = await createdOrder.save();

    return savedOrder;
}
module.exports = { createOrder };
