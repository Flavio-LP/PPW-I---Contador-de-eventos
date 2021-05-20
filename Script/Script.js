var url = 'https://projetofinal-ppw.herokuapp.com/api/110766';
var requisicao = fetch(url);
var btn = document.getElementById('enviar');
var lista = document.getElementById('lista');
var form = document.getElementById('form');
var deletar = document.getElementById('btn_deletar');
var a = 0;

var evento = function () {
    lista.innerHTML = "";

    var url = 'https://projetofinal-ppw.herokuapp.com/api/110766';
    var requisicao = fetch(url);

    var dado = requisicao.then(function (resposta) {
        return resposta.json();
    })

    dado.then(function (dado) {
        console.log(dado);
        for (i = 0; i < dado.length; i++) {
            var li = document.createElement("li");
            li.textContent = "Nome: " + dado[i].nome + "  Data: " + dado[i].data + "  Horário:" + dado[i].hora;
            lista.appendChild(li);
        }
    })
}

evento();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    var contador = {
        nome: form.querySelector("#nome").value,
        data: form.querySelector("#data").value,
        hora: form.querySelector("#hora").value
    }
    var postar = {
        method: 'POST',
        body: JSON.stringify(contador),
        headers: {
            'content-type': 'application/json'
        }

    }
    a++;

    document.querySelector("#cont").innerHTML = "Você possui " + a + " Evento(s) na sua lista.";

    var requisicao = fetch(url, postar);

    requisicao.then(function (resposta) {
        if (resposta.status == 200) {
            console.log("enviado");
            evento();
        }
    })

    deletar.addEventListener('click', function (e) {

        var deletando = {
            method: 'DELETE'
        }

        var requisicao = fetch(url, deletando);

        var dado = requisicao.then(function (e) {
            if (e.status == 200) {
                console.log("deletado");
                evento()
                a = 0;
                document.querySelector("#cont").innerHTML = "Você possui 0 Evento(s) na sua lista.";
            }
        })

    })
})