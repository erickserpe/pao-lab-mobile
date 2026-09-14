# PaoLab

## Sobre o app

O **PaoLab** é um aplicativo mobile voltado para padeiros artesanais que praticam panificação com fermentação natural (sourdough) e outras técnicas artesanais. O objetivo é servir como um "diário de bordo" digital para cada fornada, permitindo registrar as condições de produção, acompanhar o clima do ambiente (que afeta diretamente a fermentação) e avaliar os resultados de cada receita ao longo do tempo — tudo funcionando offline, já que o padeiro nem sempre está com internet disponível na cozinha ou na padaria.

Com o PaoLab, o usuário consegue comparar fornadas diferentes, identificar padrões (por exemplo, se uma hidratação mais alta em dias mais quentes rendeu um miolo melhor) e evoluir suas receitas com base em dados reais, em vez de depender só da memória ou de anotações soltas em papel.

### Funcionalidades básicas (prioritárias)

- [x] Cadastro de um novo experimento/fornada (nome, categoria de pão, farinha, hidratação, tempo de fermentação, inoculação de levain)
- [x] Validação de hidratação dentro de uma faixa realista (50% a 100%)
- [x] Armazenamento local dos experimentos via SQLite (funciona offline)
- [x] Listagem do histórico de experimentos (Laboratório)
- [x] Marcar/desmarcar experimentos como favoritos
- [x] Painel com estatísticas gerais (total de fornadas, nota média)
- [x] Captura automática do clima atual (temperatura e umidade) via Open-Meteo
- [ ] Avaliação sensorial detalhada por experimento (miolo, crosta, geral) com formulário próprio
- [ ] Edição e exclusão de experimentos já cadastrados
- [ ] Cadastro e seleção de farinhas específicas (marca, % de proteína) por experimento

### Funcionalidades adicionais (trabalhos futuros)

- [ ] Cálculo automático de sugestão de hidratação com base no clima do dia
- [ ] Gráficos de evolução (nota média ao longo do tempo, por categoria de pão)
- [ ] Fotos anexadas a cada experimento (registro visual do miolo/crosta)
- [ ] Exportação do histórico (PDF ou CSV) para compartilhar receitas
- [ ] Modo comparação entre dois experimentos lado a lado
- [ ] Notificações/lembretes de etapas da fermentação (ex: hora de dobrar a massa)

## Protótipos de tela

<!-- TODO: link público do Figma (ou imagem única com o mapa de telas) -->

## Modelagem do banco

<!-- TODO: diagrama entidade-relacionamento (Mermaid ou diagrams.net) + explicação de que o banco é local via expo-sqlite -->

## Planejamento de sprints

<!-- TODO: cronograma semana a semana até a conclusão do app -->
