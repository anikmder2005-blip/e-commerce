/* ============================================================================
   DBMS using SQL and MongoDB — Capstone Group Assignment
   Domain: E-Commerce & Retail
   File  : solution.js
   Usage : mongosh <connection_string> solution.js
   ============================================================================
   Collections : users, products, orders, reviews
   Embedding   : users.address (1:1), orders.items (1:Few)
   Referencing : orders.userId -> users._id (1:Many)
                 orders.items.productId -> products._id (N:M)
                 reviews.userId -> users._id, reviews.productId -> products._id (N:M)
   Polymorphism: products.specifications varies by category
                 (Mobiles -> ram/storage/color, Books -> author/pages,
                  Electronics -> type/battery, Fashion -> size/material, etc.)
   ============================================================================ */

use("ecommerceDB");

/* ----------------------------------------------------------------------------
   0. CLEAN SLATE (safe to re-run)
   -------------------------------------------------------------------------- */
db.users.drop();
db.products.drop();
db.orders.drop();
db.reviews.drop();

/* ----------------------------------------------------------------------------
   1. SCHEMA VALIDATION ($jsonSchema)
   -------------------------------------------------------------------------- */

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "phone", "gender", "age", "address", "isActive", "createdAt"],
      properties: {
        name:  { bsonType: "string", description: "must be a string and is required" },
        email: { bsonType: "string", pattern: "^.+@.+\\..+$", description: "must be a valid email" },
        phone: { bsonType: "string" },
        gender:{ enum: ["Male", "Female", "Other"] },
        age:   { bsonType: "int", minimum: 0, maximum: 120 },
        address: {
          bsonType: "object",
          required: ["city", "state", "pincode"],
          properties: {
            city:    { bsonType: "string" },
            state:   { bsonType: "string" },
            pincode: { bsonType: "string" }
          }
        },
        isActive:  { bsonType: "bool" },
        interests: { bsonType: "array", items: { bsonType: "string" } },
        createdAt: { bsonType: "date" }
      }
    }
  },
  validationLevel: "moderate"
});

db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "category", "brand", "price", "stock", "available"],
      properties: {
        name:     { bsonType: "string" },
        category: { bsonType: "string" },
        brand:    { bsonType: "string" },
        price:    { bsonType: "decimal" },
        stock:    { bsonType: "int", minimum: 0 },
        available:{ bsonType: "bool" },
        // 'specifications' is intentionally NOT strictly typed here —
        // it is a polymorphic sub-document whose shape depends on 'category'.
        specifications: { bsonType: "object" },
        tags: { bsonType: "array", items: { bsonType: "string" } }
      }
    }
  },
  validationLevel: "moderate"
});

db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "items", "totalAmount", "paymentMethod", "status", "orderDate"],
      properties: {
        userId: { bsonType: "objectId" },
        items: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["productId", "quantity", "price"],
            properties: {
              productId: { bsonType: "objectId" },
              quantity:  { bsonType: "int", minimum: 1 },
              price:     { bsonType: "decimal" }
            }
          }
        },
        totalAmount:   { bsonType: "decimal" },
        paymentMethod: { enum: ["UPI", "Card", "Cash", "Net Banking"] },
        status:        { enum: ["Processing", "Shipped", "Delivered", "Cancelled"] },
        orderDate:     { bsonType: "date" }
      }
    }
  },
  validationLevel: "moderate"
});

db.createCollection("reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "productId", "rating", "title", "comment", "verifiedPurchase", "createdAt"],
      properties: {
        userId:    { bsonType: "objectId" },
        productId: { bsonType: "objectId" },
        rating:    { bsonType: "int", minimum: 1, maximum: 5 },
        title:     { bsonType: "string" },
        comment:   { bsonType: "string" },
        verifiedPurchase: { bsonType: "bool" },
        helpful:   { bsonType: "int", minimum: 0 },
        createdAt: { bsonType: "date" }
      }
    }
  },
  validationLevel: "moderate"
});

print("Collections created with $jsonSchema validation.");

/* ----------------------------------------------------------------------------
   2. DATA IMPORT — users (15 documents)
   -------------------------------------------------------------------------- */

