import React from 'react';
import MainLayout from "../../layout/MainLayout";
import {Box, Button, Card, Grid} from "@material-ui/core";
import {useRouter} from "next/router";
import {ITrack} from "../../types/tracks";
import TrackList from "../../components/TrackList";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useAction} from "../../hooks/useAction";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/action-creator/track";
import {GetServerSideProps} from "next";

const Index = () => {
    const router = useRouter()

    const {tracks, error} = useTypeSelector(state => state.track)

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }
    return (
        <MainLayout>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Список треков</h1>
                            <Button onClick={()=>router.push('/tracks/create')}>Загрузить</Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};


export default Index;

export const getServerSideProps = wrapper.getServerSideProps( store=>
    async ({req, res, ...etc}) => {
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(await fetchTracks());
        return null;
    }
);