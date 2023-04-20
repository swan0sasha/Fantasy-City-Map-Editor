import React, {useEffect, useRef, useState} from 'react';
import Graph from "./Graph";
import "../styles/Canvas.css"

const Canvas = ({instruments}) => {
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        function handleResize() {
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // вызываем обработчик для первичной установки размеров

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="canvas" ref={ref}>
            <Graph edgeI={instruments.graph} width={width} height={height}/>
        </div>
    );
};

export default Canvas;