db.users.insertMany([
  { _id: ObjectId("100000000000000000000001"), name: "Anik Majumder", email: "anik@gmail.com", phone: "9876543201", gender: "Male", age: 21, address: { city: "Agartala", state: "Tripura", pincode: "799001" }, isActive: true, interests: ["Electronics", "Books"], createdAt: ISODate("2026-01-10") },
  { _id: ObjectId("100000000000000000000002"), name: "Rahul Das", email: "rahul@gmail.com", phone: "9876543202", gender: "Male", age: 22, address: { city: "Kolkata", state: "West Bengal", pincode: "700001" }, isActive: true, interests: ["Mobiles", "Fashion"], createdAt: ISODate("2026-01-12") },
  { _id: ObjectId("100000000000000000000003"), name: "Priya Sharma", email: "priya@gmail.com", phone: "9876543203", gender: "Female", age: 20, address: { city: "Guwahati", state: "Assam", pincode: "781001" }, isActive: true, interests: ["Beauty", "Fashion"], createdAt: ISODate("2026-01-15") },
  { _id: ObjectId("100000000000000000000004"), name: "Sourav Roy", email: "sourav@gmail.com", phone: "9876543204", gender: "Male", age: 23, address: { city: "Agartala", state: "Tripura", pincode: "799002" }, isActive: true, interests: ["Gaming", "Electronics"], createdAt: ISODate("2026-01-18") },
  { _id: ObjectId("100000000000000000000005"), name: "Sneha Paul", email: "sneha@gmail.com", phone: "9876543205", gender: "Female", age: 21, address: { city: "Silchar", state: "Assam", pincode: "788001" }, isActive: true, interests: ["Books", "Fashion"], createdAt: ISODate("2026-01-20") },
  { _id: ObjectId("100000000000000000000006"), name: "Arjun Singh", email: "arjun@gmail.com", phone: "9876543206", gender: "Male", age: 24, address: { city: "Delhi", state: "Delhi", pincode: "110001" }, isActive: true, interests: ["Gaming", "Mobiles"], createdAt: ISODate("2026-01-22") },
  { _id: ObjectId("100000000000000000000007"), name: "Riya Das", email: "riya@gmail.com", phone: "9876543207", gender: "Female", age: 22, address: { city: "Agartala", state: "Tripura", pincode: "799003" }, isActive: true, interests: ["Electronics", "Beauty"], createdAt: ISODate("2026-01-25") },
  { _id: ObjectId("100000000000000000000008"), name: "Amit Kumar", email: "amit@gmail.com", phone: "9876543208", gender: "Male", age: 25, address: { city: "Bangalore", state: "Karnataka", pincode: "560001" }, isActive: true, interests: ["Computers", "Gaming"], createdAt: ISODate("2026-01-28") },
  { _id: ObjectId("100000000000000000000009"), name: "Neha Sharma", email: "neha@gmail.com", phone: "9876543209", gender: "Female", age: 23, address: { city: "Mumbai", state: "Maharashtra", pincode: "400001" }, isActive: true, interests: ["Fashion", "Beauty"], createdAt: ISODate("2026-02-01") },
  { _id: ObjectId("100000000000000000000010"), name: "Karan Das", email: "karan@gmail.com", phone: "9876543210", gender: "Male", age: 21, address: { city: "Agartala", state: "Tripura", pincode: "799004" }, isActive: true, interests: ["Books", "Electronics"], createdAt: ISODate("2026-02-04") },
  { _id: ObjectId("100000000000000000000011"), name: "Pooja Roy", email: "pooja@gmail.com", phone: "9876543211", gender: "Female", age: 20, address: { city: "Kolkata", state: "West Bengal", pincode: "700002" }, isActive: true, interests: ["Beauty", "Books"], createdAt: ISODate("2026-02-07") },
  { _id: ObjectId("100000000000000000000012"), name: "Vivek Singh", email: "vivek@gmail.com", phone: "9876543212", gender: "Male", age: 26, address: { city: "Jaipur", state: "Rajasthan", pincode: "302001" }, isActive: true, interests: ["Fashion", "Gaming"], createdAt: ISODate("2026-02-10") },
  { _id: ObjectId("100000000000000000000013"), name: "Maya Das", email: "maya@gmail.com", phone: "9876543213", gender: "Female", age: 22, address: { city: "Agartala", state: "Tripura", pincode: "799005" }, isActive: true, interests: ["Mobiles", "Books"], createdAt: ISODate("2026-02-13") },
  { _id: ObjectId("100000000000000000000014"), name: "Rohan Paul", email: "rohan@gmail.com", phone: "9876543214", gender: "Male", age: 23, address: { city: "Chennai", state: "Tamil Nadu", pincode: "600001" }, isActive: true, interests: ["Computers", "Electronics"], createdAt: ISODate("2026-02-15") },
  { _id: ObjectId("100000000000000000000015"), name: "Tina Sharma", email: "tina@gmail.com", phone: "9876543215", gender: "Female", age: 21, address: { city: "Guwahati", state: "Assam", pincode: "781002" }, isActive: false, interests: ["Fashion", "Beauty"], createdAt: ISODate("2026-02-18") }
]);

