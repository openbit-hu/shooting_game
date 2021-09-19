//let shipX: number = 2;
//let targetX: number = 0;
//let bulletX: number = 0;
let point: number = 0;
let fail: number = 0;
let resulting: number = 0;
class Ship {
    x: number
    constructor() {
        this.x = 2
    }
    stepRight() {
        led.unplot(this.x, 4);
        this.x += 1;
        led.plot(this.x, 4);
    }
    stepLeft() {
        led.unplot(this.x, 4);
        this.x -= 1;
        led.plot(this.x, 4);
    }
}

class Target {
    x: number
    ship: Ship
    constructor(shp: Ship) {
        this.x = 0
        this.ship = shp
    }
    targetForever() {
        while (fail != 3) {
            basic.clearScreen();
            led.plot(ship.x, 4);
            resulting = 1;
            this.x = randint(0, 4);
            led.plot(this.x, 0);
            while (resulting == 1) {
                basic.pause(1000);
            }
        }
        basic.showNumber(point);
    }
}
class Bullet {
    x: number
    ship: Ship
    target: Target
    constructor(shp: Ship, trgt: Target) {
        this.x = 0;
        this.ship = shp;
        this.target = trgt;
    }
    shoot() {
        this.x = ship.x;
        for (let i = 3; i > 0; i--) {
            led.plot(this.x, i);
            basic.pause(100);
            led.plot(this.x, i);
        }
        bullet.resulting();
    }
    resulting() {
        if (target.x == this.x) {
            point += 1;
            basic.clearScreen();
            basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
        } else {
            fail += 1;
            basic.clearScreen();
            basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        }
        basic.pause(100);
        resulting = 0;
    }
}
let ship = new Ship;
let target = new Target(ship);
let bullet = new Bullet(ship, target);
led.plot(ship.x, 4);
basic.forever(function () {
    target.targetForever();
})
input.onButtonPressed(Button.A, function () {
    if (ship.x != 0) {
        ship.stepLeft();
    }
})
input.onButtonPressed(Button.B, function () {
    if (ship.x != 4) {
        ship.stepRight();
    }
})
input.onButtonPressed(Button.AB, function () {
    bullet.shoot();
})