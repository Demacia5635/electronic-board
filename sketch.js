let boardSize = {
    width: 500,
    height: 300
}

let prop = 200 / 300;
let widthIn, heightIn;
let elements = [];
let pictures = {
    "pdp": "",
    "talon": "",
    "robo": "",
    "vrm": "",
    "radio": "",
    "breaker": "",
    "pi": ""
}

let sizes = {
    "pdp": {
        width: 192.6844 / prop,
        height: 120 / prop
    },
    "robo": {
        width: 146.15 / prop,
        height: 143.18 / prop
    },
    "talon": {
        width: 30 / prop,
        height: 69.85 / prop
    },
    "vrm": {
        width: 56.38 / prop,
        height: 51.56 / prop
    },
    "radio": {
        width: 69.85 / prop,
        height: 95.25 / prop
    },
    "breaker": {
        width: 48.26 / prop,
        height: 73.66 / prop
    },
    "pi": {
        width: 85 / prop,
        height: 56 / prop
    },
    "nano": {
        width: 45 / prop,
        height: 18 / prop
    }
}

function preload() {
    pictures["pdp"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/pdp.png");
    pictures["radio"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/radio.png");
    pictures["talon"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/talon.png");
    pictures["vrm"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/vrm.png");
    pictures["robo"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/roborio.png");
    pictures["breaker"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/breaker.png");
    pictures["pi"] = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV177_cY8jMSjXrogjGpuRrfKUUBd0fcuL5Q&usqp=CAU");
    pictures["nano"] = loadImage("https://cdn.shopify.com/s/files/1/1641/0911/products/nano-v30-micro-controller-with-atmega328p-16mhz-50v-ch340g-usb-driver-mini-usb-connector-439384_1200x1200.jpg?v=1633023487");
}

function setup() {
    Canvas();
    angleMode(DEGREES);
}

function draw() {
    background("#872dff");

    stroke(0);
    strokeWeight(2);
    for (let i = 0; i < width; i += 50 / prop) {
        line(i, 0, i, height);
    }

    for (let i = 0; i < height; i += 50 / prop) {
        line(0, i, width, i);
    }

    for (let i = 0; i < elements.length; i++) {
        part = elements[i];
        push();
        translate(part.position.x + part.width / 2, part.position.y + part.height / 2)
        rotate(part.rotate);
        if (part.selected) {
            strokeWeight(7);
            stroke(2, 200, 0);
            fill(2, 200, 0);
            rect(-part.width / 2, -part.height / 2, part.width, part.height);
        }
        image(pictures[part.picture], -part.width / 2, -part.height / 2, part.width, part.height);
        pop();

        if (part.moveable) {
            part.position.x = mouseX - part.width / 2 - part.mouseDis.x;
            part.position.y = mouseY - part.height / 2 - part.mouseDis.y;
        }
    }
}

function Canvas() {
    createCanvas(boardSize.width / prop, boardSize.height / prop).position(0, 0);

    createButton("Add PDP").position(width + 10, 10).mousePressed(() => elements.push(new Part("pdp", 0, 0)))
    createButton("Add RoboRIO").position(width + 10, 40).mousePressed(() => elements.push(new Part("robo", 0, 0)))
    createButton("Add Talon SRX").position(width + 10, 70).mousePressed(() => elements.push(new Part("talon", 0, 0)))
    createButton("Add VRM").position(width + 10, 100).mousePressed(() => elements.push(new Part("vrm", 0, 0)))
    createButton("Add Radio").position(width + 10, 130).mousePressed(() => elements.push(new Part("radio", 0, 0)))
    createButton("Add Breaker").position(width + 10, 160).mousePressed(() => elements.push(new Part("breaker", 0, 0)))
    createButton("Add Raspberry Pi").position(width + 10, 190).mousePressed(() => elements.push(new Part("pi", 0, 0)))
    createButton("Add Arduino Nano").position(width + 10, 220).mousePressed(() => elements.push(new Part("nano", 0, 0)))

    createButton("Delete Element").position(173.43, height + 12).mousePressed(deleteElement);
    createButton("Clear Board").position(290.57, height + 12).mousePressed(clearBoard);
    createButton("Rotate Selected Element").position(0, height + 12).mousePressed(rotateElement);

    createP("Insert New Board Height (cm): ").position(0, height + 27);
    heightIn = createInput().position(205, height + 42);
    createP(`Currently: ${boardSize.height / 10} (cm)`).position(380, height + 27);
    createP("Insert New Board Width (cm): ").position(0, height + 57);
    widthIn = createInput().position(205, height + 72);
    createP(`Currently: ${boardSize.width / 10} (cm)`).position(380, height + 57);

    createButton("Change Board Dimensions").position(0, height + 97).mousePressed(changeDimensions);

    createA("", "click here to download your file").id("a");
    let a = document.getElementById("a");
    createButton("Create File").id("download");
    let downloadButton = document.getElementById("download");
    downloadButton.onclick = () => download('file text', 'board.json', 'text/json');
    downloadButton.style.position = "absolute";
    downloadButton.style.left = `0px`;
    downloadButton.style.top = `${height + 130}px`

    a.style.display = "none";
    a.style.position = "absolute";
    a.style.left = `0px`;
    a.style.top = `${height + 160}px`

    createFileInput(fileImport).position(0, height + 190);
}

function mousePressed() {
    if (mouseX < width && mouseY < height) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].selected = false;
            elements[i].selected = false;
        }
    }
    let found = elements.find(el => {
        let rotated = (el.rotate % 180 != 0);
        let dx = mouseX - el.position.x - el.width / 2;
        let dy = mouseY - el.position.y - el.height / 2;

        let onPart = ((Math.abs(dx) < ((rotated) ? (el.height / 2) : (el.width / 2))) && (Math.abs(dy) < ((rotated) ? (el.width / 2) : (el.height / 2))));
        el.mouseDis = {
            x: dx,
            y: dy
        }
        return (onPart);
    })
    if (found != undefined) {
        found.selected = true;
        found.moveable = true;
    } else {
        if (mouseX < width && mouseY < height) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].selected = false;
                elements[i].selected = false;
            }
        }
    }
}

function mouseReleased() {
    let found = elements.find(el => el.selected && el.moveable);
    if (found != undefined) {
        found.moveable = false;
    } else {
        if (mouseX < width && mouseY < height) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].selected = false;
                elements[i].selected = false;
            }
        }
    }
}

function rotateElement() {
    let found = elements.find(el => el.selected);
    if (found != undefined) {
        found.rotate += 90;
    }
}

function deleteElement() {
    let found = elements.find(el => el.selected);
    if (found != undefined) {
        let index = elements.findIndex(el => el == found);
        elements.splice(index, 1);
    }
}

function clearBoard() {
    elements = [];
}

function changeDimensions() {
    boardSize.width = parseFloat(widthIn.value()) * 10;
    boardSize.height = parseFloat(heightIn.value()) * 10;
    document.getElementsByTagName("body")[0].innerHTML = "";
    Canvas();
}

function fileImport(file) {
    file = file.data;
    boardSize = file["size"];
    elements = file["elements"];
    document.getElementsByTagName("body")[0].innerHTML = "";
    Canvas();
}

function download(text, name, type) {
    let boardInfo = {
        "size": boardSize,
        "elements": elements
    }

    document.getElementById("a").style.display = "block";

    boardInfo = JSON.stringify(boardInfo);

    var a = document.getElementById("a");
    var file = new Blob([boardInfo], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
}