db.products.insertMany([
  {
    _id: ObjectId("200000000000000000000001"),
    name: "Samsung Galaxy S25",
    category: "Mobiles",
    brand: "Samsung",
    price: Decimal128("74999.00"),
    stock: 25,
    available: true,
    specifications: {
      ram: "12GB",
      storage: "256GB",
      color: "Black"
    },
    tags: ["5G", "Android", "Smartphone"]
  },
  {
    _id: ObjectId("200000000000000000000002"),
    name: "iPhone 16",
    category: "Mobiles",
    brand: "Apple",
    price: Decimal128("79999.00"),
    stock: 20,
    available: true,
    specifications: {
      ram: "8GB",
      storage: "128GB",
      color: "Blue"
    },
    tags: ["5G", "iOS", "Smartphone"]
  },
  {
    _id: ObjectId("200000000000000000000003"),
    name: "Dell Inspiron 15",
    category: "Computers",
    brand: "Dell",
    price: Decimal128("58999.00"),
    stock: 15,
    available: true,
    specifications: {
      ram: "16GB",
      storage: "512GB SSD",
      processor: "Intel i5"
    },
    tags: ["Laptop", "Windows"]
  },
  {
    _id: ObjectId("200000000000000000000004"),
    name: "HP Pavilion",
    category: "Computers",
    brand: "HP",
    price: Decimal128("64999.00"),
    stock: 12,
    available: true,
    specifications: {
      ram: "16GB",
      storage: "512GB SSD",
      processor: "Intel i5"
    },
    tags: ["Laptop", "Windows"]
  },
  {
    _id: ObjectId("200000000000000000000005"),
    name: "Sony WH-1000XM5",
    category: "Electronics",
    brand: "Sony",
    price: Decimal128("29999.00"),
    stock: 30,
    available: true,
    specifications: {
      type: "Wireless Headphone",
      battery: "30 Hours"
    },
    tags: ["Audio", "Wireless", "Bluetooth"]
  },
  {
    _id: ObjectId("200000000000000000000006"),
    name: "boAt Airdopes 141",
    category: "Electronics",
    brand: "boAt",
    price: Decimal128("1499.00"),
    stock: 100,
    available: true,
    specifications: {
      type: "TWS",
      battery: "42 Hours"
    },
    tags: ["Audio", "Bluetooth"]
  },
  {
    _id: ObjectId("200000000000000000000007"),
    name: "Nike Air Max",
    category: "Fashion",
    brand: "Nike",
    price: Decimal128("8999.00"),
    stock: 40,
    available: true,
    specifications: {
      size: "9",
      material: "Mesh"
    },
    tags: ["Shoes", "Sports"]
  },
  {
    _id: ObjectId("200000000000000000000008"),
    name: "Adidas Running Shoes",
    category: "Fashion",
    brand: "Adidas",
    price: Decimal128("5999.00"),
    stock: 35,
    available: true,
    specifications: {
      size: "9",
      material: "Synthetic"
    },
    tags: ["Shoes", "Running"]
  },
  {
    _id: ObjectId("200000000000000000000009"),
    name: "The Psychology of Money",
    category: "Books",
    brand: "Penguin",
    price: Decimal128("399.00"),
    stock: 80,
    available: true,
    specifications: {
      author: "Morgan Housel",
      pages: 256
    },
    tags: ["Finance", "Self Help"]
  },
  {
    _id: ObjectId("200000000000000000000010"),
    name: "Atomic Habits",
    category: "Books",
    brand: "Penguin",
    price: Decimal128("499.00"),
    stock: 75,
    available: true,
    specifications: {
      author: "James Clear",
      pages: 320
    },
    tags: ["Self Help", "Productivity"]
  },
  {
    _id: ObjectId("200000000000000000000011"),
    name: "Samsung 55 Inch Smart TV",
    category: "Electronics",
    brand: "Samsung",
    price: Decimal128("54999.00"),
    stock: 10,
    available: true,
    specifications: {
      screen: "55 Inch",
      resolution: "4K"
    },
    tags: ["TV", "4K", "Smart TV"]
  },
  {
    _id: ObjectId("200000000000000000000012"),
    name: "Canon EOS 1500D",
    category: "Electronics",
    brand: "Canon",
    price: Decimal128("42999.00"),
    stock: 8,
    available: true,
    specifications: {
      megapixel: 24,
      lens: "18-55mm"
    },
    tags: ["Camera", "DSLR"]
  },
  {
    _id: ObjectId("200000000000000000000013"),
    name: "Fastrack Analog Watch",
    category: "Fashion",
    brand: "Fastrack",
    price: Decimal128("2499.00"),
    stock: 50,
    available: true,
    specifications: {
      strap: "Leather",
      waterResistant: true
    },
    tags: ["Watch", "Men"]
  },
  {
    _id: ObjectId("200000000000000000000014"),
    name: "Logitech Gaming Mouse",
    category: "Gaming",
    brand: "Logitech",
    price: Decimal128("2999.00"),
    stock: 45,
    available: true,
    specifications: {
      dpi: 12000,
      buttons: 6
    },
    tags: ["Gaming", "Mouse"]
  },
  {
    _id: ObjectId("200000000000000000000015"),
    name: "PlayStation 5",
    category: "Gaming",
    brand: "Sony",
    price: Decimal128("49999.00"),
    stock: 7,
    available: true,
    specifications: {
      storage: "1TB",
      type: "Console"
    },
    tags: ["Gaming", "Console"]
  }
]);
