import React, { createContext } from 'react';

export const AudioContext = createContext();
const getPathAudio = require.context('/public/music', true, /\.mp3$/);
const getPathImg = require.context('/public/img', true);
const adjustPathAudio = getPathAudio
   .keys()
   .map((audio) => audio.replace('./', 'music/'));
const adjustPathImg = getPathImg
   .keys()
   .map((audio) => audio.replace('./', 'img/'));
// console.log(adjustPathAudio);
// console.log(adjustPathImg);
function AudioProvider({ children }) {
   const object = adjustPathAudio.map((item, index) => {
      const name = [
         'Thích Cậu Á- nhạc Sến Thái Lan',
         'Ed-Sheeran - Photograph',
         'Khu-Tao-Sống - Karik, Wowy',
         'something-about-you-marilyn-ford-',
      ];
      const a = {
         name: name[index],
         src: item,
         img: adjustPathImg[index],
      };
      return a;
   });
   // console.log(object);
   const dataAudio = {
      newAudio: new Audio(),
      checkPlaying: false,
      index: null,
      item: [...object],
   };
   // console.log(dataAudio.newAudio)
   return (
      <AudioContext.Provider value={dataAudio}>
         {children}
      </AudioContext.Provider>
   );
}

export default AudioProvider;
