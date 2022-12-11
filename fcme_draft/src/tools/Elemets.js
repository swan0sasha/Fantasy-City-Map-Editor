import Tool from "./Tool";

export default class Elemets extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, 25, 25);
    }
    mouseMoveHandler(e) {
    }
}