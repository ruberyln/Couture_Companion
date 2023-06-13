import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

export default function DisplayForm({ data }) {
  return (
    <div>
      <Typography>Displaying Form Data:</Typography>
      {Object.entries(data).map(([key, value], index) => (
        <TextField key={index} label={key} defaultValue={value} variant="outlined" InputProps={{ readOnly: true, }} />
      ))}
    </div>
  );
}
