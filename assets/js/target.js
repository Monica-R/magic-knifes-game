class Target {
    constructor (targetElement) {
        this.targetElement = targetElement;
        this.isHit = false; // estado del target - boolean
    }

    markAsHit() {
        console.log('Target hit!');
        this.isHit = true;
        console.log(this.isHit);
        this.targetElement.style.visibility = 'hidden';
    }
}