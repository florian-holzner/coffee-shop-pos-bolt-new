import { useState } from 'react';
import { menuItems } from './data/menu.ts';
import { OrderItem } from './types.ts';

function App() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addToOrder = (menuItem: typeof menuItems[0]) => {
    setOrderItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === menuItem.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...menuItem, quantity: 1 }];
    });
  };

  const removeFromOrder = (itemId: string) => {
    setOrderItems(currentItems =>
      currentItems
        .map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Coffee Shop POS</h1>
      
      <div>
        <div>
          <h2>Menu</h2>
          <div>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => addToOrder(item)}
              >
                <div>{item.name}</div>
                <div>${item.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2>Current Order</h2>
          {orderItems.length === 0 ? (
            <p>No items in order</p>
          ) : (
            <div>
              {orderItems.map(item => (
                <div key={item.id}>
                  <div>
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                  </div>
                  <div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromOrder(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div>
                <div>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    alert('Order completed!');
                    setOrderItems([]);
                  }}
                >
                  Complete Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;