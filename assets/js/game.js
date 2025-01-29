document.addEventListener('DOMContentLoaded', () => {
    
    // Declare DOM variables
    const wheelElement = document.querySelector('#wheel');
    const targetElements = document.querySelectorAll('.target');
    const knifeElement = document.querySelector('.knife-item');
    const uiAllKnifes = document.querySelectorAll('.knife');
    
    let stuckKnives = [];
    let remainingKnives = 7; //Cantidad inicial de cuchillos
    // counter simple para puntuación al impactar en un target
    let score = 0;    
    
    
    // Create the wheel, targets and knife instances
    const knife = new Knife(knifeElement);
    const targets = Array.from(targetElements).map(target => new Target(target));
    const wheel = new Wheel(wheelElement);

        // Evento para lanzar el cuchillo
    document.addEventListener('click', () => {
        if (remainingKnives > 0) { // Usar el ratón
            console.info('cuchillo lanzado');
            knife.throwKnife(targets, stuckKnives);
            remainingKnives--;
            uiAllKnifes.pop();
            document.querySelector('.knife').remove();
            printUIKnives(uiAllKnifes);
            console.log(`Cuchillos restantes: ${remainingKnives}`);
        }

        function printUIKnives(arrayNodes) {
            const result = arrayNodes.map(item => {
                document.querySelector('.knifes').appendChild(item);
            });
        }
    });

    console.info('wheel:', wheel);
    console.info('knife:', knife);
    console.info('wheel', wheel)


/*     //Puntuación
    const updateScore = (points) => {
        score += points;
        console.info(`Puntuación: ${points}`);
    }

    // Knife throw listener
    knifeElement.addEventListener("click", () => {
        if (remainingKnifes <= 0) {
            console.warn("No quedan cuchillos disponibles");
            return;
        }
        console.info('cuchillo lanzado');

        const idKnife = setInterval(() => {
            const collision = knife.checkCollision(targets, stuckKnifes);
            if (collision) {
                if (collision instanceof Target) {
                    collision.markAsHit();
                    updateScore(10); // Aumentar puntuación
                    clearIntervalKnife(idKnife);
                    console.log('¡Target impactado!');
                } else {
                    console.log('El cuchillo se ha clavado en otro cuchillo');
                }
                // Agregar cuchillo a los stuckKnifes si no ha salido de la pantalla
                stuckKnifes.push(knife);
            }
    
            // Reducir número de cuchillos restantes
            remainingKnifes--;
            console.log(`Cuchillos restantes: ${remainingKnifes}`);
        }, 1000);

    });

    function clearIntervalKnife(idIntervalKnife) {
        clearInterval(idIntervalKnife);
    }
     */
});