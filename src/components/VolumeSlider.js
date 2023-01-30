import * as React from 'react';
// import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function VolumeSlider({ changeVolume, controlVolume }) {
   // const [value, setValue] = React.useState(20);

   const handleChange = (event, newValue) => {
      const convert = newValue / 100;
      // console.log(newValue)
      changeVolume(convert);
   };

   return (
      <Slider
         aria-label='Volume'
         value={parseInt(controlVolume * 100)}
         onChange={handleChange}
         size='small'
         sx={{ width: 100, margin: 'auto 0' }}
         valueLabelDisplay='auto'
      />
   );
}
