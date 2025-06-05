import { Ferramenta } from "./Basicas.js";

// Classe MarteloDeProcissao
// Representa um martelo cerimonial com limite de 2 usos
export class MarteloDeProcissao extends Ferramenta {
	#usos;

	constructor() {
		super("martelo_de_procissao"); // Define o nome da ferramenta
		this.#usos = 2;                // Define o número máximo de usos
	}

	usar() {
		if (this.#usos <= 0) {
			console.log("O martelo está quebrado e não pode mais ser usado.");
			return false;
		}
		this.#usos--; // Reduz o número de usos restantes
		console.log(`Martelo usado. Usos restantes: ${this.#usos}`);
		return true;
	}
}

// Classe LanternaDeSaoJose
// Representa uma lanterna com energia limitada a 3 usos
export class LanternaDeSaoJose extends Ferramenta {
	#energia;

	constructor() {
		super("lanterna_de_sao_jose"); // Define o nome da ferramenta
		this.#energia = 3;             // Define a energia máxima (número de usos)
	}

	usar() {
		if (this.#energia <= 0) {
			console.log("A lanterna está sem energia.");
			return false;
		}
		this.#energia--; // Consome uma unidade de energia
		console.log(`Lanterna usada. Energia restante: ${this.#energia}`);
		return true;
	}
}

// Classe ChaveDeBronze
// Representa uma chave de uso único
export class ChaveDeBronze extends Ferramenta {
	#usada;

	constructor() {
		super("chave_de_bronze"); // Define o nome da ferramenta
		this.#usada = false;      // Indica se já foi usada
	}

	usar() {
		if (this.#usada) {
			console.log("A chave de bronze já foi usada.");
			return false;
		}
		this.#usada = true; // Marca como utilizada
		console.log("A chave de bronze foi usada com sucesso.");
		return true;
	}
}
