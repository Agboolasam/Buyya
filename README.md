# Buyya E-commerce API Documentation


## Tech Stack

### Backend Technologies
- **Node.js** - JavaScript runtime environment for server-side development
- **Express.js** - Web application framework for building REST APIs
- **Sequelize** - Object-Relational Mapping (ORM) library for database operations
- **PostgreSQL/MySQL** - Relational database for data storage
- **JWT (jsonwebtoken)** - For user authentication and authorization
- **bcrypt** - For password hashing and security
- **dotenv** - For environment variable management



### Prerequisites
- Node.js (v20)
- PostgreSQL database
- npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd Buyya/server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database seeds
npm run seed

# Start the server
npm start

## Order Endpoints
> **Note:** All order endpoints require authentication


### Token Refresh Flow
1. Client makes API request with expired access token
2. Server detects token expiration
3. Server validates refresh token
4. Server generates new tokens
5. Server sets new tokens in response headers:
   - `x-access-token`: New access token
   - `x-refresh-token`: New refresh token
6. Server processes original request
7. Client updates stored tokens from headers

### Get User Orders
```http
GET /api/order
```

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 4)

**Example:**
```
GET /api/order?page=1&limit=10
```

**Success Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "UserId": 1,
      "total": 199998,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 4,
    "totalPages": 2
  }
}
```

**Error Response (500):**
```json
{
  "error": "Error Fetching Orders"
}
```

### Create Order
```http
POST /api/order/create
```

**Headers:**
```
Authorization: Bearer <user_token>
Content-Type: application/json
```

**Request Body:**
```json
{}
```

**Note:** This endpoint creates an order from the user's current cart items. No request body is required as it processes the existing cart.

**Success Response (201):**
```json
{
  "message": "Order created",
  "order": {
    "id": 1,
    "UserId": 1,
    "total": 199998,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// 400 - Empty Cart
{
  "message": "Cart is empty"
}

// 400 - Insufficient Stock
{
  "message": "Not enough stock for [Product Name]"
}

// 500 - Server Error
{
  "message": "Error Occured"
}
```

**Order Creation Process:**
1. Retrieves all items from user's cart
2. Validates cart is not empty
3. Creates new order
4. Transfers cart items to order items
5. Calculates total price
6. Clears user's cart
7. Returns created order

---

## Available Routes Summary

Based on your actual server structure:

| Route Group | Base Path | Authentication | Role Required |
|-------------|-----------|----------------|---------------|
| **Authentication** | `/api/auth/*` | ❌ None | None |
| **Admin** | `/api/admin/*` | ✅ Required | ADMIN |
| **Products** | `/api/product/*` | ✅ Required | USER/ADMIN |
| **Cart** | `/api/cart/*` | ✅ Required | USER/ADMIN |
| **Orders** | `/api/order/*` | ✅ Required | USER/ADMIN |

### Specific Order Endpoints:
- `GET /api/order` - Get paginated user orders
- `POST /api/order/create` - Create order from cart

---

## Error Handling

Your API uses consistent error handling:

### Authentication Errors
```json
// 401 - Unauthorized
{
  "error": "Access token is required",
  "redirectToLogin": true
}
```

### Business Logic Errors
```json
// 400 - Bad Request
{
  "message": "Cart is empty"
}
```

### Server Errors
```json
// 500 - Internal Server Error
{
  "error": "Error Fetching Orders"
}
```

---

