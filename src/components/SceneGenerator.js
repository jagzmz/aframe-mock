import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import EditingPanel from '../components/EditingPanel'
export default function SceneGenerator(props) {
    const roomGroups = props.roomGroups
    const setRoomGroups = props.setRoomGroups
    const [skyBox, setSkyBox] = useState('')
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
        console.log('roomGroups', roomGroups)
    }, [roomGroups])

    useEffect(() => {
        setRoomGroups(infoGroups)
    }, [infoGroups, setRoomGroups])
    return (
        <Box display='flex' width='100%' height='100%'>
            <Box flex={1}>
                <a-scene >
                    <a-sky src='https://video.360cities.net/littleplanet-360-imagery/01587664_ShangriLa-360-8K-h265-60Mbps-1024x512.jpg' />

                    <a-camera id="cam" position="0 1.6 0"
                        look-controls-enabled={lookControl}
                        cursor="rayOrigin: mouse"
                        animation__zoomin="property:camera.fov;dur:2000;to:50;startEvents:zoomin;"
                        animation__zoomout="property:camera.fov;dur:1000;to:80;startEvents:zoomout;"
                    >
                        <a-plane cursor-listener id="plane" class="collidable" width="100" height="100" position="0 0 -4" material="visible: false;"></a-plane>

                        <a-entity id="clickPosition" position="0 0 -100"></a-entity>
                        {/* <a-entity cursor="fuse: true; fuseTimeout: 500" position="0 0 -1" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" material="color: black; shader: flat">
                    </a-entity> */}
                    </a-camera>

                    {/* <a-entity id="infos" infogroup >
                        <a-entity id='infogroup-room1'> */}
                    {infoGroups.map(info => (
                        <a-image
                            {...info}
                        >
                        </a-image>
                    ))}
                    <a-image
                    // listener
                    // click-drag

                    // event-set__click='_event: click; _target: #cylinderText; visible:true;'
                    ></a-image>
                    {/* </a-entity>
                    <a-image
                            look-at='#cam'
                            visible='true'
                            marker-click
                            name='ztoggle'
                            id='infoMarker1'
                            src='https://img.icons8.com/plasticine/100/000000/circled-dot.png'
                        // event-set__click='_event: click; _target: #cylinderText; visible:true;'
                        ></a-image>
                    </a-entity> */}
                </a-scene>
            </Box>
            <EditingPanel infoGroups={infoGroups} setInfoGroups={setInfoGroups} setSkyBox={setSkyBox} lookControl={lookControl} setLookControl={setLookControl} />
        </Box >
    )
}