import React from 'react'
import { Button } from '@material-ui/core'
export default function SceneControls(props) {

    const { onSaveEntryPositionClick } = props

    return (
        <div className='sceneControls'>

            <Button
                variant="contained"
                onClick={onSaveEntryPositionClick}
            >
                Save entry position
            </Button>
        </div>
    )
}