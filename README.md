# A Baleia Azul de Valença do Piauí – RPG Textual com Programação Orientada a Objetos

Este é um jogo de aventura textual baseado em uma lenda folclórica da cidade de Valença do Piauí, criado como projeto acadêmico para praticar os conceitos de Programação Orientada a Objetos (POO) com JavaScript.

---

## Objetivo do Jogo

O jogador deve impedir o despertar da Baleia Azul, uma entidade folclórica que ameaça engolir a cidade. Para isso, precisa reunir ferramentas e interagir com objetos simbólicos espalhados por locais históricos, completando um ritual de proteção conduzido por São Benedito.

---

## Mecânica do Jogo

- O jogo é jogado no terminal (CLI).
- O jogador pode interagir com salas, objetos e ferramentas.
- A mochila tem **limite de 3 ferramentas** e suporte a descarte.
- Cada objeto ou ferramenta possui comportamentos específicos.
- O jogo pode terminar com **vitória** ou **derrota**, dependendo das escolhas do jogador.
- - Salas narrativas adicionais poderão ser incluídas em versões futuras para aprofundar a imersão no universo mítico do jogo.


---

## Mapa do Cenário (Ordem Recomendada)

1. **Rachaduras da Igreja** – Início da jornada. Revela instabilidade do selo da Baleia.
2. **Igreja de São Benedito** – Local sagrado com a imagem que finaliza o ritual.
3. **Casa de Dona Ditosa** – Contém o baú trancado e o Martelo de Procissão.
4. **Centro Histórico de Valença** – Tem a inscrição sagrada e a Lanterna de São José.
5. **Rio Caatinguinha** – Guarda a Chave de Bronze. Contém o poço arriscado.
6. **Igreja de Nossa Senhora da Conceição** – Final alternativo (derrota).


---

## Funcionalidades Implementadas

### Ferramentas

- `MarteloDeProcissao`: 2 usos.
- `LanternaDeSaoJose`: 3 usos.
- `ChaveDeBronze`: uso único.

### Objetos Interativos

- `ImagemSaoBenedito`: ativa a vitória.
- `BauAntigo`: libera objetos narrativos.
- `ParedeComInscricao`: revela mensagem com lanterna.
- `PocoAntigo`: se ativado, leva à derrota.
- `CartaProfetica` e `FragmentoEstandarte`: objetos simbólicos.

### Mochila

- Limite de 3 itens.
- Permite `pega`, `descarta`, `inventario`, `usa`.

---

## Comandos do Jogo

| Comando                     | Ação                                             |
| --------------------------- | ------------------------------------------------ |
| `pega <ferramenta>`         | Pega uma ferramenta da sala e guarda na mochila. |
| `descarta <nome>`           | Remove uma ferramenta da mochila.                |
| `inventario`                | Lista os itens atualmente na mochila.            |
| `usa <ferramenta> <objeto>` | Usa uma ferramenta sobre um objeto da sala.      |
| `sai <sala>`                | Vai para outra sala conectada.                   |
| `fim`                       | Encerra o jogo.                                  |

---

## Conceitos de POO Aplicados

- **Encapsulamento**: Uso de atributos privados com `#`.
- **Herança**: Ferramentas e Objetos são especializados a partir de classes base.
- **Polimorfismo**: Métodos `usar` redefinidos por subclasses.
- **Mapeamento**: Salas, objetos e ferramentas organizados com `Map`.

---

## Estrutura do Projeto



```
rpg-poo/
├── Basicas.js            # Classes principais: Engine, Sala, Mochila, Ferramenta, Objeto
├── FerramentasDemo.js    # Ferramentas específicas com usos limitados
├── ObjetosDemo.js        # Objetos interativos e narrativos do jogo
├── SalasDemo.js          # Ambientes (salas) com lógica de interação
├── JogoDemo.js           # Implementa o cenário e lógica do jogo
├── index.js              # Ponto de entrada para iniciar o jogo
├── package.json          # Configuração de dependências
├── .gitignore
└── README.md             # Documentação
```

---

## Como Executar

1. **Clone o repositório:**

```bash
git clone https://github.com/Etuarda/RPG-POO.git
cd RPG-POO
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute o jogo:**

```bash
node index.js
```

---

##  Dependências

* [`bycontract`](https://www.npmjs.com/package/bycontract): Validação de tipos.
* [`prompt-sync`](https://www.npmjs.com/package/prompt-sync): Entrada de dados via terminal.

---

##  Créditos

Desenvolvido por **Eduarda Silva Santos**, aluna de Análise e Desenvolvimento de Sistemas na PUCRS, como parte do projeto de Programação Orientada a Objetos.
Inspirado pela lenda popular da **Baleia Azul de Valença do Piauí**.

---


