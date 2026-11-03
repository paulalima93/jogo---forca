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
        
        // Joga o botão pronto lá pra dentro da tela!
        teclado.appendChild(btn); 
    });
}

function novoJogo() {
    // Sorteia um número aleatório do tamanho da nossa lista
    const index = Math.floor(Math.random() * listaPalavras.length);

    // Guarda a palavra e a dica sorteadas na memória do jogo
    palavraAtual = listaPalavras[index].palavra;
    dicaAtual = listaPalavras[index].dica; 

    // Testa no console pra ver se funcionou
    console.log("A palavra escolhida foi: " + palavraAtual);

    // Chama o criador de botões
    gerarTeclado();
}

//inicia o jogo
novoJogo();

