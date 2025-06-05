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

// ------------------------ Igreja de São Benedito ------------------------
// Sala inicial onde está a imagem que encerra o jogo com vitória
export class IgrejaDeSaoBenedito extends Sala {
	constructor(engine) {
		validate(engine, Engine);
		super("Igreja_de_Sao_Benedito", engine);

		const imagem = prepararObjeto(new ImagemSaoBenedito(), engine);
		this.objetos.set(imagem.nome, imagem);
	}

	// Permite usar uma ferramenta sobre um objeto da sala
	usa(ferramenta, objeto) {
		validate(arguments, ["String", "String"]);
		if (!this.engine.mochila.tem(ferramenta) || !this.objetos.has(objeto)) return false;
		return this.objetos.get(objeto).usar(this.engine.mochila.pega(ferramenta));
	}
}

// ------------------------ Casa de Dona Ditosa ------------------------
// Sala onde se encontra o baú antigo e o martelo de procissão
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
// Sala com uma parede inscrita e a lanterna que a revela
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
// Sala com o poço perigoso e a chave de bronze
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
