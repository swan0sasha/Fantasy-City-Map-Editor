import Segment from "./Segment.js";

class Coordinates {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;

        this.x = x;
        this.y = y;
    }
    toString() {
        return String.format('(%.2f, %.2f)', this.x, this.y);
    }
}
export default Coordinates;