let boardSize = {
    width: 500,
    height: 300
}

let prop = 300 / 1598;
let addTalon, addRobo, addPDP, addBreaker, addVRM, addRadio;
let changeBoardSize, widthIn, heightIn;
let elements = [];
let pictures = {
    "pdp": "",
    "talon": "",
    "robo": "",
    "vrm": "",
    "radio": "",
    "breaker": ""
}

let sizes = {
    "pdp": {
        width: 1598 * prop,
        height: 1010 * prop
    },
    "robo": {
        width: 982 * prop,
        height: 966 * prop
    },
    "talon": {
        width: 204 * prop,
        height: 494 * prop
    },
    "vrm": {
        width: 341 * prop,
        height: 312 * prop
    },
    "radio": {
        width: 360 * prop,
        height: 480 * prop
    },
    "breaker": {
        width: 301 * prop,
        height: 454 * prop
    }
}

function preload() {
    pictures["pdp"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/pdp.png");
    pictures["radio"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/radio.png");
    pictures["talon"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/talon.png");
    pictures["vrm"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/vrm.png");
    pictures["robo"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/roborio.png");
    pictures["breaker"] = loadImage("https://raw.githubusercontent.com/MittyRobotics/tko-electronics-sim/master/assets/img/hardware/breaker.png");
}

function setup() {
    Canvas();
}

function draw() {
    background("#872dff");

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
            part.position.x = mouseX - part.width / 2;
            part.position.y = mouseY - part.height / 2;
        }
    }
}

function Canvas() {
    createCanvas(boardSize.width * 1598 * prop / 200, boardSize.height * 1598 * prop / 200);

    createButton("Add PDP").position(width + 10, 10).mousePressed(() => elements.push(new Part("pdp", 0, 0)))
    createButton("Add RoboRIO").position(width + 10, 40).mousePressed(() => elements.push(new Part("robo", 0, 0)))
    createButton("Add Talon SRX").position(width + 10, 70).mousePressed(() => elements.push(new Part("talon", 0, 0)))
    createButton("Add VRM").position(width + 10, 100).mousePressed(() => elements.push(new Part("vrm", 0, 0)))
    createButton("Add Radio").position(width + 10, 130).mousePressed(() => elements.push(new Part("radio", 0, 0)))
    createButton("Add Breaker").position(width + 10, 160).mousePressed(() => elements.push(new Part("breaker", 0, 0)))

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
}

function touchStarted() {
    if (mouseX < width && mouseY < height) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].selected = false;
            elements[i].selected = false;
        }
    }
    let found = elements.find(el => Math.abs(el.position.x + el.width / 2 - mouseX) <= 20 && Math.abs(el.position.y + el.height / 2 - mouseY) <= 20)
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

    console.log(found);
}

function touchEnded() {
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
        found.rotate += PI / 2;
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