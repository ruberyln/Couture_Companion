import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PatternOutlinedIcon from '@mui/icons-material/PatternOutlined';
import TextureOutlinedIcon from '@mui/icons-material/TextureOutlined';
import axios from 'axios';
import AvatarUpload from './avatarupload';
import { useNavigate } from 'react-router-dom';
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
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import OnlyDrawer from './onlydrawer';

export default function NewUser({onAvatarChange}) {
  const [fieldLabels, setFieldLabels] = React.useState([]);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [images, setImages] = useState([]);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  const handleUploadClick = (e) => {
    const files = Array.from(e.target.files);
    const urlArray = files.map((file) => URL.createObjectURL(file));
    setImages(urlArray);
  };

  const handleSave = () => {
    navigate('/Display', { state: { user: avatar, images, formValues } });
  };

  const addNewField = () => {
    if (newFieldLabel) {
      setFieldLabels([...fieldLabels, newFieldLabel]);
      setNewFieldLabel('');
      setFormValues((prevFormValues) => ({ ...prevFormValues, [newFieldLabel]: '' }));
    }
  };
  const [avatar, setAvatar] = useState("/static/images/avatar/1.jpg");
  const [orderstatus, setOrderStatus] = React.useState('');

  const handleChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const [paymentstatus, setPaymentStatus] = React.useState('');
  const handleChanged = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formValues = Object.fromEntries(data);
    setFormValues(formValues);

    axios
      .post('http://localhost:5005/clients/save-client', formValues)
      .then((res) => {
        console.log(res.data);
        navigate('/Display', { state: { user: res.data, images, formValues } });
      })
      .catch((err) => console.log('Error: ' + err));
  };

  return (
    <>
   
   <AvatarUpload src={avatar} onChange={onAvatarChange} 
      sx=  {{marginLeft: '150px',
            marginTop: '150px'
      }} />
      <OnlyDrawer/>
     
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ 
          '& > :not(style)': { m: 1, width: '25ch', },
          marginLeft: '150px',
          marginTop: '20px'
        }}
        noValidate
        autoComplete="off"
      >
       
        <Typography>Personal Details</Typography>

        <TextField id="firstName" name="firstName" label="First Name" variant="standard" />
        <TextField id="lastName" name="lastName" label="Last Name" variant="standard" />
        <TextField 
        id="birthday" 
        name="birthday" 
        label="Birthday" 
        type = "date"
        variant="standard"
        InputLabelProps={{
            shrink: true,
         }} />
        <TextField id="phoneNumber" name="phoneNumber" label="Phone Number" variant="standard" />
        <TextField id="email" name="email" label="Email" variant="standard" />

        <Typography>Location</Typography>
        <TextField id="streetAddress" name="streetAddress" label="Street Address" variant="standard" />
        <TextField id="postalCode" name="postalCode" label="Postal Code" variant="standard" />
        <TextField id="city" name="city" label="City" variant="standard" />
        <TextField id="state" name="state" label="State/Province" variant="standard" />

        <Typography>Price & Duration</Typography>
        <TextField id="price" name="price" label="Price" variant="standard" />
        <TextField
  id="deliveryDate"
  name="deliveryDate"
  label="Delivery Date"
  type="date"
  variant="standard"
  InputLabelProps={{
    shrink: true,
  }}
/>

        <TextField id="amountPaid" name="amountPaid" label="Amount Paid" variant="standard" />
        <TextField id="noofOrders" name="noofOrders" label="No of Orders" variant="standard" />
       

        {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="paymentStatus">Payment-Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            value={paymentstatus}
            onChange={handleChanged}
            id="paymentStatus"
            name="paymentStatus"
            label="paymentstatus"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Pending'}>
              <PendingActionsOutlinedIcon /> Pending
            </MenuItem>
            <MenuItem value={'Partial-Payment'}>
              <BalanceOutlinedIcon /> Partial-Payment
            </MenuItem>
            <MenuItem value={'Fully-Paid'}>
              <PriceCheckOutlinedIcon /> Fully-Paid
            </MenuItem>
          </Select>
        </FormControl> */}
        <Typography>Payment Status </Typography>
         <FormGroup>
      <FormControlLabel control={<Checkbox  />} label="Paid" id = "paid" name = "paid" />
      <FormControlLabel control={<Checkbox  />} label="Partial- Payment" id = "partial" name = "partial" />
      <FormControlLabel control={<Checkbox  />} label="Pending" id = "pending" name = "pending" />
      </FormGroup>






        <Typography>Order Details and Measurements</Typography>
        <TextField id="fabricType" name="fabricType" label="Fabric Type" variant="standard" />
        <TextField
          id="orderSummary"
          name="orderSummary"
          label="Order summary"
          multiline
          rows={4}
          placeholder="Describe order in details, example: Long sleeve dress with tiny sleeves and stoned neck"
        />

        <TextField id="shoulder" name="shoulder" label="Shoulder" variant="outlined" />
        <TextField id="bust" name="bust" label="Bust" variant="outlined" />
        <TextField id="waist" name="waist" label="Waist" variant="outlined" />
        <TextField id="underBust" name="underBust" label="Underbust" variant="outlined" />
        <TextField id="shoulderBust" name="shoulderBust" label="Shoulder-bust" variant="outlined" />
        <TextField id="shoulderWaist" name="shoulderWaist" label="Shoulder-Waist" variant="outlined" />
        <TextField id="hips" name="hips" label="Hips" variant="outlined" />
        <TextField id="fullLength" name="fullLength" label="Full Length" variant="outlined" />
        <TextField id="shortdresslength" name="shortdresslength" label="Short Dress Length" variant="outlined" />
        <TextField id="skirtLength" name="skirtLength" label="Skirt Length" variant="outlined" />
        <TextField id="wrist" name="wrist" label="Wrist" variant="outlined" />
        <TextField id="biceps" name="biceps" label="Biceps" variant="outlined" />
        <TextField id="elbow" name="elbow" label="Elbow" variant="outlined" />

        <Typography>Additional Measurements</Typography>
        {fieldLabels.map((label, index) => (
          <TextField key={index} id={`add${index}`} name={`add${index}`} label={label} variant="outlined" />
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
              name="orderStatus"
              value={orderstatus}
              onChange={handleChange}
              label="orderstatus"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Sketch'}>
                <DrawOutlinedIcon /> Sketch
              </MenuItem>
              <MenuItem value={'Fabric-Sourcing'}>
                <TextureOutlinedIcon /> Fabric-Sourcing
              </MenuItem>
              <MenuItem value={'Pattern-Drafting'}>
                <PatternOutlinedIcon /> Pattern-Drafting
              </MenuItem>
              <MenuItem value={'Cutting'}>
                <ContentCutOutlinedIcon /> Cutting
              </MenuItem>
              <MenuItem value={'Sewing'}>
                <CheckroomOutlinedIcon /> Sewing
              </MenuItem>
              <MenuItem value={'Delivery'}>
                <LocalShippingOutlinedIcon /> Delivery
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Typography>Upload Image</Typography>
        <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleUploadClick}
            accept="image/*"
            multiple
          />
        </Button>

        {images &&
          images.map((image, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
            </Box>
          ))}

        <Button onClick={handleSave} type="submit" variant="contained" color="primary" endIcon={<SaveAltIcon />}>
          Save
        </Button>
     
      </Box>
    </>
  );
}
