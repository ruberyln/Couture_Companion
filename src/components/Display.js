import React, { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AvatarUpload from './avatarupload';

import SaveAltIcon from '@mui/icons-material/SaveAlt';

import OnlyDrawer from './onlydrawer';

export default function Display( {avatar}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [user, setUser] = useState({id: '' });

  useEffect(() => {
    console.log('location.state:', location.state);
    
    if (location.state) {
      const { formData } = location.state;
      console.log('formData:', formData);
      // Assuming formData contains user information
      setFormValues(formData);
      setUser(formData);
    }
  }, [location.state]);

useEffect(() => {
  console.log('location.state:', location.state);
  console.log('formValues:', formValues);
  console.log('user:', user);
  
  if (location.state) {
    const { images, formValues, user } = location.state;
    console.log('images:', images);
    setImages(images);
    setFormValues(formValues);
    setUser(user);
  }
}, [location.state]);


  const handleUploadClick = (e) => {
    const files = Array.from(e.target.files);
    const urlArray = files.map((file) => URL.createObjectURL(file));
    setImages(urlArray);
  };

  // const handleUpdate = useCallback(() => {
  //   // check if user is not null or undefined and if user object is not empty and contains the id property
  //   if (user && Object.keys(user).length > 0 && user.id) {
  //     axios.post('http://localhost:5005/clients/save-client', formValues)
  //       .then((res) => {
  //         console.log('Update response:', res.data);
  //         setUser(res.data);
  //        navigate('/drawer', { state: { user: res.data,  formValues } });
  //       })
  //       .catch((err) => console.log('Error: ' + err));
  //   }
  // }, [formValues, navigate, user]);

const handleDelete = useCallback(() => {
    // Check if user is not null or undefined and if user object is not empty and contains the id property
    if (user && Object.keys(user).length > 0 && user.id) {
      axios.delete(`http://localhost:5005/clients/delete-client/${user.id}`)

        .then(() => navigate('/NewUser'))
        .catch((err) => console.log('Error: ' + err));
    }
}, [user, navigate]);

const formRef = useRef();

const handleSave = (event) => {
  event.preventDefault();
  const data = new FormData(formRef.current);
  const formValues = Object.fromEntries(data.entries());
  setFormValues(formValues);

  // check if formValues contains an id
  if (formValues.id) {
    // if it does, send a PUT or PATCH request to update the existing user
    axios
      .put(`http://localhost:5005/clients/update-client/${formValues.id}`, formValues)
      .then((res) => {
        console.log(res.data);
        navigate('/drawer', { state: { user: res.data, formValues } });
      })
      .catch((err) => console.log('Error: ' + err));
  } else {
    // if it does not, send a POST request to create a new user
    axios
      .post('http://localhost:5005/clients/save-client', formValues)
      .then((res) => {
        console.log(res.data);
        navigate('/drawer', { state: { user: res.data, formValues } });
      })
      .catch((err) => console.log('Error: ' + err));
  }
};






// const handleSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.target);
//   const formValues = Object.fromEntries(data);
//   setFormValues(formValues);

//   axios
//     .post('http://localhost:5005/clients/save-client', formValues)
//     .then((res) => {
//       console.log(res.data);
//       console.log ("user updated")
//       navigate('/drawer', { state: { user: res.data, images, formValues } });
//     })
//     .catch((err) => console.log('Error: ' + err));
// };

  return (
    <>
    <AvatarUpload/>
    <OnlyDrawer/>
      <Box 
    ref={formRef} onSubmit={handleSave}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          marginLeft: '150px',
          marginTop: '20px'
        }}
        noValidate
        autoComplete="off"
      >
        <Typography>Personal Details</Typography>

        <TextField
  id="firstName"
  name="firstName"
  label="First Name"
  variant="standard"
  value={formValues?.firstName || ''}
  onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
/>

        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="standard"
          value={formValues.lastName || ''}
          onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
        />
        <TextField
          id="birthday"
          name="birthday"
          label="Birthday"
          variant="standard"
          value={formValues.birthday || ''}
          onChange={(e) => setFormValues({ ...formValues, birthday: e.target.value })}
        />
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          variant="standard"
          value={formValues.phoneNumber || ''}
          onChange={(e) => setFormValues({ ...formValues, phoneNumber: e.target.value })}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="standard"
          value={formValues.email || ''}
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
        />

        <Typography>Location</Typography>
        <TextField
          id="streetAddress"
          name="streetAddress"
          label="Street Address"
          variant="standard"
          value={formValues.streetAddress || ''}
          onChange={(e) => setFormValues({ ...formValues, streetAddress: e.target.value })}
        />
        <TextField
          id="postalCode"
          name="postalCode"
          label="Postal Code"
          variant="standard"
          value={formValues.postalCode || ''}
          onChange={(e) => setFormValues({ ...formValues, postalCode: e.target.value })}
        />
        <TextField
          id="city"
          name="city"
          label="City"
          variant="standard"
          value={formValues.city || ''}
          onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
        />
        <TextField
          id="state"
          name="state"
          label="State/Province"
          variant="standard"
          value={formValues.state || ''}
          onChange={(e) => setFormValues({ ...formValues, state: e.target.value })}
        />

        <Typography>Price & Duration</Typography>
        <TextField
          id="price"
          name="price"
          label="Price"
          variant="standard"
          value={formValues.price || ''}
          onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
        />
        <TextField
          id="deliveryDate"
          name="deliveryDate"
          label="Delivery Date"
          variant="standard"
          value={formValues.deliveryDate || ''}
          onChange={(e) => setFormValues({ ...formValues, deliveryDate: e.target.value })}
        />
        <TextField
          id="amountPaid"
          name="amountPaid"
          label="Amount Paid"
          variant="standard"
          value={formValues.amountPaid || ''}
          onChange={(e) => setFormValues({ ...formValues, amountPaid: e.target.value })}
        />
        <TextField
          id="noofOrders"
          name="noofOrders"
          label="No of Orders"
          variant="standard"
          value={formValues.noofOrders || ''}
          onChange={(e) => setFormValues({ ...formValues, noofOrders: e.target.value })}
        />

<FormGroup 
>
      <FormControlLabel 
      control={<Checkbox  />} 
      label="Paid" 
      id = "paid" 
      name = "paid"
      value={formValues.paid || ''}
      onChange={(e) => setFormValues({ ...formValues, paid: e.target.value })}
       />
      <FormControlLabel control={<Checkbox  />} 
      label="Partial-Payment"
       id = "partial" 
       name = "partial" 
       value={formValues.partial || ''}
       onChange={(e) => setFormValues({ ...formValues, partial: e.target.value })}/>

      <FormControlLabel control={<Checkbox  />} 
      label="Pending" 
      id = "pending" 
      name = "pending"
      value={formValues.pending || ''}
      onChange={(e) => setFormValues({ ...formValues, pending: e.target.value })}
       />
      
      </FormGroup>
{/* 
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="paymentStatus">Payment-Status</InputLabel>
          <Select
                 id="paymentStatus"
          name="paymentStatus"
          label="Payment Status"
          variant="standard"
          value={formValues.paymentStatus || ''}
          onChange={(e) => setFormValues({ ...formValues, paymentStatus: e.target.value })}
        />
        </FormControl> */}

        <Typography>Order Details and Measurements</Typography>
        <TextField
          id="fabricType"
          name="fabricType"
          label="Fabric Type"
          variant="standard"
          value={formValues.fabricType || ''}
          onChange={(e) => setFormValues({ ...formValues, fabricType: e.target.value })}
        />
        <TextField
          id="orderSummary"
          name="orderSummary"
          label="Order summary"
          multiline
          rows={4}
          placeholder="Describe order in details, example: Long sleeve dress with tiny sleeves and stoned neck"
          value={formValues.orderSummary || ''}
          onChange={(e) => setFormValues({ ...formValues, orderSummary: e.target.value })}
        />

        <TextField
          id="shoulder"
          name="shoulder"
          label="Shoulder"
          variant="outlined"
          value={formValues.shoulder || ''}
          onChange={(e) => setFormValues({ ...formValues, shoulder: e.target.value })}
        />
        <TextField
          id="bust"
          name="bust"
          label="Bust"
          variant="outlined"
          value={formValues.bust || ''}
          onChange={(e) => setFormValues({ ...formValues, bust: e.target.value })}
        />
        <TextField
          id="waist"
          name="waist"
          label="Waist"
          variant="outlined"
          value={formValues.waist || ''}
          onChange={(e) => setFormValues({ ...formValues, waist: e.target.value })}
        />
        <TextField
          id="underBust"
          name="underBust"
          label="Underbust"
          variant="outlined"
          value={formValues.underBust || ''}
          onChange={(e) => setFormValues({ ...formValues, underBust: e.target.value })}
        />
        <TextField
          id="shoulderBust"
          name="shoulderBust"
          label="Shoulder-bust"
          variant="outlined"
          value={formValues.shoulderBust || ''}
          onChange={(e) => setFormValues({ ...formValues, shoulderBust: e.target.value })}
        />
        <TextField
          id="shoulderWaist"
          name="shoulderWaist"
          label="Shoulder-Waist"
          variant="outlined"
          value={formValues.shoulderWaist || ''}
          onChange={(e) => setFormValues({ ...formValues, shoulderWaist: e.target.value })}
        />
        <TextField
          id="hips"
          name="hips"
          label="Hips"
          variant="outlined"
          value={formValues.hips || ''}
          onChange={(e) => setFormValues({ ...formValues, hips: e.target.value })}
        />
        <TextField
          id="fullLength"
          name="fullLength"
          label="Full Length"
          variant="outlined"
          value={formValues.fullLength || ''}
          onChange={(e) => setFormValues({ ...formValues, fullLength: e.target.value })}
        />
        <TextField
          id="shortdresslength"
          name="shortdresslength"
          label="Short Dress Length"
          variant="outlined"
          value={formValues.shortdresslength || ''}
          onChange={(e) => setFormValues({ ...formValues, shortdresslength: e.target.value })}
        />
        <TextField
          id="skirtLength"
          name="skirtLength"
          label="Skirt Length"
          variant="outlined"
          value={formValues.skirtLength || ''}
          onChange={(e) => setFormValues({ ...formValues, skirtLength: e.target.value })}
        />
        <TextField
          id="wrist"
          name="wrist"
          label="Wrist"
          variant="outlined"
          value={formValues.wrist || ''}
          onChange={(e) => setFormValues({ ...formValues, wrist: e.target.value })}
        />
        <TextField
          id="biceps"
          name="biceps"
          label="Biceps"
          variant="outlined"
          value={formValues.biceps || ''}
          onChange={(e) => setFormValues({ ...formValues, biceps: e.target.value })}
        />
        <TextField
          id="elbow"
          name="elbow"
          label="Elbow"
          variant="outlined"
          value={formValues.elbow || ''}
          onChange={(e) => setFormValues({ ...formValues, elbow: e.target.value })}
        />
{/* 
        {Object.keys(formValues).map((key, index) => {
          if (!['firstName', 'lastName', 'birthday', 'phoneNumber', 'email', 'streetAddress', 'postalCode', 'city', 'state', 'price', 'deliveryDate', 'amountPaid', 'noofOrders', 'paymentStatus', 'fabricType', 'orderSummary', 'shoulder', 'bust', 'waist', 'underBust', 'shoulderBust', 'shoulderWaist', 'hips', 'fullLength', 'shortdresslength', 'skirtLength', 'wrist', 'biceps', 'elbow'].includes(key)) {
            return (
              <TextField
                key={index}
                id={`add${index}`}
                name={`add${index}`}
                label={key}
                variant="outlined"
                value={formValues[key] || ''}
                onChange={(e) => setFormValues({ ...formValues, [key]: e.target.value })}
              />
            );
          }
          return null;
        })} */}

        <Typography>Order Status</Typography>
        <TextField
          id="orderStatus"
          name="orderStatus"
          label="Order Status"
          variant="outlined"
          value={formValues.orderStatus || ''}
          onChange={(e) => setFormValues({ ...formValues, orderStatus: e.target.value })}
        />

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

        <Button onClick={handleSave} variant="contained" color="primary" endIcon={<SaveAltIcon />}>
          Update
        </Button>
        <Button onClick={handleDelete} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Box>
    </>
  );
}
