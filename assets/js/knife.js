class Knife {
    constructor(knifeElement, wheelInstance) {
        this.isThrown = false;
        this.knifeElement = knifeElement;
        this.animationStartTime = null;
        this.initialY = null;
        this.wheel = wheelInstance;
        this.wheelElement = document.querySelector('#wheel');
    }

    setInitialPosition() {
        const containerRect = document.querySelector('.trigger-knife').getBoundingClientRect();
        this.knifeElement.style.position = 'absolute';
        this.knifeElement.style.bottom = '0';
    }

    throwKnife(targets, stuckKnives) {
        if (this.isThrown) return;
        
        this.isThrown = true;
        this.initialY = this.knifeElement.getBoundingClientRect().top;
        this.animationStartTime = performance.now();
        
        this.animate(targets, stuckKnives);
    }
    animate(targets, stuckKnives) {
        const duration = 500; // Duración de la animación en ms
        const startPosition = this.knifeElement.offsetTop; // Posición inicial
        const endPosition = -this.knifeElement.offsetHeight; // Fuera del viewport superior
        const currentTime = performance.now();
        const elapsedTime = currentTime - this.animationStartTime;
    
        // Calculamos el progreso de la animación (0 a 1)
        let progress = Math.min(elapsedTime / duration, 1);
    
        // Aplicamos una función de easing para suavizar el movimiento (opcional)
        progress = 1 - Math.pow(1 - progress, 2);
    
        // Calculamos la nueva posición
        const newPosition = startPosition - (startPosition - endPosition) * progress;
        this.knifeElement.style.top = `${newPosition}px`;
    
        // Verificamos colisiones
        const collision = this.checkCollision(targets, stuckKnives);
        console.log('collision:', collision);
        if (collision) {
            console.log('aquiiii')
            this.handleCollision(collision, stuckKnives);
            return;
        }
    
        // Continuamos la animación si no ha terminado
        if (progress < 1) {
            requestAnimationFrame(() => this.animate(targets, stuckKnives));
        } else {
            this.reset();
        }
    }
    

    checkCollision(targets, stuckKnives) {
        const knifeRect = this.knifeElement.getBoundingClientRect();
        //console.info('knife rect:', knifeRect);
        
        // Verificar colisión con la rueda
        const wheelRect = this.wheel.wheelElement.getBoundingClientRect();
        //console.log('wheelRect:', wheelRect);

        console.log('esto es...', this.elementsOverlap(knifeRect, wheelRect));
        if (this.elementsOverlap(knifeRect, wheelRect)) {
            return this.wheel;
        }

        // Verificar colisión con targets
        for (const target of targets) {
            const targetRect = target.targetElement.getBoundingClientRect();
            if (this.elementsOverlap(knifeRect, targetRect)) {
                return target;
            }
        }

        // Verificar colisión con otros cuchillos
        for (const stuckKnife of stuckKnives) {
            const stuckKnifeRect = stuckKnife.knifeElement.getBoundingClientRect();
            if (this.elementsOverlap(knifeRect, stuckKnifeRect)) {
                return stuckKnife;
            }
        }

        return null;
    }

    handleCollision(collision, stuckKnives) {
        console.info('Collision detectada con:', collision.constructor.name);
        if (collision instanceof Wheel) {
            collision.markAsHit();
            // Crear copia del cuchillo
            const stuckKnife = this.knifeElement.cloneNode(true);
            
            // Obtener posición relativa a la rueda
            const wheelRect = this.wheelElement.getBoundingClientRect();
            const knifeRect = this.knifeElement.getBoundingClientRect();
            
            // Calcular posición del cuchillo respecto a la rueda
            const relativeX = knifeRect.left - wheelRect.left;
            const relativeY = knifeRect.top - wheelRect.top;
            
            // Configurar el cuchillo clavado
            stuckKnife.style.position = 'absolute';
            stuckKnife.style.left = `${relativeX}px`;
            stuckKnife.style.top = `${relativeY}px`;
            
            // Añadir el cuchillo a la rueda
            this.wheelElement.appendChild(stuckKnife);
            stuckKnives.push({ knifeElement: stuckKnife });
            
            return;

        } else if (collision instanceof Target) {
            collision.markAsHit();
        }
    }

    elementsOverlap(rect1, rect2) {
        console.info('rect1:', rect1.top);
        console.info('rect2:', rect2.bottom);
        console.log(rect1.top < rect2.bottom);
    }

    reset() {
        this.isThrown = false;
        this.setInitialPosition();
    }
}