import React from 'react';
import "../styles/Toolbar.css"
const Toolbar = ({change}) => {
    const changeInstrument = (instrument) =>{
            change({
                mouse: false,
                landscape: false,
                brush: false,
                elements: false,
                text: false,
                contour: false,
                graph: false,
                [instrument]: true
            })
            console.log(instrument + ' is now active')
    }
    return (
        <div className="toolbar">
            <div className="toolbar__btn">
                <button className="mouse" onClick={()=>changeInstrument("mouse")}/>
                <button className="landscape" onClick={()=>changeInstrument("landscape")}/>
                <button className="brush" onClick={()=>changeInstrument("brush")}/>
                <button className="elements" onClick={()=>changeInstrument("elements")}/>
                <button className="text" onClick={()=>changeInstrument("text")}/>
                <button className="contour" onClick={()=>changeInstrument("contour")}/>
                <button className="graph" onClick={()=>changeInstrument("graph")}/>
            </div>
        </div>
    );
};

export default Toolbar;