/* ----------------------------------------------------------------------------
   3. DATA IMPORT — products (15 documents, POLYMORPHIC 'specifications')
   -------------------------------------------------------------------------- */

db.products.insertMany([
  { _id: ObjectId("200000000000000000000001"), name: "Samsung Galaxy S25", category: "Mobiles", brand: "Samsung", price: Decimal128("74999.00"), stock: 25, available: true, specifications: { ram: "12GB", storage: "256GB", color: "Black" }, tags: ["5G", "Android", "Smartphone"] },
  { _id: ObjectId("200000000000000000000002"), name: "iPhone 16", category: "Mobiles", brand: "Apple", price: Decimal128("79999.00"), stock: 20, available: true, specifications: { ram: "8GB", storage: "128GB", color: "Blue" }, tags: ["5G", "iOS", "Smartphone"] },
  { _id: ObjectId("200000000000000000000003"), name: "Dell Inspiron 15", category: "Computers", brand: "Dell", price: Decimal128("58999.00"), stock: 15, available: true, specifications: { ram: "16GB", storage: "512GB SSD", processor: "Intel i5" }, tags: ["Laptop", "Windows"] },
  { _id: ObjectId("200000000000000000000004"), name: "HP Pavilion", category: "Computers", brand: "HP", price: Decimal128("64999.00"), stock: 12, available: true, specifications: { ram: "16GB", storage: "512GB SSD", processor: "Intel i5" }, tags: ["Laptop", "Windows"] },
  { _id: ObjectId("200000000000000000000005"), name: "Sony WH-1000XM5", category: "Electronics", brand: "Sony", price: Decimal128("29999.00"), stock: 30, available: true, specifications: { type: "Wireless Headphone", battery: "30 Hours" }, tags: ["Audio", "Wireless", "Bluetooth"] },
  { _id: ObjectId("200000000000000000000006"), name: "boAt Airdopes 141", category: "Electronics", brand: "boAt", price: Decimal128("1499.00"), stock: 100, available: true, specifications: { type: "TWS", battery: "42 Hours" }, tags: ["Audio", "Bluetooth"] },
  { _id: ObjectId("200000000000000000000007"), name: "Nike Air Max", category: "Fashion", brand: "Nike", price: Decimal128("8999.00"), stock: 40, available: true, specifications: { size: "9", material: "Mesh" }, tags: ["Shoes", "Sports"] },
  { _id: ObjectId("200000000000000000000008"), name: "Adidas Running Shoes", category: "Fashion", brand: "Adidas", price: Decimal128("5999.00"), stock: 35, available: true, specifications: { size: "9", material: "Synthetic" }, tags: ["Shoes", "Running"] },
  { _id: ObjectId("200000000000000000000009"), name: "The Psychology of Money", category: "Books", brand: "Penguin", price: Decimal128("399.00"), stock: 80, available: true, specifications: { author: "Morgan Housel", pages: 256 }, tags: ["Finance", "Self Help"] },
  { _id: ObjectId("200000000000000000000010"), name: "Atomic Habits", category: "Books", brand: "Penguin", price: Decimal128("499.00"), stock: 75, available: true, specifications: { author: "James Clear", pages: 320 }, tags: ["Self Help", "Productivity"] },
  { _id: ObjectId("200000000000000000000011"), name: "Samsung 55 Inch Smart TV", category: "Electronics", brand: "Samsung", price: Decimal128("54999.00"), stock: 10, available: true, specifications: { screen: "55 Inch", resolution: "4K" }, tags: ["TV", "4K", "Smart TV"] },
  { _id: ObjectId("200000000000000000000012"), name: "Canon EOS 1500D", category: "Electronics", brand: "Canon", price: Decimal128("42999.00"), stock: 8, available: true, specifications: { megapixel: 24, lens: "18-55mm" }, tags: ["Camera", "DSLR"] },
  { _id: ObjectId("200000000000000000000013"), name: "Fastrack Analog Watch", category: "Fashion", brand: "Fastrack", price: Decimal128("2499.00"), stock: 50, available: true, specifications: { strap: "Leather", waterResistant: true }, tags: ["Watch", "Men"] },
  { _id: ObjectId("200000000000000000000014"), name: "Logitech Gaming Mouse", category: "Gaming", brand: "Logitech", price: Decimal128("2999.00"), stock: 45, available: true, specifications: { dpi: 12000, buttons: 6 }, tags: ["Gaming", "Mouse"] },
  { _id: ObjectId("200000000000000000000015"), name: "PlayStation 5", category: "Gaming", brand: "Sony", price: Decimal128("49999.00"), stock: 7, available: true, specifications: { storage: "1TB", type: "Console" }, tags: ["Gaming", "Console"] }
]);

