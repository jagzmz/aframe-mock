/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from 'react'
import IframeComponent from './IframeComponent'
import SceneControls from './SceneControls'
let currentMarkerInfo = false
export default function SceneComponent(props) {
    const {
        room,
        roomGroups
    } = props;

    console.log(room)
    const cameraRef = React.useRef()
    const aPlaneTransitionRef = React.useRef()
    const [roomStore, setRoomStore] = useState(room)
    const cameraRotation = roomStore && roomStore.cameraRotation
    console.log('cameraRotation', cameraRotation)
    const skyUrl = roomStore && roomStore.skyUrl
    const markers = roomStore ? roomStore.markerGroups : []
    const [toggleFrame, setToggleFrame] = useState(false)
    const [mediaUrl, setMediaUrl] = useState(null)
    const [mediaDescription, setMediaDescription] = useState(null)

    const onMarkerClick = (e, markerInfo) => {
        console.log(markerInfo.type)
        if (markerInfo.type === 'infogroup') {
            setToggleFrame(!toggleFrame)
            const { mediaUrl, mediaDescription } = markerInfo.data
            setMediaUrl(mediaUrl)
            setMediaDescription(mediaDescription)
        }
        else {
            // aPlaneTransitionRef.current.setAttribute('position', '0 0 -6')
            cameraRef.current.emit('zoomin')
            // testRef.current.emit('camFadeOut')
            aPlaneTransitionRef.current.emit('camFadeIn')
            currentMarkerInfo = markerInfo
        }

    }

    const loadNextScreenDetails = (e = '', markerInfo = currentMarkerInfo) => {
        console.log('coming here')
        const nextRoomName = markerInfo.navigationTo
        const [roomIns] = roomGroups.filter(item => item.name === nextRoomName)
        console.log('coming', roomGroups)
        setRoomStore(roomIns)
        cameraRef.current.emit('zoomout')
        // testRef.current.emit('camFadeIn')
        aPlaneTransitionRef.current.emit('camFadeOut')
        // aPlaneTransitionRef.current.setAttribute('material', `visible: true;color:black;`)
    }
    const cameraRotationEntity = React.useRef()
    useEffect(() => {
        cameraRef.current.addEventListener('animationcomplete', loadNextScreenDetails)

    }, [cameraRef])

    useEffect(() => {
        cameraRotationEntity.current.setAttribute('rotation', `${ cameraRotation.x } ${ cameraRotation.y } ${ cameraRotation.z }`)
    }, [cameraRotation])
    const testRef = React.useRef()

    return (
        <>
            {toggleFrame ? (
                <IframeComponent
                    onClose={() => setToggleFrame(false)}
                    mediaUrl={mediaUrl}
                    mediaDesc={mediaDescription}
                />
            ) : null}
            <SceneControls cameraRef={cameraRef} cameraRotationEntity={cameraRotationEntity} />
            <a-scene >
                <a-sky src={skyUrl} />

                <a-entity
                    rotation="0 0 0"
                    // animation="property: rotation; to: 0 360 0; loop: true; dur: 100000;easing: linear;"
                    // animation="property: rotation;to='0 360 0';dur='10000';easing: linear;"
                    ref={cameraRotationEntity}
                // rotation={`${ cameraRotation.x } ${ cameraRotation.y } ${ cameraRotation.z }`}
                >
                    {/* <a-animation attribute="rotation"
                        dur="10000"
                        fill="forwards"
                        to="0 360 0"
                        repeat="indefinite"></a-animation> */}
                    <a-camera id="cam"
                        ref={cameraRef}
                        ttest
                        position="0 1.6 0"
                        // animation="property: rotation"
                        cursor="rayOrigin: mouse"
                        animation__zoomin="property:camera.fov;dur:2000;to:50;startEvents:zoomin;"
                        animation__zoomout="property:camera.fov;dur:1000;to:80;startEvents:zoomout;"
                    >
                        <a-plane
                            ref={aPlaneTransitionRef}
                            cursor-listener id="plane" class="collidable" width="100"
                            height="100"
                            position="0 0 -7"
                            material="color:#000000;transparent:true;opacity:0"
                            animation__fadein="property:material.opacity;to:1;dur:2000;startEvents:camFadeIn"
                            animation__fadeout="property:material.opacity;to:0;dur:200;startEvents:camFadeOut"
                        ></a-plane>
                        {/* <a-plane
                            ref={aPlaneTransitionRef}
                            id="plane"
                            rotation="10 0.5 0"
                            position="0 0 -20"
                            material="color:#000000;transparent:true;opacity:0"
                            width="2" height="2"
                            animation__fadein="property:material.opacity;to:1;dur:2000;startEvents:camFadeIn"
                            animation__fadeout="property:material.opacity;to:0;dur:200;startEvents:camFadeOut"></a-plane> */}

                        {/* <a-entity id="clickPosition" position="0 0 -100"></a-entity> */}

                    </a-camera>
                </a-entity>


                {markers.map(markerInfo => {

                    return (
                        <a-image
                            ref={testRef}
                            {
                            ...markerInfo
                            }
                            // animation__fadeout="property:material.opacity;to:0;dur:1800;startEvents:camFadeOut"
                            onClick={e => onMarkerClick(e, markerInfo)}
                        >
                        </a-image>
                    )
                })}


            </a-scene>
        </>
    )
}