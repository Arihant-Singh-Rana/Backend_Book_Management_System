import BooksDetailsSchema from "../models/Books_Details_Schema.mjs";

const AddData = async (req, res) => {
  try {
    const Details = req.body;
    const {ISBN, title } = req.body;
    const found = await BooksDetailsSchema.find({
      ISBN: ISBN,
      title: title,
    });
    if (found.length != 0) {
      return res
        .status(400)
        .send({ status: "Failed", message: "Book details already exists" });
    }
    const addedDetails = await BooksDetailsSchema.create(Details);
    return res.status(201).send({
      Status: "Success. The Book's details added successfully",
      AddData: addedDetails,
    });
  } catch (error) {
    return res.status(500).send({ Status: "Failed", message: error.message });
  }
};

const ReadData = async (req, res) => {
  try {
    const q = req.query;
    const qarr = Object.keys(q).map((k) => ({ [k] : q[k] }));
    const AllDetails = await BooksDetailsSchema.find(qarr.length != 0 ?{ $or: qarr }:{});
    return res.status(200).send({
      Status: "Array of books matching the search criteria",
      AllBooksDetails: AllDetails,
    });
  } catch (error) {
    return res.status(500).send({ Status: "Failed", message: error.message });
  }
};

const UpdateData = async (req, res) => {
  try {
    const { id } = req.params;
    const find = await BooksDetailsSchema.find({ _id: id });
    if (find.length == 0) {
      return res.status(404).send("Book Not Found");
    }
    const Details = req.body;
    const updatedDetails = await BooksDetailsSchema.findByIdAndUpdate(
      { _id: id },
      { $set: Details },{new : true}
    );
    return res.status(201).send({
      Status: "Success. The Book's details added successfully",
      AddData: updatedDetails,
    });
  } catch (error) {
    return res.status(500).send({ Status: "Failed", message: error.message });
  }
};

const DeleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const find = await BooksDetailsSchema.find({ _id: id });
    if (find.length == 0) {
      return res.status(404).send("Book Not Found");
    }
    const updatedDetails = await BooksDetailsSchema.findByIdAndDelete({
      _id: id,
    });
    return res.status(200).send({
      Status: "Success. The Book deleted successfully",
      AddData: updatedDetails,
    });
  } catch (error) {
    return res.status(500).send({ Status: "Failed", message: error.message });
  }
};

export { AddData, ReadData, UpdateData, DeleteData};
