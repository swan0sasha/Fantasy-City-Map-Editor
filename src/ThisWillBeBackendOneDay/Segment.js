import Coordinates from "./Coordinates.js";

class Segment {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    length() {
        return Math.sqrt(Math.pow((this.x2 - this.x1), 2) + Math.pow((this.y2 - this.y1), 2));
    }
    setLength(length) {
        this.x2 = this.x1 + (this.x2 - this.x1) / this.length() * this.length;
        this.y2 = this.y1 + (this.y2 - this.y1) / this.length() * this.length;
    }
    getPerpendicular$2(x, y) {
        let newX = x - (this.y2 - this.y1) / this.length();
        let newY = y + (this.x2 - this.x1) / this.length();
        return new Segment(x, y, newX, newY);
    }
    getPerpendicular$3(x, y, length) {
        let newX = x - (this.y2 - this.y1) / this.length() * length;
        let newY = y + (this.x2 - this.x1) / this.length() * length;
        return new Segment(x, y, newX, newY);
    }
    getPerpendicular(...args$) {
        switch (args$.length) {
            case 2:
                return this.getPerpendicular$2(...args$);
            case 3:
                return this.getPerpendicular$3(...args$);
        }
    }
    getTranslation(x, y) {
        let newX = this.x2 - (this.x1 - x);
        let newY = this.y2 - (this.y1 - y);
        return new Segment(x, y, newX, newY);
    }
    getParallel$2(x, y) {
        let newX = (this.x2 - (this.x1 - x) - x) / this.length() + x;
        let newY = (this.y2 - (this.y1 - y) - y) / this.length() + y;
        return new Segment(x, y, newX, newY);
    }
    getParallel$3(x, y, length) {
        let newX = (this.x2 - (this.x1 - x) - x) / this.length() * length + x;
        let newY = (this.y2 - (this.y1 - y) - y) / this.length() * length + y;
        return new Segment(x, y, newX, newY);
    }
    getParallel(...args$) {
        switch (args$.length) {
            case 2:
                return this.getParallel$2(...args$);
            case 3:
                return this.getParallel$3(...args$);
        }
    }
    translate(x, y) {
        let newX = this.x2 - (this.x1 - x);
        let newY = this.y2 - (this.y1 - y);
        this.x1 = x;
        this.y1 = y;
        this.x2 = newX;
        this.y2 = newY;
    }
    isIntersecting(segment) {
        let v = this.x2 - this.x1;
        let w = this.y2 - this.y1;
        let v2 = segment.x2 - segment.x1;
        let w2 = segment.y2 - segment.y1;
        let t2 = (-w * segment.x1 + w * this.x1 + v * segment.y1 - v * this.y1) / (w * v2 - v * w2);
        let t = (segment.x1 - this.x1 + v2 * t2) / v;
        return !(t < 0) && !(t > 1) && !(t2 < 0) && !(t2 > 1);
    }
    getIntersection(segment) {
        let v = this.x2 - this.x1;
        let w = this.y2 - this.y1;
        let v2 = segment.x2 - segment.x1;
        let w2 = segment.y2 - segment.y1;
        let t2 = (-w * segment.x1 + w * this.x1 + v * segment.y1 - v * this.y1) / (w * v2 - v * w2);
        let t = (segment.x1 - this.x1 + v2 * t2) / v;
        if (t < 0 || t > 1 || t2 < 0 || t2 > 1) {
            return null;
        }
        return new Coordinates(segment.x1 + v2 * t2, segment.y1 + w2 * t2);
    }
    isOnSegment(x, y) {
        let distance1 = Math.sqrt(Math.pow((x - this.x1), 2) + Math.pow((y - this.y1), 2));
        let distance2 = Math.sqrt(Math.pow((this.x2 - x), 2) + Math.pow((this.y2 - y), 2));
        return distance1 + distance2 - this.length() <= 0.05;
    }
    getX1() {
        return this.x1;
    }
    setX1(x1) {
        this.x1 = x1;
    }
    getY1() {
        return this.y1;
    }
    setY1(y1) {
        this.y1 = y1;
    }
    getX2() {
        return this.x2;
    }
    setX2(x2) {
        this.x2 = x2;
    }
    getY2() {
        return this.y2;
    }
    setY2(y2) {
        this.y2 = y2;
    }
    toString() {
        return String.format('Segment{(%.2f, %.2f), (%.2f, %.2f)}', this.x1, this.y1, this.x2, this.y2);
    }
}

export default Segment;