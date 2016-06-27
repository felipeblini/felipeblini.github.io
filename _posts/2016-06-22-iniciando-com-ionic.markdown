---
layout: post
title:  "Iniciando com Ionic"
ref: post-002
lang: pt
country: br
date:   2016-06-22 21:27 -0300
categories:
    - ionic
    - javascript
    - mobile
---

O Ionic é um framework front-end e open-source para desenvolvimento de aplicativos móveis híbridos _Cross-Platform_ escritos em HTM, CSS e JavaScript.

Com o Ionic é possível escrever código uma única vez e ter um aplicativo que roda 'nativamente' (entre aspas pois não é
100% nativo) no iPhone, Android e Windows Phone. Isso é possível pois estes Sistemas Operacionais Móveis possuem APIs
(_Application Program Interface_) usadas para que seus programadores desenvolvam aplicativos nativos para a plataforma.
O que o Ionic faz é, através do [_Apache Cordova_](https://cordova.apache.org/), ajudar-nos a comunicarmos com estas APIs que,
por sua vez, comunicam-se com um componente chamado Web View, usado por aplicativos nativos para visualização de páginas web
dentro do contexto dos aplicativos móveis (como um Browser qualquer). O Ionic permite que nosso aplicativo rode embarcado
dentro dessa _Web View_, que interpreta e renderiza nosso código HTML, CSS e JavaScript, como qualquer outro navegador moderno.
O Ionic basicamente estiliza nossos componentes HTML para se parecer com os componentes nativos de cada plataforma móvel alvo,
simulando a experiência nativa do usuário final (o que seria um trabalhão fazermos na mão) e usa esse 'navegador' para rodar os
aplicativos e disponibiliza bibliotecas JavaScript para acessarmos o hardware e tecnologias nativas do device como câmera, GPS,
Bluetooth, etc (o que também seria um trabalhão pra fazer na mão).

Como o nome sugere o aplicativo não será nativo, e sim híbrido. O Ionic empacota a aplicação em arquivos instaláveis para cada
plataformas móvel que então pode ser publicado nas principais lojas de aplicativos móveis e ser distribuída para o público-alvo.
Ele também nos oferece excelente produtividade e serviços como o _Ionic Platform_ que ajuda em tudo que uma aplicação precisa ter
(push notifications, autenticação, etc), Planos Empresariais, e um CLI (_Command-line Interface_) que te dá muita produtividade
através de linhas de comando.

E é claro que, como o código que você vai escrever é puramente HTML, CSS e JavaScript, você poderá rodar e visualizar a aplicação
no seu navegador web preferido. E pra fecharmos o assunto 'aplicativos híbridos', com esse mesmo código, excluindo a parte do
Cordova, pode-se criar uma aplicação Desktop _Cross-Platform_, com ajuda de tecnologias como o [Electron](http://electron.atom.io/),
que empacota código Web para rodar em Mac, Windows e Linux. O Ionic nos ajuda no mundo Mobile e o Electron no mundo Desktop, e
juntando as duas tecnologias você pode ter uma aplicação 100% híbrida e _Cross-Platform_ Mobile e Desktop.

Eu pessoalmente não recomendaria uma abordagem tão híbrida dessa, já que cada plataforma tem suas peculiaridades e algumas vezes
exige nossa atenção especial para criar códigos personalizados. Lembre-se, experiência do usuário em primeiro lugar! Isso foi
apenas para ilustrar o que realmente é uma aplicação híbrida. Entretanto, no mundo Mobile, o Ionic faz o serviço muito bem feito.

O Ionic é baseado no AngularJs e por isso você irá escrever directivas do Angular no seu HTML e usar os seus módulo: _services,
controllers, factories, routes_, etc. No Angular 2 muita coisa mudará e o Ionic 2 está sendo construído em cima dele, porém até
o momento da escrita desse artigo, o Ionic 2 ainda está em fase beta e o Angular 2 em um RC (_Release Candidate_) que ainda está
muito instável, por isso a versão 2 será assunto de futuros artigos.

##Preparando o Ambiente

Os softwares e tecnologias necessários para criar aplicativos com o Ionic são os seguintes:

- **Node.js** - Requerido pelo Ionic para uso do CLI e em tarefas de build
- **NPM** (instalado junto com o Node.js) - Para gerenciarmos nossas dependências
- **Git** - Para o Ionic fazer o scaffolding dos templates iniciais, e também usado pelo Bower
- **Bower** - Para gerenciar nossas dependências no front-end
- **Cordova e Ionic CLI**

Você também vai precisar de um editor de texto. Eu uso e recomendo o VS Code (https://code.visualstudio.com) que é um excelente fork do Atom com fantático suporte ao JavaScript.
Eu também recomendaria o [Sublime Text](https://www.sublimetext.com/), porém você pode usar qualquer um de sua preferência.


###Instalando o Node.js e npm

1. Acesse o site do Node.js em http://nodejs.org
2. Clique no botão de download para baixar a versão específica para o seu SO
3. Instale o Node.js clicando no instalador baixado

Isso irá instalar a versão escolhida do Node.js e o NPM.

Para verificar a instalação, abra o terminal do seu computador e digite:

<span class="inline-cmd">node -v</span> e <span class="inline-cmd">npm -v</span>


Se a instalação foi um sucesso isso retornará a versão instalada de cada um:


![Verificando a instalação do Node.js e do npm](img/node-npm-version-check.jpg)


###Instalando o Git

1. Acesse a página do Git no site: https://git-scm.com/download
2. Clique no botão de download compatível com o SO da sua máquina
3. Instale o Git clicando no instalador baixado

Para verificar a instalação do Git, digite no terminal:

<code class="inline-cmd">git --version</code>

Isso retornará a versão instalada caso o Git tenha sindo instalado com sucesso.

![Verificando a versão do Git instalado](img/git-version-check.jpg)


###Instalando o Bower

O Bower é instaldo através do NPM (_Node Package Manager_), o gerenciador de pacotes do Node.js, aquele que é instalado junto com o Node.js.

Para isso precisamos abrir novamente o terminal e digitar o seguinte comando:

<span class="inline-cmd">npm install -g bower</span>

Esse comando instala o módulo do Node chamado Bower globalmente (_-g_). No linux você deve instalar digitando:

<span class="inline-cmd">sudo npm install bower</span>

Mais uma vez, verificando a instalação:

<span class="inline-cmd">bower -v</span>

![Verificando a instalação do Bower no terminal](img/bower-version-check.jpg)


###Instalando o Cordova e o Ionic CLI

O Ionic CLI engloba o Cordova CLI com comandos adicionais, e para isso precisamos também instalar o Cordova globalmente, usaremos
o npm mais uma vez.

Novamente, nada complicado, abra o terminal e digite:

<span class="inline-cmd">npm install -g cordova ionic</span>

Isso baixará e instalará globalmente em sua máquina o Cordova e o Ionic CLI no mesmo comando. Pode demorar um pouco
dependendo da sua conexão.

![Instalando Cordova e Ionic CLI](img/instalando-cordova-e-ionic-cli.jpg)

Verifique a instalação digitando no terminal

<span class="inline-cmd">cordova -v</span> e <span class="inline-cmd">ionic -v</span>

![Verificando a instalação do Cordova e Ionic CLI](img/cordova-e-ionic-cli-version-check.jpg)

Pronto, o Ionic CLI está instalado. Agora podemos digitar ionic no terminal e visualizar os comandos disponíveis para ter uma ideia do que podemos fazer via de linha de comando:

<span class="inline-cmd">ionic</span>

![Visualizando os comandos disponíveis no Ionic CLI](img/ionic-cli-commands.jpg)

Agora estamos prontos pra continuar!

___

##Iniciando a Aplicação

O Ionic possui 3 templates para você iniciar uma aplicação:

- **Blank**: um template vazio, sem pacotes pré-instalados e com apenas uma página.

- **Tabs**: Aplicação de exemplo usando o sistema de navegação em abas do Ionic.

- **Side Menu**: Mesma aplicação de exemplo do Tabs porém, ao invés de abas, um sistema de navegação em menu lateral deslizante.

- **Maps**: Template com apenas uma página com um mapa renderizado e Geo Localização pronta.

- **Sales Force**: Template com com código integrado à API do CRM da ForceSales.

Para fazer o scaffolding da sua primeira app e rodá-la é muito simples, abra o terminal e digite:

<span class="inline-cmd">ionic start -a "Minha App" -i minhaapp minha-app blank</span>

####Onde:

- <span class="inline-cmd">-a "Minha App"</span> é o nome amigável do seu aplicativo

- <span class="inline-cmd">-i minhaapp</span> é o ID aplicativo

- <span class="inline-cmd">minha-app</span> é o nome da pasta ou o local onde o aplicativo com o template escolhido será gerado

- <span class="inline-cmd">blank</span> é o template escolhido entre as opções _blank_, _tabs_, _sidemenu_, _maps_ e _salesforce_

Ou use a forma reduzida: <span class="inline-cmd">ionic start minha-app blank</span>

####Onde:

- <span class="inline-cmd">minha-app</span> é o ID aplicativo

- <span class="inline-cmd">blank</span> é o template escolhido entre as opções _blank_, _tabs_, _sidemenu_, _maps_ e _salesforce_


![Inicializando a aplicação sidemenu do Ionic](img/initializing-cordova-project.jpg)

Aguarde um pouquinho, o Ionic irá baixar os arquivos hospedados no GitHub para a sua máquina. Depois da aplicação inicializada e o _scaffold_ do template feito, acesse a pasta onde o app foi gerado digitando no terminnal:

<span class="inline-cmd">cd minha-app</span>

![Acessando a pasta onde reside o aplicativo](img/acessando-a-pasta.jpg)

Para visualizar o aplicativo é muito simples, lembra que o aplicativo desenvolvido com o Ionic roda embarcado em um navegador?
Pois é, basta levantar um servidor _http_ e acessar pelo navegador. O Ionic faz isso pra gente automaticamente, basta digitar no terminal:

<span class="inline-cmd">ionic serve</span>

Com esse comando o Ionic irá levanta um servidor _http_ na porta 8100 e abrir o navegador padrão do sua máquina com o app rodando.

Ele ainda mostra alguns comandos úteis no terminal:

![Servidor rodando na porta 8100 e alguns comandos úteis](img/servidor-rodando.jpg)

Caso ocorra algum erro, tente rodar em uma porta mais alta, colocando o número da porta no final do comando, assim:

<span class="inline-cmd">ionic serve -p 9000</span>

![Aplicativo rodando no navegador web](img/ezgif-1287516005-3.gif)

Para destruir o servidor e destravar o terminal digite:

<span class="inline-cmd">crtl + c</span>


No próximo artigo vamos ver um pouco sobre a estrutura dos arquivos e arquitetura do projeto gerado pelo _scaffolding_ do Ionic
e como personalizar o aplicativo. Assim como configurar as plataformas iOS e Android pra emular nosso aplicativo, rodar o
aplicativo diretamente no celular e usar o _Ionic View_ para mostrar o aplicativo para os seus clientes e amigos e receber _feedbacks_.
