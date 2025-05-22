import { useState } from 'react';
import { menuItems } from './data/menu';
import { OrderItem } from './types';

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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Coffee Shop POS</h1>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <div className="grid grid-cols-2 gap-4">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => addToOrder(item)}
                className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-sm">${item.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Order</h2>
          {orderItems.length === 0 ? (
            <p className="text-gray-500 text-center">No items in order</p>
          ) : (
            <div className="space-y-4">
              {orderItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-600">x{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromOrder(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    alert('Order completed!');
                    setOrderItems([]);
                  }}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
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