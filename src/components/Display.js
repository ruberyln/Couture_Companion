import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material'; 
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Display({ onSave }) {
  const [fieldLabels, setFieldLabels] = useState([]);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [images, setImages] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const location = useLocation();
  const user = location.state?.user;
  const [users, setUsers] = useState('');
  const [formValues, setFormValues] = useState(user || {});

  const {formDatas} = location.state || {};
  const[formVal, setFormVal] = useState (formDatas);
  const navigate = useNavigate();
  const [error, setError] = useState(null); 
  const [newUser, setNewUser] = useState({
    name: '',
    PhoneNumber: '',
    DueDelivery:'',
   })
   
  
   
  const handleUploadClick = (e) => {
    const files = Array.from(e.target.files);
    const urlArray = files.map(file => URL.createObjectURL(file));
    setImages(urlArray);
  };

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }));
  }, []); 

//   const handleSubmit = useCallback((event) => {
//   event.preventDefault();
//   axios.post('http://localhost:5005/clients/save-client', formValues)
//     .then(res => {
//       onSave(res.data); // Pass the form data to onSave callback
//       navigate("/drawer", { state: { user: res.data } });
//     })
//     .catch(err => {
//       console.error(err);
//       setError('There was an error saving the form.');
//     });
// }, [formValues, navigate, onSave]);

const handleSubmit = (event) => {
  event.preventDefault();
  onSave(formValues); // Pass the form data to onSave callback
  navigate('/drawer', { state: { formData: formValues } }); // Pass the form data to the drawer component via location state
};



  const addNewField = () => {
    if (newFieldLabel) {
      setFieldLabels(prevFieldLabels => ([...prevFieldLabels, newFieldLabel]));
      setNewFieldLabel('');
      setFormValues(prevFormValues => ({...prevFormValues, [newFieldLabel]: ''}));
    }
  };
  const handleSave = () => {
    setNewUser(newUser);  // Assuming `newUser` is the new user data

    navigate("/drawer");
  };

  const toggleEdit = (event) => {
    event.preventDefault();
    if (isEditable) {
     
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
        value={formValues?.firstName || ''}
        onChange={handleInputChange}
      />
      <TextField
        id="lastName"
        name="lastName"
        label="Last Name"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.lastName || ''}

        onChange={handleInputChange}
      />
      <TextField
        id="birthday"
        name="birthday"
        label="Birthday"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.birthday||''}
        onChange={handleInputChange}
      />
      <TextField
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.phoneNumber||''}
        onChange={handleInputChange}
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.email||''}
        onChange={handleInputChange}
      />

      <Typography>Location</Typography>
      <TextField
        id="streetAddress"
        name="streetAddress"
        label="Street Address"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.streetAddress||''}
        onChange={handleInputChange}
      />
      <TextField
        id="postalCode"
        name="postalCode"
        label="Postal Code"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.postalCode||''}
        onChange={handleInputChange}
      />
      <TextField
        id="city"
        name="city"
        label="City"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.city||''}
        onChange={handleInputChange}
      />
      <TextField
        id="state"
        name="state"
        label="State/Province"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.state||''}
        onChange={handleInputChange}
      />

      <Typography>Price & Duration</Typography>
      <TextField
        id="price"
        name="price"
        label="Price"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.price||''}
        onChange={handleInputChange}
      />
      <TextField
        id="deliveryDate"
        name="deliveryDate"
        label="Delivery Date"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.deliveryDate||''}
        onChange={handleInputChange}
      />
      <TextField
        id="amountPaid"
        name="amountPaid"
        label="Amount Paid"
        variant="standard"
        disabled={!isEditable}
        value={formValues?.amountPaid||''}
        onChange={handleInputChange}
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
        onChange={handleInputChange}
      />
     
      <TextField
        id="orderSummary"
        name="orderSummary"
        label="Order summary"
        multiline
        rows={4}
        placeholder="Describe order in details, example: Long sleeve dress with tiny sleeves and stoned neck"
        disabled={!isEditable}
        value={formValues?.orderSummary||''}
        onChange={handleInputChange}
      />

      <TextField
          id="shoulder"
          name="shoulder"
          label="Shoulder"
          variant="outlined"
          disabled={!isEditable}
          value={formValues?.shoulder||''}
          onChange={handleInputChange}
      />

      <TextField
        id="bust"
        name="bust"
        label="Bust"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.bust||''}
        onChange={handleInputChange}
      />
      <TextField
        id="waist"
        name="waist"
        label="Waist"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.waist||''}
        onChange={handleInputChange}
      />
      <TextField
        id="underBust"
        name="underBust"
        label="Underbust"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.underBust||''}
        onChange={handleInputChange}
      />
      <TextField
        id="shoulderBust"
        name="shoulderBust"
        label="Shoulder-bust"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.shoulderBust||''}
        onChange={handleInputChange}
      />
      <TextField
        id="shoulderWaist"
        name="shoulderWaist"
        label="Shoulder-Waist"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.shoulderWaist||''}
        onChange={handleInputChange}
      />
      <TextField
        id="hips"
        name="hips"
        label="Hips"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.hips||''}
        onChange={handleInputChange}
      />
      <TextField
        id="fullLength"
        name="fullLength"
        label="Full Length"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.fullLength||''}
        onChange={handleInputChange}
      />
      <TextField
        id="shortdressLength"
        name="shortdresslength"
        label="Short Dress Length"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.shortdressLength||''}
        onChange={handleInputChange}
      />
      <TextField
        id="skirtLength"
        name="skirtLength"
        label="Skirt Length"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.skirtLength||''}
        onChange={handleInputChange}
      />
      <TextField
        id="wrist"
        name="wrist"
        label="Wrist"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.wrist||''}
        onChange={handleInputChange}
      />
      <TextField
        id="biceps"
        name="biceps"
        label="Biceps"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.biceps||''}
        onChange={handleInputChange}
      />
      <TextField
        id="elbow"
        name="elbow"
        label="Elbow"
        variant="outlined"
        disabled={!isEditable}
        value={formValues?.elbow||''}
        onChange={handleInputChange}
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
          value={formValues?.[label]||''} 
        onChange={handleInputChange} 
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
        {isEditable ? 'Save' : 'Edit'}</Button>
       {/* <Button variant="contained" color="primary" onClick={} >
Save
      </Button>  */}
        <Button 
 onClick={handleSave}
  type="submit" variant="contained" color="primary">
    Save
  </Button>
    </Box>
  );
}