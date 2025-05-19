export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'espresso' | 'coffee' | 'specialty';
}

export interface OrderItem extends MenuItem {
  quantity: number;
}