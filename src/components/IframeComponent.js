/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from 'react'

export default function IframeComponent(
    {
        mediaUrl,
        mediaDesc,
        onClose,
    }
) {
    const screenWrap = React.useRef()
    const iframeVidRef = React.useRef()

    useEffect(() => {
        // iframeVidRef && iframeVidRef.current && iframeVidRef.current.setAttribute('src', `${ mediaUrl }`)
        screenWrap && screenWrap.current && screenWrap.current.setAttribute('style', 'display:block;')
    }, [mediaUrl])

    return (
        <div ref={screenWrap}
            id='screenWrap'
            className='screenWrap'
            display='block'
        >
            <div className='infoPanel'>
                <iframe
                    ref={iframeVidRef}
                    src={mediaUrl}
                    className='iframeVid'
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
                <div className='infoPanelDescription'>
                    {mediaDesc}
                </div>
                <img onClick={onClose} className='iframeClose' src="https://img.icons8.com/color/48/000000/close-window.png" />
            </div>

        </div >
    )
}