import React, { useState, useEffect } from 'react'
import { Input, Button, ListItem, ListItemText } from '@material-ui/core'
let markerSet = true

export default function EditingPanel(props) {
    const setSkyBox = props.setSkyBox
    const setInfoGroups = props.setInfoGroups
    const infoGroups = props.infoGroups
    const [roomName, setRoomName] = useState('room1')
    const [infoElId, setInfoElId] = useState(1)
    const [infoMarkerName, setInfoMarkerName] = useState(`infoMarker${ infoElId }`)
    const [idStruct, setIdStruct] = useState(`infogroup-infogroup-${ roomName }-${ infoMarkerName }`)
    const setLookControl = props.setLookControl
    let lookControl = props.lookControl
    const [markerInputHidden, setMarketInputHidden] = useState(true)
    const [markerXYZ, setMarkerXYZ] = useState({ x: 0, y: 0, z: 0 })
    let skyBoxUrl = ''
    const [infoMarkerList, setInfoMarkerList] = useState([])
    console.log(setSkyBox)

    useEffect(() => {
        setInfoMarkerName(`infoMarker${ infoElId }`)
        setRoomName(roomName)
        setIdStruct(`infogroup-infogroup-${ roomName }-${ infoMarkerName }`)
    }, [infoElId, roomName, infoMarkerName, setIdStruct])

    // const work = () => {
    //     const list = infoGroups.map((group) => {

    //         infoMarkerList.map((li) => {
    //             if (li.name === '') {
    //                 return ''
    //             }
    //         })

    //     })
    // }

    useEffect(() => {
    }, [infoMarkerList])

    const onInputChange = (e, type) => {
        console.log(e.target.value, type)

        if (type === 'skyBoxUrl') {
            console.log(e.target.value)
            skyBoxUrl = e.target.value
        }
        else if (type === 'roomName') {
            setRoomName(e.target.value)
        }
        else if (type === 'markerXYZ') {
            setMarkerXYZ({ ...markerXYZ, [e.target.name]: e.target.value })

            const planeEl = document.getElementById('plane')
            planeEl.emit('click', {
                intersection: {
                    point: { ...markerXYZ, [e.target.name]: e.target.value }
                }
            })
        }

    }
    console.log({ ...markerXYZ })

    const onAddClick = (e, type, data) => {
        console.log(e, setSkyBox)
        if (type === 'skyBox' && setSkyBox) {
            setSkyBox(skyBoxUrl)
        }
        else if (type === 'marker') {

            // setMarketInputHidden(!markerInputHidden)
            // setInfoGroup({...infoGroups,})
            // setInfoGroups([
            //     ...infoGroups,
            //     {
            //         'look-at': '#cam',
            //         'visible': true,
            //         'position': `0 1.6 -4`,
            //         'scale': '0.5 0.5 1',
            //         'name': 'tempMarker',
            //         'id': `${ idStruct }`,
            //         'src': 'https://img.icons8.com/doodle/96/000000/up-direction-arrow.png'
            //     }
            // ])
            setInfoGroups(infoGroups.map(group => {
                if (group.name === 'temp') {
                    group.position = `${ markerXYZ.x } ${ markerXYZ.y } ${ markerXYZ.z }`
                    // group.name = idStruct
                    delete group['name']
                }
                return group
            }))
            const planeEl = document.getElementById('plane')
            planeEl.emit('click', {
                type: 'setMarkerInfo',
                entityId: '',
                setMarkerXYZ: () => { }
            })
            setMarkerXYZ({ x: 0, y: 0, z: 0 })
            markerSet = !markerSet
            setInfoMarkerList([...infoMarkerList, {

                name: infoMarkerName,
                pos: markerXYZ

            }])

            setInfoElId(infoElId + 1)

        }
        else if (type === 'look-control') {
            setLookControl(!lookControl)
            lookControl = !lookControl
        }
        else if (type === 'insert') {
            // console.log(idStruct)
            console.log('insert', markerSet)
            if (!markerSet) {
                return
            }
            markerSet = !markerSet
            setInfoGroups([
                ...infoGroups,
                {
                    'look-at': '#cam',
                    'visible': true,
                    'position': '0 1.6 -4',
                    'scale': '0.5 0.5 1',
                    'name': 'temp',
                    'id': `${ idStruct }`,
                    'src': 'https://img.icons8.com/doodle/96/000000/up-direction-arrow.png'
                }
            ])
            const planeEl = document.getElementById('plane')
            planeEl.emit('click', {
                type: 'setMarkerInfo',
                entityId: idStruct,
                setMarkerXYZ
            })
        }
    }
    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    return (
        <div className='editingPanel'>
            {/* <Button onClick={e => onAddClick(e, 'look-control')} variant="contained" color='primary'>Enable look-control</Button> */}
            <Input placeholder='roomName' value={roomName} onChange={e => { onInputChange(e, 'roomName') }} ></Input>
            <Input placeholder='skyBox url' onChange={e => onInputChange(e, 'skyBoxUrl')}></Input>
            <Button onClick={e => onAddClick(e, 'skyBox')} variant="contained" color='primary'>Add Sky</Button>
            {
                infoMarkerList.map(infoMarker => {
                    const text = `${ infoMarker.name }\n${ JSON.stringify(infoMarker.pos) }`
                    return (
                        < ListItemLink >
                            <ListItemText primary={text} />
                        </ListItemLink>
                    )
                })
            }

            <Input placeholder='pos x' name='x' value={markerXYZ.x} onChange={e => onInputChange(e, 'markerXYZ')}></Input>
            <Input placeholder='pos y' name='y' value={markerXYZ.y} onChange={e => onInputChange(e, 'markerXYZ')}></Input>
            <Input placeholder='pos z' name='z' value={markerXYZ.z} onChange={e => onInputChange(e, 'markerXYZ')}></Input>
            <Button onClick={e => onAddClick(e, 'marker')} variant="contained" color='primary'>Add new marker</Button>
            <Button onClick={e => onAddClick(e, 'insert')} variant="contained" color='primary'>Insert</Button>

        </div >
    )
}