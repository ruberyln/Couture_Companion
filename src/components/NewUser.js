import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material'; 
import  { Button , TableBody, TableCell  } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import Display from './Display';
import PatternOutlinedIcon from '@mui/icons-material/PatternOutlined';
import TextureOutlinedIcon from '@mui/icons-material/TextureOutlined';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';


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
        setNewUser(newUser);  // Assuming `newUser` is the new user data
    
        navigate("/Display");
      };
    
    const addNewField = () => {
        if (newFieldLabel) {
            setFieldLabels([...fieldLabels, newFieldLabel]);
            setNewFieldLabel('');
        }
    };
    const [orderstatus, setOrderStatus] = React.useState('');

    const handleChange = (event) => { // for order status 
      setOrderStatus(event.target.value);
    };
  


    const [paymentstatus, setPaymentStatus] = React.useState('');
    const handleChanged = (event) => { // for payment status 
        setPaymentStatus(event.target.value);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(Object.fromEntries(data)); // Here we call onSave with the form data when the form is submitted
        const formValues = Object.fromEntries(data);
        setFormValues(formValues); // Update the form values state

        axios.post('http://localhost:5005/clients/save-client', formValues)
        .then(res => {
          console.log(res.data);
          setUser(res.data);
          navigate("/Display", { state: { user: res.data }}); // Navigate to Display.js with the user data
    })
     
        .catch(err => console.log('Error: ' + err));
    };
        // onSave(formValues); // Call onSave with form data
        // props.setFormData(formValues); // Update the form values state in ParentComponent
        // onSave(formValues); // Call onSave with form data
        // navigate("/drawer"); // Navigate to the drawer route
    

    //   const onSave = (formData) => {
       

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
          <TextField id="firstName" 
          name= "firstName"
          label="First Name" 
          variant="standard" 
          />
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

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Payment-Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          value={paymentstatus}
          onChange={handleChanged}
          id= "paymentStatus"
          name = "paymentStatus"
          label="paymentstatus"
        >
           <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value={"Pending"}>
      <PendingActionsOutlinedIcon /> Pending
    </MenuItem> 
  
    <MenuItem value={"Partial-Payment"}>
      <BalanceOutlinedIcon /> Partial-Payment
    </MenuItem> 
    <MenuItem value={"Fully-Paid"}>
      <PriceCheckOutlinedIcon />Fully-Paid
    </MenuItem> 
    
  </Select>
</FormControl>

          <Typography>Order Details and Measurements </Typography>
          <TextField id="fabricType"  name="fabricType"label="Fabric Type " variant="standard" />
          <TextField id="orderSummary"  name="orderSummary"label="" variant="standard" />
          <TextField
              id="orderSummary"
              name= "orderSummary"
              label="Order summary"
              multiline
              rows={4}
              placeholder="Describe order in details, example: Long sleeve dress with tiny sleeves and stoned neck" 
              />



          <TextField id="shoulder" name=" shoulder " label="Shoulder" variant="outlined" />
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
<Box>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Order-Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="orderStatus"
          name = "orderStatus"
          value={orderstatus}
          onChange={handleChange}
          label="orderstatus"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>


          <MenuItem value={ "Sketch" }  >
            <DrawOutlinedIcon /> Sketch
          </MenuItem> 
          <MenuItem value={"Fabric-Sourcing"}>
            <TextureOutlinedIcon /> Fabric-Sourcing
          </MenuItem> 
          <MenuItem value={"Pattern-Drafting"}>
            <PatternOutlinedIcon /> Pattern-Drafting
          </MenuItem> 
          <MenuItem value={"Cutting"}>
            <ContentCutOutlinedIcon /> Cutting
          </MenuItem> 
          <MenuItem value={"Sewing"}>
            <CheckroomOutlinedIcon /> Sewing
          </MenuItem>
          <MenuItem value={"Delivery"}>
            <LocalShippingOutlinedIcon /> Delivery
          </MenuItem>
        </Select> 
      </FormControl>
      </Box>

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
 onSave={handleSave}
  type="submit" variant="contained" color="primary">
    Save
  </Button>
  
</Box>
</>
   
  );
    }
 