document.addEventListener('DOMContentLoaded', function () {
    // Sistema básico de autenticação
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Usuário e senha fixos para exemplo
            const adminUser = 'admin';
            const adminPass = '123456';

            if (username === adminUser && password === adminPass) {
                localStorage.setItem('isAdmin', 'true');
                window.location.href = 'avisos.html';
            } else {
                alert('Usuário ou senha incorretos');
            }
        });
    }

    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const avisosDiv = document.getElementById('avisos');

    if (avisosDiv) {
        const avisosSalvos = JSON.parse(localStorage.getItem('avisos')) || [];
        avisosSalvos.forEach(aviso => {
            exibirAviso(aviso.titulo, aviso.mensagem, aviso.dataHora);
        });

        // Função para exibir aviso e permitir edição/exclusão somente se for admin
        function exibirAviso(titulo, mensagem, dataHora = new Date().toLocaleString()) {
            const avisoElement = document.createElement('div');
            avisoElement.classList.add('aviso');
            avisoElement.innerHTML = `
                <h3>${titulo}</h3>
                <p>${mensagem}</p>
                <small>${dataHora}</small>
            `;
            if (isAdmin) {
                avisoElement.innerHTML += `
                    <button onclick="editarAviso(this)">Editar</button>
                    <button onclick="excluirAviso(this)">Excluir</button>
                `;
            }
            avisosDiv.prepend(avisoElement);
        }
    }
});

function editarAviso(elemento) {
    const avisoDiv = elemento.parentElement;
    const titulo = avisoDiv.querySelector('h3').innerText;
    const mensagem = avisoDiv.querySelector('p').innerText;

    document.getElementById('titulo').value = titulo;
    document.getElementById('mensagem').value = mensagem;

    excluirAviso(elemento);
}

function excluirAviso(elemento) {
    const avisoDiv = elemento.parentElement;
    const titulo = avisoDiv.querySelector('h3').innerText;

    // Remover o aviso do localStorage
    const avisosSalvos = JSON.parse(localStorage.getItem('avisos')) || [];
    const avisosAtualizados = avisosSalvos.filter(aviso => aviso.titulo !== titulo);
    localStorage.setItem('avisos', JSON.stringify(avisosAtualizados));

    // Remover o aviso do DOM
    avisoDiv.remove();
}

