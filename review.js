use ecommerceDB

db.reviews.insertMany([
  {
    _id: ObjectId("400000000000000000000001"),
    userId: ObjectId("100000000000000000000001"),
    productId: ObjectId("200000000000000000000001"),
    rating: 5,
    title: "Excellent Product",
    comment: "Very good quality and fast delivery.",
    verifiedPurchase: true,
    helpful: 12,
    createdAt: ISODate("2026-08-01T10:30:00Z")
  },
  {
    _id: ObjectId("400000000000000000000002"),
    userId: ObjectId("100000000000000000000002"),
    productId: ObjectId("200000000000000000000002"),
    rating: 4,
    title: "Good Quality",
    comment: "Product is good and works as expected.",
    verifiedPurchase: true,
    helpful: 8,
    createdAt: ISODate("2026-08-02T11:15:00Z")
  },
  {
    _id: ObjectId("400000000000000000000003"),
    userId: ObjectId("100000000000000000000003"),
    productId: ObjectId("200000000000000000000003"),
    rating: 5,
    title: "Amazing",
    comment: "Excellent product. Highly recommended.",
    verifiedPurchase: true,
    helpful: 15,
    createdAt: ISODate("2026-08-03T09:45:00Z")
  },
  {
    _id: ObjectId("400000000000000000000004"),
    userId: ObjectId("100000000000000000000004"),
    productId: ObjectId("200000000000000000000004"),
    rating: 3,
    title: "Average",
    comment: "The product is okay but could be better.",
    verifiedPurchase: true,
    helpful: 4,
    createdAt: ISODate("2026-08-04T14:20:00Z")
  },
  {
    _id: ObjectId("400000000000000000000005"),
    userId: ObjectId("100000000000000000000005"),
    productId: ObjectId("200000000000000000000005"),
    rating: 4,
    title: "Worth Buying",
    comment: "Good value for money.",
    verifiedPurchase: true,
    helpful: 9,
    createdAt: ISODate("2026-08-05T16:10:00Z")
  },
  {
    _id: ObjectId("400000000000000000000006"),
    userId: ObjectId("100000000000000000000006"),
    productId: ObjectId("200000000000000000000006"),
    rating: 2,
    title: "Not Satisfied",
    comment: "The quality was lower than expected.",
    verifiedPurchase: true,
    helpful: 3,
    createdAt: ISODate("2026-08-06T12:00:00Z")
  },
  {
    _id: ObjectId("400000000000000000000007"),
    userId: ObjectId("100000000000000000000007"),
    productId: ObjectId("200000000000000000000007"),
    rating: 5,
    title: "Perfect",
    comment: "Everything is perfect. Great purchase.",
    verifiedPurchase: true,
    helpful: 18,
    createdAt: ISODate("2026-08-07T13:25:00Z")
  },
  {
    _id: ObjectId("400000000000000000000008"),
    userId: ObjectId("100000000000000000000008"),
    productId: ObjectId("200000000000000000000008"),
    rating: 4,
    title: "Nice Product",
    comment: "Good product with decent quality.",
    verifiedPurchase: false,
    helpful: 6,
    createdAt: ISODate("2026-08-08T15:40:00Z")
  },
  {
    _id: ObjectId("400000000000000000000009"),
    userId: ObjectId("100000000000000000000009"),
    productId: ObjectId("200000000000000000000009"),
    rating: 5,
    title: "Highly Recommended",
    comment: "Very useful and exactly as described.",
    verifiedPurchase: true,
    helpful: 20,
    createdAt: ISODate("2026-08-09T10:05:00Z")
  },
  {
    _id: ObjectId("400000000000000000000010"),
    userId: ObjectId("100000000000000000000010"),
    productId: ObjectId("200000000000000000000010"),
    rating: 3,
    title: "Decent",
    comment: "Average product for the price.",
    verifiedPurchase: true,
    helpful: 5,
    createdAt: ISODate("2026-08-10T17:30:00Z")
  },
  {
    _id: ObjectId("400000000000000000000011"),
    userId: ObjectId("100000000000000000000011"),
    productId: ObjectId("200000000000000000000011"),
    rating: 4,
    title: "Good Experience",
    comment: "Delivery was fast and product quality was good.",
    verifiedPurchase: true,
    helpful: 10,
    createdAt: ISODate("2026-08-11T08:50:00Z")
  },
  {
    _id: ObjectId("400000000000000000000012"),
    userId: ObjectId("100000000000000000000012"),
    productId: ObjectId("200000000000000000000012"),
    rating: 1,
    title: "Poor Quality",
    comment: "The product did not meet my expectations.",
    verifiedPurchase: false,
    helpful: 2,
    createdAt: ISODate("2026-08-12T19:15:00Z")
  },
  {
    _id: ObjectId("400000000000000000000013"),
    userId: ObjectId("100000000000000000000013"),
    productId: ObjectId("200000000000000000000013"),
    rating: 5,
    title: "Fantastic",
    comment: "Excellent quality and very satisfied.",
    verifiedPurchase: true,
    helpful: 17,
    createdAt: ISODate("2026-08-13T11:35:00Z")
  },
  {
    _id: ObjectId("400000000000000000000014"),
    userId: ObjectId("100000000000000000000014"),
    productId: ObjectId("200000000000000000000014"),
    rating: 4,
    title: "Good Purchase",
    comment: "The product is reliable and useful.",
    verifiedPurchase: true,
    helpful: 7,
    createdAt: ISODate("2026-08-14T14:45:00Z")
  },
  {
    _id: ObjectId("400000000000000000000015"),
    userId: ObjectId("100000000000000000000015"),
    productId: ObjectId("200000000000000000000015"),
    rating: 5,
    title: "Excellent Value",
    comment: "Great product and excellent overall experience.",
    verifiedPurchase: true,
    helpful: 14,
    createdAt: ISODate("2026-08-15T16:55:00Z")
  }
])
