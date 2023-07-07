import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { blue, green, indigo, red } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function Dash({ totalAmountPaid, totalNoOfOrders, totalClients }) {
  const [isVisible, setIsVisible] = React.useState({
    order: true,
    payment: true,
    client: true,
  });

  const toggleVisibility = (type) => {
    setIsVisible({ ...isVisible, [type]: !isVisible[type] });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '120px' }}>
      <Card sx={{ minWidth: 400, margin: '0 5px', bgcolor: red[100] }}>
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: red[300], alignItems: 'center' }}>
            <ListAltIcon />
          </Avatar>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 50, textAlign: 'center', color: red[300] }}>
            {isVisible.order ? totalNoOfOrders : "******"}
          </Typography>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 14, textAlign: 'center', color: red[300] }}>
            Total Orders
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => toggleVisibility('order')}>{isVisible.order ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}</Button>
        </CardActions>
      </Card>
      <Card sx={{ minWidth: 400, margin: '0 5px', bgcolor: indigo[100] }}>
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: indigo[300], alignItems: 'center' }}>
            <PaidIcon />
          </Avatar>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 50, textAlign: 'center', color: indigo[300] }}>
            {isVisible.payment ? totalAmountPaid.toFixed(2) : "******"}
          </Typography>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 14, textAlign: 'center', color: indigo[300] }}>
            Total Amount Paid
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => toggleVisibility('payment')}>{isVisible.payment ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}</Button>
        </CardActions>
      </Card>

      <Card sx={{ minWidth: 400, margin: '0 5px', bgcolor: green[100] }}>
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: green[300], alignItems: 'center' }}>
            <PeopleIcon />
          </Avatar>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 50, textAlign: 'center', color: green[300] }}>
            {isVisible.client ? totalClients : "******"}
          </Typography>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 14, textAlign: 'center', color: green[300] }}>
            Total Clients
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => toggleVisibility('client')}>{isVisible.client ? <VisibilityOffOutlinedIcon/> : <VisibilityOutlinedIcon/>}</Button>
        </CardActions>
      </Card>
    </div>
  );
}
