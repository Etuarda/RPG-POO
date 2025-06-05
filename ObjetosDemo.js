import { validate } from "bycontract";
import { Objeto, Ferramenta } from "./Basicas.js";
import { MarteloDeProcissao, LanternaDeSaoJose, ChaveDeBronze } from "./FerramentasDemo.js";

// ---------------------------------------------
export class ImagemSaoBenedito extends Objeto {
	constructor() {
		super(
			"imagem_sao_benedito",
			"A imagem de São Benedito observa tudo em silêncio.",
			"Um brilho emana da imagem... o ritual foi completado!"
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		if (ferramenta instanceof ChaveDeBronze && ferramenta.usar()) {
			this.acaoOk = true;
			this.engine.indicaFimDeJogo();
			return true;
		}
		return false;
	}
}

// ---------------------------------------------
export class BauAntigo extends Objeto {
	constructor() {
		super(
			"bau_antigo",
			"Um baú antigo e trancado com símbolos religiosos.",
			"O baú está aberto. Dentro estavam uma carta e um fragmento de estandarte."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		if (ferramenta instanceof MarteloDeProcissao && ferramenta.usar()) {
			this.acaoOk = true;
			this.engine.salaCorrente.objetos.set("fragmento_estandarte", new FragmentoEstandarte());
			this.engine.salaCorrente.objetos.set("carta_profetica", new CartaProfetica());
			return true;
		}
		return false;
	}
}

// ---------------------------------------------
export class ParedeComInscricao extends Objeto {
	constructor() {
		super(
			"parede_com_inscricao",
			"Há uma inscrição antiga, mas está ilegível no escuro.",
			"A luz revela: 'A fé conduz ao selamento eterno da Baleia.'"
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		if (ferramenta instanceof LanternaDeSaoJose && ferramenta.usar()) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}

// ---------------------------------------------
export class PocoAntigo extends Objeto {
	constructor() {
		super(
			"poco_antigo",
			"Um poço fundo com marcas de garras nas pedras.",
			"Você ouve um rugido profundo... algo foi despertado."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		console.log("💀 O uso imprudente acordou a Baleia Azul. Valença pereceu.");
		this.engine.indicaFimDeJogo();
		return true;
	}
}

// ---------------------------------------------
export class CartaProfetica extends Objeto {
	constructor() {
		super(
			"carta_profetica",
			"Uma carta antiga com caligrafia tremida.",
			"A carta profética ecoa: 'Enquanto houver fé, a baleia dorme.'"
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}

// ---------------------------------------------
export class FragmentoEstandarte extends Objeto {
	constructor() {
		super(
			"fragmento_estandarte",
			"Um pedaço do estandarte cerimonial.",
			"Você segura o fragmento. Um símbolo de fé antiga, mas nada acontece."
		);
	}

	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}
