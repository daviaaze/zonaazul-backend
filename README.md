Escolha de tecnologias
======================

Para a escolha das tecnologias, foi feito um comparativo de complexidade
e performance. O candidato escolhido foi JavaScript, tanto para o
Servidor, quanto para o Aplicativo Mobile. Seu alto nível de abstração
permite que a estrutura clean code seja implementada com facilidade, e a
flexibilidade de poder usá-la em ambas as partes do projeto foram os
pontos principais.

No servidor (Back-End) , foi escolhido o Framework Node.Js, e sua
biblioteca Express, para a criação de uma API Rest. Esse framework
utiliza do interpretador V8 fora do navegador web, possibilitando sua
utilização em qualquer ambiente. Permitindo por exemplo, a utilização de
hospedagens mais leves, por sua pouca utilização de memória e
processamento.

Já no aplicativo (Front-End) foi escolhido o framework React Native.
Além de estar em alta, e existir muita fonte de conhecimento em criação
de aplicativos utilizando este framework, a possibilidade de um mesmo
código ser instalado tanto em IOS como Android permite uma produtividade
muito maior.

Entendimento do negócio e planejamento de sprints
=================================================

Na parte de entendimento do negócio e planejamento, foram levantados
alguns requisitos iniciais, como a necessidade de aumentar a eficiência
do sistema atual, possibilitando ao negócio a se ajustar. Assim, foi
definido que o funcionamento do aplicativo deveria ser a prioridade.

Com a primeira na primeira fase do desenvolvimento, foi focado no
desenvolvimento de um servidor facilmente escalável, e altamente
adaptável, que conseguisse suprir a necessidade das demandas constantes
que virão quando o aplicativo estiver em funcionamento.

Na segunda parte, o desenvolvimento de um aplicativo muito simples,
permitindo ser utilizado por todos os usuários do serviço, e, altamente
funcional, permitindo ao usuário poder fazer a utilização do serviço
tendo o mínimo de contato com os funcionários.

Na terceira parte, foi integrado ao aplicativo as funcionalidades para
os vendedores e fiscalizadores. Onde é possível buscar e filtrar
estacionamentos ativos. Também existe a funcionalidade de vender
bilhetes de hora, para usuários que não se sintam confortáveis em
realizar o pagamento online.

O servidor
==========

O servidor, deverá no primeiro momento, suprir a demanda por informação
e a lógica por trás da sua funcionalidade, realizando cadastro, e
autenticação de usuários, controle de estacionamento, busca, inserção e
alteração de dados.

Com a utilização de uma Rest API, a possibilidade de implementar um
sistema web se torna simples. Sua capacidade de suprir a demanda
crescente do aplicativo, sem aumentar tanto sua demanda de hardware,
também é levada em conta, já que a comunicação por JSON leva a
complexidade de transformação de dados a quase 0.
