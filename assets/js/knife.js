class Knife {
    constructor (knifeElement) {
        this.isThrown = false; // estado del cuchillo - boolean
        this.knifeElement = knifeElement;        
    }

    setInitialPosition() {
        const containerRect = document.querySelector('.trigger-knife').getBoundingClientRect();
        this.knifeElement.style.position = 'absolute';
        this.knifeElement.style.left = `${containerRect.width / 2 - this.knifeElement.offsetWidth / 2}px`;
        this.knifeElement.style.bottom = '0';
    }

    updateKnifePosition(y) {
        this.knifeElement.style.top = `-${y}px`;
    }

    throwKnife(targets, stuckKnifes){
        if (this.isThrown) return; // The knife has been thrown
        
        this.isThrown = true;
        const moveUp = () => {
            const rect = this.knifeElement.getBoundingClientRect();
            const newY = rect.top - 1; // Move the knife up
            this.updateKnifePosition(newY); // Changes the knife position in the DOM
            
            const collision = this.checkCollision(targets, stuckKnifes);
            if (collision) {
                if (collision instanceof Target) {
                    collision.markAsHit();
                } else {
                    console.log('ha impactado en otro cuchillo y se ha detenido');
                }
                return; // The knife has hit a target or another knife
            }

            if (newY > 0) {
                requestAnimationFrame(moveUp); // Continue moving the knife up while it is inside the screen
            } else {
                this.isThrown = false; // The knife has reached the top of the screen
            }
        };
        moveUp();
    }
    
    checkCollision(targets, stuckKnifes){
    const knifeRect = this.knifeElement.getBoundingClientRect();

    // Collision with targets
    for (const target of targets) {
        const targetRect = target.targetElement.getBoundingClientRect();
        if (this.elementsOverlap(knifeRect, targetRect)) {
            return target;
        }
    }

    // Collision with other knives
    for (const stuckKnife of stuckKnifes) {
        const stuckKnifeRect = stuckKnife.knifeElement.getBoundingClientRect();
        if (this.elementsOverlap(knifeRect, stuckKnifeRect)) {
            return stuckKnife;
        }
    }

    return null;
         
    }

    elementsOverlap (rect1, rect2) {
        return rect1.top < rect2.bottom &&
               rect1.bottom > rect2.top &&
               rect1.left < rect2.right &&
               rect1.right > rect2.left;
    }
    
}