import React from 'react';
import {ITrack} from "../../types/tracks";
import MainLayout from "../../layout/MainLayout";
import {Button, Grid, TextField} from "@material-ui/core";
import {useRouter} from "next/router";

const TrackPage = () => {
    const track: ITrack = {_id: '1', name: 'Track 1', artist: 'isp 1', text: 'Some text', listens: 5, audio: 'http://localhost:5000/audio/47133560-6743-4643-b0c8-ec445111148b.mp3', picture: 'http://localhost:5000/image/6b3aaf0d-8708-4558-9643-c610e124d30c.png', comments: []};
    const router = useRouter()
        return (
        <MainLayout>
            <Button
                variant = {'outlined'}
                style={{fontSize: 32}}
                onClick={() => router.push('/tracks')}
            >
                К списку
            </Button>
            <Grid container style={{margin: '200px 0' }}>
                <img src={track.picture} alt={track.name} width={200} height={200}/>
                <div style={{margin: '200px 0' }}>
                    <h2>Название трека - {track.name}</h2>
                    <h2>Исполнитель - {track.artist}</h2>
                    <h2>Прослушиваний - {track.listens}</h2>
                </div>
            </Grid>
            <h2>Слова в треке</h2>
            <p>{track.text}</p>
            <h2>Коментарии</h2>
            <Grid container>
                <TextField
                    label="Ваше имя"
                    fullWidth
                />
                <TextField
                    label="Комментарий"
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button>Отправить</Button>
            </Grid>

            <div>
                {track.comments.map(comment =>
                    <div>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарий - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

    export default TrackPage;