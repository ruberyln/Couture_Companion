import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PatternOutlinedIcon from '@mui/icons-material/PatternOutlined';
import TextureOutlinedIcon from '@mui/icons-material/TextureOutlined';
import axios from 'axios';
import AvatarUpload from './avatarupload';
import {Snackbar} from '@mui/material';
import {Alert} from '@mui/material';
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

  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleUploadClick = (e) => {
    const files = Array.from(e.target.files);
    const urlArray = files.map((file) => URL.createObjectURL(file));
    setImages(urlArray);
  };

  const handleSave = () => {
    const requiredFields = ["firstName", "amountPaid", "noofOrders", "paymentStatus", "price", "deliveryDate", "birthday"];
    for (let field of requiredFields) {
      if (!formValues[field]) {
        // alert(`Error: Field "${field}" is required`);
        // navigate('NewUser')
        return;
      }
    }
    navigate('/Display', { state: { user: avatar, images, formValues } });      
}


  
   
  

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
  const [today, setToday] = useState('');

  useEffect(() => {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      setToday(formattedDate);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredFields = ["firstName", "amountPaid", "noofOrders", "paymentStatus", "price"];
    const data = new FormData(event.target);
    const formValues = Object.fromEntries(data);
 // check if all required fields are filled
 for (let field of requiredFields) {
  if (!formValues[field]) {
    setError(`Error: Field "${field}" is required`);
    setOpen(true);
    return;
  }
}
setError(null);
setOpen(false);
    console.log("formmmm from save",formValues)
    setFormValues(formValues);
formValues.addedBy=localStorage.getItem('userId')
formValues.images=images
    axios
      .post('http://localhost:5005/clients/save-client', formValues)
      .then((res) => {
        console.log(res.data);
        setImages([])
        navigate('/drawer',{ state: { user: res.data, images, formValues } });
      })
      .catch((err) => console.log('Error: ' + err));
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <>
   <Box sx={{ mx: 5, 
 display: 'flex',
 flexDirection: 'column', 
 alignItems: 'center' ,
 marginLeft: '150px',
  marginTop: '200px'}}>

   {/* <AvatarUpload src={avatar} onChange={onAvatarChange} 
      sx=  {{marginLeft: '150px',
            marginTop: '150px'
      }} /> */}
      </Box>
      <OnlyDrawer/>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ 
          '& > :not(style)': { m: 1, width: '25ch', },
        //  mx: 5, 
            marginLeft: '150px',
             marginTop: '20px'
            }}
       
       
        noValidate
        autoComplete="off"
      >
       
        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 25 }}>Personal Details</Typography>

        <TextField id="firstName" name="firstName" label="First Name" variant="standard"  required/>
    
        <TextField id="lastName" name="lastName" label="Last Name" variant="standard" />
        <TextField 
        id="birthday" 
        name="birthday" 
        label="Birthday" 
        type = "date"
        variant="standard"
        InputLabelProps={{
            shrink: true,
         }} 
         required/>
        <TextField id="phoneNumber" name="phoneNumber" label="Phone Number" variant="standard" placeholder='000-000-0000' type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
/>
        <TextField id="email" name="email" label="Email" variant="standard" />

        <Typography sx={{ fontFamily: "'EB Garamond', serif" , fontSize: 25 }}>Location</Typography>
        <TextField id="streetAddress" name="streetAddress" label="Street Address" variant="standard" />
        <TextField id="postalCode" name="postalCode" label="Postal Code" variant="standard" />
        <TextField id="city" name="city" label="City" variant="standard" />
        <TextField id="state" name="state" label="State/Province" variant="standard" />

        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 25 }}>Price & Duration</Typography>
        <TextField id="price" name="price" label="Price" variant="standard"  required/>
        <TextField
            id="deliveryDate"
            name="deliveryDate"
            label="Delivery Date"
            type="date"
            variant="standard"
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                min: today
            }}
            required
        />

        <TextField id="amountPaid" name="amountPaid" label="Amount Paid" variant="standard" type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 required/>
        <TextField id="noofOrders" name="noofOrders" label="No of Orders" variant="standard" type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 required/>
        <TextField id="fabricType" name="fabricType" label="Fabric Type" variant="standard" />

        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 25 }}>Payment Status </Typography>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Payment Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="paymentStatus"
              name="paymentStatus"
              value={paymentstatus}
              onChange={handleChanged}
              label="Payment Status"
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

       



        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 25 }} >Order Details and Measurements</Typography>
        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 20 }}>Upper body Measurements </Typography>
        
        <TextField id="shoulder" name="shoulder" label="Shoulder" variant="outlined"      type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
/>
        <TextField id="bust" name="bust" label="Bust" variant="outlined"     type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />
        <TextField id="waist" name="waist" label="Waist" variant="outlined"     type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />
        <TextField id="underBust" name="underBust" label="Underbust" variant="outlined"     type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />
        <TextField id="shoulderBust" name="shoulderBust" label="Shoulder-bust" variant="outlined"     type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />
        <TextField id="shoulderWaist" name="shoulderWaist" label="Shoulder-Waist" variant="outlined"     type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />
       
        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 20 }}>Arms </Typography>
        <TextField id="wrist" name="wrist" label="Wrist" variant="outlined"    type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />
        <TextField id="biceps" name="biceps" label="Biceps" variant="outlined"    type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />
        <TextField id="elbow" name="elbow" label="Elbow" variant="outlined"     type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />

        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 20 }}>Lower Body Measurements </Typography>
        <TextField id="hips" name="hips" label="Hips" variant="outlined"    
          type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
/>
        <TextField id="fullLength" name="fullLength" label="Full Length" variant="outlined"   
         type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />
        <TextField id="shortdresslength" name="shortdresslength" label="Short Dress Length" variant="outlined"  type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />
        <TextField id="skirtLength" name="skirtLength" label="Skirt Length" variant="outlined"     type="number"
    inputProps={{ 
        pattern: "[0-9]*",
        inputMode: "numeric"
    }}
 />

      

        

        <Box>
          <Stack
  divider={<Divider orientation="vertical" flexItem />}
  spacing={2}>
        <TextField
          id="orderSummary"
          name="orderSummary"
          label="Order summary"
          multiline
          rows={7}
         
          placeholder="Describe order in details, example: Long sleeve dress with tiny sleeves and stoned neck"
        />

        <TextField
          id="add"
          name="add"
          label="Add"
          multiline
          rows={7}
          placeholder="Add your custom measurements e.g Back -10 upper arm - 15"
        />
</Stack>
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

        {/* <Typography sx= {{alignItems: "center", justifyContent : "center"}}>Additional Measurements</Typography>
        {fieldLabels.map((label, index) => (
          <TextField key={index} id={`add${index}`} name={`add${index}`} label={label} variant="outlined" />
        ))}

        <TextField 
          id="additionalMeasurements"
          name = "additionalMeasurements"
          label="Add a new Field"
          variant="outlined"
          value={newFieldLabel}
          onChange={(e) => setNewFieldLabel(e.target.value)}
        /> 

        <Button variant="contained" color="primary" onClick={addNewField}>
          Add New Field
        </Button> */}

        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 20 }}>Upload Image</Typography>
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
