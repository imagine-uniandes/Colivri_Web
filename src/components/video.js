import React from 'react';
import '../styles/video.css';

const Video = () => {
    return (
        <div className='video-container'>
            <div className="video-text">
                <h1>¿Cómo llegar a Colivri?</h1>
            </div>
            <div className="video-player">
                <iframe
                    src="https://www.youtube.com/embed/MJSLP5P6FLI"
                    title="¿Cómo llegar a Colivri?"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Video;
