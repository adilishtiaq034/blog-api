# 📝 Blog API

A RESTful Blog API built with **Node.js, Express.js, MongoDB, and Mongoose**.

This project includes user authentication, authorization, blog post management, comments, pagination, filtering, automated API testing, and Dockerized development with MongoDB.

---
## 🚀 Live API

The Blog API is deployed and available online through Railway.

**Live URL:**  
https://blog-api-production-5c23.up.railway.app

### Example Endpoint

**Get all posts:**

https://blog-api-production-5c23.up.railway.app/blog/posts

## 🚀 Features

- User registration and authentication
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Role-based authorization
- Create, read, update, and delete blog posts
- Users can only update and delete their own posts
- Comment system
- Users can delete only their own comments
- Pagination
- Category filtering
- Search and sorting
- Input validation
- Error handling
- Automated API testing with Jest and Supertest
- MongoDB database with Mongoose
- Dockerized API
- Docker Compose setup
- MongoDB persistent storage using Docker volumes
- Environment variables using `.env`

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security

- JWT
- bcrypt
- Authentication middleware
- Authorization middleware
- Input validation

### Testing

- Jest
- Supertest

### DevOps & Tools

- Docker
- Docker Compose
- Postman
- Git
- GitHub

---

## 📁 Project Structure

```text
Blog-API/
│
├── controllers/
├── middleware/
├── models/
├── routes/
├── tests/
├── uploads/
│
├── .dockerignore
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── app.js
└── server.js
```

---

# ⚙️ Getting Started

## Prerequisites

Before running the project, make sure you have:

- Node.js
- MongoDB
- Docker Desktop (optional, if using Docker)

---

# 💻 Running Locally

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd Blog-API
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file in the root directory.

Example:

```env
PORT=3000
mongodb_uri=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any other environment variables required by the project.

> Never commit your `.env` file to GitHub.

## 4. Start the server

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

---

# 🐳 Running With Docker

This project is fully Dockerized.

Docker Compose is used to run:

- Node.js / Express API
- MongoDB
- Persistent MongoDB storage

## Start the application

```bash
docker compose up --build -d
```

This command:

1. Builds the API image using the `Dockerfile`
2. Creates the API container
3. Pulls the MongoDB image if it is not already available
4. Creates the MongoDB container
5. Creates the MongoDB volume
6. Connects the API and MongoDB through the Docker Compose network
7. Runs the containers in detached mode

The API will be available at:

```text
http://localhost:3000
```

---

## Check running containers

```bash
docker compose ps
```

---

## View logs

View logs from all services:

```bash
docker compose logs
```

View only API logs:

```bash
docker compose logs api
```

View only MongoDB logs:

```bash
docker compose logs mongodb
```

---

## Stop the application

To stop and remove the Compose containers:

```bash
docker compose down
```

This removes the containers and Docker network but keeps the named MongoDB volume.

---

## Remove containers and MongoDB data

```bash
docker compose down -v
```

> ⚠️ This also removes the MongoDB volume and permanently deletes the database data stored in that volume.

---

# 🐳 Docker Architecture

The project uses two Docker services:

```text
                  Docker Compose
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
       ┌─────────────┐   ┌─────────────┐
       │     API     │   │   MongoDB   │
       │ Node.js     │──▶│  Database   │
       │ Express.js  │   │             │
       │ Port 3000   │   │ Port 27017  │
       └─────────────┘   └──────┬──────┘
                                │
                                ▼
                         mongodb_data
                            Volume
