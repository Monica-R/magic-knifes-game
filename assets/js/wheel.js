class Wheel {
    constructor (wheelElement) {
        this.wheelElement = wheelElement;
        this.isHit = false;
    }

    getCenter() {
        const rect = this.wheelElement.getBoundingClientRect();
        return{
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }

    markAsHit() {
        console.log('Wheel hit!');
        this.isHit = true;
    }
}