

import './App.css';import TextFields from './components/NewUser';
import { useState } from 'react';
import Display from './components/Display';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Profile from './components/profile';
import SignIn from './signin';
import MiniDrawer from './drawer';
import NewUser from './components/NewUser';
import SignUp from './signup';
import BasicTable from './table';


export default function App(props) {
  const [usersData, setUsersData] = useState({});

  const [formData, setFormData] = useState({});
  const [formValues, setFormValues] = useState({});
  const handleSave = (data) => {
    setFormData(data);
  }
  // const handleNewUser = (newUser) => {
  //   setUsersData(prevUsers => [...prevUsers, newUser]);
  // }
  const onSave = (updatedFormValues) => {
    setFormValues(updatedFormValues);
    console.log(updatedFormValues)
  };
  const onClick = (formData) => {
    // Handle saving the form data here
    console.log(formData);
  };



  return (
  <Router>
      <Routes>
      <Route  path='signup' element={<SignUp/>} />
      <Route path='profile' element={<Profile/>}/>
      <Route path='NewUser' element={<NewUser setFormData={setFormData}  />}/>
      <Route path='drawer' element={<MiniDrawer formData={formData}/>}/>
      <Route path='Display' element={<Display onSave={handleSave}/>}/>
      </Routes>
      </Router>
  );
}