// Importa a classe principal que controla o jogo
import { Engine } from "./Basicas.js";

// Importa todas as salas utilizadas no cenário
import {
    RachadurasDaIgreja,
    IgrejaDeSaoBenedito,
    CasaDeDonaDitosa,
    CentroHistoricoDeValenca,
    RioCaatinguinha,
    IgrejaNossaSenhoraDaConceicao
} from "./SalasDemo.js";

// Classe que representa o jogo "A Baleia Azul de Valença do Piauí"
export class JogoDemo extends Engine {
    constructor() {
        super();
    }

    criaCenario() {
        // Instancia todas as salas
        const rachaduras = new RachadurasDaIgreja(this);
        const igreja = new IgrejaDeSaoBenedito(this);
        const casa = new CasaDeDonaDitosa(this);
        const centro = new CentroHistoricoDeValenca(this);
        const rio = new RioCaatinguinha(this);
        const igrejaNSC = new IgrejaNossaSenhoraDaConceicao(this);

        // Define conexões entre as salas conforme o mapa
        rachaduras.portas.set(igreja.nome, igreja);

        igreja.portas.set(rachaduras.nome, rachaduras);
        igreja.portas.set(casa.nome, casa);

        casa.portas.set(igreja.nome, igreja);
        casa.portas.set(centro.nome, centro);

        centro.portas.set(casa.nome, casa);
        centro.portas.set(rio.nome, rio);

        rio.portas.set(centro.nome, centro);
        rio.portas.set(igrejaNSC.nome, igrejaNSC);

        igrejaNSC.portas.set(rio.nome, rio);

        // Sala inicial do jogo
        this.salaCorrente = rachaduras;
    }
}
