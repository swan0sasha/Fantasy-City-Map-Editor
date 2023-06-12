import React from 'react';
import {Shape, Transformer} from "react-konva";

const ElementShape = ({isSelected, onSelect, onChange, element, enabled}) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            const vertices = element.vertexes;
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

            tr.attachTo(shape);
            shape.getLayer().batchDraw();
        }
    }, [isSelected, element.vertexes]);
    const drawQuarter = (context, shape, element) => {
        context.beginPath();
        context.moveTo(element.vertexes[0].x, element.vertexes[0].y);
        for (let i = 1; i < element.vertexes.length; i++) {
            context.lineTo(element.vertexes[i].x, element.vertexes[i].y);
        }
        context.closePath();
        context.fillStrokeShape(shape);
    };

    return (
        <React.Fragment>
            <Shape
                sceneFunc={(context, shape) => drawQuarter(context, shape, element)}
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                fill={element.color}
                stroke="black"
                strokeWidth={1}
                draggable={enabled}
                onDragEnd={(e) => {
                    const node = shapeRef.current;
                    const offsetX = node.x();
                    const offsetY = node.y();
                    const newElem =
                        {
                            ...element,
                            vertexes: element.vertexes.map((vertex) => ({
                                x: vertex.x + offsetX,
                                y: vertex.y + offsetY,
                            }))
                        }
                    node.x(0)
                    node.y(0)
                    onChange(newElem);
                }}
                onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    const rotation = node.rotation() * (Math.PI / 180); // Преобразование градусов в радианы
                    const center = {
                        x: element.vertexes.reduce((sum, vertex) => sum + vertex.x, 0) / element.vertexes.length,
                        y: element.vertexes.reduce((sum, vertex) => sum + vertex.y, 0) / element.vertexes.length,
                    };
                    const newVertexes = element.vertexes.map((vertex) => {
                        const dx = vertex.x - center.x;
                        const dy = vertex.y - center.y;
                        const rotatedX = dx * Math.cos(rotation) - dy * Math.sin(rotation);
                        const rotatedY = dx * Math.sin(rotation) + dy * Math.cos(rotation);
                        const scaledX = center.x + rotatedX * scaleX;
                        const scaledY = center.y + rotatedY * scaleY;
                        return {
                            x: scaledX,
                            y: scaledY,
                        };
                    });
                    const newElem = {
                        ...element,
                        vertexes: newVertexes,
                    };
                    node.scaleX(1);
                    node.scaleY(1);
                    node.x(0);
                    node.y(0);
                    node.rotation(0);
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