import { Ferramenta } from "./Basicas.js";

// ---------------------------------------------
// Martelo com uso limitado (ex: pode ser usado 2 vezes)
export class MarteloDeProcissao extends Ferramenta {
	#usos;

	constructor() {
		super("martelo_de_procissao");
		this.#usos = 2;
	}

	usar() {
		if (this.#usos <= 0) {
			console.log("⚠️ O martelo está quebrado e não pode mais ser usado.");
			return false;
		}
		this.#usos--;
		console.log(`🔨 Martelo usado. Usos restantes: ${this.#usos}`);
		return true;
	}
}

// ---------------------------------------------
// Lanterna com energia limitada (3 usos)
export class LanternaDeSaoJose extends Ferramenta {
	#energia;

	constructor() {
		super("lanterna_de_sao_jose");
		this.#energia = 3;
	}

	usar() {
		if (this.#energia <= 0) {
			console.log("💡 A lanterna está sem energia.");
			return false;
		}
		this.#energia--;
		console.log(`💡 Lanterna usada. Energia restante: ${this.#energia}`);
		return true;
	}
}

// ---------------------------------------------
// Chave que só pode ser usada uma vez
export class ChaveDeBronze extends Ferramenta {
	#usada;

	constructor() {
		super("chave_de_bronze");
		this.#usada = false;
	}

	usar() {
		if (this.#usada) {
			console.log("🔑 A chave de bronze já foi usada.");
			return false;
		}
		this.#usada = true;
		console.log("🔑 A chave de bronze foi usada com sucesso.");
		return true;
	}
}
