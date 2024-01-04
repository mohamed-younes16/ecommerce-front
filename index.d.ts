type DateTime = string;

type sizevalue = "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  billBoards: billBoard[];
  categories: category[];
  sizes: size[];
  colors: color[];
  products: product[];
  orders: order[];
}

interface billBoard {
  id: string;
  storeId: string;
  store: Store;
  imageUrl: string;
  label: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  categories: category[];
  labelColor: string;
}

interface category {
  id: string;
  storeId: string;
  store: Store;
  billboardId: string;
  billboard: billBoard;
  name: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  products: product[];
  logo: string;
}

interface size {
  id: string;
  storeId: string;
  store: Store;
  name: string;
  value: sizevalue;
  createdAt: DateTime;
  updatedAt: DateTime;
  products: product[];
}

interface color {
  id: string;
  storeId: string;
  store: Store;
  name: string;
  value: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  products: product[];
}

interface product {
  id: string;
  storeId: string;
  store: Store;
  name: string;
  sizeId: string;
  size: size;
  categoryId: string;
  category: category;
  colorId: string;
  color: color;
  price: number;
  description: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  isArchived: boolean;
  isFeatured: boolean;
  images: ImageType[];
  orderItems: orderItem[];
}

interface ImageType {
  id: string;
  productId: string;
  product: product;
  url: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

interface order {
  id: string;
  storeId: string;
  store: Store;
  phoneNumber: string;
  address: string;
  isPaid: boolean;
  items: orderItem[];
  createdAt: DateTime;
  updatedAt: DateTime;
}

interface orderItem {
  id: string;
  orderId: string;
  store: order;
  productId: string;
  Product: product;
  
}
