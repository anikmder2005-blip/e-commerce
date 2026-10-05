# Technical Report: E-Commerce Product, Customer & Order Management System using MongoDB

## 1. Project Title
**E-Commerce Product, Customer & Order Management System using MongoDB**

## 2. Team Members
| # | Name (fill in) | Roll Number (fill in) |
|---|-----------------|-------------------------|
| 1 | ___________ | ___________ |
| 2 | ___________ | ___________ |
| 3 | ___________ | ___________ |
| 4 | ___________ | ___________ |

## 3. Roles & Responsibilities
| Member | Role | Responsibilities |
|---|---|---|
| Member 1 | **Lead Data Architect** | Domain selection, entity discovery, schema design, embedding vs. referencing decisions, polymorphism strategy |
| Member 2 | **Data Engineer** | Realistic data generation, BSON data type selection, `$jsonSchema` validation rules, bulk data insertion |
| Member 3 | **Application & Query Developer** | CRUD operations, advanced query operators, array and nested-field update operations |
| Member 4 | **Analytics & Performance Specialist** | Aggregation pipelines, index design, `explain("executionStats")` analysis, COLLSCAN vs IXSCAN benchmarking |

## 4. Domain Overview
E-commerce platforms manage large, evolving catalogs of heterogeneous products, a
growing customer base, and a continuous stream of orders. Product attributes vary
wildly by category (a smartphone has RAM/storage; a shirt has size/material; a
grocery item has weight/expiry), customer profiles need flexible embedded data
(address, interests), and orders combine both entities into a single transaction
record that must be fast to read and safe to audit. This makes e-commerce an ideal
domain to showcase MongoDB's document model, since a rigid multi-table SQL schema
would require sparse columns or many category-specific tables to model the same
data, whereas MongoDB stores it naturally in one flexible collection.

## 5. Why MongoDB?
- **Schema flexibility**: Product specifications differ per category without
  needing ALTER TABLE migrations or dozens of nullable SQL columns.
- **Natural document mapping**: A single order (with its items, shipping address,
  and payment info) maps to one JSON-like BSON document instead of being split
  across five normalized SQL tables joined at read time.
- **Horizontal scalability**: MongoDB's sharding model suits the high write/read
  volume typical of e-commerce traffic.
- **Rich query & aggregation framework**: Supports SQL-like joins (`$lookup`),
  grouping, and analytics directly on the database, reducing application-side
  processing.
- **Optional schema enforcement**: `$jsonSchema` validation gives us the
  *reliability* of SQL constraints while keeping the *flexibility* of NoSQL.

## 6. Core Entities
1. **customers** – platform users, embedded address, interests array
2. **products** – catalog items, polymorphic `specifications` per category
3. **orders** – transactions linking customers and products, embedded items/shipping/payment

These three collections were chosen because they capture the complete "who /
what / when-how much" life cycle of an e-commerce transaction while being
sufficient to demonstrate every required MongoDB feature (embedding,
referencing, polymorphism, validation, indexing, aggregation).

## 7. Entity Relationship / Data Model
```
 customers (1) ────────< orders (N)         [reference: orders.customerId]
 products  (1) ────────< order.items (N)    [reference: items.productId]
```
- One customer can place **many** orders → referenced via `orders.customerId`.
- One product can appear in **many** order line items → referenced via
  `orders.items[].productId`.
- Each order **embeds** its own line items, shipping address, and payment
  details because that data is unique to the order and always read/written
  together with it.

## 8. Embedded vs. Referenced Relationships
### Embedded (chosen for):
- **customer address** – always read together with the customer profile, never
  queried independently across customers, low update frequency.
- **order shippingAddress** – a snapshot at the time of the order; must stay
  frozen even if the customer later changes their saved address, so embedding
  (not referencing) is *required* for correctness.
- **payment information** – logically inseparable from the specific order.
- **order items** – the "shopping cart contents" of one specific order; always
  fetched as part of the order document (an invoice view).

### Referenced (chosen for):
- **Customer → Orders** (`orders.customerId → customers._id`) – a customer is
  an independent, frequently-updated entity (profile edits, loyalty points)
  reused across potentially hundreds of orders. Embedding the whole customer
  into every order would duplicate data massively and cause stale-data bugs
  when the customer's profile changes.
- **Product → Order Items** (`items.productId → products._id`) – products are
  shared across many orders and are updated independently (price changes,
  stock changes, rating updates). Referencing keeps a single source of truth;
  `$lookup` can join back to the live product record whenever needed.

**Rule of thumb applied:** embed data that is *owned by* and *only ever
accessed with* one specific document; reference data that is *shared across
many* documents and *updated independently*.

## 9. Polymorphism
All 20 products live in **one single `products` collection**, yet the
`specifications` sub-document has a different shape per category:

