import Segment from "./Segment.js";
import Polygon from "./Polygon.js";
import Coordinates from "./Coordinates.js";
import {writeFile} from "fs";


class Quarter {
    constructor(borders) {
        this.MIN_WALL_LENGTH = 0.4;
        this.MAX_WALL_LENGTH = 2.0;
        this.MAX_BORDER_WALL_OFFSET = 0.05;
        this.MAX_LENGTH = 10;

        this.borders = borders;
        this.verticalWalls = [];
        this.buildings = [];
        //this.buildings = [];
        //this.serializer = new Serializer('buildings.json');
    }

    generateBuildings() {
        this.generateVerticalWalls();
        this.generateHorizontalWalls();

        //console.log(JSON.stringify(this.buildings))
        writeFile('./src/resources/res.json', JSON.stringify(this.buildings), err => {
            if (err) console.log(err)
        })
        // for (const building of this.buildings) {
        //     console.log(JSON.stringify(building))
        // }
        //this.serializer.serializeBuildings(this.buildings);
        //System.out.println('generated');
    }

    generateVerticalWalls() {
        for (const edge of this.borders) {
            if (edge.length() < this.MIN_WALL_LENGTH) {
                continue;
            }
            let wallsForEdge = [];
            let x = edge.getX1();
            let y = edge.getY1();
            while (true) {
                let length = this.MIN_WALL_LENGTH + Math.random() * (this.MAX_WALL_LENGTH - this.MIN_WALL_LENGTH);
                let lengthSegment = edge.getParallel(x, y, length);
                x = lengthSegment.getX2();
                y = lengthSegment.getY2();
                if (!edge.isOnSegment(x, y)) {
                    break;
                }
                lengthSegment = new Segment(x, y, edge.getX2(), edge.getY2());
                if (lengthSegment.length() < this.MIN_WALL_LENGTH) {
                    break;
                }
                wallsForEdge.push(edge.getPerpendicular(x, y, this.MAX_LENGTH));
            }
            this.verticalWalls.push(wallsForEdge);
        }
    }

    getPointOnSegment(segment, length) {
        let lengthSegment = segment.getParallel(segment.getX1(), segment.getY1(), length);
        return new Coordinates(lengthSegment.getX2(), lengthSegment.getY2());
    }

    generateHorizontalWalls() {
        let size = this.verticalWalls.length;
        for (let i = 0; i < size; i++) {
            let borderWalls = this.verticalWalls[i];
            for (let j = 0; j < borderWalls.length; j++) {
                let wall = borderWalls[j];
                let previousWall = null;
                if (j === 0) {
                    let previousBorderWalls = null;
                    let k = 0;
                    if (i === 0) {
                        k = size - 1;
                    } else {
                        k = i - 1;
                    }
                    previousBorderWalls = this.verticalWalls[k];
                    while (previousBorderWalls.length === 0) {
                        k--;
                        previousBorderWalls = this.verticalWalls[k];
                    }
                    previousWall = previousBorderWalls[previousBorderWalls.length - 1];
                    this.generateCornerBuilding(wall, previousWall);
                } else {
                    previousWall = borderWalls[j - 1];
                    this.generateCentralBuilding(wall, previousWall);
                }
            }
        }
    }

    generateCornerBuilding(wall, previousWall) {
        let vertexes = [];
        let vertex1 = wall.getIntersection(previousWall);
        if (vertex1 === null) {
            this.generateCentralBuilding(wall, previousWall);
            return undefined;
        }
        let lengthWall1 = new Segment(wall.getX1(), wall.getY1(), vertex1.x, vertex1.y);
        let lengthWall2 = new Segment(previousWall.getX1(), previousWall.getY1(), vertex1.x, vertex1.y);
        if (lengthWall1.length() > this.MAX_WALL_LENGTH || lengthWall2.length() > this.MAX_WALL_LENGTH) {
            this.generateCornerPentagon(wall, previousWall);
            return undefined;
        }
        let vertex2 = this.getPointOnSegment(previousWall, Math.random() * this.MAX_BORDER_WALL_OFFSET);
        let offset = previousWall.getPerpendicular(vertex2.x, vertex2.y, -this.MAX_LENGTH);
        let vertex4 = this.getPointOnSegment(wall, Math.random() * this.MAX_BORDER_WALL_OFFSET);
        let offsetPrevious = wall.getPerpendicular(vertex4.x, vertex4.y, this.MAX_LENGTH);
        let vertex3 = offset.getIntersection(offsetPrevious);
        vertexes.push(vertex1);
        vertexes.push(vertex2);
        vertexes.push(vertex3);
        vertexes.push(vertex4);
        this.buildings.push(new Polygon(vertexes));
    }

    generateCornerPentagon(wall, previousWall) {
        let vertexes = [];
        let maxLength = this.MAX_WALL_LENGTH * 0.75;
        let lengthWall1 = wall.getParallel(wall.getX1(), wall.getY1(), this.MIN_WALL_LENGTH + Math.random() * (maxLength - this.MIN_WALL_LENGTH));
        let vertex1 = new Coordinates(lengthWall1.getX2(), lengthWall1.getY2());
        let lengthWall2 = previousWall.getParallel(previousWall.getX1(), previousWall.getY1(), this.MIN_WALL_LENGTH + Math.random() * (maxLength - this.MIN_WALL_LENGTH));
        let vertex2 = new Coordinates(lengthWall2.getX2(), lengthWall2.getY2());
        let vertex3 = this.getPointOnSegment(previousWall, Math.random() * this.MAX_BORDER_WALL_OFFSET);
        let offset = previousWall.getPerpendicular(vertex3.x, vertex3.y, -this.MAX_LENGTH);
        let vertex5 = this.getPointOnSegment(wall, Math.random() * this.MAX_BORDER_WALL_OFFSET);
        let offsetPrevious = wall.getPerpendicular(vertex5.x, vertex5.y, this.MAX_LENGTH);
        let vertex4 = offset.getIntersection(offsetPrevious);
        vertexes.push(vertex1);
        vertexes.push(vertex2);
        vertexes.push(vertex3);
        vertexes.push(vertex4);
        vertexes.push(vertex5);
        this.buildings.push(new Polygon(vertexes));
    }

    generateCentralBuilding(wall, previousWall) {
        let vertexes = [];
        let lengthWall = wall.getParallel(wall.getX1(), wall.getY1(), this.MIN_WALL_LENGTH + Math.random() * (this.MAX_WALL_LENGTH - this.MIN_WALL_LENGTH));
        let vertex1 = new Coordinates(lengthWall.getX2(), lengthWall.getY2());
        let perpendicular = wall.getPerpendicular(lengthWall.getX2(), lengthWall.getY2(), this.MAX_WALL_LENGTH);
        let vertex2 = perpendicular.getIntersection(previousWall);
        lengthWall = wall.getParallel(wall.getX1(), wall.getY1(), Math.random() * this.MAX_BORDER_WALL_OFFSET);
        let vertex4 = new Coordinates(lengthWall.getX2(), lengthWall.getY2());
        perpendicular = lengthWall.getPerpendicular(lengthWall.getX2(), lengthWall.getY2(), this.MAX_LENGTH);
        let vertex3 = perpendicular.getIntersection(previousWall);
        vertexes.push(vertex1);
        vertexes.push(vertex2);
        vertexes.push(vertex3);
        vertexes.push(vertex4);
        this.buildings.push(new Polygon(vertexes));
    }
}

export default Quarter;