/* ----------------------------------------------------------------------------
   4. DATA IMPORT — orders (15 documents; embeds items, references users+products)
   -------------------------------------------------------------------------- */

db.orders.insertMany([
  { _id: ObjectId("300000000000000000000001"), userId: ObjectId("100000000000000000000001"), items: [{ productId: ObjectId("200000000000000000000001"), quantity: 1, price: Decimal128("74999.00") }], totalAmount: Decimal128("74999.00"), paymentMethod: "UPI", status: "Delivered", orderDate: ISODate("2026-03-01") },
  { _id: ObjectId("300000000000000000000002"), userId: ObjectId("100000000000000000000002"), items: [{ productId: ObjectId("200000000000000000000006"), quantity: 2, price: Decimal128("1499.00") }], totalAmount: Decimal128("2998.00"), paymentMethod: "Card", status: "Delivered", orderDate: ISODate("2026-03-02") },
  { _id: ObjectId("300000000000000000000003"), userId: ObjectId("100000000000000000000003"), items: [{ productId: ObjectId("200000000000000000000007"), quantity: 1, price: Decimal128("8999.00") }, { productId: ObjectId("200000000000000000000013"), quantity: 1, price: Decimal128("2499.00") }], totalAmount: Decimal128("11498.00"), paymentMethod: "UPI", status: "Shipped", orderDate: ISODate("2026-03-03") },
  { _id: ObjectId("300000000000000000000004"), userId: ObjectId("100000000000000000000004"), items: [{ productId: ObjectId("200000000000000000000014"), quantity: 1, price: Decimal128("2999.00") }], totalAmount: Decimal128("2999.00"), paymentMethod: "Card", status: "Delivered", orderDate: ISODate("2026-03-04") },
  { _id: ObjectId("300000000000000000000005"), userId: ObjectId("100000000000000000000005"), items: [{ productId: ObjectId("200000000000000000000009"), quantity: 2, price: Decimal128("399.00") }], totalAmount: Decimal128("798.00"), paymentMethod: "Cash", status: "Delivered", orderDate: ISODate("2026-03-05") },
  { _id: ObjectId("300000000000000000000006"), userId: ObjectId("100000000000000000000006"), items: [{ productId: ObjectId("200000000000000000000015"), quantity: 1, price: Decimal128("49999.00") }], totalAmount: Decimal128("49999.00"), paymentMethod: "Card", status: "Processing", orderDate: ISODate("2026-03-06") },
  { _id: ObjectId("300000000000000000000007"), userId: ObjectId("100000000000000000000007"), items: [{ productId: ObjectId("200000000000000000000002"), quantity: 1, price: Decimal128("79999.00") }], totalAmount: Decimal128("79999.00"), paymentMethod: "UPI", status: "Delivered", orderDate: ISODate("2026-03-07") },
  { _id: ObjectId("300000000000000000000008"), userId: ObjectId("100000000000000000000008"), items: [{ productId: ObjectId("200000000000000000000003"), quantity: 1, price: Decimal128("58999.00") }], totalAmount: Decimal128("58999.00"), paymentMethod: "Net Banking", status: "Shipped", orderDate: ISODate("2026-03-08") },
  { _id: ObjectId("300000000000000000000009"), userId: ObjectId("100000000000000000000009"), items: [{ productId: ObjectId("200000000000000000000008"), quantity: 1, price: Decimal128("5999.00") }], totalAmount: Decimal128("5999.00"), paymentMethod: "UPI", status: "Delivered", orderDate: ISODate("2026-03-09") },
  { _id: ObjectId("300000000000000000000010"), userId: ObjectId("100000000000000000000010"), items: [{ productId: ObjectId("200000000000000000000010"), quantity: 1, price: Decimal128("499.00") }, { productId: ObjectId("200000000000000000000009"), quantity: 1, price: Decimal128("399.00") }], totalAmount: Decimal128("898.00"), paymentMethod: "UPI", status: "Delivered", orderDate: ISODate("2026-03-10") },
  { _id: ObjectId("300000000000000000000011"), userId: ObjectId("100000000000000000000011"), items: [{ productId: ObjectId("200000000000000000000011"), quantity: 1, price: Decimal128("54999.00") }], totalAmount: Decimal128("54999.00"), paymentMethod: "Card", status: "Processing", orderDate: ISODate("2026-03-11") },
  { _id: ObjectId("300000000000000000000012"), userId: ObjectId("100000000000000000000012"), items: [{ productId: ObjectId("200000000000000000000012"), quantity: 1, price: Decimal128("42999.00") }], totalAmount: Decimal128("42999.00"), paymentMethod: "Net Banking", status: "Shipped", orderDate: ISODate("2026-03-12") },
  { _id: ObjectId("300000000000000000000013"), userId: ObjectId("100000000000000000000013"), items: [{ productId: ObjectId("200000000000000000000004"), quantity: 1, price: Decimal128("64999.00") }], totalAmount: Decimal128("64999.00"), paymentMethod: "UPI", status: "Delivered", orderDate: ISODate("2026-03-13") },
  { _id: ObjectId("300000000000000000000014"), userId: ObjectId("100000000000000000000014"), items: [{ productId: ObjectId("200000000000000000000005"), quantity: 1, price: Decimal128("29999.00") }], totalAmount: Decimal128("29999.00"), paymentMethod: "Card", status: "Delivered", orderDate: ISODate("2026-03-14") },
  { _id: ObjectId("300000000000000000000015"), userId: ObjectId("100000000000000000000015"), items: [{ productId: ObjectId("200000000000000000000013"), quantity: 2, price: Decimal128("2499.00") }], totalAmount: Decimal128("4998.00"), paymentMethod: "UPI", status: "Cancelled", orderDate: ISODate("2026-03-15") }
]);

