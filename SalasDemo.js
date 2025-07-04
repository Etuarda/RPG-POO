// Salas adicionais e principais do jogo: A Baleia Azul de Valença do Piauí
import { validate } from "bycontract";
import { Sala, Engine } from "./Basicas.js";

// Importa os objetos que compõem as interações das salas
import {
	ImagemSaoBenedito,
	BauAntigo,
	ParedeComInscricao,
	PocoAntigo,
	CartaProfetica,
	FragmentoEstandarte
} from "./ObjetosDemo.js";

// Importa as ferramentas que serão encontradas nas salas
import {
	MarteloDeProcissao,
	LanternaDeSaoJose,
	ChaveDeBronze
} from "./FerramentasDemo.js";

// Função auxiliar para associar o engine aos objetos interativos
function prepararObjeto(objeto, engine) {
	objeto.engine = engine;
	return objeto;
}

// ------------------------ Rachaduras da Igreja ------------------------
export class RachadurasDaIgreja extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("Rachaduras_da_Igreja", engine);
	}
}

// ------------------------ Igreja de São Benedito ------------------------
export class IgrejaDeSaoBenedito extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("Igreja_de_Sao_Benedito", engine);

		const imagem = prepararObjeto(new ImagemSaoBenedito(), engine);
		this.objetos.set(imagem.nome, imagem);
	}

	usa(ferramenta, objeto) {
		validate(arguments, ["String", "String"]);
		if (!this.engine.mochila.tem(ferramenta) || !this.objetos.has(objeto)) return false;
		return this.objetos.get(objeto).usar(this.engine.mochila.pega(ferramenta));
	}
}

// ------------------------ Casa de Dona Ditosa ------------------------
export class CasaDeDonaDitosa extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("Casa_de_Dona_Ditosa", engine);

		const bau = prepararObjeto(new BauAntigo(), engine);
		this.objetos.set(bau.nome, bau);

		const martelo = new MarteloDeProcissao();
		this.ferramentas.set(martelo.nome, martelo);
	}

	usa(ferramenta, objeto) {
		validate(arguments, ["String", "String"]);
		if (!this.engine.mochila.tem(ferramenta) || !this.objetos.has(objeto)) return false;
		return this.objetos.get(objeto).usar(this.engine.mochila.pega(ferramenta));
	}
}

// ------------------------ Centro Histórico de Valença ------------------------
export class CentroHistoricoDeValenca extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("Centro_Historico_de_Valenca", engine);

		const parede = prepararObjeto(new ParedeComInscricao(), engine);
		this.objetos.set(parede.nome, parede);

		const lanterna = new LanternaDeSaoJose();
		this.ferramentas.set(lanterna.nome, lanterna);
	}

	usa(ferramenta, objeto) {
		validate(arguments, ["String", "String"]);
		if (!this.engine.mochila.tem(ferramenta) || !this.objetos.has(objeto)) return false;
		return this.objetos.get(objeto).usar(this.engine.mochila.pega(ferramenta));
	}
}

// ------------------------ Rio Caatinguinha ------------------------
export class RioCaatinguinha extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("Rio_Caatinguinha", engine);

		const poco = prepararObjeto(new PocoAntigo(), engine);
		this.objetos.set(poco.nome, poco);

		const chave = new ChaveDeBronze();
		this.ferramentas.set(chave.nome, chave);
	}

	usa(ferramenta, objeto) {
		validate(arguments, ["String", "String"]);
		if (!this.engine.mochila.tem(ferramenta) || !this.objetos.has(objeto)) return false;
		return this.objetos.get(objeto).usar(this.engine.mochila.pega(ferramenta));
	}
}

// ------------------------ Igreja de Nossa Senhora da Conceição ------------------------
export class IgrejaNossaSenhoraDaConceicao extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("Igreja_de_Nossa_Senhora_da_Conceicao", engine);
	}

	usa(ferramenta, objeto) {
		console.log("Você chegou à Igreja de Nossa Senhora da Conceição sem completar o ritual...");
		console.log("A terra treme. Um rugido ecoa pelas montanhas. A Baleia Azul despertou.");
		this.engine.indicaFimDeJogo();
		return true;
	}
}
