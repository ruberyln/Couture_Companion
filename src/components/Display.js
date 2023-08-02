import React, { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PatternOutlinedIcon from '@mui/icons-material/PatternOutlined';
import TextureOutlinedIcon from '@mui/icons-material/TextureOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AvatarUpload from './avatarupload';



import OnlyDrawer from './onlydrawer';

export default function Display() {
  const navigate = useNavigate();
  const location = useLocation();
  const [images, setImages] = useState([]);
  const user = location.state?.user;
  const [users, setUsers] = useState(null);
  const [formValues, setFormValues] = useState(user || {});
  const [fieldLabels, setFieldLabels] = React.useState([]);
  const [newFieldLabel, setNewFieldLabel] = useState('');

    useEffect(() => {
      if (location.state) {
        const { images, formValues, user } = location.state;
        console.log("user",user)
        setImages(user.images || []);
        setFormValues(user || {});
        setUsers(user || {});
      }
      
    }, [location.state]);

    const addNewField = () => {
      if (newFieldLabel) {
        setFieldLabels([...fieldLabels, newFieldLabel]);
        setNewFieldLabel('');
        setFormValues((prevFormValues) => ({ ...prevFormValues, [newFieldLabel]: '' }));
      }
    };
  // useEffect(() => {
  //   if (location.state) {
  //     const { images, formValues, user } = location.state;
  // console.log (user)
  //     setImages((prevImages) => prevImages || images);
  //     setFormValues((prevFormValues) => prevFormValues || formValues);
  //     setUsers((prevUser) => prevUser || user);
  //   }
  // }, [location.state]);
 
  
  
  
  

  const handleUploadClick = (e) => {
    const files = Array.from(e.target.files);
    const urlArray = files.map((file) => URL.createObjectURL(file));
    setImages(urlArray);
  };

  // const handleDelete = useCallback(() => {
  //   if (user && Object.keys(user).length > 0 && user._id) {
  //     axios
  //       .delete(`http://localhost:5005/clients/delete-client/${user._id}`)
  //       .then(() => navigate('/drawer'))
  //       .catch((err) => console.log('Error: ' + err));
  //   }
  // }, [user, navigate]);


  // ...
  
  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (user && Object.keys(user).length > 0 && user._id) {
              axios
                .delete(`http://localhost:5005/clients/delete-client/${user._id}`)
                .then(() => navigate('/drawer'))
                .catch((err) => console.log('Error: ' + err));
            }
          }
        },
        {
          label: 'No',
          // No action on No
        }
      ]
    });
  };
  

  const formRef = useRef();

  const handleSave = (event) => {
    event.preventDefault();
    const data = new FormData(formRef.current);
    const formValues = Object.fromEntries(data.entries());
    formValues.images =images
console.log(formValues)
    setFormValues(formValues);
    setUsers(users);
  
    if (user._id) {
      console.log(user);
      axios
        .put(`http://localhost:5005/clients/update-client/${user._id}`, formValues)
        .then((res) => {
          console.log(res.data);
        
          navigate('/drawer', { state: { users: res.data, formValues, images } });
        })
        .catch((err) => console.log('Error: ' + err));
    }
    else {
      axios
        .post('http://localhost:5005/clients/save-client', formValues)
        .then((res) => {
          console.log(res.data);
          navigate('/drawer', { state: { user: res.data, formValues } });
        })
        .catch((err) => console.log('Error: ' + err));
    }
  };
  



  return (
    <>
    {/* <AvatarUpload /> */}

    <OnlyDrawer />

    <Box
      ref={formRef}
      onSubmit={handleSave}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        marginLeft: '150px',
        marginTop: '200px',
      }}
      noValidate
      autoComplete="off"
    >
        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 25 }}>Personal Details</Typography>

        <TextField
  id="firstName"
  name="firstName"
  label="First Name"
  variant="standard"
  value={formValues?.firstName || ''}
  onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
  autoComplete="off"
