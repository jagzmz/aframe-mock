import skyBg2 from './assets/pano-oldField.jpg'
import registerClickDrag from 'aframe-click-drag-component';
const AFRAME = window.AFRAME
registerClickDrag(AFRAME);

export default function () {
    let toggle = false
    let notLoad = false
    let toggleZ = false

    AFRAME.registerComponent('listener', {
        init: function () {
            const entityPos = this.el.getAttribute('position')
            console.log(entityPos)
            this.el.addEventListener('dragstart', (evt) => {
                console.log(evt)
            });
            this.el.addEventListener('dragmove', (evt) => {
                this.el.setAttribute('position', `0 ${ evt.detail.nextPosition.y } ${ evt.detail.nextPosition.z }`)
                console.log(evt)

            });
            this.el.addEventListener('dragend', (evt) => {
                console.log(evt)

            });
        }
    });
    let currentEntityId;
    let setMarkerXYZ;
    AFRAME.registerComponent('cursor-listener', {
        init: function () {
            this.el.addEventListener('click', (evt) => {
                console.log(evt)
                const type = evt.detail.type
                const cursorPos = evt.detail.intersection && evt.detail.intersection.point
                // console.log(cursorPos)

                if (type === 'setMarkerInfo') {
                    currentEntityId = evt.detail.entityId
                    setMarkerXYZ = evt.detail.setMarkerXYZ
                }

                cursorPos && setMarkerXYZ && setMarkerXYZ({ ...cursorPos })

                const [infoMa] = document.querySelectorAll(`[id^="${ currentEntityId }"]`)
                console.log(infoMa, cursorPos, `[id^="${ currentEntityId }"]`)
                cursorPos && infoMa && infoMa.setAttribute('position', `${ cursorPos.x } ${ cursorPos.y } ${ cursorPos.z }`)

            });
        }
    });
    // let shouldPause=false
    // if (!AFRAME.components['cursor-listener']) {

    // AFRAME.registerComponent('cursor-listener', {
    //     init: function () {
    //         console.log('iuahdishiashdi')
    //         var lastIndex = -1;
    //         var COLORS = ['red', 'green', 'blue'];
    //         this.el.addEventListener('click', function (evt) {
    //             lastIndex = (lastIndex + 1) % COLORS.length;
    //             this.setAttribute('material', 'color', COLORS[lastIndex]);
    //             console.log('I was clicked at: ', evt.detail.intersection.point);
    //         });
    //     }
    // });
    // }
    AFRAME.registerComponent('cursor_log', {
        init: function () {
            console.log('asdasd')
            this.el.addEventListener('click', function () {
                const posEl = document.getElementById('clickPosition')
                console.log(posEl)
                const cursorPos = posEl.object3D.getWorldPosition()
                console.log(cursorPos)
                const infoMa = document.getElementById('infoMarker1')
                cursorPos.z = -10
                console.log(infoMa, cursorPos)
                infoMa.setAttribute('position', `${ cursorPos.x } ${ cursorPos.y } ${ cursorPos.z }`)
            })
        }
    });
    AFRAME.registerComponent('camm', {
        init: function () {
            console.log("KLLKLK")
            const img = document.getElementById('infoMarker1')
            img.setAttribute('look-at', '#cam')
        }
    });
    AFRAME.registerComponent('ztoggle', {
        init: function () {
            // console.log("KLLKLK")
            // this.el.get
        }
    });
    AFRAME.registerComponent('gotoroom', {
        init: function () {
            // console.log("KLLKLK")
            // const img = document.getElementById('infoMarker1')
            this.el.setAttribute('look-at', '#cam')
            // console.log(this.el)
            this.el.addEventListener('click', function (evt) {
                // console.log('asdasdasd')
                const camFadePlane = document.getElementById('camfadeplane')

                if (!toggleZ) {
                    const camFadePos = camFadePlane.getAttribute('position')
                    camFadePos.z += 2
                    toggleZ = true
                    console.log('zooming in', camFadePos)
                    camFadePlane.setAttribute('positon', camFadePos)

                }
                camFadePlane.emit('camFadeIn')
                const camera = document.getElementById('cam')
                camera.emit('zoomin')

            })
        }
    });
    if (!AFRAME.components['cammm']) {

        AFRAME.registerComponent('cammm', {
            init: function () {

                this.el.addEventListener('animationcomplete', function () {
                    const camFadePlane = document.getElementById('camfadeplane')
                    const skyMain = document.getElementById('skyMain')
                    // const skyImage =
                    skyMain.setAttribute('src', skyBg2)

                    camFadePlane.emit('camFadeOut')
                    this.emit('zoomout')

                    setTimeout(function () {
                        if (toggleZ) {
                            const camFadePos = camFadePlane.getAttribute('position')
                            camFadePos.z -= 2
                            console.log('zooming in', camFadePos)
                            camFadePlane.setAttribute('positon', camFadePos)
                            toggleZ = !toggleZ
                        }
                    }, 500)
                })
            }
        });
    }
    AFRAME.registerComponent('infogroup', {
        init: function () {
            this.el.setAttribute('look-at', '#cam')
        }
    });
    AFRAME.registerComponent('infoicon', {
        init: function () {
            this.el.setAttribute('look-at', '#cam')
        }
    });


}