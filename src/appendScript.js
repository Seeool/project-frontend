import React from 'react';

const appendScript = (src) => {
    console.log("스크립트 재삽입")
    const script = document.createElement("script")
    script.src = src;
    script.async = false

    let scripted = document.querySelector(`script[src="${src}"]`);
    if (!scripted) {
        document.body.appendChild(script)
    }
    if (scripted) {
        document.body.removeChild(scripted)
        document.body.appendChild(script)
    }
};

export default appendScript;
