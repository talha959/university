import React, { useEffect } from 'react';

const Editor = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js";
        script.type = "text/javascript";
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <div data-pym-src="https://www.jdoodle.com/embed/v1/1d8606b8cd22e932"></div>
        </div>
    );
};

export default Editor;