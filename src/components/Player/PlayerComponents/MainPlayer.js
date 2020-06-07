import React, { useContext, useState, useRef } from 'react'
import ReactPlayer from 'react-player'

import Play from './ControlButtons/Play'
import Pause from './ControlButtons/Pause'
import Previous from './ControlButtons/Previous'
import Next from './ControlButtons/Next'
import Dark from '../ThemeComponents/Dark'
import Light from '../ThemeComponents/Light'
import SeekBar from './SeekBar'
import { TitleContext, IdContext, ImageContext, ChannelContext }
  from '../../VideoContext';

import ComingNext from './ComingNext/ComingNext'

function Player() {

  const { title, setTitle } = useContext(TitleContext);
  const { id, setId } = useContext(IdContext);
  const { image, setImage } = useContext(ImageContext);
  const { channel, setChannel } = useContext(ChannelContext);

  const url = `https://www.youtube.com/watch?v=${id}`;

  const [playing, setPlaying] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [dark, setDark] = useState(false)
  const [played, setPlayed] = useState(0.00)
  const [duration, setDuration] = useState(0.0)
  /*const [loaded,setLoaded] = useState(0)*/
  const [seeking,setSeeking] = useState(false)

  //Play
  const handlePlay = () => {
    setPlaying(true)
    setRotate(true)
  }
  //Pause
  const handlePause = () => {
    setPlaying(false)
    setRotate(false)
  }
  //Play or Pause
  const handlePlayPause = () => {
    if (playing === true)
      handlePause()

    else
      handlePlay()
  }
  // Toggle Theme
  const toggleTheme = () => {
    if (dark === true) {
      setDark(false)
    }
    else {
      setDark(true)
    }
  }

  const musicPlayer = useRef(null);
  
  return (
    <>
    <div className={dark ? "playerlight" : "playerdark"}>

      <div onClick={toggleTheme} className="themeIcon">
        {dark ? <Dark /> : <Light />}
      </div>

      <div style={{ 'display': 'none' }}>
        <ReactPlayer ref={musicPlayer} url={url} playing={playing}
          onReady={handlePlay} onEnded={handlePause}
          onProgress={e => { setPlayed(e.playedSeconds) }}
          onDuration={e => { setDuration(e) }} 
          onSeek={e => console.log(e)}/>
      </div>
      <img src={image} id="playerImage" className={rotate ? "rotate" : ""} />

      <div className='songData'>
        <span style={{ marginLeft: '-4vh',marginRight:'2vh' }}>Song :&nbsp;</span>
        <b>{title}</b>
      </div>
      <div className='songData'>
        <span style={{ marginLeft: '-4vh' }}>Channel :&nbsp;</span>
        <b>{channel}</b>
      </div>
      <div>
        <SeekBar played={played} duration={duration} setPlayed={setPlayed} musicPlayer={musicPlayer}/>

      </div>
      <div>
        <Previous/>
        <Next/>
        <div onClick={handlePlayPause} className="playPause">
          {playing ? <Pause /> : <Play />}
        </div>
      </div>

    </div>
    <ComingNext/>
    </>
  )
}
export default Player