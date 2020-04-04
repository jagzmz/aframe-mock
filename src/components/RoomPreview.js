import React, { useState, useEffect } from 'react';
import SceneComponent from './SceneComponent.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
export default function RoomPreview({ roomGroups }) {
    const param = useParams()
    const roomName = param.roomName
    const [roomIns] = roomGroups.filter(room => room.name === roomName)
    return (
        <SceneComponent
            room={roomIns}
            roomGroups={roomGroups}
        />
    )

}