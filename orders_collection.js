db.orders.insertMany([
  {
    _id: ObjectId("300000000000000000000001"),
    userId: ObjectId("100000000000000000000001"),
    items: [
      {
        productId: ObjectId("200000000000000000000001"),
        quantity: 1,
        price: Decimal128("74999.00")
      }
    ],
    totalAmount: Decimal128("74999.00"),
    paymentMethod: "UPI",
    status: "Delivered",
    orderDate: ISODate("2026-03-01")
  },

  {
    _id: ObjectId("300000000000000000000002"),
    userId: ObjectId("100000000000000000000002"),
    items: [
      {
        productId: ObjectId("200000000000000000000006"),
        quantity: 2,
        price: Decimal128("1499.00")
      }
    ],
    totalAmount: Decimal128("2998.00"),
    paymentMethod: "Card",
    status: "Delivered",
    orderDate: ISODate("2026-03-02")
  },

  {
    _id: ObjectId("300000000000000000000003"),
    userId: ObjectId("100000000000000000000003"),
    items: [
      {
        productId: ObjectId("200000000000000000000007"),
        quantity: 1,
        price: Decimal128("8999.00")
      },
      {
        productId: ObjectId("200000000000000000000013"),
        quantity: 1,
        price: Decimal128("2499.00")
      }
    ],
    totalAmount: Decimal128("11498.00"),
    paymentMethod: "UPI",
    status: "Shipped",
    orderDate: ISODate("2026-03-03")
  },

  {
    _id: ObjectId("300000000000000000000004"),
    userId: ObjectId("100000000000000000000004"),
    items: [
      {
        productId: ObjectId("200000000000000000000014"),
        quantity: 1,
        price: Decimal128("2999.00")
      }
    ],
    totalAmount: Decimal128("2999.00"),
    paymentMethod: "Card",
    status: "Delivered",
    orderDate: ISODate("2026-03-04")
  },

  {
    _id: ObjectId("300000000000000000000005"),
    userId: ObjectId("100000000000000000000005"),
    items: [
      {
        productId: ObjectId("200000000000000000000009"),
        quantity: 2,
        price: Decimal128("399.00")
      }
    ],
    totalAmount: Decimal128("798.00"),
    paymentMethod: "Cash",
    status: "Delivered",
    orderDate: ISODate("2026-03-05")
  },

  {
    _id: ObjectId("300000000000000000000006"),
    userId: ObjectId("100000000000000000000006"),
    items: [
      {
        productId: ObjectId("200000000000000000000015"),
        quantity: 1,
        price: Decimal128("49999.00")
      }
    ],
    totalAmount: Decimal128("49999.00"),
    paymentMethod: "Card",
    status: "Processing",
    orderDate: ISODate("2026-03-06")
  },

  {
    _id: ObjectId("300000000000000000000007"),
    userId: ObjectId("100000000000000000000007"),
    items: [
      {
        productId: ObjectId("200000000000000000000002"),
        quantity: 1,
        price: Decimal128("79999.00")
      }
    ],
    totalAmount: Decimal128("79999.00"),
    paymentMethod: "UPI",
    status: "Delivered",
    orderDate: ISODate("2026-03-07")
  },

  {
    _id: ObjectId("300000000000000000000008"),
    userId: ObjectId("100000000000000000000008"),
    items: [
      {
        productId: ObjectId("200000000000000000000003"),
        quantity: 1,
        price: Decimal128("58999.00")
      }
    ],
    totalAmount: Decimal128("58999.00"),
    paymentMethod: "Net Banking",
    status: "Shipped",
    orderDate: ISODate("2026-03-08")
  },

  {
    _id: ObjectId("300000000000000000000009"),
    userId: ObjectId("100000000000000000000009"),
    items: [
      {
        productId: ObjectId("200000000000000000000008"),
        quantity: 1,
        price: Decimal128("5999.00")
      }
    ],
    totalAmount: Decimal128("5999.00"),
    paymentMethod: "UPI",
    status: "Delivered",
    orderDate: ISODate("2026-03-09")
  },

  {
    _id: ObjectId("300000000000000000000010"),
    userId: ObjectId("100000000000000000000010"),
    items: [
      {
        productId: ObjectId("200000000000000000000010"),
        quantity: 1,
        price: Decimal128("499.00")
      },
      {
        productId: ObjectId("200000000000000000000009"),
        quantity: 1,
        price: Decimal128("399.00")
      }
    ],
    totalAmount: Decimal128("898.00"),
    paymentMethod: "UPI",
    status: "Delivered",
    orderDate: ISODate("2026-03-10")
  },

  {
    _id: ObjectId("300000000000000000000011"),
    userId: ObjectId("100000000000000000000011"),
    items: [
      {
        productId: ObjectId("200000000000000000000011"),
        quantity: 1,
        price: Decimal128("54999.00")
      }
    ],
    totalAmount: Decimal128("54999.00"),
    paymentMethod: "Card",
    status: "Processing",
    orderDate: ISODate("2026-03-11")
  },

  {
    _id: ObjectId("300000000000000000000012"),
    userId: ObjectId("100000000000000000000012"),
    items: [
      {
        productId: ObjectId("200000000000000000000012"),
        quantity: 1,
        price: Decimal128("42999.00")
      }
    ],
    totalAmount: Decimal128("42999.00"),
    paymentMethod: "Net Banking",
    status: "Shipped",
    orderDate: ISODate("2026-03-12")
  },

  {
    _id: ObjectId("300000000000000000000013"),
    userId: ObjectId("100000000000000000000013"),
    items: [
      {
        productId: ObjectId("200000000000000000000004"),
        quantity: 1,
        price: Decimal128("64999.00")
      }
    ],
    totalAmount: Decimal128("64999.00"),
    paymentMethod: "UPI",
    status: "Delivered",
    orderDate: ISODate("2026-03-13")
  },

  {
    _id: ObjectId("300000000000000000000014"),
    userId: ObjectId("100000000000000000000014"),
    items: [
      {
        productId: ObjectId("200000000000000000000005"),
        quantity: 1,
        price: Decimal128("29999.00")
      }
    ],
    totalAmount: Decimal128("29999.00"),
    paymentMethod: "Card",
    status: "Delivered",
    orderDate: ISODate("2026-03-14")
  },

  {
    _id: ObjectId("300000000000000000000015"),
    userId: ObjectId("100000000000000000000015"),
    items: [
      {
        productId: ObjectId("200000000000000000000013"),
        quantity: 2,
        price: Decimal128("2499.00")
      }
    ],
    totalAmount: Decimal128("4998.00"),
    paymentMethod: "UPI",
    status: "Cancelled",
    orderDate: ISODate("2026-03-15")
  }
]);
