document.addEventListener('DOMContentLoaded', () => {
    
    // Declare DOM variables
    const wheelElement = document.querySelector('#wheel');
    const knifeElement = document.querySelector('.knife-item');
    const uiAllKnifes = document.querySelectorAll('.knife');
    
    let stuckKnives = [];
    let remainingKnives = 7; //Cantidad inicial de cuchillos
    // counter simple para puntuación al impactar en un target
    let score = 0;
    
    
    // Create the wheel, targets and knife instances
    const wheel = new Wheel(wheelElement);
    const knife = new Knife(knifeElement);

    // Evento para lanzar el cuchillo
    document.addEventListener('click', () => {
        if (remainingKnives > 0) { // Usar el ratón
            console.info('cuchillo lanzado');
            knife.throwKnife();
            remainingKnives--;
            console.log(`Cuchillos restantes: ${remainingKnives}`);

            
        }

        const top = knife.knifeElement.getBoundingClientRect().top;
        if (top < 250 && top > 0) {
            
            // Stop actual animation (if proceed)
            // knife.knifeElement.style.transition = 'none';
            // knife.knifeElement.style.animation = 'none';
            
            // Set the knife on the wheel
            const currentTop = knife.knifeElement.offsetTop;
            knife.knifeElement.style.top = `${currentTop}px`;
            //knife.knifeElement.style.transform = 'none';
            knife.knifeElement.style.visibility = 'hidden';
            alert('YA HAS LLEGADO');
        }
    });


    console.info('wheel:', wheel);
    console.info('knife:', knife);


/*  Puntuación
    const updateScore = (points) => {
        score += points;
        console.info(`Puntuación: ${points}`);
    }
*/
});