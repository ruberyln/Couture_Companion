

import './App.css';import TextFields from './components/NewUser';
import { useState } from 'react';
import Display from './components/Display';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Profile from './components/profile';
import SignIn from './signin';
//import MiniDrawer from './drawer';
import NewUser from './components/NewUser';
import SignUp from './signup';
import BasicTable from './Table';


export default function App() {
  const [formData, setFormData] = useState({});
  const [formValues, setFormValues] = useState({});
  const handleSave = (data) => {
    setFormData(data);
  }
  const onSave = (updatedFormValues) => {
    setFormValues(updatedFormValues);
    console.log(updatedFormValues)
  };
  const onClick = (formData) => {
    // Handle saving the form data here
    console.log(formData);
  };



  
  return (


     <SignIn/>
  
  
  );
}