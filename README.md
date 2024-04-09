# Book Management System

This project is a simple book management system built with Node.js, Express.js, and MongoDB. It allows users to add and retrieve book details via a RESTful API.

## Files Overview

### `controller/API_Functions.js`

### AddData Function:

```javascript
const AddData = async (req, res) => {
  try {
    const Details = req.body;
    const { ISBN, title } = req.body;
    const found = await BooksDetail.find({
      ISBN: ISBN,
      title: title,
    });
    if (found.length != 0) {
      return res
        .status(400)
        .send({ status: "Failed", message: "Book details already exist" });
    }
    const addedDetails = await BooksDetail.create(Details);
    return res.status(201).send({
      Status: "Success. The Book's details added successfully",
      AddData: addedDetails,
    });
  } catch (error) {
    return res.status(500).send({ Status: "Failed", message: error.message });
  }
};
```

Explanation:
- This function adds new book details to the database.
- It first checks if the book with the same ISBN and title already exists in the database.
- If the book is not found, it adds the new book details to the database.
- It then sends a success response with the added book details.

### ReadData Function:

```javascript
const ReadData = async (req, res) => {
  try {
    const q = req.query;
    const qarr = Object.keys(q).map((k) => ({ [k]: q[k] }));
    const AllDetails = await BooksDetail.find(qarr.length != 0 ? { $or: qarr } : {});
    return res.status(200).send({
      Status: "Array of books matching the search criteria",
      AllBooksDetails: AllDetails,
    });
  } catch (error) {
    return res.status(500).send({ Status: "Failed", message: error.message });
  }
};
```

Explanation:
- This function retrieves book details from the database based on the search criteria provided in the request query.
- It constructs a MongoDB query based on the query parameters.
- It retrieves all book details that match the search criteria.
- It then sends a success response with the retrieved book details.


### UpdateData Function:

```javascript
const UpdateData = async (req, res) => {
  try {
    const { id } = req.params;
    const find = await BooksDetail.find({ _id: id });
    if (find.length == 0) {
      return res.status(404).send("Book Not Found");
    }
    const Details = req.body;
    const updatedDetails = await BooksDetail.findByIdAndUpdate(
      { _id: id },
      { $set: Details },
      { new: true }
    );
    return res.status(201).send({
      Status: "Success. The Book's details updated successfully",
      UpdatedData: updatedDetails,
    });
  } catch (error) {
    return res.status(500).send({ Status: "Failed", message: error.message });
  }
};
```

Explanation:
- This function updates the details of a book in the database.
- It first checks if the book with the specified ID exists.
- If the book is found, it updates the book details with the data provided in the request body.
- It then sends a success response with the updated book details.

### DeleteData Function:

```javascript
const DeleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const find = await BooksDetail.find({ _id: id });
    if (find.length == 0) {
      return res.status(404).send("Book Not Found");
    }
    const deletedDetails = await BooksDetail.findByIdAndDelete({
      _id: id,
    });
    return res.status(200).send({
      Status: "Success. The Book deleted successfully",
      DeletedData: deletedDetails,
    });
  } catch (error) {
    return res.status(500).send({ Status: "Failed", message: error.message });
  }
};
```

Explanation:
- This function deletes a book from the database based on the specified ID.
- It first checks if the book with the specified ID exists.
- If the book is found, it deletes the book from the database.
- It then sends a success response with the deleted book details.

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
router.put("/api/books/update/:id", UpdateData);
router.delete("/api/books/delete/:id", DeleteData);
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
