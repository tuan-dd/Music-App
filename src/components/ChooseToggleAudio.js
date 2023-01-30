import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ChooseToggleButton({
   data,
   dataMusic,
   getChooseAudio,
}) {
   const handleChange = async (event, value) => {
      await getChooseAudio(value);
   };

   return (
      <ToggleButtonGroup
         color='error'
         value={dataMusic.name}
         exclusive
         onChange={handleChange}
         aria-label='Platform'
         orientation='vertical'
         sx={{
            height: 300,
            justifyContent: 'space-evenly',
            borderRadius: 5,
            background: 'white',
            opacity: 0.6,
         }}
      >
         {data?.map((item) => (
            <ToggleButton
               value={item.name}
               key={item.name}
               sx={{ borderRadius: 5 }}
            >
               {item.name}
            </ToggleButton>
         ))}
      </ToggleButtonGroup>
   );
}
