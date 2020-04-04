/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import {
    Box,
    Popper,
    Input,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import EditingPanel from '../components/EditingPanel'
import AdminSceneControls from './AdminSceneControls';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));
export default function SceneGenerator(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openPopper = Boolean(anchorEl);
    const popperId = openPopper ? 'simple-popper' : undefined;
    // const [roomName, setRoomName] = useState('room1')
    const { roomName,
        setRoomName,
        markerGroups,
        setMarkerGroups,
        roomGroups,
        setRoomGroups,
        skyUrl,
        setSkyUrl,
        setCameraRotation } = props
    const [lookControl, setLookControl] = useState(true)
    const [infoGroups, setInfoGroups] = useState([
        // {
        //     'look-at': '#cam',
        //     'visible': true,
        //     'marker-click': true,
        //     'position': '-3.862687741206313 2.272078282742171 1.34446443417701',
        //     'name': 'ztoggle',
        //     'id': 'infogroup-infogroup-room1-infoMarker1',
        //     'src': 'https://img.icons8.com/doodle/96/000000/up-direction-arrow.png'
        // }
    ])


    // useEffect(() => {

    // }, [])

    useEffect(() => {
        console.log('markerGroups', markerGroups)
    }, [markerGroups])
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
    //             'src': '',
    //             'data':{
    //                  'description':'',
    //                  'mediaUrl':''
    //              }
    //         }
    //     ]
    // }
    useEffect(() => {
        // setRoomGroups(roomGroups.map(rmGrp => {
        //     // if()
        // }))
        setMarkerGroups(infoGroups)
        console.log(markerGroups)

    }, [infoGroups, setMarkerGroups])
    const [mediaUrl, setMediaUrl] = useState('ss')
    const [description, setDescription] = useState(null)

    const onPopperInputChange = (e, type) => {
        console.log(e.target.value)
        setMediaUrl(e.target.value)

        // if (type === 'mediaUrl') {
        //     setMediaUrl(e.target.value)
        // }
    }
    const [open, setOpen] = React.useState(false);
    const [currentElTarget, setCurrentElTarget] = useState(null)
    const handleInfoSettingOpen = (currentElTarget) => {
        setCurrentElTarget(currentElTarget)
        setOpen(true);
    };
    const [markerMediaUrl, setMarkerMediaUrl] = useState('')
    const [markerMediaDescription, setMarkerMediaDescription] = useState('')
    const cameraRef = React.useRef()
    const handleInfoSave = () => {
        const currentElId = currentElTarget.getAttribute('id')
        console.log(currentElId, infoGroups)
        setMarkerGroups(markerGroups.map(markerItem => {
            if (markerItem.id === currentElId) {
                markerItem.data = {
                    mediaUrl: markerMediaUrl,
                    mediaDescription: markerMediaDescription
                }
            }
            return markerItem
        }))

        console.log('marker groups', markerGroups)
        console.log('info groups', infoGroups)

        // setCurrentElTarget(null)

        handleClose()
    }

    const handleClose = () => {
        setOpen(false);
    };

    const onDialogInfoChange = (e, type) => {
        if (type === 'url') {
            setMarkerMediaUrl(e.target.value)
        }
        else if (type === 'description') {
            setMarkerMediaDescription(e.target.value)
        }
    }

    const onSaveEntryPositionClick = () => {
        const camRotation = cameraRef.current.getAttribute('rotation')
        console.log('camera rotation', camRotation)
        setCameraRotation(camRotation)
    }

    return (
        <Box display='flex' width='100%' height='100%'>
            <Box flex={1}>
                <AdminSceneControls
                    onSaveEntryPositionClick={onSaveEntryPositionClick}
                />
                <Dialog height='60%' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Marker Info</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            value={markerMediaUrl}
                            margin="dense"
                            id="mediaUrl"
                            label="Media Url"
                            onChange={e => onDialogInfoChange(e, 'url')}
                            type="url"
                            fullWidth
                        />
                        <TextField
                            value={markerMediaDescription}
                            margin="dense"
                            onChange={e => onDialogInfoChange(e, 'description')}
                            id="mediaDescription"
                            label="Media Description"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleInfoSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <a-scene >
                    <a-sky src={skyUrl} />

                    <a-camera id="cam" position="0 1.6 0"
                        ref={cameraRef}
                        look-controls-enabled={lookControl}
                        cursor="rayOrigin: mouse"
                        animation__zoomin="property:camera.fov;dur:2000;to:50;startEvents:zoomin;"
                        animation__zoomout="property:camera.fov;dur:1000;to:80;startEvents:zoomout;"
                    >
                        <a-plane cursor-listener id="plane" class="collidable" width="100" height="100" position="0 0 -5" material="visible: false;"></a-plane>

                        {/* <a-entity id="clickPosition" position="0 0 -100"></a-entity> */}

                    </a-camera>


                    {infoGroups.map(info => (
                        <a-image
                            {...info}
                        >
                        </a-image>
                    ))}


                </a-scene>
            </Box>
            <EditingPanel
                handleInfoSettingOpen={handleInfoSettingOpen}
                mediaUrl={mediaUrl}
                setMediaUrl={setMediaUrl}
                description={description}
                setDescription={setDescription}
                popperId={popperId}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                openPopper={openPopper}
                roomName={roomName}
                setRoomName={setRoomName}
                infoGroups={infoGroups}
                setInfoGroups={setInfoGroups}
                setSkyUrl={setSkyUrl}
                lookControl={lookControl}
                setLookControl={setLookControl}
            />
        </Box >
    )
}