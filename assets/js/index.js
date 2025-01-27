console.log('Hola mundo!');

let angle = 0; //el ángulo del giro, empieza en 0
let angleRotateWheel = document.querySelector('.wheel'); 

function rotateWheel() {
    angle += 5;
    angleRotateWheel.style.transform = `rotate(${angle}deg)`;
    requestAnimationFrame(rotateWheel);
}

//rotateWheel();