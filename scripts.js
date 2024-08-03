document.addEventListener('DOMContentLoaded', function () {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const avisoForm = document.getElementById('avisoForm');

    if (avisoForm) {
        avisoForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const titulo = document.getElementById('titulo').value;
            const mensagem = document.getElementById('mensagem').value;
            const dataHora = new Date().toLocaleString();

            const novoAviso = { titulo, mensagem, dataHora };

            // Salvar aviso no localStorage
            const avisosSalvos = JSON.parse(localStorage.getItem('avisos')) || [];
            avisosSalvos.push(novoAviso);
            localStorage.setItem('avisos', JSON.stringify(avisosSalvos));

            // Adicionar aviso à página
            exibirAviso(novoAviso);

            // Limpar o formulário
            avisoForm.reset();
        });
    }

    function exibirAviso(aviso) {
        const avisosDiv = document.getElementById('avisos');
        const avisoElement = document.createElement('div');
        avisoElement.classList.add('aviso');
        avisoElement.innerHTML = `
            <h3>${aviso.titulo}</h3>
            <p>${aviso.mensagem}</p>
            <small>${aviso.dataHora}</small>
        `;
        if (isAdmin) {
            avisoElement.innerHTML += `
                <button onclick="editarAviso(this)">Editar</button>
                <button onclick="excluirAviso(this)">Excluir</button>
            `;
        }
        avisosDiv.prepend(avisoElement);
    }

    const avisosSalvos = JSON.parse(localStorage.getItem('avisos')) || [];
    avisosSalvos.forEach(aviso => {
        exibirAviso(aviso);
    });
});

window.editarAviso = function (elemento) {
    const avisoDiv = elemento.parentElement;
    const titulo = avisoDiv.querySelector('h3').innerText;
    const mensagem = avisoDiv.querySelector('p').innerText;

    document.getElementById('titulo').value = titulo;
    document.getElementById('mensagem').value = mensagem;

    excluirAviso(elemento); // Remove o aviso após edição para permitir reedição
};

window.excluirAviso = function (elemento) {
    console.log('Excluir Aviso');
    if (localStorage.getItem('isAdmin') !== 'true') {
        alert('Acesso não autorizado.');
        return;
    }

    const avisoDiv = elemento.parentElement;
    const titulo = avisoDiv.querySelector('h3').innerText;

    // Remover o aviso do localStorage
    const avisosSalvos = JSON.parse(localStorage.getItem('avisos')) || [];
    console.log('Avisos Salvos Antes da Exclusão:', avisosSalvos);
    const avisosAtualizados = avisosSalvos.filter(aviso => aviso.titulo !== titulo);
    console.log('Avisos Atualizados:', avisosAtualizados);
    localStorage.setItem('avisos', JSON.stringify(avisosAtualizados));

    // Remover o aviso do DOM
    avisoDiv.remove();
};
document.addEventListener('DOMContentLoaded', function () {
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
});


