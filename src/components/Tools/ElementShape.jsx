import React from 'react';
import {Shape, Transformer} from "react-konva";

const ElementShape = ({isSelected, onSelect, onChange, element, enabled}) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const address = "10.244.204.9"

    React.useEffect(() => {
        if (isSelected) {
            const vertices = element.vertices;
            const shape = shapeRef.current;
            const tr = trRef.current;
            let minX = vertices[0].x;
            let maxX = vertices[0].x;
            let minY = vertices[0].y;
            let maxY = vertices[0].y;

            for (let i = 1; i < vertices.length; i++) {
                const {x, y} = vertices[i];
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
            const x = minX;
            const y = minY;
            const width = maxX - minX;
            const height = maxY - minY;
            shape.getSelfRect = function () {
                return {
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                };
            };

            if (enabled === true) {
                tr.attachTo(shape);
                shape.getLayer().batchDraw();
            }
        }
    }, [isSelected, element.vertices]);

    const colorChecker = (color) => {
        switch (color) {
            case "poor":
                return "brown"
            case "park":
                return "green"
            case "middle":
                return "yellow"
            case "industrial":
                return "orange"
            case "market":
                return "blue"
            case "square":
                return "red"
            case "rich":
                return "purple"
            default:
                return color
        }
    }
    const drawQuarter = (context, shape, element) => {
        // console.log(element)
        if (element.vertices !== [] && element.vertices !== undefined) {
            context.beginPath();
            // console.log(element.vertices[0])
            if (element.vertices[0] === undefined || element.vertices[0] === undefined) return
            context.moveTo(element.vertices[0].x, element.vertices[0].y);
            for (let i = 1; i < element.vertices.length; i++) {
                context.lineTo(element.vertices[i].x, element.vertices[i].y);
            }
            context.closePath();
            context.fillStrokeShape(shape);
        }
    };

    return (
        <React.Fragment>
            <Shape
                sceneFunc={(context, shape) => drawQuarter(context, shape, element)}
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                fill={colorChecker(element.color)}
                stroke="black"
                strokeWidth={1}
                draggable={enabled}
                onDragEnd={(e) => {
                    const node = shapeRef.current;
                    const offsetX = node.x()
                    const offsetY = node.y()
                    const newVertices = element.vertices.map((vertex) => ({
                        x: vertex.x + offsetX,
                        y: vertex.y + offsetY,
                    }))
                    // console.log(element)
                    const newElem =
                        {
                            ...element,
                            vertices: newVertices
                        }
                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: element.id,
                            vertices: newVertices,
                            color: element.color
                        })
                    };
                    fetch(`http://${address}:8000/objects/edit`, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                        })
                    onChange(newElem);
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    const newVertices = element.vertices.map((vertex) => ({
                        x: vertex.x * scaleX,
                        y: vertex.y * scaleY,
                    }));
                    const newElem = {
                        ...element,
                        vertices: newVertices,
                    };
                    node.scaleX(1);
                    node.scaleY(1);
                    const requestOptions = {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: element.id,
                            vertices: newVertices,
                            color: element.color
                        })
                    };
                    fetch(`http://${address}:8000/objects/edit`, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                        })
                    onChange(newElem);
                }}
            />
            {isSelected && enabled && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default ElementShape;