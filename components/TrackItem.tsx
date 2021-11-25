import React from 'react';
import {ITrack} from "../types/tracks";
import {Card, Grid, IconButton} from "@material-ui/core";
import styles from '../styles/TrackItem.module.scss'
import {Delete, Pause, PlayArrow} from "@material-ui/icons";
import {useRouter} from "next/router";
import {useAction} from "../hooks/useAction";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active=false}) => {
    const router = useRouter()
    const {pauseTrack, playTrack, setVolume, setDuration, setCurrentTime, setActiveTrack} = useAction()
    const play = (e) => {
        e.stopPropagation()

        setActiveTrack(track)
        playTrack()
    }
    return (
        <Card className={styles.track} onClick={()=> router.push('/tracks/'+track._id)}>
            <IconButton onClick={play} >
                {!active
                ? <PlayArrow/>
                : <Pause/>
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/'+track.pictureName}/>
            <Grid container direction={"column"} style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;