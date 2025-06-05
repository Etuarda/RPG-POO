import { validate } from "bycontract";
import promptsync from 'prompt-sync';
const prompt = promptsync({ sigint: true });

// Classe base para todas as ferramentas utilizadas pelo jogador
export class Ferramenta {
	#nome;

	constructor(nome) {
		validate(nome, "String"); // Verifica se o nome é uma string
		this.#nome = nome;
	}

	get nome() {
		return this.#nome; // Retorna o nome da ferramenta
	}

	usar() {
		// Método padrão que deve ser sobrescrito nas subclasses
		return true;
	}
}

// Classe que representa a mochila do jogador, com limite de armazenamento
export class Mochila {
	#ferramentas;
	#limite;

	constructor() {
		this.#ferramentas = []; // Lista de ferramentas armazenadas
		this.#limite = 3;       // Capacidade máxima da mochila
	}

	// Tenta guardar uma ferramenta na mochila
	guarda(ferramenta) {
		validate(ferramenta, Ferramenta);
		if (this.#ferramentas.length >= this.#limite) {
			console.log("A mochila está cheia! Use 'descarta <nome>' para liberar espaço.");
			return false;
		}
		this.#ferramentas.push(ferramenta);
		console.log(`${ferramenta.nome} foi guardado na mochila.`);
		return true;
	}

	// Remove uma ferramenta da mochila pelo nome
	descarta(nomeFerramenta) {
		validate(nomeFerramenta, "String");
		const index = this.#ferramentas.findIndex(f => f.nome === nomeFerramenta);
		if (index !== -1) {
			this.#ferramentas.splice(index, 1);
			console.log(`Você descartou: ${nomeFerramenta}`);
			return true;
		}
		console.log(`A ferramenta '${nomeFerramenta}' não está na mochila.`);
		return false;
	}

	// Retorna a ferramenta correspondente ao nome, se existir
	pega(nomeFerramenta) {
		validate(arguments, ["String"]);
		return this.#ferramentas.find(f => f.nome === nomeFerramenta);
	}

	// Verifica se a ferramenta está presente na mochila
	tem(nomeFerramenta) {
		validate(arguments, ["String"]);
		return this.#ferramentas.some(f => f.nome === nomeFerramenta);
	}

	// Retorna a lista de ferramentas da mochila
	inventario() {
		if (this.#ferramentas.length === 0) return "Mochila vazia.";
		return this.#ferramentas.map(obj => obj.nome).join(", ");
	}
}

// Classe base para os objetos interativos do jogo
export class Objeto {
	#nome;
	#descricaoAntesAcao;
	#descricaoDepoisAcao;
	#acaoOk;

	constructor(nome, descricaoAntesAcao, descricaoDepoisAcao) {
		validate(arguments, ["String", "String", "String"]);
		this.#nome = nome;
		this.#descricaoAntesAcao = descricaoAntesAcao;
		this.#descricaoDepoisAcao = descricaoDepoisAcao;
		this.#acaoOk = false;
	}

	get nome() {
		return this.#nome;
	}

	get acaoOk() {
		return this.#acaoOk;
	}

	set acaoOk(acaoOk) {
		validate(acaoOk, "Boolean");
		this.#acaoOk = acaoOk;
	}

	get descricao() {
		return this.#acaoOk ? this.#descricaoDepoisAcao : this.#descricaoAntesAcao;
	}

	usa(ferramenta, objeto) {
		// Deve ser sobrescrito pelas subclasses
	}
}

// Classe que representa uma sala no jogo, onde o jogador pode interagir
export class Sala {
	#nome;
	#objetos;
	#ferramentas;
	#portas;
	#engine;

	constructor(nome, engine) {
		validate(arguments, ["String", Engine]);
		this.#nome = nome;
		this.#objetos = new Map();     // Mapeamento de objetos presentes
		this.#ferramentas = new Map(); // Mapeamento de ferramentas presentes
		this.#portas = new Map();      // Mapeamento para outras salas conectadas
		this.#engine = engine;         // Referência ao controlador do jogo
	}

	get nome() {
		return this.#nome;
	}

	get objetos() {
		return this.#objetos;
	}

	get ferramentas() {
		return this.#ferramentas;
	}

	get portas() {
		return this.#portas;
	}

	get engine() {
		return this.#engine;
	}

