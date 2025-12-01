// Variáveis do jogo
let jogadorAtual = 'Santos'; // Define o jogador atual
let tabuleiro = ['', '', '', '', '', '', '', '', '']; // Tabuleiro vazio
let jogoAtivo = true; // Define que o jogo está ativo
let mensagem = document.getElementById('mensagem');
const tabuleiroElement = document.getElementById('tabuleiro');
const placarSantos = document.querySelector('.clube1 p');
const placarAtléticoMg = document.querySelector('.clube2 p');
let pontos = { Santos: 0, AtléticoMg: 0 };

const imagensClubes = {
    Santos: 'img/santos.png',
    AtléticoMg: 'img/Atlético Mineiro.png'
};

// Função para atualizar o tabuleiro
function atualizarTabuleiro() {
    tabuleiroElement.innerHTML = '';
    tabuleiro.forEach((celula, index) => {
        const div = document.createElement('div');
        div.classList.add('celula');
        
        if (celula) {
            const img = document.createElement('img');
            img.src = imagensClubes[celula];
            img.alt = celula;
            img.classList.add('imagem-clube');
            div.appendChild(img);
        }
        
        div.addEventListener('click', () => jogar(index));
        tabuleiroElement.appendChild(div);
    });
}

// Função para atualizar o placar
function atualizarPlacar() {
    placarSantos.textContent = pontos.Santos;
    placarAtléticoMg.textContent = pontos.AtléticoMg;
}

// Função para alternar jogadores
function alternarJogador() {
    jogadorAtual = jogadorAtual === 'Santos' ? 'AtléticoMg' : 'Santos';
    mensagem.textContent = `Vez do ${jogadorAtual}`;
}

// Função que executa a jogada
function jogar(index) {
    if (tabuleiro[index] !== '' || !jogoAtivo) {
        return;
    }
    
    tabuleiro[index] = jogadorAtual;
    atualizarTabuleiro();

    if (verificarVitoria()) {
        mensagem.textContent = `${jogadorAtual} venceu!`;
        pontos[jogadorAtual]++;
        atualizarPlacar();
        jogoAtivo = false;
    } else if (tabuleiro.every(celula => celula !== '')) {
        mensagem.textContent = 'Empate!';
        jogoAtivo = false;
    } else {
        alternarJogador();
    }
}

// Função para verificar vitória
function verificarVitoria() {
    const combinacoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return combinacoesVitoria.some(combinacao => {
        const [a, b, c] = combinacao;
        return tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c];
    });
}

// Função para reiniciar o jogo
document.getElementById('reiniciar').addEventListener('click', () => {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogoAtivo = true;
    mensagem.textContent = 'Vez do Atlético MG';
    atualizarTabuleiro();
});

// Inicializa o tabuleiro e o placar
atualizarTabuleiro();
atualizarPlacar();



document.getElementById('toggle-mode').addEventListener('click', function() {
    // Alterna as classes no body
    document.body.classList.toggle('modo-dia');
    document.body.classList.toggle('modo-noite');


    // Alterna as classes na barra de navegação
    document.querySelector('.barra-navegacao').classList.toggle('modo-dia');
    document.querySelector('.barra-navegacao').classList.toggle('modo-noite');


    document.querySelector('.tabuleiro-container').classList.toggle('modo-dia');
    document.querySelector('.tabuleiro-container').classList.toggle('modo-noite');



    document.querySelector('.placar-container').classList.toggle('modo-dia');
    document.querySelector('.placar-container').classList.toggle('modo-noite');

    
}
);

