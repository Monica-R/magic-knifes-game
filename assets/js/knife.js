class Knife {
    constructor(knifeElement) {
        this.knifeElement = knifeElement; // El cuchillo en el DOM
    }

    // Mantén el método animate
    animate(speed) {
        this.knifeElement.style.transition = `transform ${speed}s linear`;
        this.knifeElement.style.transform = 'translateY(-100vh)'; // Ejemplo de movimiento hacia arriba
    }

    throwKnife() {
        // Llama a animate para mover el cuchillo
        this.animate(1); // Ajusta la velocidad según necesites
    }
}