# E-Commerce Product, Customer & Order Management System using MongoDB

A complete MongoDB (NoSQL) project for the DBMS "SQL and MongoDB" course, modeling an
Indian e-commerce retail platform with **customers**, **products**, and **orders**.

## Project Structure

```
Ecommerce_MongoDB_Project/
├── solution.js                    # Complete, executable mongosh script (all 15 sections)
├── README.md                      # This file
└── Technical_Report_Content.md    # Content for the ~5-page technical report
```

## Domain & Core Entities

**Domain:** E-Commerce & Retail

| Collection  | Purpose                                                        |
|-------------|-----------------------------------------------------------------|
| `customers` | People who use the platform (profile, address, loyalty data)   |
| `products`  | Catalog items — demonstrates **polymorphic** documents          |
| `orders`    | Transactions that link customers and products                  |

## MongoDB Concepts Demonstrated

- Embedded documents (`address`, `shippingAddress`, `payment`)
- Embedded arrays (`interests`, `tags`, `items`)
- Referenced relationships (`orders.customerId → customers._id`,
  `orders.items.productId → products._id`)
- Polymorphic documents (`products.specifications` differs per category)
- Native BSON types: `ObjectId`, `Date`, `Decimal128`, `Boolean`, `Array`,
  embedded/nested documents, `Int32`
- `$jsonSchema` validation on all three collections
- Full CRUD (`insertOne`, `insertMany`, `find`, `findOne`, `updateOne`,
  `updateMany`, `deleteOne`, `deleteMany`) with projections and sorting
- Advanced queries: `$and`, `$or`, `$gt`, `$in`, `$exists`, `$elemMatch`, `$regex`
- Array/nested updates: `$push`, `$addToSet`, `$pull`, `$inc`, `$set`,
  positional `arrayFilters`
- A 5-stage aggregation pipeline (`$match → $unwind → $group → $sort → $limit`)
  plus two more supporting pipelines
- `$lookup` join between `customers` and `orders`
- Single-field and compound indexing
- Performance profiling with `.explain("executionStats")` showing
  **COLLSCAN → IXSCAN**

## How to Run

### Prerequisites
- MongoDB Server (v6.0+) running locally, e.g. `mongod --dbpath <your-data-path>`
- `mongosh` (MongoDB Shell) installed

### Steps

1. Open a terminal in this project folder.
2. Start `mongosh` and connect to your local server:
   ```bash
   mongosh
   ```
3. Load and run the entire script:
   ```js
   load("solution.js")
   ```
   **OR**, run it directly from the terminal without opening an interactive shell:
   ```bash
   mongosh "mongodb://localhost:27017" solution.js
   ```
4. Watch the console output — each of the 15 sections prints a status line, and
   Section 14 prints the `explain("executionStats")` output for both the
   COLLSCAN (before index) and IXSCAN (after index) runs.

### Verifying in MongoDB Compass
- Connect Compass to `mongodb://localhost:27017`
- Open the `ecommerceDB` database
- Browse `customers`, `products`, `orders` collections
- Use the **Explain Plan** tab in Compass to visually confirm COLLSCAN vs IXSCAN
- Use the **Indexes** tab to see all created indexes

## Team

See `Technical_Report_Content.md` for the full team-roles table (4 members:
Lead Data Architect, Data Engineer, Application & Query Developer,
Analytics & Performance Specialist).

## Suggested ZIP Filename

```
Group_[GroupNumber]_ECommerce.zip
```
