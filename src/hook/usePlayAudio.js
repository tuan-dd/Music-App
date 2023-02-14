import { useState, useEffect, useContext, useRef } from 'react';
import { AudioContext } from '../context/AudioProvider';

const usePlayAudio = () => {
   const dataAudio = useContext(AudioContext);
   const [dataMusic, setDataMusic] = useState({});
   const [duration, setDuration] = useState(0);
   const [currentTime, setCurrentTime] = useState(0);
   const [index, setIndex] = useState(0);
   const [checkPlaying, setCheckPlaying] = useState(dataAudio.checkPlaying);
   const [checkVolume, setCheckVolume] = useState(true);
   const [controlVolume, setControlVolume] = useState(0.2);
   const updateCurrentTime = useRef();
   const repeatAudio = useRef();
   const repeat = () => {
      dataAudio.checkPlaying = !dataAudio.checkPlaying;
      setCheckPlaying(dataAudio.checkPlaying);
      dataAudio.newAudio.volume = controlVolume;
      // clearInterval(updateCurrentTime.current);
   };
   const playMusic = async () => {
      // console.log('playMusic');
      if (!dataAudio.checkPlaying && dataAudio.index !== null) {
         clearInterval(updateCurrentTime.current);
         await dataAudio.newAudio.play();
         updateCurrentTime.current = setInterval(ChangeCurrentTime, 1000);
      } else if (dataAudio.checkPlaying) {
         dataAudio.newAudio.pause();
      }

      // console.log(dataAudio.newAudio.duration);
      ChangeDuration();
      repeat();
   };

   const changeMusic = async (value) => {
      if (dataAudio.checkPlaying) {
         dataAudio.checkPlaying = false;
         dataAudio.newAudio.pause();
         clearInterval(updateCurrentTime.current);
      }
      if (dataAudio.index === 3 && value === 1) {
         // console.log(value);
         dataAudio.index = 0;
         dataAudio.newAudio = new Audio(dataAudio.item[dataAudio.index].src);
      } else if (dataAudio.index === 0 && value === -1) {
         dataAudio.index = 3;
         dataAudio.newAudio = new Audio(dataAudio.item[dataAudio.index].src);
      } else {
         // console.log('normal');
         dataAudio.index += value;
         dataAudio.newAudio = new Audio(dataAudio.item[dataAudio.index].src);
      }
      playMusic();
      setIndex(() => dataAudio.index);
   };

   const changeVolume = (value = -1) => {
      // console.log(parseInt(controlVolume * 100));
      if (value === -1) {
         if (checkVolume) {
            dataAudio.newAudio.volume = 0;
         } else {
            dataAudio.newAudio.volume = 0.5;
         }
         setCheckVolume(!checkVolume);
         setControlVolume(dataAudio.newAudio.volume);
      } else {
         dataAudio.newAudio.volume = value;
         setControlVolume(value);
      }
      if (value === 0) {
         setCheckVolume(false);
      }
   };

   const ChangeCurrentTime = (x) => {
      // console.log('run');
      if (x) {
         dataAudio.newAudio.currentTime = x;
         setCurrentTime(dataAudio.newAudio.currentTime);
      } else {
         setCurrentTime(dataAudio.newAudio.currentTime);
      }
      if (dataAudio.newAudio.ended) {
         clearInterval(updateCurrentTime.current);
         playMusic();
      }
   };
   const ChangeDuration = () => {
      // console.log(dataAudio.newAudio.duration);
      setDuration(() => dataAudio.newAudio.duration);
   };

   const getChooseAudio = async (value) => {
      if (dataAudio.checkPlaying) {
         dataAudio.checkPlaying = false;
         dataAudio.newAudio.pause();
         clearInterval(updateCurrentTime.current);
      }
      const indexOfChose = dataAudio.item.findIndex(
         (item) => item.name === value,
      );
      if (indexOfChose > -1) {
         dataAudio.newAudio = new Audio(dataAudio.item[indexOfChose].src);
         playMusic();
         dataAudio.index = indexOfChose;
         setIndex(() => dataAudio.index);
      }
   };
   const ActionRepeatAudio = (value) => {
      if (value) {
         repeatAudio.current = setInterval(() => {
            // console.log('run')
            if (dataAudio.newAudio.ended) {
               // console.log(dataAudio.newAudio.ended);
               changeMusic(1);
            }
         }, 1500);
      } else {
         clearInterval(repeatAudio.current);
      }
   };
   useEffect(() => {
      if (dataAudio.index === null) {
         setDataMusic(() => dataAudio.item.find((e, i) => i === index));
         dataAudio.index = index;
         dataAudio.newAudio = new Audio(dataAudio.item[dataAudio.index].src);
      } else if (dataAudio.index !== null) {
         setDataMusic(() => dataAudio.item.find((e, i) => i === index));
      }
   }, [index, dataAudio]);

   return {
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
      listAudio: dataAudio.item,
      ActionRepeatAudio,
   };
};

export default usePlayAudio;