/* ----------------------------------------------------------------------------
   5. DATA IMPORT — reviews (15 documents; references users + products, N:M)
   -------------------------------------------------------------------------- */

db.reviews.insertMany([
  { _id: ObjectId("400000000000000000000001"), userId: ObjectId("100000000000000000000001"), productId: ObjectId("200000000000000000000001"), rating: 5, title: "Excellent Product", comment: "Very good quality and fast delivery.", verifiedPurchase: true, helpful: 12, createdAt: ISODate("2026-08-01T10:30:00Z") },
  { _id: ObjectId("400000000000000000000002"), userId: ObjectId("100000000000000000000002"), productId: ObjectId("200000000000000000000002"), rating: 4, title: "Good Quality", comment: "Product is good and works as expected.", verifiedPurchase: true, helpful: 8, createdAt: ISODate("2026-08-02T11:15:00Z") },
  { _id: ObjectId("400000000000000000000003"), userId: ObjectId("100000000000000000000003"), productId: ObjectId("200000000000000000000003"), rating: 5, title: "Amazing", comment: "Excellent product. Highly recommended.", verifiedPurchase: true, helpful: 15, createdAt: ISODate("2026-08-03T09:45:00Z") },
  { _id: ObjectId("400000000000000000000004"), userId: ObjectId("100000000000000000000004"), productId: ObjectId("200000000000000000000004"), rating: 3, title: "Average", comment: "The product is okay but could be better.", verifiedPurchase: true, helpful: 4, createdAt: ISODate("2026-08-04T14:20:00Z") },
  { _id: ObjectId("400000000000000000000005"), userId: ObjectId("100000000000000000000005"), productId: ObjectId("200000000000000000000005"), rating: 4, title: "Worth Buying", comment: "Good value for money.", verifiedPurchase: true, helpful: 9, createdAt: ISODate("2026-08-05T16:10:00Z") },
  { _id: ObjectId("400000000000000000000006"), userId: ObjectId("100000000000000000000006"), productId: ObjectId("200000000000000000000006"), rating: 2, title: "Not Satisfied", comment: "The quality was lower than expected.", verifiedPurchase: true, helpful: 3, createdAt: ISODate("2026-08-06T12:00:00Z") },
  { _id: ObjectId("400000000000000000000007"), userId: ObjectId("100000000000000000000007"), productId: ObjectId("200000000000000000000007"), rating: 5, title: "Perfect", comment: "Everything is perfect. Great purchase.", verifiedPurchase: true, helpful: 18, createdAt: ISODate("2026-08-07T13:25:00Z") },
  { _id: ObjectId("400000000000000000000008"), userId: ObjectId("100000000000000000000008"), productId: ObjectId("200000000000000000000008"), rating: 4, title: "Nice Product", comment: "Good product with decent quality.", verifiedPurchase: false, helpful: 6, createdAt: ISODate("2026-08-08T15:40:00Z") },
  { _id: ObjectId("400000000000000000000009"), userId: ObjectId("100000000000000000000009"), productId: ObjectId("200000000000000000000009"), rating: 5, title: "Highly Recommended", comment: "Very useful and exactly as described.", verifiedPurchase: true, helpful: 20, createdAt: ISODate("2026-08-09T10:05:00Z") },
  { _id: ObjectId("400000000000000000000010"), userId: ObjectId("100000000000000000000010"), productId: ObjectId("200000000000000000000010"), rating: 3, title: "Decent", comment: "Average product for the price.", verifiedPurchase: true, helpful: 5, createdAt: ISODate("2026-08-10T17:30:00Z") },
  { _id: ObjectId("400000000000000000000011"), userId: ObjectId("100000000000000000000011"), productId: ObjectId("200000000000000000000011"), rating: 4, title: "Good Experience", comment: "Delivery was fast and product quality was good.", verifiedPurchase: true, helpful: 10, createdAt: ISODate("2026-08-11T08:50:00Z") },
  { _id: ObjectId("400000000000000000000012"), userId: ObjectId("100000000000000000000012"), productId: ObjectId("200000000000000000000012"), rating: 1, title: "Poor Quality", comment: "The product did not meet my expectations.", verifiedPurchase: false, helpful: 2, createdAt: ISODate("2026-08-12T19:15:00Z") },
  { _id: ObjectId("400000000000000000000013"), userId: ObjectId("100000000000000000000013"), productId: ObjectId("200000000000000000000013"), rating: 5, title: "Fantastic", comment: "Excellent quality and very satisfied.", verifiedPurchase: true, helpful: 17, createdAt: ISODate("2026-08-13T11:35:00Z") },
  { _id: ObjectId("400000000000000000000014"), userId: ObjectId("100000000000000000000014"), productId: ObjectId("200000000000000000000014"), rating: 4, title: "Good Purchase", comment: "The product is reliable and useful.", verifiedPurchase: true, helpful: 7, createdAt: ISODate("2026-08-14T14:45:00Z") },
  { _id: ObjectId("400000000000000000000015"), userId: ObjectId("100000000000000000000015"), productId: ObjectId("200000000000000000000015"), rating: 5, title: "Excellent Value", comment: "Great product and excellent overall experience.", verifiedPurchase: true, helpful: 14, createdAt: ISODate("2026-08-15T16:55:00Z") }
]);

