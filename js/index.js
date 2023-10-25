
const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');


const $inputNome = $('#nome')
const $containerBtnFormOne = $('#containerBtnFormOne')
const $btnFormOne = $('#btnFormOne')
const $containerBtnFormTwo = $('#containerBtnFormTwo')
const $btnFormTwo = $('#btnFormTwo')
const $inputSobreome = $('#sobrenome')
const $inputDataNascimento = $('#dataNascimento')
const $inputEmail = $('#email')
const $inputMinibio = $('#minibio')
const $inputEndereco = $('#endereco')
const $inputComplemento = $('#Complemento')
const $inputCidade = $('#cidade')
const $inputCep = $('#cep')

let nomeValido = false;
let sobrenomenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;
let enderecoValido = false;
let cidadeValido = false;
let cepValido = false;

const minLengthText = 2;
const minLengthTextArea = 10;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/

function validarInput(element, minLength, maxLenght, regex) {
    const closest = $(element).closest('.input-data');
        if(!element.value 
            || (minLength && element.value.trim().length < minLength)
            || (maxLenght && element.value.trim().length > maxLenght)
            || (regex && !element.value.toLowerCase().match(regex))
            ) {
             closest.addClass('error');
             return false;
    }
    closest.removeClass('error');
    return true;

}

function validaFormularioum(){
    if(nomeValido && sobrenomenomeValido && emailValido && dataNascimentoValido){
        $containerBtnFormOne.removeClass('disabled');
        $btnFormOne.removeClass('disabled');
        $btnFormOne.off('click').on('click', iniciarFormulario2);
    }else{
        $containerBtnFormOne.addClass('disabled');
        $btnFormOne.addClass('disabled');
        $btnFormOne.off('click');
    }
    
}

function iniciarFormulario2(){
    $stepText.text('Passo 2 de 3 - Dados de correspondência');
    $stepDescription.text('Precisamos desses dados para que possamos entrar em contato.');
    $stepOne.hide();
    $stepTwo.show();
    $stepThree.hide();

    $inputEndereco.keyup(function(){
        enderecoValido = validarInput(this, minLengthTextArea);
        validaFormularioDois();
    });

    $inputCidade.keyup(function(){
        cidadeValidoValido = validarInput(this, minLengthText);
        validaFormularioDois();
    });

    $inputCep.keyup(function(){
        this.value = this.value.replace(/\D/g,'');
        cepValido = validarInput(this, null, null, cepRegex);
        if(cepValido){
            this.value = this.value.replace(cepRegex, "$1.$2-$3");
        }
        validaFormularioDois();
    })

    $inputComplemento.keyup(function(){
        validaFormularioDois();
    })
}

function validaFormularioDois(){
    if(enderecoValido && cidadeValido && cepValido){
        $containerBtnFormTwo.removeClass('disabled');
        $btnFormTwo.removeClass('disabled');
    }else{
        $containerBtnFormTwo.addClass('disabled');
        $btnFormTwo.addClass('disabled');
        }
}

function init(){
    $stepText.text('Passo 1 de 3 - Dados pessoais');
    $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor.');
    $stepTwo.hide();
    $stepThree.hide();

    $inputNome.keyup(function(){
      nomeValido = validarInput(this, minLengthText);
      validaFormularioum();
    });

    $inputSobreome.keyup(function(){
        sobrenomenomeValido = validarInput(this, minLengthText);
        validaFormularioum();
    });
    
    $inputDataNascimento.keyup(function(){
        dataNascimentoValido = validarInput(this, minLengthText);
        validaFormularioum();
    });

    $inputDataNascimento.change(function(){
       dataNascimentoValido = validarInput(this, minLengthText);
       validaFormularioum();
    });

    $inputEmail.keyup(function(){
       emailValido = validarInput(this, null, null, emailRegex);
       validaFormularioum();
    });

    $inputMinibio.keyup(function () {
        validaFormularioum();
    });
    $inputDataNascimento.on('focus', function(){
        this.type = 'date';
    });

    $inputDataNascimento.on('blur', function (){
        if(!this.value){
            this.type = 'text';
        }
    })

}
        
init();