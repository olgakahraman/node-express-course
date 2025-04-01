const EventEmitter = require('events');

const coffeeShop = new EventEmitter();

coffeeShop.on('order-ready', (orderNumber, drink) => {
  console.log(
    `Order ${orderNumber}: Your ${drink} is ready!`
  );
});

coffeeShop.emit('order-ready', 101, 'latte');
coffeeShop.emit('order-ready', 102, 'cappuccino');
