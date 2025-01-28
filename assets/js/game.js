document.addEventListener('DOMContentLoaded', () => {
    // Declare DOM variables
    const wheelElement = document.querySelector('#wheel');
    const targets = document.querySelectorAll('.target');
    const knifeElement = document.querySelector('.knife-item');
    let stuckKnifes = [];

    // counter simple para puntuación al impactar en un target
    let score = 0;

    // Create the wheel, targets and knife instances
    const knife = new Knife(
        parseInt(knifeElement.style.left) || 0,
        parseInt(knifeElement.style.top) || 0
    );

    const wheel = new Wheel(
        wheelElement.offsetLeft + wheelElement.offsetWidth / 2, // centerX
        wheelElement.offsetTop + wheelElement.offsetHeight / 2, // centerY
        wheelElement.offsetWidth / 2 // radius
    );

    // Get static positions of the targets (they won't move now)
    const targetInstances = Array.from(targets).map((target, index) => {
        return new Target(target);
    });

    console.info('wheel:', wheel);
    console.info('knife:', knife);
    console.info('targets:', targetInstances);

    // Knife throw listener
    knifeElement.addEventListener("click", () => {
        console.info('cuchillo lanzado');
        knife.throwKnife(targetInstances, stuckKnifes);

        // Simulate knife throw
        const knifeRect = knifeElement.getBoundingClientRect();
        const knifeCenterX = knifeRect.left + knifeRect.width / 2;
        const knifeCenterY = knifeRect.top;

        targetInstances.forEach((target, index) => {
            const targetRect = target.targetElement.getBoundingClientRect();
            const targetCenterX = targetRect.left + targetRect.width / 2;
            const targetCenterY = targetRect.top + targetRect.height / 2;

            // Check if the knife has hit a target
            const distance = Math.sqrt(
                Math.pow(knifeCenterX - targetCenterX, 2) +
                Math.pow(knifeCenterY - targetCenterY, 2)
            );

            if (distance <= target.radius) {
                console.log('Target hit!');

                // Remove the knife and target from the DOM
                knifeElement.remove();
                target.targetElement.remove();

                targetInstances[index].markAsHit();
                score += 10;
                console.log('Puntuación:', score);
            }
        });


    });
    
});