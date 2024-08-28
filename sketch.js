// Variáveis globais para armazenar os elementos de entrada e a recomendação
let campoClassificacao;
let camposGeneros = [];
let generosDisponiveis = ["Super-Herói", "Ação", "Terror", "Comédia", "Animação", "Família", "Drama"];
let recomendacao = ""; // Armazena a recomendação gerada

// Banco de dados de filmes categorizado por idade e gênero
let filmes = {
  "Livre": {
    "Animação": ["Shrek 2", "Toy Story", "Procurando Nemo"],
    "Família": ["Shrek 2", "O Rei Leão", "Frozen"]
  },
  "10": {
    "Super-Herói": ["Homem-Aranha: Através do Aranhaverso", "Os Incríveis", "Homem-Formiga"],
    "Animação": ["Homem-Aranha: Através do Aranhaverso", "Moana", "Zootopia"]
  },
  "12": {
    "Super-Herói": ["Vingadores: Ultimato", "Homem de Ferro", "Capitão América: O Primeiro Vingador"],
    "Ação": ["Vingadores: Ultimato", "Missão Impossível", "Transformers"]
  },
  "14": {
    "Terror": ["Invocação do Mal 3: A Ordem do Demônio", "Atividade Paranormal", "A Morte do Demônio"],
    "Suspense": ["A Órfã", "O Quarto do Pânico", "Corra!"]
  },
  "16": {
    "Super-Herói": ["Coringa", "Batman: O Cavaleiro das Trevas", "Watchmen"],
    "Drama": ["Coringa", "Clube da Luta", "O Lobo de Wall Street"]
  },
  "18": {
    "Super-Herói": ["Deadpool & Wolverine", "Logan", "Esquadrão Suicida"],
    "Comédia": ["Deadpool & Wolverine", "Ted", "Superbad: É Hoje"]
  }
};

function setup() {
  createCanvas(800, 400);

  // Cria um título para o programa
  createElement("h2", "Recomendador de Filmes");

  // Cria um campo de entrada para a classificação indicativa do usuário
  createSpan("Qual a classificação indicativa do filme? ");
  campoClassificacao = createInput();

  // Cria caixas de seleção para múltiplos gêneros
  createElement("br");
  createSpan("Escolha seus gêneros favoritos:");
  generosDisponiveis.forEach(genero => {
    let checkbox = createCheckbox(genero);
    camposGeneros.push(checkbox);
  });

  // Adiciona um botão para gerar a recomendação
  let botaoRecomendar = createButton('Recomendar Filme');
  botaoRecomendar.mousePressed(gerarRecomendacao);
}

function draw() {
  background("white");

  // Define as propriedades do texto e exibe a recomendação no centro do canvas
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(38);
  text(recomendacao, width / 2, height / 2);
}

function gerarRecomendacao() {
  let classificacao = campoClassificacao.value();
  let generosSelecionados = camposGeneros
    .filter(checkbox => checkbox.checked())
    .map(checkbox => checkbox.value());

  // Chama a função para gerar a recomendação de filme com base nas entradas
  recomendacao = obtemRecomendacao(classificacao, generosSelecionados);
}

function obtemRecomendacao(classificacao, generosSelecionados) {
  let faixaEtaria;

  // Define a faixa etária baseada na classificação indicativa
  if (classificacao === "Livre" || classificacao < 10) {
    faixaEtaria = "Livre";
  } else if (classificacao == 10) {
    faixaEtaria = "10";
  } else if (classificacao == 12) {
    faixaEtaria = "12";
  } else if (classificacao == 14) {
    faixaEtaria = "14";
  } else if (classificacao == 16) {
    faixaEtaria = "16";
  } else if (classificacao == 18) {
    faixaEtaria = "18";
  } else {
    return "Nenhum filme disponível para esta idade.";
  }

  // Filtra os filmes disponíveis para a faixa etária e os gêneros selecionados
  let filmesPossiveis = [];
  generosSelecionados.forEach(genero => {
    if (filmes[faixaEtaria] && filmes[faixaEtaria][genero]) {
      filmesPossiveis = filmesPossiveis.concat(filmes[faixaEtaria][genero]);
    }
  });

  // Se nenhum filme for encontrado, retorna uma mensagem padrão
  if (filmesPossiveis.length === 0) {
    return "Nenhum filme encontrado.";
  }

  // Escolhe um filme aleatório entre os disponíveis
  let filmeAleatorio = random(filmesPossiveis);
  return filmeAleatorio;
}
