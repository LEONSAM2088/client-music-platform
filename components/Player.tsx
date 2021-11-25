import React, {ChangeEvent, useEffect} from 'react';
import {Pause, PlayArrow, VolumeUp} from "@material-ui/icons";
import {Grid, IconButton} from "@material-ui/core";
import styles from '../styles/Player.module.scss'
import {ITrack} from "../types/tracks";
import TrackProgress from "./TrackProgress";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useAction} from "../hooks/useAction";

let audio;
const Player = () => {
    const {pause, volume, active, duration, currentTime} = useTypeSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setDuration, setCurrentTime, setActiveTrack} = useAction()
    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active])

    const setAudio = () => {
        if(active) {
            console.log(active.audioName)
            audio.src = 'http://localhost:5000/'+active.audioName
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }
    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value))
        audio.volume = Number(e.target.value) / 100
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {

        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }
    if (!active) {
        return null
    }
    return (
        <div className={styles.player}>
            <IconButton onClick={play} >
                {pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <Grid container direction={"column"} style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>

    );
};

export default Player;