/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import { React } from 'react'
import '../App.css'
export default function InfoPanel(props) {
    const iframeVidRef = React.useRef()
    const screenWrap = React.useRef()


    const iframeOpen = () => {
        console.log(screenWrap)
        iframeVidRef.current.setAttribute('src', 'https://www.youtube.com/embed/lwNho_1tKrc')
        screenWrap.current.setAttribute('style', 'display:block;')
    }

    const iframeClose = () => {
        screenWrap.current.removeAttribute('style', 'display:block;')
        iframeVidRef.current.removeAttribute('src')
    }

    return (
        <div ref={screenWrap} id='screenWrap' className='screenWrap'>
            <div className='infoPanel'>
                <iframe
                    ref={iframeVidRef}
                    className='iframeVid'
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
                <div className='infoPanelDescription'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled .
                    </div>
                <img onClick={iframeClose}
                    className='iframeClose'
                    src="https://img.icons8.com/color/48/000000/close-window.png"
                />
            </div>
        </div>
    )
}