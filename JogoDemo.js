// Importa a classe principal que controla o jogo
import { Engine } from "./Basicas.js";

// Importa as salas específicas utilizadas no cenário
import {
    IgrejaDeSaoBenedito,
    CasaDeDonaDitosa,
    CentroHistoricoDeValenca,
    RioCaatinguinha
} from "./SalasDemo.js";

// Classe que representa o jogo específico "A Baleia Azul de Valença do Piauí"
// Herda a estrutura básica da Engine
export class JogoDemo extends Engine {
    constructor() {
        super(); // Inicializa a Engine (inclui mochila, sala corrente e criaCenario)
    }

    // Método sobrescrito da Engine: define o mapa do jogo
    criaCenario() {
        // Instancia todas as salas com referência à engine
        const igreja = new IgrejaDeSaoBenedito(this);
        const casa = new CasaDeDonaDitosa(this);
        const centro = new CentroHistoricoDeValenca(this);
        const rio = new RioCaatinguinha(this);

        // Conecta as salas entre si (bidirecionalmente, onde necessário)
        igreja.portas.set(casa.nome, casa);
        casa.portas.set(igreja.nome, igreja);
        casa.portas.set(centro.nome, centro);
        centro.portas.set(casa.nome, casa);
        centro.portas.set(rio.nome, rio);
        rio.portas.set(centro.nome, centro);

        // Define o ponto inicial do jogo
        this.salaCorrente = igreja;
    }
}
