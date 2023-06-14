import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material'; 
import  { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
//import Display from './Display';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

export default function NewUser(props) {
    const [fieldLabels, setFieldLabels] = React.useState([]);
    const [newFieldLabel, setNewFieldLabel] = useState('');
    const [images, setImages] = useState([]);
   const [formValues, setFormValues] = useState({});
   const [user, setUser] = useState(null);
   const [newUser, setNewUser] = useState({
    name: '',
    PhoneNumber: '',
    DueDelivery:'',
   })
  const navigate = useNavigate();

    const handleUploadClick = (e) => {
        const files = Array.from(e.target.files);
        const urlArray = files.map(file => URL.createObjectURL(file));
        setImages(urlArray);
    };
    const handleSave = () => {
        setUser(newUser);  // Assuming `newUser` is the new user data
    
        navigate("/drawer");
      };
    
    const addNewField = () => {
        if (newFieldLabel) {
            setFieldLabels([...fieldLabels, newFieldLabel]);
            setNewFieldLabel('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(Object.fromEntries(data)); // Here we call onSave with the form data when the form is submitted
        const formValues = Object.fromEntries(data);
        setFormValues(formValues); // Update the form values state
        onSave(formValues); // Call onSave with form data
        props.setFormData(formValues); // Update the form values state in ParentComponent
        onSave(formValues); // Call onSave with form data
        navigate("/drawer"); // Navigate to the drawer route
      };

    const onSave = (formData) => {
        axios.post('http://localhost:5005/users/save-client', formData)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ' + err));
    };

  return (
    <><Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
      >
          <Typography> Personal Details </Typography>
          <TextField id="firstName" name= "firstName" label="First Name" variant="standard" />
          <TextField id="lastName" name= "lastName" label="Last Name" variant="standard" />
          <TextField id="birthday" name="birthday" label="Birthday" variant="standard" />
        <TextField id="phoneNumber" name="phoneNumber" label="Phone Number" variant="standard" />
        <TextField id="email" name="email" label="Email" variant="standard" />
    
          <Typography>Location </Typography>
          <TextField id="streetAddress" name= "streetAddress" label="Street Address" variant="standard" />
          <TextField id="postalCode"  name="postalCode" label="Postal Code" variant="standard" />
          <TextField id="city"   name="city" label="City" variant="standard" />
          <TextField id="state"  name="state" label="State/Province" variant="standard" />

          <Typography>Price & Duration </Typography>
          <TextField id="price" name = "price" label="Price" variant="standard" />
          <TextField id="deliveryDate"  name="deliveryDate"  label="Delivery Date" variant="standard" />
          <TextField id="amountPaid" name="amountPaid" label="Amount Paid" variant="standard" />
          <TextField id="noofOrders" name="noofOrders" label="No of Orders" variant="standard" />


          <Typography>Order Details and Measurements </Typography>
          <TextField id="fabricType"  name="fabricType"label="Fabric Type " variant="standard" />
         
          <TextField
              id="orderSummary"
              name= "orderSummary"
              label="Order summary"
              multiline
              rows={4}
              placeholder="Describe order in details, example: Long sleeve dress with tiny sleeves and stoned neck" />



          <TextField id="shoulder" name="shoulder" label="Shoulder" variant="outlined" />
          <TextField id="bust" name="bust" label="Bust" variant="outlined" />
          <TextField id="waist" name="waist" label="Waist" variant="outlined" />
          <TextField id="underBust" name="underBust" label="Underbust" variant="outlined" />
          <TextField id="shoulderBust"  name="shoulderBust"label="Shoulder-bust" variant="outlined" />
          <TextField id="shoulderWaist"  name="shoulderWaist" label="Shoulder-Waist" variant="outlined" />
          <TextField id="hips" name="hips" label="Hips" variant="outlined" />
          <TextField id="fullLength" name="fullLength" label="Full Length" variant="outlined" />
          <TextField id="shortdresslength" name="shortdresslength" label="Short Dress Length" variant="outlined" />
          <TextField id="skirtLength" name="skirtLength"   label="Skirt Length" variant="outlined" />
          <TextField id="wrist"  name="wrist" label="Wrist" variant="outlined" />
          <TextField id="biceps" name="biceps" label="Biceps" variant="outlined" />
          <TextField id="elbow" name="elbow" label="Elbow" variant="outlined" />
         
          <Typography>Additional Measurements</Typography>
      {fieldLabels.map((label, index) => (
        <TextField key={index} id={`add${index}`} name="add" label={label} variant="outlined" />
      ))}
      
      <TextField 
        id="outlined-basic-new"
        label="Add new field"
        variant="outlined"
        value={newFieldLabel}
        onChange={(e) => setNewFieldLabel(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={addNewField}>
        Add New Field
      </Button>


<Typography> 
    Upload Image 
</Typography>
          <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Upload Image
        <input
          type="file"
          hidden
          onChange={handleUploadClick}
          accept="image/*"
          multiple
        />
      </Button>

      {images && images.map((image, index) => (
        <Box key={index} sx={{ mt: 2 }}>
         
          <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </Box>
      ))}

  <Button 
 onClick={handleSave}
  type="submit" variant="contained" color="primary">
    Save
  </Button>

</Box>
</>
   
  );
    }