print("Inserted 15 users, 15 products, 15 orders, 15 reviews.");

/* ============================================================================
   5. CRUD & QUERY OPERATIONS
   ============================================================================ */

/* --- 5.1 Logical operators: $and, $or, $gt, $in, $exists --- */

// Products priced above 50,000 AND in stock (available = true)
print("\n-- Products above 50000 and available --");
printjson(db.products.find({
  $and: [
    { price: { $gt: Decimal128("50000.00") } },
    { available: true }
  ]
}).toArray());

// Products that are either 'Gaming' OR 'Fashion' category
print("\n-- Products: Gaming OR Fashion --");
printjson(db.products.find({
  $or: [{ category: "Gaming" }, { category: "Fashion" }]
}).toArray());

// Users whose interests include any of a given list ($in)
print("\n-- Users interested in Electronics or Mobiles --");
printjson(db.users.find({
  interests: { $in: ["Electronics", "Mobiles"] }
}).toArray());

// Products that have a 'processor' field (polymorphic field existence check)
print("\n-- Products that have a 'processor' spec field --");
printjson(db.products.find({
  "specifications.processor": { $exists: true }
}).toArray());

/* --- 5.2 Projections --- */

print("\n-- Product name & price only, no _id --");
printjson(db.products.find({}, { _id: 0, name: 1, price: 1 }).toArray());

