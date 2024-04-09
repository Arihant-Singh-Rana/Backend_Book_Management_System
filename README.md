# Book Management System

This project is a simple book management system built with Node.js, Express.js, and MongoDB. It allows users to add and retrieve book details via a RESTful API.

## Files Overview

### `controller/API_Functions.js`

This file contains controller functions for handling HTTP requests related to books. The `AddData` function adds book details to the database, while the `ReadData` function retrieves all book details.

```javascript
const AddData = async (req, res) => {
  // Retrieve book details from request body
  const Details = req.body;
  // Add book details to the database
  const addedDetails = await BooksDetailsSchema.create(Details);
  // Send success response with added details
  return res.send({
    Status: "Success 201 The Book's details added successfully",
    AddData: addedDetails,
  });
};

// Function to retrieve all book details from the database
const ReadData = async (req, res) => {
  // Retrieve all book details from the database
  const AllDetails = await BooksDetailsSchema.find();
  // Send success response with all book details
  return res.send({
    Status: "Status 200  Array of books matching the search criteria",
    AllBooksDetails: AllDetails,
  });
};
```

### `models/Books_Details_Schema.js`

This file defines the schema for book details using Mongoose and exports the model.

```javascript
// Define the schema for book details
const BooksDetailSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    genre: String,
    ISBN: String,
    availability: Boolean,
  },
  { timestamps: true }
);

// Export the mongoose model
export default mongoose.model("BooksDetail", BooksDetailSchema);
```

### `router/API.js`

This file defines the Express router and sets up API endpoints for adding and retrieving book details.

```javascript
// Define API endpoints
router.get("/api/books", ReadData);
router.post("/api/books/add", AddData);
```

### `app.js`

This is the main entry point of the application where Express app is initialized, middleware is configured, and routes are set up.

```javascript
// Middleware to parse JSON requests
app.use(express.json());

// Use router for API endpoints
app.use("/", router);

// Start the server
app.listen(process.env.PORT, () =>
  console.log("Successfully started on port ", process.env.PORT)
);
```
## Conclusion

The Book Management System is a simple yet efficient application for managing book details. By leveraging Node.js, Express.js, and MongoDB, it provides a robust API for adding and retrieving book information. With its modular structure and clear separation of concerns, it is easy to maintain and extend. Whether you're a book enthusiast looking to organize your collection or a developer seeking to learn and build upon a practical project, this system offers a solid foundation. Get started today and streamline your book management process with ease!