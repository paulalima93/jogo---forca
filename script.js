let palavraAtual = "";
let dicaAtual = "";
let letrasCertas = []; // Uma lista vazia para guardar os acertos
let vidas = 6;


function gerarTeclado() {
    // Acha o lugar no HTML onde os botões vão entrar
    const teclado = document.getElementById("teclado");
    
    // As letras para fabricar os botões
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Corta o alfabeto em letras soltas e passa por cada uma
    alfabeto.split("").forEach(letra => {
        
        // Cria um botão novinho do zero
        const btn = document.createElement("button");
        
        // Cola a letra atual dentro desse botão
        btn.innerText = letra;
        
        // Dá o id único e aplica a classe
        btn.id = "btn-" + letra;
        btn.classList.add('btn-teclado'); 

        // Quando clicar, aciona a função passando 
        // a letra deste botão como parâmetro
        btn.onclick = () => verificarChute(letra);
        
        // Joga o botão pronto lá pra dentro da tela!
        teclado.appendChild(btn); 
    });
}

function novoJogo() {
    // Reset do Estado
    vidas = 6; 
    document.getElementById("vidas-texto").innerText = "Vidas: " + vidas; 
    document.getElementById("mensagem_final").innerText = ""; 
    
    // Reseta a área da dica (Esconde o texto e traz o botão de volta)
    document.getElementById("dica").innerText = ""; 
    document.getElementById("dica").style.display = "none";
    document.getElementById("botao-dica").style.display = "inline-block";
    
    // Destrói os 26 botões antigos limpando o HTML da div
    document.getElementById("teclado").innerHTML = "";

    // Sorteia um número aleatório do tamanho da nossa lista
    const index = Math.floor(Math.random() * listaPalavras.length);

    // Guarda a palavra e a dica sorteadas na memória do jogo
    palavraAtual = listaPalavras[index].palavra;
    dicaAtual = listaPalavras[index].dica; 

    // Testa no console pra ver se funcionou
    //console.log("A palavra escolhida foi: " + palavraAtual);

    // Chama o criador de botões
    gerarTeclado();

    // Zera a lista de acertos toda vez que começar um jogo novo
    letrasCertas = []; 

    // Manda desenhar os tracinhos logo de cara!
    atualizarTela();
}


function atualizarTela() {
    // Busca a div vazia lá do HTML
    const divPalavra = document.getElementById("palavra-secreta");

    // Aqui o .split vai fatiar
    let display = palavraAtual.split("").map(letra => {
        // Se a letra já está na nossa lista de acertos, mostramos ela.
        // Se não, mostramos o tracinho.
        if (letrasCertas.includes(letra)) {
            return letra;
        } else {
            return "_";
        }
    }).join(" "); // Junta tudo colocando um espaço entre os tracinhos

    // Escreve o resultado na tela
    divPalavra.innerText = display;
}

function verificarChute(letraClicada) {
    // encontra o botão que foi clicado usando o ID
    const botao = document.getElementById("btn-" + letraClicada);

    // desativa o botão para o jogador não clicar de novo
    botao.disabled = true;

    // a letra existe na palavra?
    if (palavraAtual.includes(letraClicada)) {
        // ACERTOU: Adiciona na lista de acertos e pinta de verde
        letrasCertas.push(letraClicada);
        botao.style.backgroundColor = "#22c55e";
    } else {
        // ERROU: Perde uma vida e pinta de vermelho
        vidas--;
        botao.style.backgroundColor = "#ef4444"; 
        // Atualiza o texto do placar lá no HTML
        document.getElementById("vidas-texto").innerText = "Vidas: " + vidas;
    }

    // Como algo mudou, atualiza os tracinhos da tela
    atualizarTela();

    checarFimDeJogo();
}

function checarFimDeJogo() {
    const display = document.getElementById("palavra-secreta").innerText;
    const mensagem = document.getElementById("mensagem_final");

    if (vidas === 0) {
        // Derrota: mostra a mensagem e a palavra que estava escondida
        mensagem.innerText = "Game Over! A palavra era: " + palavraAtual;
        travarTeclado();

    } else if (display.includes("_") === false) {
        // Vitória: se NÃO TEM tracinho no display, o jogador ganhou
        mensagem.innerText = "Parabéns! Você adivinhou a palavra!";
        travarTeclado();
    }
}

function travarTeclado() {
    // pega todos os botões que têm a classe 'btn-teclado'
    const botoes = document.querySelectorAll(".btn-teclado");
    
    // passa por cada um deles e desativa
    botoes.forEach(botao => {
        botao.disabled = true;
    });
}


document.addEventListener("keydown", (evento) => {
    // captura a tecla que o jogador apertou e transforma em MAIÚSCULA
    const teclaPressionada = evento.key.toUpperCase();
    
    // define quais teclas são válidas 
    // (evita que o jogo tente ler "Enter" ou números)
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // É uma letra válida do alfabeto?
    if (alfabeto.includes(teclaPressionada)) {
        
        // Busca o botão dessa letra lá no HTML usando o ID
        const botao = document.getElementById("btn-" + teclaPressionada);

        // O botão ainda está ativo? (O jogador não chutou essa letra antes?)
        if (botao.disabled === false) {
            
            // Simula o clique acionando a nossa função principal
            verificarChute(teclaPressionada);
        }
    }
});

function mostrarDica() {
    const dica = document.getElementById('dica');
    const botao_dica = document.getElementById('botao-dica');

    dica.innerText = "Dica: " + dicaAtual;
    dica.style.display = 'block'; // Mostra o texto
    botao_dica.style.display = 'none'; // Esconde o botão
}

// Ligando os cliques aos botões correspondentes:
document.getElementById("botao-dica").onclick = mostrarDica;
document.getElementById("btn-reiniciar").onclick = novoJogo;

//inicia o jogo
novoJogo();

