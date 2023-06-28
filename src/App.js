

import './App.css';import TextFields from './components/NewUser';
import { useState } from 'react';
import Display from './components/Display';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Profile from './components/profile';
import SignIn from './signin';
import MiniDrawer from './drawer';
import NewUser from './components/NewUser';
import SignUp from './signup';
import OnlyDrawer from './components/onlydrawer';
import Notifications from './components/notifications';
import LogoutPage from './components/logout';
import Dash from './components/dash';
import AvatarUpload from './components/avatarupload';
import { Dashboard } from '@mui/icons-material';
import Orders from './components/orders';
import Clients from './components/clients';
// import Landing from './components/landing';



export default function App(props) {
  const [userData, setUserData] = useState({});

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

  const [avatar, setAvatar] = useState(null);

  return (
  <Router>
      <Routes>
      <Route  path='signup' element={<SignUp/>} />
      <Route  path='avatarUpload' element={<AvatarUpload/>} />
      <Route  path='dash' element={<Dash/>} />
      <Route  path='orders' element={<Orders/>} />
      <Route  path='clients' element={<Clients/>} />
      {/* <Route  path='landing' element={<Landing/>} /> */}
      <Route path='profile' element={<Profile/>}/>
      <Route path='onlydrawer' element={<OnlyDrawer/>}/>
      <Route path='signin' element={<SignIn/>}/>
      <Route path='logout' element={<LogoutPage/>}/>
      <Route path='notifications' element={<Notifications/>}/>
      <Route path='NewUser' element={<NewUser setFormData={setFormData}  />}/>
      <Route path='drawer' element={<MiniDrawer formData={userData}/>}/>
      <Route path='Display' element={<Display onSave={setUserData} formData={formData} />}/>
      </Routes>
      </Router>
  );
}