export function validaCampos(input) {
    const tipoInput = input.dataset.tipo;

    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    };

    if (input.validity.valid) {
        input.classList.remove('formcontato__input--invalid');
        input.parentElement.querySelector('.formcontato__message-error').innerHTML = '';
    } else {
        input.classList.add('formcontato__input--invalid');
        input.parentElement.querySelector('.formcontato__message-error').innerHTML = mostrarMensagemError(tipoInput, input);
    };
};

export function enabledBoton(inputs) {
    const boton = document.querySelector('.formcontato__botao');
    let camposValidos = 0;

    inputs.forEach(input => {
        if (input.validity.valid) {
            camposValidos++;
        };
    });

    if (camposValidos == 4) {
        boton.disabled = false;
        boton.classList.add('formcontato__botao--enabled')
    } else {
        boton.disabled = true;
        boton.classList.remove('formcontato__botao--enabled')
    }
};

const validadores = {
    mensagem: (input) => validarMensagem(input)
}

function validarMensagem(input) {
    const mensagem = input.value;
    let errorMensagem = '';

    if (mensagem.length > 0 && mensagem.trim() === '') {
        errorMensagem = 'o campo de mensagem está em branco.';
    }

    input.setCustomValidity(errorMensagem);
}

const tipoErrores = [
    'valueMissing',
    'patternMismatch',
    'typeMismatch',
    'customError',
];

const mensagemError = {
    nome: {
        valueMissing: 'O campo do nome não pode estar vazio.',
        patternMismatch: 'O campo nome tem espaços em branco.',
    },
    email: {
        valueMissing: 'O campo do email não pode estar vazio.',
        typeMismatch: 'O campo de email não é válido.',
    },
    asunto: {
        valueMissing: 'O campo do assunto não pode estar vazio.',
        patternMismatch: 'O campo de assunto tem espaços em branco.',
    },
    mensagem: {
        valueMissing: 'O campo de mensagem não pode estar vazio.',
        customError: 'O campo de mensagem tem espaços em branco.',
    },
};

function mostrarMensagemError(tipoInput, input) {
    let errorMensagem = '';

    tipoErrores.forEach((error) => {
        if (input.validity[error]) {
            errorMensagem = mensagemError[tipoInput][error];
        }
    });

    return errorMensagem;
};