/>

        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="standard"
          value={formValues?.lastName || ''}
          onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
        />
        <TextField
          id="birthday"
          name="birthday"
          label="Birthday"
          type = "date"
          variant="standard"
          InputLabelProps={{
              shrink: true,
           }}
          value={formValues?.birthday || ''}
          onChange={(e) => setFormValues({ ...formValues, birthday: e.target.value })}
        />
        <TextField
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          variant="standard"
          value={formValues?.phoneNumber || ''}
          onChange={(e) => setFormValues({ ...formValues, phoneNumber: e.target.value })}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="standard"
          value={formValues?.email || ''}
          onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
        />

        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 25 }}>Location</Typography>
        <TextField
          id="streetAddress"
          name="streetAddress"
          label="Street Address"
          variant="standard"
          value={formValues?.streetAddress || ''}
          onChange={(e) => setFormValues({ ...formValues, streetAddress: e.target.value })}
        />
        <TextField
          id="postalCode"
          name="postalCode"
          label="Postal Code"
          variant="standard"
          value={formValues?.postalCode || ''}
          onChange={(e) => setFormValues({ ...formValues, postalCode: e.target.value })}
        />
        <TextField
          id="city"
          name="city"
          label="City"
          variant="standard"
          value={formValues?.city || ''}
          onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
        />
        <TextField
          id="state"
          name="state"
          label="State/Province"
          variant="standard"
          value={formValues?.state || ''}
          onChange={(e) => setFormValues({ ...formValues, state: e.target.value })}
        />

        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 25 }}>Price & Duration</Typography>
        <TextField
          id="price"
          name="price"
          label="Price"
          variant="standard"
          value={formValues?.price || ''}
          onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
        />
        <TextField
          id="deliveryDate"
          name="deliveryDate"
          label="Delivery Date"
          type = "date"
        variant="standard"
        InputLabelProps={{
            shrink: true,
         }}
          value={formValues?.deliveryDate || ''}
          onChange={(e) => setFormValues({ ...formValues, deliveryDate: e.target.value })}
        />
        <TextField
          id="amountPaid"
          name="amountPaid"
          label="Amount Paid"
          variant="standard"
          value={formValues?.amountPaid || ''}
          onChange={(e) => setFormValues({ ...formValues, amountPaid: e.target.value })}
        />
        <TextField
          id="noofOrders"
          name="noofOrders"
          label="No of Orders"
          variant="standard"
          value={formValues?.noofOrders || ''}
          onChange={(e) => setFormValues({ ...formValues, noofOrders: e.target.value })}
        />
  <TextField
          id="fabricType"
          name="fabricType"
          label="Fabric Type"
          variant="standard"
          value={formValues?.fabricType || ''}
          onChange={(e) => setFormValues({ ...formValues, fabricType: e.target.value })}
        />
      <TextField
          id="paymentStatus"
          name="paymentStatus"
          label="Payment Status"
          variant="standard"
          value={formValues?.paymentStatus || ''}
          onChange={(e) => setFormValues({ ...formValues, paymentStatus: e.target.value })}
        />
<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Payment Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="paymentStatus"
              name="paymentStatus"
             // onChange={handleChange}
              label="paymentstatus"
              value={formValues?.paymentStatus || ''}
              onChange={(e) => setFormValues({ ...formValues, paymentStatus: e.target.value })}
            
            >
               <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Paid'}>
                <PriceCheckOutlinedIcon /> Paid
              </MenuItem>
              <MenuItem value={'Partially-Paid'}>
                <BalanceOutlinedIcon /> Partially-Paid
              </MenuItem>
              <MenuItem value={'Pending'}>
                <PendingActionsOutlinedIcon  /> Pending
              </MenuItem>
          </Select>
          </FormControl>

  

        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 25 }}>Order Details and Measurements</Typography>
        <Typography  sx={{ fontFamily: "'EB Garamond', serif", fontSize: 20 }}>Upper body Measurements</Typography>
      
       
       <TextField
          id="shoulder"
          name="shoulder"
          label="Shoulder"
          variant="standard"
          value={formValues?.shoulder || ''}
          onChange={(e) => setFormValues({ ...formValues, shoulder: e.target.value })}
        />
       
     
     <TextField
  id="bust"
  name="bust"
  label="Bust"
  variant="outlined"
  value={formValues?.bust || ''}
  onChange={(e) => setFormValues({ ...formValues, bust: e.target.value })}
