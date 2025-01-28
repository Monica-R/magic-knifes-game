export class Knife {
    constructor (posKnifeX, posKnifeY) {
        this.posKnifeX = posKnifeX;
        this.posKnifeY = posKnifeY;
        this.isThrown = false; // estado del cuchillo - boolean

        // Get the knife element from the DOM
        this.knifeElement = document.querySelector('#knife');
    }

    getKnifeCoords() {
        return `Horizontal X position: ${this.posKnifeX}, vertical Y position: ${this.posKnifeY}`;
    }

    throwKnife(){
        this.posKnifeY -= 5; // Move the knife up
        this.isThrown = true;
    }
    
    checkCollision(target, stuckKnifes){
        if (this.posKnifeY < 0 ) return false; // The knife is out of the screen

        const targetRect = target.getBoundingClientRect();
        const knifeRect = this.knifeElement.getBoundingClientRect();
        
        if (knifeRect.top < targetRect.bottom &&
            knifeRect.bottom > targetRect.top &&
            knifeRect.left < targetRect.right &&
            knifeRect.right > targetRect.left) {
                return target; // The knife has hit the target
        }
        
        // Check if the knife has hit a stuck knife
        // stuckKnifes is a NodeList with all the stuck knifes
        stuckKnifes.forEach(knife => {
            const stuckKnifeRect = knife.getBoundingClientRect();
            if (knifeRect.top < stuckKnifeRect.bottom &&
                knifeRect.bottom > stuckKnifeRect.top &&
                knifeRect.left < stuckKnifeRect.right &&
                knifeRect.right > stuckKnifeRect.left) {
                    return knife; // The knife has hit a stuck knife
            }
        });

        return false; // The knife has not hit anything
    }
    
}