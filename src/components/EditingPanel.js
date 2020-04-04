import React, { useState, useEffect } from 'react'
import { Input, Button, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
let markerSet = true
let popperToggle = false
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
export default function EditingPanel(props) {


    const classes = useStyles();

    const entities = [
        {
            entityName: 'infogroup'
        },
        {
            entityName: 'navigation'
        }
    ]

    const [currentGroup, setCurrentGroup] = useState('infogroup')


    const {
        openPopper,
        popperId,
        anchorEl,
        setAnchorEl,
        roomName,
        setRoomName,
        setSkyUrl,
        setInfoGroups,
        infoGroups,
        mediaUrl,
        setMediaUrl,
        description,
        setDescription,
        handleInfoSettingOpen
    } = props
    const [infoMarkerName, setInfoMarkerName] = useState(`infoMarker`)
    const [idStruct, setIdStruct] = useState(`${ currentGroup }_${ currentGroup }-${ roomName }_${ infoMarkerName }`)
    console.log(idStruct)
    const setLookControl = props.setLookControl
    let lookControl = props.lookControl
    const [markerInputHidden, setMarketInputHidden] = useState(true)
    const [markerXYZ, setMarkerXYZ] = useState({ x: 0, y: 0, z: 0 })
    let skyBoxUrl = ''
    const [infoMarkerList, setInfoMarkerList] = useState([])
    console.log(setSkyUrl)

    useEffect(() => {
        // setInfoMarkerName(`infoMarker${ infoElId }`)
        // setRoomName(roomName)
        setIdStruct(`${ currentGroup }_${ currentGroup }-${ roomName }_${ infoMarkerName }`)
    }, [roomName, infoMarkerName, setIdStruct, currentGroup])

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
    const [navigationTo, setNavigationTo] = useState(null)
    const onInputChange = (e, type) => {
        console.log(e.target.value, type)

        if (type === 'skyBoxUrl') {
            console.log(e.target.value)
            skyBoxUrl = e.target.value
        }
        else if (type === 'roomName') {
            setRoomName(e.target.value)
        }
        else if (type === 'infoMarkerName') {
            setInfoMarkerName(e.target.value)
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
        else if (type === 'group-selector') {
            setCurrentGroup(e.target.value)
            if (e.target.value === 'navigation') {
                setNavigationTo(true)
            }
            else {
                setNavigationTo(null)
            }
        }
        else if (type === 'navigationTo') {
            setNavigationTo(e.target.value)
        }

    }
    console.log({ ...markerXYZ })

    const onAddClick = (e, type, data) => {
        console.log(e, setSkyUrl)
        if (type === 'skyBox' && setSkyUrl) {
            setSkyUrl(skyBoxUrl)
        }
        else if (type === 'marker') {
            let exists = false;

            infoMarkerList.map(infoMarker => {
                console.log(infoMarkerName, infoMarker.name)
                if (infoMarker.name === infoMarkerName) {
                    exists = true
                }
            })
            console.log(exists)
            if (exists) {
                return
            }
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
                    group.name = infoMarkerName
                    group.type = currentGroup
                    group.navigationTo = navigationTo
                    // console.log(group)

                    // delete group['name']
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

            // setInfoElId(infoElId + 1)

        }
        else if (type === 'look-control') {
            setLookControl(!lookControl)
            lookControl = !lookControl
        }
        else if (type === 'insert') {
            // console.log(idStruct)
            let exists = false;

            infoMarkerList.map(infoMarker => {
                console.log(infoMarkerName, infoMarker.name)
                if (infoMarker.name === infoMarkerName) {
                    exists = true
                }
            })
            console.log(exists)
            if (exists) {
                return
            }

            console.log('insert', markerSet)
            if (!markerSet) {
                return
            }
            markerSet = !markerSet
            setInfoGroups([
                ...infoGroups,
                {
                    onClick: (e) => {
                        editingIconOnClick({
                            idStruct
                        })
                    },
                    'look-at': '#cam',
                    'visible': true,
                    'position': '0 1.6 -4',
                    'scale': '0.7 0.7 1',
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
    const editingIconOnClick = (e) => {
        const currentTarget = document.getElementById(e.idStruct)
        setAnchorEl(popperToggle ? null : currentTarget);
        popperToggle = !popperToggle
        handleInfoSettingOpen(currentTarget)
        console.log(currentTarget)
        // console.log(e)
    }
    const onPopperSave = (currentTarget) => {

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
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Group</InputLabel>
                <Select
                    native
                    value={currentGroup}
                    onChange={e => onInputChange(e, 'group-selector')}
                    inputProps={{
                        name: 'Group',
                        id: 'group-selector',
                    }}
                >
                    {
                        entities.map(item => (
                            <option value={item.entityName}>{item.entityName}</option>
                        ))
                    }
                </Select>
            </FormControl>
            {
                navigationTo &&
                <Input placeholder='navigationTo' value={navigationTo === true ? '' : navigationTo} onChange={e => onInputChange(e, 'navigationTo')}></Input>

            }
            <Input placeholder='markerName' value={infoMarkerName} onChange={e => onInputChange(e, 'infoMarkerName')}></Input>
            <Input placeholder='pos x' name='x' value={markerXYZ.x} onChange={e => onInputChange(e, 'markerXYZ')}></Input>
            <Input placeholder='pos y' name='y' value={markerXYZ.y} onChange={e => onInputChange(e, 'markerXYZ')}></Input>
            <Input placeholder='pos z' name='z' value={markerXYZ.z} onChange={e => onInputChange(e, 'markerXYZ')}></Input>
            <Button onClick={e => onAddClick(e, 'marker')} variant="contained" color='primary'>Add new marker</Button>
            <Button onClick={e => onAddClick(e, 'insert')} variant="contained" color='primary'>Insert</Button>

        </div >
    )
}