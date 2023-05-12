import React from 'react';
import "../../styles/GraphPanel.css"

const GraphPanel = ({changeInstruments, instruments}) => {
    const changeMode = (mode) => {
        switch (mode) {
            case 'vertex' : {
                changeInstruments({
                    ...instruments = false,
                    graph: 'vertex',
                })
                break
            }
            case 'edge' : {
                changeInstruments({
                    ...instruments = false,
                    graph: 'edge',
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