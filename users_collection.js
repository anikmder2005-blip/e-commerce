db.users.insertMany([
  {
    _id: ObjectId("100000000000000000000001"),
    name: "Anik Majumder",
    email: "anik@gmail.com",
    phone: "9876543201",
    gender: "Male",
    age: 21,
    address: {
      city: "Agartala",
      state: "Tripura",
      pincode: "799001"
    },
    isActive: true,
    interests: ["Electronics", "Books"],
    createdAt: ISODate("2026-01-10")
  },
  {
    _id: ObjectId("100000000000000000000002"),
    name: "Rahul Das",
    email: "rahul@gmail.com",
    phone: "9876543202",
    gender: "Male",
    age: 22,
    address: {
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700001"
    },
    isActive: true,
    interests: ["Mobiles", "Fashion"],
    createdAt: ISODate("2026-01-12")
  },
  {
    _id: ObjectId("100000000000000000000003"),
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "9876543203",
    gender: "Female",
    age: 20,
    address: {
      city: "Guwahati",
      state: "Assam",
      pincode: "781001"
    },
    isActive: true,
    interests: ["Beauty", "Fashion"],
    createdAt: ISODate("2026-01-15")
  },
  {
    _id: ObjectId("100000000000000000000004"),
    name: "Sourav Roy",
    email: "sourav@gmail.com",
    phone: "9876543204",
    gender: "Male",
    age: 23,
    address: {
      city: "Agartala",
      state: "Tripura",
      pincode: "799002"
    },
    isActive: true,
    interests: ["Gaming", "Electronics"],
    createdAt: ISODate("2026-01-18")
  },
  {
    _id: ObjectId("100000000000000000000005"),
    name: "Sneha Paul",
    email: "sneha@gmail.com",
    phone: "9876543205",
    gender: "Female",
    age: 21,
    address: {
      city: "Silchar",
      state: "Assam",
      pincode: "788001"
    },
    isActive: true,
    interests: ["Books", "Fashion"],
    createdAt: ISODate("2026-01-20")
  },
  {
    _id: ObjectId("100000000000000000000006"),
    name: "Arjun Singh",
    email: "arjun@gmail.com",
    phone: "9876543206",
    gender: "Male",
    age: 24,
    address: {
      city: "Delhi",
      state: "Delhi",
      pincode: "110001"
    },
    isActive: true,
    interests: ["Gaming", "Mobiles"],
    createdAt: ISODate("2026-01-22")
  },
  {
    _id: ObjectId("100000000000000000000007"),
    name: "Riya Das",
    email: "riya@gmail.com",
    phone: "9876543207",
    gender: "Female",
    age: 22,
    address: {
      city: "Agartala",
      state: "Tripura",
      pincode: "799003"
    },
    isActive: true,
    interests: ["Electronics", "Beauty"],
    createdAt: ISODate("2026-01-25")
  },
  {
    _id: ObjectId("100000000000000000000008"),
    name: "Amit Kumar",
    email: "amit@gmail.com",
    phone: "9876543208",
    gender: "Male",
    age: 25,
    address: {
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    },
    isActive: true,
    interests: ["Computers", "Gaming"],
    createdAt: ISODate("2026-01-28")
  },
  {
    _id: ObjectId("100000000000000000000009"),
    name: "Neha Sharma",
    email: "neha@gmail.com",
    phone: "9876543209",
    gender: "Female",
    age: 23,
    address: {
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    isActive: true,
    interests: ["Fashion", "Beauty"],
    createdAt: ISODate("2026-02-01")
  },
  {
    _id: ObjectId("100000000000000000000010"),
    name: "Karan Das",
    email: "karan@gmail.com",
    phone: "9876543210",
    gender: "Male",
    age: 21,
    address: {
      city: "Agartala",
      state: "Tripura",
      pincode: "799004"
    },
    isActive: true,
    interests: ["Books", "Electronics"],
    createdAt: ISODate("2026-02-04")
  },
  {
    _id: ObjectId("100000000000000000000011"),
    name: "Pooja Roy",
    email: "pooja@gmail.com",
    phone: "9876543211",
    gender: "Female",
    age: 20,
    address: {
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700002"
    },
    isActive: true,
    interests: ["Beauty", "Books"],
    createdAt: ISODate("2026-02-07")
  },
  {
    _id: ObjectId("100000000000000000000012"),
    name: "Vivek Singh",
    email: "vivek@gmail.com",
    phone: "9876543212",
    gender: "Male",
    age: 26,
    address: {
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001"
    },
    isActive: true,
    interests: ["Fashion", "Gaming"],
    createdAt: ISODate("2026-02-10")
  },
  {
    _id: ObjectId("100000000000000000000013"),
    name: "Maya Das",
    email: "maya@gmail.com",
    phone: "9876543213",
    gender: "Female",
    age: 22,
    address: {
      city: "Agartala",
      state: "Tripura",
      pincode: "799005"
    },
    isActive: true,
    interests: ["Mobiles", "Books"],
    createdAt: ISODate("2026-02-13")
  },
  {
    _id: ObjectId("100000000000000000000014"),
    name: "Rohan Paul",
    email: "rohan@gmail.com",
    phone: "9876543214",
    gender: "Male",
    age: 23,
    address: {
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600001"
    },
    isActive: true,
    interests: ["Computers", "Electronics"],
    createdAt: ISODate("2026-02-15")
  },
  {
    _id: ObjectId("100000000000000000000015"),
    name: "Tina Sharma",
    email: "tina@gmail.com",
    phone: "9876543215",
    gender: "Female",
    age: 21,
    address: {
      city: "Guwahati",
      state: "Assam",
      pincode: "781002"
    },
    isActive: false,
    interests: ["Fashion", "Beauty"],
    createdAt: ISODate("2026-02-18")
  }
]);
