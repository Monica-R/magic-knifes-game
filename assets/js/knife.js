class Knife {
    constructor (posKnifeX, posKnifeY) {
        this.posKnifeX = posKnifeX;
        this.posKnifeY = posKnifeY;
        this.isThrown = false; // estado del cuchillo - boolean

        // Get the knife element from the DOM
        this.knifeElement = document.createElement('div');
        this.knifeElement.className = 'knife';
        document.querySelector('.trigger-knife').appendChild(this.knifeElement);
        this.updateKnifePosition(); // Confident that the knifeElement exists in the DOM
    }


    updateKnifePosition() {
        this.knifeElement.style.left = `${this.posKnifeX}px`;
        this.knifeElement.style.top = `${this.posKnifeY}px`;
    }
    getKnifeCoords() {
        return {
            x: this.posKnifeX,
            y: this.posKnifeY  
        };
    }

    throwKnife(){
        if (this.isThrown) return; // The knife has been thrown
        
        this.isThrown = true;
        const moveUp = () => {
            this.posKnifeY -= 5; // Move the knife up
            this.updateKnifePosition(); // Changes the knife position in the DOM
            
            const collision = this.checkCollision(target, stuckKnifes);
            if (collision) {
                if (collision instanceof Target) {
                    collision.markAsHit();
                    score += 10;
                    console.log('Puntuación:', score);
                } else {
                    console.log('ha impactado en otro cuchillo y se ha detenido');
                }
                return; // The knife has hit a target or another knife
            }

            if (this.posKnifeY > 0) {
                requestAnimationFrame(moveUp); // Continue moving the knife up while it is inside the screen
            } else {
                this.isThrown = false; // The knife has reached the top of the screen
            }
        };
        moveUp();
    }
    
    checkCollision(target, stuckKnifes){
        if (this.posKnifeY < 0 ) return false; // The knife is out of the screen

        const targetRect = target.targetElement.getBoundingClientRect();
        const knifeRect = this.knifeElement.getBoundingClientRect();
        
        if (knifeRect.top < targetRect.bottom &&
            knifeRect.bottom > targetRect.top &&
            knifeRect.left < targetRect.right &&
            knifeRect.right > targetRect.left) 
            {
                return target; // The knife has hit the target
        }
        
        // Check if the knife has hit a stuck knife
        // stuckKnifes is a NodeList with all the stuck knifes
        for (const knife of stuckKnifes) {            
            const stuckKnifeRect = knife.knifeElement.getBoundingClientRect();
            if (knifeRect.top < stuckKnifeRect.bottom &&
                knifeRect.bottom > stuckKnifeRect.top &&
                knifeRect.left < stuckKnifeRect.right &&
                knifeRect.right > stuckKnifeRect.left) {
                    return knife; // The knife has hit a stuck knife
            }
        }

        return false; // The knife has not hit anything

        /**
         *         const knifeRect = this.knifeElement.getBoundingClientRect();

        // Collision with targets
        for (const target of targets) {
            const targetRect = target.targetElement.getBoundingClientRect();
            if (this.elementsOverlap(knifeRect, targetRect)) {
                return target;
            }
        }

        // Collision with other knives
        for (const stuckKnife of stuckKnifes) {
            const knifeRect = stuckKnife.knifeElement.getBoundingClientRect();
            if (this.elementsOverlap(knifeRect, knifeRect)) {
                return stuckKnife;
            }
        }

        return null;
         */
    }

    elementsOverlap (rect1, rect2) {
        return rect1.top < rect2.bottom &&
               rect1.bottom > rect2.top &&
               rect1.left < rect2.right &&
               rect1.right > rect2.left;
    }
    
}