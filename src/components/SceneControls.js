import React from 'react'
import CameraPanner from './CameraPanner'

export default function SceneControls(props) {

    const { cameraRef, cameraRotationEntity } = props
    return (
        <div className='sceneControls'>
            <CameraPanner cameraRotationEntity={cameraRotationEntity} cameraRef={cameraRef} />
        </div>
    )
}