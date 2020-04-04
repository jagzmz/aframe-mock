import React, { useEffect } from 'react'
import PauseIcon from '@material-ui/icons/Pause';
let camX, camY, camZ;
let currentIntervalId;
export default function CameraPanner(props) {
    const rotationSpeed = 0.1
    const { cameraRef, cameraRotationEntity } = props
    console.log(cameraRotationEntity)
    useEffect(() => {
        const camCurrentRot = cameraRotationEntity.current && cameraRotationEntity.current.getAttribute('rotation')

        camX = camCurrentRot.x
        camY = camCurrentRot.y
        camZ = camCurrentRot.z

    }, [cameraRotationEntity])
    const pauseInterval = (intervalId) => {
        currentIntervalId && clearInterval(intervalId)
        currentIntervalId = null

    }
    const onPanArrowClick = (e, type) => {
        if (type === 'left') {
            // console.log(cameraRotationEntity)
            pauseInterval(currentIntervalId)
            currentIntervalId = addInterval(() => {
                console.log(camX)
                cameraRotationEntity.current.setAttribute('rotation', `${ camX } ${ camY } ${ camZ }`)
                camY += rotationSpeed;
            }, 5)
        }
        else if (type === 'pause') {
            pauseInterval(currentIntervalId)
        }
        else if (type === 'right') {
            pauseInterval(currentIntervalId)
            currentIntervalId = addInterval(() => {
                console.log(camX)
                cameraRotationEntity.current.setAttribute('rotation', `${ camX } ${ camY } ${ camZ }`)
                camY -= rotationSpeed;
            }, 5)
        }
    }

    const addInterval = (fn, time) => {
        return setInterval(fn, time)
    }

    return (
        <>
            <div className='arrow-left' onClick={e => onPanArrowClick(e, 'left')}></div>
            <PauseIcon className='pause-icon' style={{ color: 'blue', fontSize: 40 }} onClick={e => onPanArrowClick(e, 'pause')} />
            {/* <div className='button-pause' onClick={e => onPanArrowClick(e, 'pause')}></div> */}
            <div className='arrow-right' onClick={e => onPanArrowClick(e, 'right')}></div>
        </>
    )

}