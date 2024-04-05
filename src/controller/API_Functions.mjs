import BooksDetailsSchema from "../models/Books_Details_Schema.mjs";

const AddData = async (req, res) => {
  const Details = req.body;
  const addedDetails = await BooksDetailsSchema.create(Details);
  return res.send({
    Status: "Success 201 The Book's details added successfully",
    AddData: addedDetails,
  });
};

const ReadData = async (req, res) => {
    const AllDetails = await BooksDetailsSchema.find();
  return res.send({
    Status: "Status 200  Array of books matching the search criteria",
    AllBooksDetails: AllDetails,
  });
};

export { AddData, ReadData };
