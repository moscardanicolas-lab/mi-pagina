document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("boton-mensaje");
    const mensaje = document.getElementById("mensaje");

    boton.addEventListener("click", function () {
        mensaje.textContent = "¡Hola! Este mensaje viene desde JavaScript 😎";
    });
});
