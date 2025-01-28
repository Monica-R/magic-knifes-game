import { Target } from "./target";
export class Wheel {
    constructor (centerX, centerY, radius, speed) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.angle = 0;
        this.speed = speed; 
        this.direction = 1; // 1 for clockwise, -1 for counterclockwise
        //this.wheelElement = document.querySelector('.wheel');
    }

    rotateWheel() {
        // Rotate the wheel
        this.angle += this.speed * this.direction;
        // Limit the angle (0 to 360) or -180 to 180 if you prefer
        this.angle = this.angle >= 360 ? 0 : this.angle;
    }
    
    changeDirection() {
        // Change the direction of the wheel
        this.direction = Math.random() > 0.5 ? 1 : -1;
        console.log('Clase Wheel, dirección cambiada a ', this.direction);
    }

    checkCollision(knife) {
        // Check if the wheel has hit the knife
        const distance = Math.sqrt(
            Math.pow(knife.posKnifeX - this.centerX, 2) +
            Math.pow(knife.posKnifeY - this.centerY, 2)
        );
        return distance <= this.radius;
    }

    updateTargets(targets) {
        // Update the position of the targets
        for (const target of targets) {
            target.updatePosition(this.centerX, this.centerY, this.radius);
        }
    }
}