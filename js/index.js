
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
const $inputSobrenome = $('#sobrenome')
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

async function salvarNoTrello(){
    try{
        const nome = $inputNome.val();
        const sobrenome = $inputSobrenome.val();
        const email = $inputEmail.val();
        const dataNascimento = $inputDataNascimento.val();
        const minibio = $inputMinibio.val();
        const endereco = $inputEndereco.val();
        const complemento = $inputComplemento.val();
        const cidade = $inputCidade.val();
        const cep = $inputCep.val();
        const habilidades = $inputhabilidades.val();
        const pontosForte = $inputpontosForte.val();

        if(!nome || !sobrenome || !email || !dataNascimento || !endereco 
            || !cidade || !cep || !habilidades || !pontosForte){
                return alert('Favor preencher todos os dados obrigatorios para seguir.');
        }

        const body = {
            name: "Candidato - " + nome + " " + sobrenome,
            desc: `
                Seguem dados do candidato(a):
                -------------------- Dados Pessoais----------------
                Nome: ${nome}
                Sobrenome: ${sobrenome}
                Email: ${email}
                Data de nascimento: ${dataNascimento}
                Minibio: ${minibio}
                
                -------------------- Dados de endereço ----------------
                Endereço: ${endereco}
                Complemento: ${complemento}
                Cidade: ${cidade}
                Cep: ${dataNascimento}

                -------------------- Dados do candidato ----------------
                Habilidades: ${habilidades}
                Pontos Fortes: ${pontosForte}
                Cidade: ${cidade}
            `
        }

        await fetch('https://api.trello.com/1/cards?idList=653aa237d501bcd92e187def&key=e475c3e4e550962c5c1882e10db85fb7&token=ATTAa1300ae6109bd94a2d57e712f24dbcb153c33ccaf7049569f4daa5cc0dbc2e6bD60F0F85',{
            method: 'POST',
            headers:{ 
                    "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

            return finalizarFormulario();
        }catch(e){
        console.log('Ocorreu erro ao salvar no Trello:', e);
    }
}

function validarFormularioTres(){
    if(habilidadesValido && pontosForteValido){
        $containerBtnFormThree.removeClass('disabled');
        $btnFormThree.removeClass('disabled');
        $btnFormThree.off('click').on('click', salvarNoTrello);
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

    $inputSobrenome.keyup(function(){
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