/* --- 5.3 Atomic updates: $set, $inc --- */

// Reduce stock and mark a specific product as out of stock via $set / $inc
db.products.updateOne(
  { _id: ObjectId("200000000000000000000015") }, // PlayStation 5
  { $inc: { stock: -1 }, $set: { available: true } }
);
print("\n-- PlayStation 5 after $inc / $set --");
printjson(db.products.findOne({ _id: ObjectId("200000000000000000000015") }));

/* --- 5.4 Array operations: $push, $addToSet, $pull --- */

// $push: add a new tag to a product's tags array
db.products.updateOne(
  { _id: ObjectId("200000000000000000000001") }, // Samsung Galaxy S25
  { $push: { tags: "BestSeller" } }
);

// $addToSet: add an interest to a user only if not already present (no duplicates)
db.users.updateOne(
  { _id: ObjectId("100000000000000000000002") }, // Rahul Das
  { $addToSet: { interests: "Gaming" } }
);

// $pull: remove a specific tag from a product's tags array
db.products.updateOne(
  { _id: ObjectId("200000000000000000000006") }, // boAt Airdopes 141
  { $pull: { tags: "Bluetooth" } }
);

print("\n-- After array ops (push/addToSet/pull) --");
printjson(db.products.findOne({ _id: ObjectId("200000000000000000000001") }, { name: 1, tags: 1 }));
printjson(db.users.findOne({ _id: ObjectId("100000000000000000000002") }, { name: 1, interests: 1 }));
printjson(db.products.findOne({ _id: ObjectId("200000000000000000000006") }, { name: 1, tags: 1 }));

/* --- 5.5 Positional array update: update a nested field inside orders.items --- */

// Update the quantity of a specific line item within an order using arrayFilters
db.orders.updateOne(
  { _id: ObjectId("300000000000000000000003") },
  { $set: { "items.$[elem].quantity": 2 } },
  { arrayFilters: [{ "elem.productId": ObjectId("200000000000000000000007") }] }
);
print("\n-- Order after positional array update --");
printjson(db.orders.findOne({ _id: ObjectId("300000000000000000000003") }));

/* --- 5.6 Reviews: CRUD + array-style update (helpful counter) --- */

// Highly-rated, verified reviews ($and, $gt, $exists)
print("\n-- Verified reviews with rating > 3 --");
printjson(db.reviews.find({
  $and: [
    { rating: { $gt: 3 } },
    { verifiedPurchase: true },
    { comment: { $exists: true } }
  ]
}).toArray());

// $inc: increment the 'helpful' vote counter on a review
db.reviews.updateOne(
  { _id: ObjectId("400000000000000000000001") },
  { $inc: { helpful: 1 } }
);
print("\n-- Review after $inc on 'helpful' --");
printjson(db.reviews.findOne({ _id: ObjectId("400000000000000000000001") }));

/* ============================================================================
   6. AGGREGATION FRAMEWORK
   Business question: "What is the total revenue and number of units sold
   per product category, considering only Delivered orders?"
   Pipeline: $match -> $unwind -> $lookup -> $group -> $sort
   ============================================================================ */

