import { Engine } from "./Basicas.js";
import {
    IgrejaDeSaoBenedito,
    CasaDeDonaDitosa,
    CentroHistoricoDeValenca,
    RioCaatinguinha
} from "./SalasDemo.js";

export class JogoDemo extends Engine {
    constructor() {
        super();
    }

    criaCenario() {
        // Instancia as salas
        const igreja = new IgrejaDeSaoBenedito(this);
        const casa = new CasaDeDonaDitosa(this);
        const centro = new CentroHistoricoDeValenca(this);
        const rio = new RioCaatinguinha(this);

        // Define as conexões conforme o mapa textual
        igreja.portas.set(casa.nome, casa);
        casa.portas.set(igreja.nome, igreja);
        casa.portas.set(centro.nome, centro);
        centro.portas.set(casa.nome, casa);
        centro.portas.set(rio.nome, rio);
        rio.portas.set(centro.nome, centro);

        // Define a sala inicial
        this.salaCorrente = igreja;
    }
}
