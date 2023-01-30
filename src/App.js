import React from 'react';
import './App.css';
import AppCardControl from './components/AppCardControl';

function App() {
   // const dataAudio = useContext(AudioContext);
   // console.log(dataAudio);
   // const audio = new Audio('music/aชอบเธออะ.mp3');
   // const test = useRef();
   return (
      <>
         <AppCardControl />
         <div className='bg-animation'>
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
            <div id='stars4'></div>
         </div>
      </>
   );
}

export default App;