print("\n-- Aggregation: Revenue by category (Delivered orders only) --");
const revenueByCategory = db.orders.aggregate([
  // Stage 1: only consider completed sales
  { $match: { status: "Delivered" } },

  // Stage 2: unwind embedded items array so each line item is its own doc
  { $unwind: "$items" },

  // Stage 3: join to products collection to bring in 'category' (referenced relationship)
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "productInfo"
    }
  },
  { $unwind: "$productInfo" },

  // Stage 4: group by category, summing revenue and units
  {
    $group: {
      _id: "$productInfo.category",
      totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
      unitsSold: { $sum: "$items.quantity" },
      ordersCount: { $sum: 1 }
    }
  },

  // Stage 5: sort by revenue descending
  { $sort: { totalRevenue: -1 } },

  // Stage 6: cosmetic projection
  {
    $project: {
      _id: 0,
      category: "$_id",
      totalRevenue: 1,
      unitsSold: 1,
      ordersCount: 1
    }
  }
]).toArray();
printjson(revenueByCategory);

/* ----------------------------------------------------------------------------
   6.1 Second pipeline: average rating & review count per product
   Pipeline: $group -> $lookup -> $unwind -> $project -> $sort
   -------------------------------------------------------------------------- */

print("\n-- Aggregation: Average rating per product (highest first) --");
const avgRatingByProduct = db.reviews.aggregate([
  // Stage 1: group reviews by product
  {
    $group: {
      _id: "$productId",
      avgRating: { $avg: "$rating" },
      reviewCount: { $sum: 1 },
      totalHelpful: { $sum: "$helpful" }
    }
  },

  // Stage 2: join back to products for the display name (referenced relationship)
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "productInfo"
    }
  },
  { $unwind: "$productInfo" },

  // Stage 3: shape the output
  {
    $project: {
      _id: 0,
      productName: "$productInfo.name",
      category: "$productInfo.category",
      avgRating: { $round: ["$avgRating", 2] },
      reviewCount: 1,
      totalHelpful: 1
    }
  },

  // Stage 4: sort by rating descending
  { $sort: { avgRating: -1 } }
]).toArray();
printjson(avgRatingByProduct);

/* ============================================================================
   7. INDEXING & QUERY PROFILING (COLLSCAN -> IXSCAN)
   ============================================================================ */

// --- 7.1 BEFORE indexing: profile a query on orders.status ---
print("\n-- explain() BEFORE index on 'status' (expect COLLSCAN) --");
printjson(
  db.orders.find({ status: "Delivered" }).explain("executionStats").executionStats
);

// --- 7.2 Create indexes ---
db.orders.createIndex({ status: 1 });                       // single-field index
db.orders.createIndex({ userId: 1, orderDate: -1 });        // compound index
db.products.createIndex({ category: 1, price: -1 });        // compound index for catalog browsing
db.reviews.createIndex({ productId: 1, rating: -1 });       // compound index for product review lookups

print("\n-- Indexes on 'orders' --");
printjson(db.orders.getIndexes());
print("\n-- Indexes on 'products' --");
printjson(db.products.getIndexes());
print("\n-- Indexes on 'reviews' --");
printjson(db.reviews.getIndexes());

// --- 7.3 AFTER indexing: same query, now should use IXSCAN ---
print("\n-- explain() AFTER index on 'status' (expect IXSCAN) --");
printjson(
  db.orders.find({ status: "Delivered" }).explain("executionStats").executionStats
);

// --- 7.4 Compound index in action ---
print("\n-- explain() using compound index (userId + orderDate) --");
printjson(
  db.orders.find({ userId: ObjectId("100000000000000000000001") })
    .sort({ orderDate: -1 })
    .explain("executionStats").executionStats
);

// --- 7.5 Reviews: compound index in action (productId + rating) ---
print("\n-- explain() on reviews using compound index (productId + rating) --");
printjson(
  db.reviews.find({ productId: ObjectId("200000000000000000000001") })
    .sort({ rating: -1 })
    .explain("executionStats").executionStats
);

print("\n============================================================");
print(" solution.js completed successfully.");
print("============================================================");
