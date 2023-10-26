
const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');

const $title = $('#title');
const $containerBtnFormOne = $('#containerBtnFormOne')
const $btnFormOne = $('#btnFormOne')
const $containerBtnFormTwo = $('#containerBtnFormTwo')
const $btnFormTwo = $('#btnFormTwo')
const $containerBtnFormThree = $('#containerBtnFormThree')
const $btnFormThree = $('#btnFormThree')
const $inputNome = $('#nome')
const $inputSobreome = $('#sobrenome')
const $inputDataNascimento = $('#dataNascimento')
const $inputEmail = $('#email')
const $inputMinibio = $('#minibio')
const $inputEndereco = $('#endereco')
const $inputComplemento = $('#complemento')
const $inputCidade = $('#cidade')
const $inputCep = $('#cep')
const $inputhabilidades = $('#habilidades')
const $inputpontosForte = $('#pontosForte')

let nomeValido = false;
let sobrenomenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;
let enderecoValido = false;
let cidadeValido = false;
let cepValido = false;
let habilidadesValido = false;
let pontosForteValido = false;

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

    $inputComplemento.keyup(function(){
        validaFormularioDois();
    });

    $inputCidade.keyup(function(){
        cidadeValido = validarInput(this, minLengthText);
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
    
}

function validaFormularioDois(){
    if(enderecoValido && cidadeValido && cepValido){
        $containerBtnFormTwo.removeClass('disabled');
        $btnFormTwo.removeClass('disabled');
        $btnFormTwo.off('click').on('click', iniciarFormularioTres)
        }else{
        $containerBtnFormTwo.addClass('disabled');
        $btnFormTwo.addClass('disabled');
        $btnFormTwo.off('click')
        }
}

function iniciarFormularioTres(){
    $stepText.text('Passo 3 de 3 - Fale sobre você');
    $stepDescription.text('Descreva suas habilidades.');
    $stepTwo.hide();
    $stepThree.show();
}

    $inputhabilidades.keyup(function(){
        habilidadesValido = validarInput(this, minLengthTextArea);
        validarFormularioTres();
    })

    $inputpontosForte.keyup(function(){
        pontosForteValido = validarInput(this, minLengthTextArea);
        validarFormularioTres();
    })

function validarFormularioTres(){
    if(habilidadesValido && pontosForteValido){
        $containerBtnFormThree.removeClass('disabled');
        $btnFormThree.removeClass('disabled');
        $btnFormThree.off('click').on('click', finalizarFormulario);
    }else{
        $containerBtnFormThree.addClass('disabled');
        $btnFormThree.addClass('disabled');
        $btnFormThree.off('click');
    }
}

function finalizarFormulario(){
    $stepThree.hide();
    $stepDescription.hide();
    $title.text('Inscrição realizada com sucesso!');
    $stepText.text('Agradecemos sua inscrição,entraremos em contato assim que possível, nosso prazo de análise é de cinco dias úteis.');
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