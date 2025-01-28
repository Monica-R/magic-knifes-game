export class Target {
    constructor (posTargetX, posTargetY, angle, targetElement) {
        this.posTargetX = posTargetX;
        this.posTargetY = posTargetY;
        this.angle = angle; // ángulo de rotación del target - number
        this.isHit = false; // estado del target - boolean
        this.targetElement = targetElement;
    }
    
    getTargetCoords() {
        return {
            x: this.posTargetX,
            y: this.posTargetY
        }
    }
    
    updatePosition(wheelTargetX, wheelTargetY, radius){
        this.posTargetX = wheelTargetX + radius * Math.cos(this.angle);
        this.posTargetY = wheelTargetY + radius * Math.sin(this.angle);

        this.targetElement.style.left = `${this.posTargetX}px`;
        this.targetElement.style.top = `${this.posTargetY}px`;
    }

    markAsHit() {
        this.isHit = true;
    }
}