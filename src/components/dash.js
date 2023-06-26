import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { blue, green,  indigo, red } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import { Reddit } from '@mui/icons-material';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    
  </Box>
);

export default function Dash ({totalAmountPaid, totalNoOfOrders, totalClients }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' , marginTop: '120px'}}>
    <Card sx={{ minWidth: 400, margin: '0 5px' , bgcolor: red[100]  }}>
    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: red[300], alignItems: 'center'  }}>
          <ListAltIcon />
        </Avatar>
        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 50, textAlign: 'center', color: red[300] }}>
        {totalNoOfOrders} 
          </Typography>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 14, textAlign: 'center', color: red[300] }}>
            Total Orders
          </Typography>
      </CardContent>
      <CardActions>
       
      </CardActions>
    </Card>
    <Card sx={{ minWidth: 400, margin: '0 5px' , bgcolor: indigo[100]  }}>
    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: indigo[300], alignItems: 'center'  }}>
          <PaidIcon />
        </Avatar>
        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 50, textAlign: 'center', color: indigo[300] }}>
        {totalAmountPaid.toFixed(2)} 
          </Typography>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 14, textAlign: 'center', color: indigo[300] }}>
            Total Amount Paid
          </Typography>
      </CardContent>
    
    </Card>

    <Card sx={{ minWidth: 400, margin: '0 5px' , bgcolor: green[100]  }}>
    <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: green[300], alignItems: 'center'  }}>
          <PeopleIcon />
        </Avatar>
        <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 50, textAlign: 'center', color: green[300] }}>
        {totalClients} 
          </Typography>
          <Typography sx={{ fontFamily: "'EB Garamond', serif", fontSize: 14, textAlign: 'center', color: green[300] }}>
            Total Clients
          </Typography>
      </CardContent>
    
    </Card>
  </div>
);
}