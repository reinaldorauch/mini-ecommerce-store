interface PaginatedResult<T> {
  total: number;
  data: T[];
}

interface Product {
  _id: string;
  title: number;
  price: number;
  images: string[];
  itemsInStock: number;
}
