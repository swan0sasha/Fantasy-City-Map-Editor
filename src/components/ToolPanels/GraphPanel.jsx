import React from 'react';
import "../../styles/GraphPanel.css"

const GraphPanel = ({changeInstruments, instruments}) => {
    const changeMode = (mode) => {
        switch (mode) {
            case 'vertex' : {
                changeInstruments({
                    ...instruments,
                    graph: false,
                })
                break
            }
            case 'edge' : {
                changeInstruments({
                    ...instruments,
                    graph: true,
                })
                break
            }
            default: {
                break
            }
        }
    }

    return (
        <div className="graphPanel">
            <button onClick={() => changeMode('vertex')}>Vertex mode</button>
            <button onClick={() => changeMode('edge')}>Edge mode</button>
        </div>
    );
};

export default GraphPanel;