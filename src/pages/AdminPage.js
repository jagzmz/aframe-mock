import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, List, ListItemText } from '@material-ui/core'
import FormComponent from '../components/FormComponent'
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SceneGenerator from '../components/SceneGenerator'
import RoomPreview from '../components/RoomPreview'
import bg from '../assets/pano-oldField.jpg'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function AdminPage() {
    const [open, setOpen] = React.useState(false);
    const [roomName, setRoomName] = useState('room1')
    const [roomGroups, setRoomGroups] = useState([
        {
            "name": "room1",
            "cameraRotation": {
                "x": 0,
                "y": 0,
                "z": 0
            },
            "skyUrl": "https://video.360cities.net/littleplanet-360-imagery/01587664_ShangriLa-360-8K-h265-60Mbps-1024x512.jpg",
            "markerGroups": [
                {
                    "look-at": "#cam",
                    "visible": true,
                    "position": "-3.660542087299166 3.0425781624824095 -5",
                    "scale": "0.7 0.7 1",
                    "name": "infoMarker",
                    "id": "infogroup_infogroup-room1_infoMarker",
                    'type': "navigation",
                    "navigationTo": "room2",
                    "src": "https://img.icons8.com/doodle/96/000000/up-direction-arrow.png",
                    "data": {
                        "mediaUrl": "www.youtube.com",
                        "mediaDescription": "Some description"
                    }
                }
            ]
        },
        {
            "name": "room2",
            "cameraRotation": {
                "x": 0,
                "y": 0,
                "z": 0
            },
            "skyUrl": "https://video.360cities.net/littleplanet-360-imagery/01587664_ShangriLa-360-8K-h265-60Mbps-1024x512.jpg",
            "markerGroups": [
                {
                    "look-at": "#cam",
                    "visible": true,
                    "position": "-3.660542087299166 3.0425781624824095 -5",
                    "scale": "0.7 0.7 1",
                    "name": "infoMarker",
                    "id": "infogroup_infogroup-room1_infoMarker",
                    'type': "navigation",
                    "navigationTo": "room1",
                    "src": "https://img.icons8.com/doodle/96/000000/up-direction-arrow.png",
                    "data": {
                        "mediaUrl": "www.youtube.com",
                        "mediaDescription": "Some description"
                    }
                }
            ]
        }
    ])

    // const [skyUrl, setSkyUrl] = useState('https://video.360cities.net/littleplanet-360-imagery/01587664_ShangriLa-360-8K-h265-60Mbps-1024x512.jpg')
    const [skyUrl, setSkyUrl] = useState(bg)
    const [cameraRotation, setCameraRotation] = useState({ x: 0, y: 0, z: 0 })

    const handleClickOpen = (e, type) => {
        if (type === 'preview') {
            console.log('preview')
        }
        else {
            setOpen(true);
        }
    };

    const handleClose = (e, type) => {
        if (type === 'save') {
            console.log(roomName)
            console.log(markerGroups)
            const tmpRg = {
                name: roomName,
                skyUrl,
                cameraRotation,
                markerGroups
            }
            // roomGroups.map((room) => {

            // return (

            // )
            // })
            // let uniqRooms = [...roomGroups, ...tmpRg]
            // uniqRooms = uniqRooms.filter()
            let totalRooms = [...roomGroups, tmpRg]
            console.log('roomGroups', roomGroups)
            console.log('tmpRg', JSON.stringify(tmpRg))
            console.log([...roomGroups, tmpRg])
            // totalRooms = [...new Set(totalRooms.map(item => item.name))];
            setRoomGroups([...roomGroups, tmpRg])
        }
        setOpen(false);
    };
    console.log('room groups', roomGroups)


    /*
        {
            'name':'room1',
            'sky':'', 
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
    const [markerGroups, setMarkerGroups] = useState([
        // {
        //     name: 'room1',
        //     skyUrl:'',
        //     markers: [
        //         {
        //             id: 'someId',
        //             position: '',
        //             'look-at': '#cam',
        //             'visible': true,
        //             'scale': '0.7 0.7 1',
        //             'src': ''
        //         }
        //     ]
        // }
    ])
    // const rmGp = (arr) => {
    //     setRoomGroups(arr)
    // }
    const classes = useStyles();
    // console.log(markerGroups)
    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }
    useEffect(() => {
        // setMarkerGroups(markerGroups)
        console.log(markerGroups)

    }, [markerGroups])

    const previewRoom = (room) => {
        console.log(room)
    }

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <button onClick={handleClickOpen}>Create new room</button>
                        <div className={classes.root}>
                            <List component="nav" aria-label="main mailbox folders">
                                {
                                    roomGroups.length > 0 && roomGroups.map((room) => {

                                        console.log(room.name)
                                        return (
                                            <Link to={`/previewRoom/${ room.name }`}>
                                                <ListItem button onClick={e => previewRoom(room)}>
                                                    <ListItemText primary={room.name} />
                                                </ListItem>
                                            </Link>

                                        )

                                    })
                                }
                            </List>
                        </div>
                        <button onClick={e => handleClickOpen(e, 'preview')}>Preview Room</button>

                        <Dialog fullScreen open={open} onClose={handleClose}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <Button color="inherit" onClick={handleClose} aria-label="close">
                                        close
                        </Button>

                                    <Button autoFocus color="inherit" onClick={e => handleClose(e, 'save')}>
                                        save
                        </Button>
                                </Toolbar>
                            </AppBar>

                            <SceneGenerator
                                setCameraRotation={setCameraRotation}
                                skyUrl={skyUrl}
                                setSkyUrl={setSkyUrl}
                                roomName={roomName}
                                setRoomName={setRoomName}
                                roomGroups={roomGroups}
                                setRoomGroups={setRoomGroups}
                                markerGroups={markerGroups}
                                setMarkerGroups={setMarkerGroups} />

                        </Dialog>

                    </Route>
                    <Route path='/previewRoom/:roomName'>
                        <RoomPreview roomGroups={roomGroups} />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