/>
        <TextField
          id="waist"
          name="waist"
          label="Waist"
          variant="outlined"
          value={formValues?.waist || ''}
          onChange={(e) => setFormValues({ ...formValues, waist: e.target.value })}
        />
        <TextField
          id="underBust"
          name="underBust"
          label="Underbust"
          variant="outlined"
          value={formValues?.underBust || ''}
          onChange={(e) => setFormValues({ ...formValues, underBust: e.target.value })}
        />
        <TextField
          id="shoulderBust"
          name="shoulderBust"
          label="Shoulder-bust"
          variant="outlined"
          value={formValues?.shoulderBust || ''}
          onChange={(e) => setFormValues({ ...formValues, shoulderBust: e.target.value })}
        />
        <TextField
          id="shoulderWaist"
          name="shoulderWaist"
          label="Shoulder-Waist"
          variant="outlined"
          value={formValues?.shoulderWaist || ''}
          onChange={(e) => setFormValues({ ...formValues, shoulderWaist: e.target.value })}
        />


       
 <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 20 }}>Arms </Typography>
 <TextField
          id="wrist"
          name="wrist"
          label="Wrist"
          variant="outlined"
          value={formValues?.wrist || ''}
          onChange={(e) => setFormValues({ ...formValues, wrist: e.target.value })}
        />
        <TextField
          id="biceps"
          name="biceps"
          label="Biceps"
          variant="outlined"
          value={formValues?.biceps || ''}
          onChange={(e) => setFormValues({ ...formValues, biceps: e.target.value })}
        />
        <TextField
          id="elbow"
          name="elbow"
          label="Elbow"
          variant="outlined"
          value={formValues?.elbow || ''}
          onChange={(e) => setFormValues({ ...formValues, elbow: e.target.value })}
        />

         <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 20 }}>Lower Body Measurements </Typography>
         <TextField
          id="hips"
          name="hips"
          label="Hips"
          variant="outlined"
          value={formValues?.hips || ''}
          onChange={(e) => setFormValues({ ...formValues, hips: e.target.value })}
        />
        <TextField
          id="fullLength"
          name="fullLength"
          label="Full Length"
          variant="outlined"
          value={formValues?.fullLength || ''}
          onChange={(e) => setFormValues({ ...formValues, fullLength: e.target.value })}
        />
        <TextField
          id="shortdresslength"
          name="shortdresslength"
          label="Short Dress Length"
          variant="outlined"
          value={formValues?.shortdresslength || ''}
          onChange={(e) => setFormValues({ ...formValues, shortdresslength: e.target.value })}
        />
        <TextField
          id="skirtLength"
          name="skirtLength"
          label="Skirt Length"
          variant="outlined"
          value={formValues?.skirtLength || ''}
          onChange={(e) => setFormValues({ ...formValues, skirtLength: e.target.value })}
        />
        
 <TextField
          id="orderSummary"
          name="orderSummary"
          label="Order summary"
          multiline
          rows={4}
          placeholder="Describe order in details, example: Long sleeve dress with tiny sleeves and stoned neck"
          value={formValues?.orderSummary || ''}
          onChange={(e) => setFormValues({ ...formValues, orderSummary: e.target.value })}
        />

        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 20 }} >Order Status</Typography>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Order-Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="orderStatus"
              name="orderStatus"
             // onChange={handleChange}
              label="orderstatus"
              value={formValues?.orderStatus || ''}
              onChange={(e) => setFormValues({ ...formValues, orderStatus: e.target.value })}
            
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
              <MenuItem value = {'Delivery'}>
                <LocalShippingOutlinedIcon /> Delivery
              </MenuItem>
            </Select>
          </FormControl>


         <Typography sx= {{alignItems: "center", justifyContent : "center"}}>Additional Measurements</Typography>
        {/* {fieldLabels.map((label, index) => (
          <TextField key={index} id={`add${index}`} name={`add${index}`} label={label} variant="outlined" />
        ))} */}

        <TextField
          id="additionalMeasurements"
          // label={label}
          name = "additionalMeasurements"
          variant="outlined"
          value={formValues?.additionalMeasurements || ''}
          onChange={(e) => setFormValues({ ...formValues, additionalMeasurements: e.target.value })}
        /> 

        <Button variant="contained" color="primary" onClick={addNewField}>
          Add New Field
        </Button>

<Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 20 }}>Image(s)</Typography>
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
