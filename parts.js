class Part {
    constructor(type, x, y) {
        this.position = {
            x: x,
            y: y
        }

        this.rotate = 0;

        this.width = sizes[type].width;
        this.height = sizes[type].height;

        this.selected = false;
        this.moveable = false;

        this.mouseDis = {
            x: 0,
            y: 0
        }

        this.picture = type;
    }
}