	// Lista os objetos da sala com suas descrições
	objetosDisponiveis() {
		let arrObjs = [...this.#objetos.values()];
		return arrObjs.map(obj => obj.nome + ": " + obj.descricao);
	}

	// Lista as ferramentas disponíveis na sala
	ferramentasDisponiveis() {
		let arrFer = [...this.#ferramentas.values()];
		return arrFer.map(f => f.nome);
	}

	// Lista os nomes das salas conectadas
	portasDisponiveis() {
		let arrPortas = [...this.#portas.values()];
		return arrPortas.map(sala => sala.nome);
	}

	// Tenta guardar a ferramenta da sala na mochila
	pega(nomeFerramenta) {
		validate(nomeFerramenta, "String");
		let ferramenta = this.#ferramentas.get(nomeFerramenta);
		if (ferramenta != null) {
			return this.#engine.mochila.guarda(ferramenta) ? this.#ferramentas.delete(nomeFerramenta) : false;
		}
		return false;
	}

	// Retorna a sala correspondente ao nome fornecido
	sai(porta) {
		validate(porta, "String");
		return this.#portas.get(porta);
	}

	// Texto com a descrição geral da sala
	textoDescricao() {
		let descricao = `Você está no ${this.nome}\n`;
		descricao += this.objetos.size === 0 ? "Não há objetos na sala\n" : "Objetos: " + this.objetosDisponiveis() + "\n";
		descricao += this.ferramentas.size === 0 ? "Não há ferramentas na sala\n" : "Ferramentas: " + this.ferramentasDisponiveis() + "\n";
		descricao += "Portas: " + this.portasDisponiveis() + "\n";
		return descricao;
	}

	// Método padrão de uso, a ser sobrescrito nas subclasses
	usa(ferramenta, objeto) {
		return false;
	}
}

// Classe que controla o fluxo geral do jogo
export class Engine {
	#mochila;
	#salaCorrente;
	#fim;

	constructor() {
		this.#mochila = new Mochila();  // Instancia uma nova mochila
		this.#salaCorrente = null;      // Sala atual
		this.#fim = false;              // Indica se o jogo foi encerrado
		this.criaCenario();             // Monta o mapa do jogo (sobrescrito nas subclasses)
	}

	get mochila() {
		return this.#mochila;
	}

	get salaCorrente() {
		return this.#salaCorrente;
	}

	set salaCorrente(sala) {
		validate(sala, Sala);
		this.#salaCorrente = sala;
	}

	// Marca o jogo como encerrado
	indicaFimDeJogo() {
		this.#fim = true;
	}

	// Método que deve ser sobrescrito para montar o cenário do jogo
	criaCenario() { }

	// Laço principal do jogo (interpretador de comandos)
	joga() {
		let novaSala = null;
		let acao = "";
		let tokens = null;

		while (!this.#fim) {
			console.log("-------------------------");
			console.log(this.salaCorrente.textoDescricao());

			acao = prompt("O que você deseja fazer? ");
			tokens = acao.split(" ");

			switch (tokens[0]) {
				case "fim":
					this.#fim = true;
					break;
				case "pega":
					if (this.salaCorrente.pega(tokens[1])) {
						console.log("Ok! " + tokens[1] + " guardado!");
					} else {
						console.log("Objeto " + tokens[1] + " não encontrado ou mochila cheia.");
					}
					break;
				case "descarta":
					if (!tokens[1]) {
						console.log("Informe o nome da ferramenta para descartar.");
					} else {
						this.#mochila.descarta(tokens[1]);
					}
					break;
				case "inventario":
					console.log("Ferramentas disponíveis: " + this.#mochila.inventario());
					break;
				case "usa":
					if (this.salaCorrente.usa(tokens[1], tokens[2])) {
						console.log("Feito!!");
						if (this.#fim) {
							console.log("Parabéns, você venceu!");
						}
					} else {
						console.log("Não é possível usar " + tokens[1] + " sobre " + tokens[2] + " nesta sala");
					}
					break;
				case "sai":
					novaSala = this.salaCorrente.sai(tokens[1]);
					if (novaSala == null) {
						console.log("Sala desconhecida ...");
					} else {
						this.#salaCorrente = novaSala;
					}
					break;
				default:
					console.log("Comando desconhecido: " + tokens[0]);
					break;
			}
		}
		console.log("Jogo encerrado!");
	}
}
