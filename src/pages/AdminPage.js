import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FormComponent from '../components/FormComponent'
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SceneGenerator from '../components/SceneGenerator'
const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

export default function AdminPage() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createNewRoom = () => {

    }
    /*
        {
            'name':'room1',
            'infoGroups':[{
                'look-at': '#cam',
                'visible': true,
                'marker-click': true,
                'position': '-3.862687741206313 2.272078282742171 1.34446443417701',
                'name': 'ztoggle',
                'id': 'infogroup-infogroup-room1-infoMarker1',
                'src': 'https://img.icons8.com/doodle/96/000000/up-direction-arrow.png'
            }]
        }
    */
    const [roomGroups, setRoomGroups] = useState([])
    // const rmGp = (arr) => {
    //     setRoomGroups(arr)
    // }
    const classes = useStyles();

    return (
        <>
            <button onClick={handleClickOpen}>Create new room</button>

            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Button color="inherit" onClick={handleClose} aria-label="close">
                            close
                        </Button>

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
            </Button>
                    </Toolbar>
                </AppBar>

                <SceneGenerator roomGroups={roomGroups} setRoomGroups={setRoomGroups} />

            </Dialog>

        </>
    )
}