import { validaCampos, enabledBoton } from "./validacion.js";

const inputs = document.querySelectorAll('[data-tipo]');

inputs.forEach(input => {
    input.addEventListener('blur', (input) => {
        validaCampos(input.target);
        enabledBoton(inputs);
    })
});