export class Knife {
    constructor (posKnifeX, posKnifeY) {
        this.posKnifeX = posKnifeX;
        this.posKnifeY = posKnifeY;
        this.isThrown = false; // estado del cuchillo - boolean
    }

    getKnifeCoords() {
        return `Horizontal X position: ${this.posKnifeX}, vertical Y position: ${this.posKnifeY}`;
    }

    throwKnife(){}
    checkCollision(target){}
    
}