import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import configData from "../config.json";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const AddProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let id = localStorage.getItem("id");
  let college = localStorage.getItem("collegeName");
  
  console.log("id=>", id);
  
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState();
  
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = React.useState('');


  const [image, setImage] = useState("");

  const addProductHandler = async (e) => {
    e.preventDefault();

 

    const formData = new FormData();
    console.log(category);
    formData.append("image", image);
    formData.append("productName", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("sellerId", id);
    formData.append("collegeName", college);


    console.log("image data => ", image);
    const auth = localStorage.getItem("isAuthenticated");

    if (auth) {
      const resp = await axios.post(
        `${configData.apiurl}/product/upload`,
        formData
      );
      console.log("resp=>", resp);
      if (resp.status === 200) {
        window.location.reload();
        alert("product uploaded");
      } else {
        alert("error");
      }
    } else alert("Login First to sell your product");
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <Container className="mt-5 p-2">
        <h1 style={{ fontSize: "30px", fontWeight: "600" }}>Add Product</h1>
        <hr />

        <Form
          onSubmit={addProductHandler}
          method="POST"
          encType="multipart/form-data"
        >
          <Form.Group controlId="fileName" className="mb-3">
            <Form.Label style={{ marginRight: "30px" }}>
              Upload Image
            </Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              size="lg"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label style={{ fontSize: "20px", marginRight: "90px" }}>
              Title
            </Form.Label>
            <Form.Control
              style={{ border: "2px solid black", borderRadius: "10px" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label style={{ fontSize: "20px", marginRight: "45px" }}>
              Price (Rs)
            </Form.Label>
            <Form.Control
              style={{ border: "2px solid black", borderRadius: "10px" }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label style={{ fontSize: "20px", marginRight: "25px" }}>
              Description
            </Form.Label>
            <Form.Control
              style={{ border: "2px solid black", borderRadius: "10px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
            />
          </Form.Group>

         
          <FormControl sx={{ m: 0.8, minWidth: 1300 ,borderBlockColor:"black" }}>
            <Select
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Category</em>
              </MenuItem>
              <MenuItem value={"books"}>books</MenuItem>
              <MenuItem value={"stationery"}>stationery</MenuItem>
              <MenuItem value={"electronics"}>electronics</MenuItem>
              <MenuItem value={"furniture"}>furniture</MenuItem>
            </Select>
            <FormHelperText>Choose a category regarding your product</FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: "20px", marginLeft: "20px" }}
          >
            Add Product
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddProduct;