```

The API communicates with MongoDB using the Docker Compose service name:

```text
mongodb://mongodb:27017/...
```

Instead of:

```text
mongodb://localhost:27017/...
```

Inside the API container, `localhost` refers to the API container itself. The service name `mongodb` allows the API container to communicate with the MongoDB container through the Docker network.

---

# 📄 Docker Configuration

## Dockerfile

The `Dockerfile` defines how the API Docker image is created.

It specifies things such as:

- Base Node.js image
- Application working directory
- Dependencies
- Application files
- Startup command

---

## .dockerignore

The `.dockerignore` file prevents unnecessary files from being copied into the Docker image.

Example:

```text
node_modules/
.env
.git/
```

This helps keep the Docker image smaller and prevents sensitive environment configuration from being copied into the image.

---

## docker-compose.yml

Docker Compose defines the services required by the application.

The project contains:

```text
API service
MongoDB service
MongoDB persistent volume
```

Example:

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      - mongodb

  mongodb:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

---

# 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication.

Users must authenticate before accessing protected endpoints.

Authenticated requests use:

```http
Authorization: Bearer <JWT_TOKEN>
```

Passwords are hashed using **bcrypt** before being stored in the database.

---

# 👤 Authorization

Authentication determines:

> Who is the user?

Authorization determines:

> What is the user allowed to do?

The API implements authorization to ensure that users can only modify resources they are allowed to access.

For example, a user can update or delete their own blog posts but cannot modify another user's posts.

---

# 📝 Blog Posts

The API supports complete CRUD operations for blog posts.

CRUD stands for:

- **Create**
- **Read**
- **Update**
- **Delete**

Users can:

- Create posts
- View all posts
- View individual posts
- Update their own posts
- Delete their own posts

Unauthenticated users can access public post-reading endpoints but cannot create, update, or delete posts.

---

# 💬 Comments

The API also provides a commenting system.

Authenticated users can:

- Create comments
- Delete their own comments

Users cannot delete comments created by other users.

---

# 📄 Pagination

The posts endpoint supports pagination.

Example:

```http
GET /blog/posts?page=1&limit=10
```

Where:

```text
page  → page number
limit → number of posts per page
```

This prevents the API from returning a potentially large number of documents in a single request.

---

# 🔎 Filtering

Posts can be filtered using query parameters.

Example:

```http
GET /blog/posts?category=technology
```

Filtering allows clients to retrieve posts belonging to a specific category.

---

# 🔍 Search & Sorting

The API supports searching and sorting posts using query parameters.

These features make it easier for clients to retrieve the posts they need without requesting the entire collection.

---

# 🧪 Testing

The project includes automated API testing using:

- Jest
- Supertest

Run the test suite with:

```bash
npm test
```

The tests verify important API behavior such as:

- API responses
- Authentication
- Protected routes
- Blog post operations
- Authorization behavior

---

# 🔒 Security

The project implements several backend security practices:

- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Authorization middleware
- Ownership-based authorization
- Role-based authorization
- Environment variables for sensitive configuration
- Input validation
- Controlled error handling

---

# 📮 API Testing

The API can be tested using tools such as **Postman**.

Example base URL:

```text
http://localhost:3000
```

When running through Docker:

```text
http://localhost:3000
```

The API behaves the same whether it is running locally or inside Docker.

---

# 🗄️ Database

The project uses **MongoDB** as its database and **Mongoose** as the ODM.

Mongoose provides:

- Schemas
- Models
- Database queries
- Validation
- Middleware
- MongoDB interaction

When running with Docker Compose, MongoDB runs in its own container.

Its data is stored in the Docker volume:

```text
mongodb_data
```

This allows database data to persist even when the MongoDB container is removed and recreated.

---

# 🧰 Useful Docker Commands

Start the project:

```bash
docker compose up -d
```

Build and start:

```bash
docker compose up --build -d
```

Check containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs
```

Stop and remove containers:

```bash
docker compose down
```

Stop and remove containers plus volumes:

```bash
docker compose down -v
```

---

# 🔮 Future Improvements

Possible future improvements include:

- Cloud image storage using Cloudinary
- Redis caching
- Rate limiting
- Swagger/OpenAPI documentation
- CI/CD pipeline
- Production deployment
- Monitoring and logging
- Improved API documentation

---

# 👨‍💻 Author

**Adil Ishtiaq**

Full Stack Developer | IT Student @ IBIT

---

## ⭐ Project

A backend project focused on building a complete RESTful API while practicing:

```text
Node.js
Express.js
MongoDB
Mongoose
Authentication
Authorization
API Testing
Security
Docker
Docker Compose
```

Built to develop practical backend development skills through a real-world API project.
