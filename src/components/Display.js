import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material'; 
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Display({ onSave, formValues }) {
  const [fieldLabels, setFieldLabels] = React.useState([]);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [images, setImages] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  const handleUploadClick = (e) => {
    const files = Array.from(e.target.files);
    const urlArray = files.map(file => URL.createObjectURL(file));
    setImages(urlArray);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onSave({ ...formValues, [name]: value });
  };


  const addNewField = () => {
    if (newFieldLabel) {
      setFieldLabels([...fieldLabels, newFieldLabel]);
      setNewFieldLabel('');
    }
  };
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     onSave({ ...formValues, [name]: value });
//   };


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSave(data);
  };

  const toggleEdit = () => {
    if (isEditable) {
      onSave(formValues);
    }
  
    setIsEditable(!isEditable);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
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
        disabled={!isEditable}
        value={formValues?.firstName||''}
         onChange={handleInputChange}
      />
      <TextField
        id="lastName"
        name="lastName"
        label="Last Name"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.lastName||''}
      />
      <TextField
        id="birthday"
        name="birthday"
        label="Birthday"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.birthday||''}
      />
      <TextField
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.phoneNumber||''}
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.email||''}
      />

      <Typography>Location</Typography>
      <TextField
        id="streetAddress"
        name="streetAddress"
        label="Street Address"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.streetAddress||''}
      />
      <TextField
        id="postalCode"
        name="postalCode"
        label="Postal Code"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.postalCode||''}
      />
      <TextField
        id="city"
        name="city"
        label="City"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.city||''}
      />
      <TextField
        id="state"
        name="state"
        label="State/Province"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.state||''}
      />

      <Typography>Price & Duration</Typography>
      <TextField
        id="price"
        name="price"
        label="Price"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.price||''}
      />
      <TextField
        id="deliveryDate"
        name="deliveryDate"
        label="Delivery Date"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.deliveryDate||''}
      />
      <TextField
        id="amountPaid"
        name="amountPaid"
        label="Amount Paid"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.amountPaid||''}
      />
      <TextField
        id="noofOrders"
        name="noofOrders"
        label="No of Orders"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.noofOrders||''}
      />

      <Typography>Order Details and Measurements</Typography>
      <TextField
        id="fabricType"
        name="fabricType"
        label="Fabric Type"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.fabricType||''}
      />

      <TextField
        id="orderSummary"
        name="orderSummary"
        label="Order summary"
        multiline
        rows={4}
        placeholder="Describe order in details, example: Long sleeve dress with tiny sleeves and stoned neck"
        disabled={!isEditable}
        value={formValues?.firstorderSummary||''}
      />

      <TextField
        id="shoulder"
        name="shoulder"
        label="Shoulder"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.shoulder||''}
      />
      <TextField
        id="bust"
        name="bust"
        label="Bust"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.bust||''}
      />
      <TextField
        id="waist"
        name="waist"
        label="Waist"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.waist||''}
      />
      <TextField
        id="underBust"
        name="underBust"
        label="Underbust"
        variant="outlined"
        disabled={!isEditable}
      />
      <TextField
        id="shoulderBust"
        name="shoulderBust"
        label="Shoulder-bust"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.shoulderBust||''}
      />
      <TextField
        id="shoulderWaist"
        name="shoulderWaist"
        label="Shoulder-Waist"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.shoulderWaist||''}
      />
      <TextField
        id="hips"
        name="hips"
        label="Hips"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.hips||''}
      />
      <TextField
        id="fullLength"
        name="fullLength"
        label="Full Length"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.fullLength||''}
      />
      <TextField
        id="shortdresslength"
        name="shortdresslength"
        label="Short Dress Length"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.shortdressLength||''}
      />
      <TextField
        id="skirtLength"
        name="skirtLength"
        label="Skirt Length"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.skirtLength||''}
      />
      <TextField
        id="wrist"
        name="wrist"
        label="Wrist"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.wrist||''}
      />
      <TextField
        id="biceps"
        name="biceps"
        label="Biceps"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.biceps||''}
      />
      <TextField
        id="elbow"
        name="elbow"
        label="Elbow"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.elbow||''}
      />

      <Typography>Additional Measurements</Typography>
      {fieldLabels.map((label, index) => (
        <TextField
          key={index}
          id={`add${index}`}
          name={`add${index}`}
          label={label}
          variant="outlined"
          disabled={!isEditable}
          value={formValues?.add||''}
        />
      ))}

      <TextField 
        id="addNew"
        name= "addNew"
        label="Add new field"
        variant="outlined"
        value={newFieldLabel}
        onChange={(e) => setNewFieldLabel(e.target.value)}
        disabled={!isEditable}
      
       
      />

      <Button variant="contained" color="primary" onClick={addNewField} disabled={!isEditable}>
        Add New Field
      </Button>

      <Typography>Upload Image</Typography>
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUploadIcon />}
        disabled={!isEditable}
      >
        Upload Image
        <input
          type="file"
          hidden
          onChange={handleUploadClick}
          accept="image/*"
          multiple
          disabled={!isEditable}
          value={formValues?.file||''}
        
        />
      </Button>

      {images &&
        images.map((image, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
          </Box>
        ))}

      <Button variant="contained" color="primary" onClick={toggleEdit}>
        {isEditable ? 'Save' : 'Edit'}
      </Button>
    </Box>
  );
}
