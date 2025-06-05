import { validate } from "bycontract";
import { Objeto, Ferramenta } from "./Basicas.js";
import { MarteloDeProcissao, LanternaDeSaoJose, ChaveDeBronze } from "./FerramentasDemo.js";



// Representa o objeto que finaliza o jogo com vitória ao ser ativado corretamente
export class ImagemSaoBenedito extends Objeto {
	constructor() {
		super(
			"imagem_sao_benedito",
			"A imagem de São Benedito observa tudo em silêncio.",
			"Um brilho emana da imagem... o ritual foi completado!"
		);
	}

	// Só pode ser ativada com a Chave de Bronze
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

// Representa um baú trancado que revela novos objetos quando aberto com o martelo
export class BauAntigo extends Objeto {
	constructor() {
		super(
			"bau_antigo",
			"Um baú antigo e trancado com símbolos religiosos.",
			"O baú está aberto. Dentro estavam uma carta e um fragmento de estandarte."
		);
	}

	// Ao usar o martelo, revela dois novos objetos simbólicos na sala
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

// Objeto que revela uma inscrição oculta quando iluminado pela lanterna
export class ParedeComInscricao extends Objeto {
	constructor() {
		super(
			"parede_com_inscricao",
			"Há uma inscrição antiga, mas está ilegível no escuro.",
			"A luz revela: 'A fé conduz ao selamento eterno da Baleia.'"
		);
	}

	// A lanterna ativa o texto oculto
	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		if (ferramenta instanceof LanternaDeSaoJose && ferramenta.usar()) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}

// Representa um local de risco que encerra o jogo com derrota ao ser ativado
export class PocoAntigo extends Objeto {
	constructor() {
		super(
			"poco_antigo",
			"Um poço fundo com marcas de garras nas pedras.",
			"Você ouve um rugido profundo... algo foi despertado."
		);
	}

	// Qualquer interação com o poço ativa o fim do jogo (derrota)
	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		console.log("O uso imprudente acordou a Baleia Azul. Valença pereceu.");
		this.engine.indicaFimDeJogo();
		return true;
	}
}

// Objeto simbólico sem efeito prático, usado para imersão narrativa
export class CartaProfetica extends Objeto {
	constructor() {
		super(
			"carta_profetica",
			"Uma carta antiga com caligrafia tremida.",
			"A carta profética ecoa: 'Enquanto houver fé, a baleia dorme.'"
		);
	}

	// Não reage a nenhuma ferramenta
	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}

// Outro objeto simbólico encontrado no baú, também sem efeito mecânico
export class FragmentoEstandarte extends Objeto {
	constructor() {
		super(
			"fragmento_estandarte",
			"Um pedaço do estandarte cerimonial.",
			"Você segura o fragmento. Um símbolo de fé antiga, mas nada acontece."
		);
	}

	// Também não interage com ferramentas
	usar(ferramenta) {
		validate(ferramenta, Ferramenta);
		return false;
	}
}
