import { validate } from "bycontract";
import promptsync from 'prompt-sync';
const prompt = promptsync({ sigint: true });

// ---------------------------------------------
// Ferramenta base (pode ser estendida por subclasses)
export class Ferramenta {
	#nome;

	constructor(nome) {
		validate(nome, "String");
		this.#nome = nome;
	}

	get nome() {
		return this.#nome;
	}

	usar() {
		return true;
	}
}

// ---------------------------------------------
// Mochila com limite de 3 ferramentas e suporte a descarte
export class Mochila {
	#ferramentas;
	#limite;

	constructor() {
		this.#ferramentas = [];
		this.#limite = 3;
	}

	guarda(ferramenta) {
		validate(ferramenta, Ferramenta);
		if (this.#ferramentas.length >= this.#limite) {
			console.log("❌ A mochila está cheia! Use 'descarta <nome>' para liberar espaço.");
			return false;
		}
		this.#ferramentas.push(ferramenta);
		console.log(`✔️ ${ferramenta.nome} foi guardado na mochila.`);
		return true;
	}

	descarta(nomeFerramenta) {
		validate(nomeFerramenta, "String");
		const index = this.#ferramentas.findIndex(f => f.nome === nomeFerramenta);
		if (index !== -1) {
			this.#ferramentas.splice(index, 1);
			console.log(`🗑️ Você descartou: ${nomeFerramenta}`);
			return true;
		}
		console.log(`⚠️ A ferramenta '${nomeFerramenta}' não está na mochila.`);
		return false;
	}

	pega(nomeFerramenta) {
		validate(arguments, ["String"]);
		return this.#ferramentas.find(f => f.nome === nomeFerramenta);
	}

	tem(nomeFerramenta) {
		validate(arguments, ["String"]);
		return this.#ferramentas.some(f => f.nome === nomeFerramenta);
	}

	inventario() {
		if (this.#ferramentas.length === 0) return "📦 Mochila vazia.";
		return this.#ferramentas.map(obj => obj.nome).join(", ");
	}
}

// ---------------------------------------------
// Objeto genérico (pode ser estendido por objetos especiais)
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
		// Método sobrescrito nas subclasses
	}
}

// ---------------------------------------------
// Sala base (ambiente com objetos, ferramentas e conexões)
export class Sala {
	#nome;
	#objetos;
	#ferramentas;
	#portas;
	#engine;

	constructor(nome, engine) {
		validate(arguments, ["String", Engine]);
		this.#nome = nome;
		this.#objetos = new Map();
		this.#ferramentas = new Map();
		this.#portas = new Map();
		this.#engine = engine;
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

	objetosDisponiveis() {
		let arrObjs = [...this.#objetos.values()];
		return arrObjs.map(obj => obj.nome + ": " + obj.descricao);
	}

	ferramentasDisponiveis() {
		let arrFer = [...this.#ferramentas.values()];
		return arrFer.map(f => f.nome);
	}

	portasDisponiveis() {
		let arrPortas = [...this.#portas.values()];
		return arrPortas.map(sala => sala.nome);
	}

	pega(nomeFerramenta) {
		validate(nomeFerramenta, "String");
		let ferramenta = this.#ferramentas.get(nomeFerramenta);
		if (ferramenta != null) {
			return this.#engine.mochila.guarda(ferramenta) ? this.#ferramentas.delete(nomeFerramenta) : false;
		}
		return false;
	}

	sai(porta) {
		validate(porta, "String");
		return this.#portas.get(porta);
	}

	textoDescricao() {
		let descricao = `Você está no ${this.nome}\n`;
		descricao += this.objetos.size === 0 ? "Não há objetos na sala\n" : "Objetos: " + this.objetosDisponiveis() + "\n";
		descricao += this.ferramentas.size === 0 ? "Não há ferramentas na sala\n" : "Ferramentas: " + this.ferramentasDisponiveis() + "\n";
		descricao += "Portas: " + this.portasDisponiveis() + "\n";
		return descricao;
	}

	usa(ferramenta, objeto) {
		return false;
	}
}

// ---------------------------------------------
// Engine: controle central do jogo
export class Engine {
	#mochila;
	#salaCorrente;
	#fim;

	constructor() {
		this.#mochila = new Mochila();
		this.#salaCorrente = null;
		this.#fim = false;
		this.criaCenario();
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

	indicaFimDeJogo() {
		this.#fim = true;
	}

	criaCenario() {
		// Deve ser sobrescrito por subclasses (ex: JogoDemo)
	}

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
						console.log("⚠️ Informe o nome da ferramenta para descartar.");
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