| Category | Example `specifications` fields |
|---|---|
| Electronics | `brand, warranty, ram, storage` |
| Clothing | `brand, size, material, color` |
| Groceries | `brand, weight, expiryDate, organic` |
| Home Appliances | `brand, warranty, powerConsumption, capacity` |
| Books | `author, publisher, pages, language` |
| Sports | `brand, material, weight, recommendedFor` |

In SQL this would require either one enormous sparse table (dozens of
mostly-NULL columns) or six separate category tables with complex joins. In
MongoDB, `specifications` is declared as a generic `object` in the
`$jsonSchema` validator (no fixed sub-fields enforced), so each document is
free to store whatever attributes are relevant to its category while all
products remain queryable, indexable, and sortable together (e.g. by price or
rating) as one logical collection. This is the classic **polymorphic document
pattern**.

## 10. BSON Data Types Used
| Type | Where used |
|---|---|
| `ObjectId` | `_id` fields; `orders.customerId`; `items.productId` |
| `Date` | `createdAt`, `orderDate`, `deliveryDate`, `specifications.expiryDate` |
| `Decimal128` | `products.price`, `orders.totalAmount`, `items.price` (precise currency, avoids floating-point rounding errors) |
| `Boolean` | `isActive`, `isAvailable`, `specifications.organic` |
| `Array` | `interests`, `tags`, `items` |
| `Nested/Embedded Document` | `address`, `shippingAddress`, `payment`, `specifications` |
| `Int32` (`NumberInt`) | `age`, `stock`, `discount`, `quantity`, `pages` |
| `Double` | `rating` |

## 11. CRUD Operations
Implemented and demonstrated in `solution.js` Section 7:
- `insertOne()` / `insertMany()` – adding new customers and bulk seed data
- `find()` / `findOne()` – with inclusion and exclusion projections
- `updateOne()` / `updateMany()` – status updates and bulk perk flags
- `deleteOne()` / `deleteMany()` – single and conditional bulk deletes

## 12. Advanced Queries
- `$and` — price > 1000 AND stock > 10
- `$or` — category is Electronics OR Clothing
- `$gt` — price greater than a threshold
- `$in` — category ∈ {Electronics, Books, Clothing}
- `$exists` — products where `specifications.ram` exists
- Combined operator example, plus `$elemMatch` and `$regex` for nested/array
  and pattern queries

## 13. Aggregation Pipeline
**Main 5-stage pipeline** (business question: *"Find the top-selling products
based on total quantity sold and revenue"*):
```
$match  → filter out cancelled orders
$unwind → flatten the items array (one doc per line item)
$group  → sum quantity & revenue per product name
$sort   → highest revenue first
$limit  → top 5 best sellers
```
Two supporting pipelines calculate **total spending per customer** and
**order counts grouped by status**, and a `$lookup` pipeline joins
`customers` with `orders` to count orders per active customer.

## 14. Indexing
| Index | Reason |
|---|---|
| `customers.email` (unique) | Fast, unique lookup during login/registration |
| `products.category` | Category filter is the most common storefront query |
| `products.price` | Enables efficient price-range queries |
| `orders.customerId` | Fast "my orders" lookups per customer |
| `orders.orderDate` (desc) | Fast "recent orders" sorting |
| `products.(category, price)` compound | Optimizes combined filter+sort queries like "cheapest Electronics" |

## 15. COLLSCAN vs IXSCAN
Section 14 of `solution.js` intentionally drops the `category` index, runs
`db.products.find({ category: "Electronics" }).explain("executionStats")` to
show a **COLLSCAN** (MongoDB scans every document), then recreates the index
and re-runs the identical query to show an **IXSCAN** (MongoDB jumps directly
to matching entries via the B-tree index).

| Metric | COLLSCAN (before) | IXSCAN (after) |
|---|---|---|
| `winningPlan.stage` | `COLLSCAN` | `IXSCAN` |
| `totalDocsExamined` | = total documents in collection | = only matching documents |
| `totalKeysExamined` | 0 (no index used) | = number of matching index entries |
| `executionTimeMillis` | higher (grows with collection size) | lower / near-constant with a good index |
| `nReturned` | same in both cases | same in both cases |

This proves that indexing does not change *what* is returned, only *how
efficiently* MongoDB finds it — the improvement becomes dramatic as the
collection grows to production scale.

## 16. Conclusion
This project demonstrates a realistic, production-style MongoDB schema for an
e-commerce platform, covering every core NoSQL modeling concept: embedding for
tightly-coupled data, referencing for shared/independent entities,
polymorphic documents for a heterogeneous product catalog, strict-but-flexible
`$jsonSchema` validation, comprehensive CRUD and advanced querying,
multi-stage aggregation for business analytics, cross-collection joins via
`$lookup`, and measurable performance gains from indexing (COLLSCAN →
IXSCAN). Together these show why MongoDB is well suited to domains with
variable, fast-evolving, high-volume data such as e-commerce and retail.
