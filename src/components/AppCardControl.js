import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
// import MarksSlider from './TimeSlider';
import RepeatIcon from '@mui/icons-material/Repeat';
// import ShuffleIcon from '@mui/icons-material/Shuffle';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
// import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import PauseIcon from '@mui/icons-material/Pause';
import TimeSliderMarks from './TimeSliderMarks';
import usePlayAudio from '../hook/usePlayAudio';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeSlider from './VolumeSlider';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import ChooseToggleButton from './ChooseToggleAudio';
const style = {
   width: 500,
   height: 700,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'space-between',
   // p: '50px auto',
   borderRadius: 10,
   position: 'relative',
   backgroundImage: 'url(bg5.jpg)',
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'center',
   backgroundSize: 'cover',
   zIndex: 10,
   // width: '100%',
   // height: '100vh',
};
const TinyText = styled(Typography)({
   fontSize: '0.75rem',
   opacity: 0.58,
   fontWeight: 500,
   letterSpacing: 0.2,
   color: 'black',
});
const styleAnimation = {
   animation: 'animate 8s linear infinite',
   position: 'absolute',
   left: '-90px',
   top: '5px',
   animationDuration: '6s',
   animationDelay: '0s',
};
const convertTime = (value) => {
   const minute = Math.floor(value / 60);
   const secondLeft = parseInt(value - minute * 60);
   return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
};
// import { AudioContext } from '../context/AudioProvider';
export default function AppCardControl() {
   const [isShowControlVolume, setIsShowControlVolume] = React.useState(false);
   const [on, setOn] = React.useState(false);
   const [repeatAudio, setRepeatAudio] = React.useState(true);
   const {
      playMusic,
      dataMusic,
      changeMusic,
      changeVolume,
      checkPlaying,
      checkVolume,
      duration,
      ChangeCurrentTime,
      currentTime,
      controlVolume,
      getChooseAudio,
      listAudio,
      ActionRepeatAudio,
   } = usePlayAudio();

   const handleRepeat = () => {
      // console.log(repeatAudio);
      setRepeatAudio((e) => !e);
      ActionRepeatAudio(repeatAudio);
   };
   return (
      <Card sx={style}>
         <Button
            sx={{ position: 'absolute', top: 0, right: 0, opacity: 0.4 }}
            variant='contained'
            color={on ? 'primary' : 'inherit'}
            disableElevation={on}
            onClick={() => setOn((e) => !e)}
         >
            <MenuIcon />
         </Button>
         {on ? (
            <ChooseToggleButton
               data={listAudio}
               dataMusic={dataMusic}
               getChooseAudio={getChooseAudio}
            />
         ) : (
            <CardMedia
               sx={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  objectFit: 'fill',
                  opacity: 0.9,
                  mt: 6,
               }}
               component='img'
               image={dataMusic ? dataMusic.img : ''}
            />
         )}

         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               position: 'relative',
               background: '#f5a6aa',
               width: '100%',
            }}
         >
            <CardContent sx={{ flex: '1 0 auto' }}>
               <Typography component='div' variant='h5' sx={styleAnimation}>
                  {dataMusic ? dataMusic.name : ''}
               </Typography>
            </CardContent>
            <TimeSliderMarks
               duration={duration}
               ChangeCurrentTime={ChangeCurrentTime}
               currentTime={currentTime}
            />
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: -0.8,
                  pl: 12.3,
                  pr: 12.3,
               }}
            >
               <TinyText>
                  {currentTime ? convertTime(currentTime) : '0:00'}
               </TinyText>
               <TinyText>{duration ? convertTime(duration) : '0:00'}</TinyText>
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pl: 1,
                  pb: 1,
               }}
            >
               <IconButton
                  aria-label='repeat'
                  onClick={handleRepeat}
                  color={repeatAudio ? '' : 'warning'}
               >
                  <RepeatIcon />
               </IconButton>
               <IconButton
                  aria-label='previous'
                  onClick={() => changeMusic(-1)}
               >
                  <SkipPreviousIcon />
               </IconButton>
               <IconButton aria-label='play/pause' onClick={playMusic}>
                  {checkPlaying ? (
                     <PauseIcon sx={{ height: 38, width: 38 }} />
                  ) : (
                     <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  )}
               </IconButton>
               <IconButton aria-label='next' onClick={() => changeMusic(1)}>
                  <SkipNextIcon />
               </IconButton>
               <IconButton
                  onClick={() => changeVolume(-1)}
                  onMouseOver={() => setIsShowControlVolume(true)}
                  onMouseOut={() => setIsShowControlVolume(false)}
               >
                  {checkVolume ? <VolumeDownIcon /> : <VolumeOffIcon />}
               </IconButton>
            </Box>
         </Box>
         {isShowControlVolume && (
            <Box
               sx={{
                  position: 'absolute',
                  bottom: 20,
                  right: 29,
                  zIndex: 3,
                  width: 110,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
               onMouseOver={() => setIsShowControlVolume(true)}
               onMouseOut={() => setIsShowControlVolume(false)}
            >
               <VolumeSlider
                  changeVolume={changeVolume}
                  controlVolume={controlVolume}
               />
            </Box>
         )}
      </Card>
   );
}
