---
layout: post
title: Criando um Chat Realtime com CEAN Stack (Couchbase, Express, Angular2 e Node) e Socket.io - Part 1
date: 2017-02-03 01:04:27
ref: post-007
lang: pt
country: br
feature-img: "img/chat.png?v=4"
categories: 
- Socket.io
- Websockets
- Couchbase
- Node
- Express
- Angular
- JavaScript
tags: 
- Socket.io
- Websockets
- Couchbase
- Node
- Express
- Angular
- JavaScript
---

Construir um chat há alguns anos costumava ser algo muito difícil de se fazer. Exigia-nos
construir uma arquitetura complexa. Tínhamos que consultar o servidor a todo momento
em busca de novas mensagens e isso era pouco performático. Como não tínhamos
bancos NoSql usávamos bancos de dados relacionais para persistir mensagens.
Era bastante trabalhoso e o resultado final muitas vezes era péssimo. Não era
qualquer um que encarava esse desafio. Hoje temos tecnologias que facilitam muito nossa
vida. Nesse tutorial/artigo vou mostrar como criar um chat _real-time_ de maneira muito
simples com Couchbase, Node.js, Express e Angular 2 (CEAN Stack ou CANE Stack) e Socket.io.

#Construindo o Backend

Primeiro vamos construir o backend. Uma **API em Node.js** com um endpoint que vai nos
retornar todas as mensagens que estão no banco. Mas por enquanto essas mensagens serão _fakes_

Assumindo que você já tenha o Node instalado na sua máquina, crie uma nova pasta, abra-a
no Terminal/Prompt de Comando e **inicie um novo projeto Node**:

`$ echo {} > package.json`

Isso vai criar o arquivo `package.json` com um objeto `JSON` vazio onde as depêndencias do
projeto serão registradas. Não vamos usar o `npm init` aqui pois ele gera campos que não
precisaremos nesse projeto.

Vamos passar por um conteúdo bem básico, que é especificamente **instalar o Express**
e **subir o servidor Node**. Caso você já se sinta confortável em como se faz isso pode
pular para a <a href="#criando-a-rota">seção onde criamos a rota.</a>

Siga em frente e instale a primeira dependência: o **Express**, o framework que nos ajuda a
criar Middlewares e configurar o servidor Node.
Coloque a _flag_ `--save` no final pra registrar isso no `package.json` como uma dependência de
produção.
 
`$ npm install --save express`

Agora sim, podemos abrir a pasta em um editor de texto e começar a codar e criar
mais um app lindo que mudará o mundo para sempre. #SQN é apenas mais um chat mesmo!

Eu gosto de usar o [VS Code](https://code.visualstudio.com/), então ainda no terminal eu
digito `$ code .` e ele abre pra mim este editor de texto com a minha pasta aberta.
Se caso você usa o [Sublime](https://www.sublimetext.com/) você pode
tentar digitar `$ subl .` se ele não abrir sinto muito mas você vai ter que 
[configurar a variável de ambiente para o Sublime](http://bfy.tw/9dMx) para abrir-lo pelo
terminal. Você pode usar qualquer editor de texto de sua preferência.

Com a pasta aberta no editor de texto, você vai ver que temos a pasta `node_modules`
e no arquivo `package.json` o Express registrado na propriedade `dependencies`:

<pre><code class="language-js">"dependencies": {
    "express": "4.14.0"
  },
</code></pre>

Bora começar a mudar o mundo então, crie o arquivo `app.js` que carregará a nossa API e
onde vamos configurar o nosso servidor com ajuda do Express. Para isso precisamos
**importar o módulo Express**:

<pre><code class="language-js">// importando o módulo do express
const express = require('express');

// criando uma instância do express
const app = express();

// criando o servidor http para a nossa app
const server = require("http").Server(app);

// disponibilizando o app  na porta 3000 do servidor
server.listen(3000, () =>
    console.log("Listening on port %s...", server.address().port));
</code></pre>

No código acima nós **importamos o express**, criamos uma **instância dele dentro de uma
constante** chamada `app`, **criamos um servidor HTTP** para a nossa app e mandamos ele
**ouvir requisições na porta 3000** subindo assim o servidor HTTP.

Usar `const` ao invés de `var` aqui é
uma boa prática porque tanto o módulo quanto a instância do Express e o função
`Server()` do módulo `http` nunca vão mudar durante toda a
nossa aplicação. O valor deles será o mesmo durante todo o ciclo de vida da aplicação 
assim como a maioria dos módulos que importamos.

Já temos um servidor rodando. Para verificar basta executar o nosso Javascript 
`app.js` com o Node.

No terminal digite `$ node app` (não precisa colocar .js):

![Node.js rodando](img/node-listening.jpg)

Se você abrir no navegador em `http://localhost:3000` você vai ver que funcionou, porém
vimos uma mensagem que não é possível achar a rota `/` (Cannot GET /). Precisamos criar
uma rota para a nossa API.<a id="criando-a-rota" />

#Criando a rota

A idéia é ter uma endpoint que irá retornar todas as mensagens do chat.
Como vamos construir o front-end e a API no mesmo aplicativo, rodando na mesma porta, vamos
deixar a rota padrão `/` para o front-end (a sala de chat) que vamos criar mais pra frente,
e a rota `/mensagens` para o endpoint da API que vai nos retornar todas as mensagens do chat.

Para isso crie a pasta `routes` na raiz do projeto.

Na pasta `routes` crie o arquivo `routes.js`:

<pre><code class="language-js">module.exports = function (app) {
    app.get('/mensagens', (req, res) => {
        res.send({mensagem: 'oi'});
    });
};
</code></pre>

Agora precisamos informar ao Express que temos uma rota configurada, fazemos isso
**importando o código acima dentro do código onde configuramos o nosso servidor**,
no arquivo `app.js`.

Perceba que a função acima, exportada com `module.exports`, depende de um parâmetro que
nomeamos de `app`, neste parâmetro deve conter a instância do Express que criamos. Porquê?
Porque o método `.get` pertence à instância do Express. Esse método cria um Middleware que
avalia, em toda requisção, o recurso que foi solicitado pelo navegador e, nesse caso
específico, se o recurso for igual
a `/mensagens` ele executa a arrow function que definimos como callback passando os objetos
de requisição (`req`) e resposta (`res`) permitindo-nos manipular a requisição feita
pelo usuário e a resposta que vamos enviar pra ele, esse é um conceito bem básico de
Middlewares.

Beleza, chega de conceito e vamos importr nossa rota recém criada no servidor, abra o
arquivo `app.js` e antes de subir o servidor (função `listen()`) vamos informar a ele
que nós temos uma rota para um recurso, bora então importar o código da rota. Anova linha 
no arquivo `app.js` está destacada com flechas:

<pre><code class="language-js">// importando o módulo express
const express = require('express');

// criando uma instância do express
const app = express();

// criando o servidor http para a nossa app
const server = require("http").Server(app);

// ----> importando nosso arquivo de rotas
const routes = require("./routes/routes.js"); // <-----

server.listen(3000, () =>
    console.log("Listening on port %s...", server.address().port));
 </code></pre>

Se você executar o código e abrir o navegador vai ver que não vai funcionar, isso porque
no código acima nós apenas importamos a função. Nenhum Middleware foi e registrado
no servidor. Para registrá-lo precisamos executar a função imediatamente após a importarmos.
Fazemos isso, em JavaScript, colocando parênteses no final da chamada da função.
Além disso, para registrar o Middleware nossa módulo de rotas precisa da nossa instância
do Express. Nós temos essa instância dentro da constante app, então é só passar ela por
parâmetro que o nosso módulo de rotas se encarregará de registrar o middleware,  

<pre><code class="language-js">// importando nosso arquivo de rotas e executando-o imediatamente 
// depois com a instância do Express sendo passada por parâmetro
const routes = require("./routes/routes.js")(app);
</code></pre>

Agora sim, executando o código no console (`$ node app`) e abrindo o navegador na url 
`http://localhost:3000/mensagens` você vai ver a mensagem retornada pelo nosso backend.

![Express route, Node.js rodando](img/message-oi.jpg)

Quando formos integrar nosso chat com o **Couchbase** precisaremos escrever um pouco mais
de código criando funções para persistir e recuperar mensagens. Precisamos de um cara
responsável por isso, e esse cara é o modelo!

#Criando o modelo

A idéia inicial aqui é passar a lógica definida no arquivo de rota para um **Model** e
depois, quando formos integrar com o **Couchbase**, escrevermos mais funcionalidades.

Para isso, crie uma pasta `models` na raíz do projeto e dentro dela crie o arquivo
`chatmodel.js` definindo uma função construtora nomeada **ChatModel** (com C maiúsculo,
por convenção):

<pre><code class="language-js">function ChatModel() {}</code></pre>

No artigo [Classes e Objetos em Javascript](http://blini.io/classes-e-objetos-em-javascript)
eu explico <del>tudo</del> bastante coisa sobre funções construtoras

Vamos criar o primeiro método do nosso modelo e definir que esse método espera um função
de callback que será executada assim que os dados estiverem prontos.

<pre><code class="language-js">function ChatModel() {}

ChatModel.getAll = function(callback) {
    let error = null;
    let result = {message: 'oi'};
    callback(result, error);
};
</code></pre>

Os dados serão enviados à função de callback por parâmetro (última linha dentro da função) e se ocorrer
algum erro será enviado um objeto de erro no segundo parâmetro. Usamos esse padrão pois
no Node consultas de dados são assíncronas e não bloqueantes, isso quer dizer que o
Express não vai esperar os dados ficarem prontos, ele vai prosseguir com o processamento
e só depois que os dados chegarem do banco ele vai disponibilizar isso para o _callback_.

Perceba que ainda não estamos consultando dados, apenas retornando a mesma mensagem de antes.
Quando estivermos buscando as mensagens no banco de dados isso fará mais sentido.

Agora vamos substituir a lógica no arquivo `route.js` transferindo a responsabilidade de
recuperar as mensagens para a classe **ChatModel**:

<pre><code class="language-js">// importando a classe ChatModel
const ChatModel = require('../models/chatmodel');

module.exports = function (app) {
    app.get('/mensagens', (req, res) => {
        ChatModel.gelAll((result, error) => {
            if(error) {
                console.log('error:', error);
                return res.status(400).send(error);
            }
            
            return res.send(result);
        });
    });
};
</code></pre>

No código acima, ao invés de enviarmos direto a mensagem como resposta para o `res.send()`,
como estava antes, chamamos o método `getAll()` da classe **ChatModel** que recebe como
parâmetro a arror function de callback que engloba o `res.send()`
e que será executada assim que os dados estiverem disponíveis.

Se você rodar o servidor de novo e testar no navegador vai perceber que ainda
funciona como o esperado. Nada mudou, porém agora temos o modelo responsável pela
nossa lógica por trás do chat.

Vamos preparar agora nossa aplicação para usar **_sockets_**, que nos permite criar conexões
bidirecionais entre o servidor e os usuários (_clients_) da aplicação, montando assim
links de comunicação em tempo real entre os dois. Vamos fazer isso utilizando a
biblioteca [Socket.io](http://socket.io/) no back-end (Socket.io Server) e no front-end
(Socket.io Client).

#Integrando Socket.io no Backend

O nosso servidor, configurado acima, ficará responsável por gerenciar conexões sockets e
notificar os clientes conectados com novas mensagens de chat.

Para utilizarmos o **Socket.io** no servidor precisamos do **Socket.io Server** que
instalamos via `npm` **savando como uma dependêcia** do nosso projeto:

`$ npm install --save socket.io`

Se você abrir o arquivo `package.json` verá que agora além do Express temos também o Socket.io
registrado como uma dependência, e isso significa que ele também está disponível na
pasta `node_modules` onde reside todos os módulos do `npm` e nossas dependências.

Então chega de perder tempo e bora **importá-lo e configurá-lo em nossa aplicação**. Abra o arquivo app.js e crie mais uma constante que armazenará o resultado da execução deste módulo. O Socket.io ouve mudanças em nosso servidor então precisamos passar o nosso server como parâmetro para ele, então faça isso logo abaixo da `const` server.

<pre><code class="language-js">// importando o Socket.io e executando-o passando nosso server
// como parâmetro
const io = require("socket.io").listen(server)
</code></pre>

Depois disso, logo abaixo, vamos criar um socket para cada novo usuário que se conectar.

<pre><code class="language-js">// ouvindo o evento 'connection' no servidor e criando um novo
// socket para cada nova conexão
io.on("connection", socket => {
    socket.on("mensagem_mano", msg => {
        io.emit("mensagem_mano", msg);
    });
});
</code></pre>

Entendendo o que fizemos no código acima: A constante `io` é o nosso **socket que ouve
mudançascno servidor**, então **a cada novo usuário** que entrar na nossa aplicação o
Socket.io vai **executar a função de _callback_** associada ao evento chamado `connection`
passando por parâmetro o novo socket criado **especificamente** para o novo usuário
conectado. A função de _callback_, por sua vez,
**através desse socket**, **criar um novo ouvinte**, agora para o evento chamado `mensagem_mano`, com uma
função de callback que espera um parâmetro que foi denominado, em seu contexto, como `msg`.
Quando este evento ocorrer, este ouvinte solicita para **o Socket.io reemitir o mesmo evento**
fazendo um _broadcasting_ da mensagem pra **todos os sockets _clients_ conectados** no momento,
**inclusive para o usuário que o emitiu**.
Resumindo, o servidor faz um _push_ da mensagem para todos os front-end conectados.

O código final do arquivo app.js então ficaria assim:

<pre><code class="language-js">// importando o módulo express
const express = require('express');

// criando uma instância do express
const app = express();

// criando o servidor http para a nossa app
const server = require("http").Server(app);

// importando o Socket.io e executando-o passando nosso server
// como parâmetro
const io = require("socket.io").listen(server);

// ouvindo o evento 'connection' no servidor que quando executado, cria um novo
// socket para a conexção recém aberta
io.on("connection", socket => {
    // com o novo socket criado é ciado também um novo ouvinte
    // para o nosso evento
    socket.on("mensagem_mano", msg => {
        // e o Socket.io reenvia pra todos que estão conectados
        io.emit("mensagem_mano", msg);
    });
});

// importando nosso arquivo de rotas e executando-o imediatamente 
// depois com a instância do Express sendo passada como parâmetro
const routes = require("./routes/routes.js")(app);

server.listen(3000, () =>
    console.log("Listening on port %s...", server.address().port));
</code></pre>

Por hora não temos como testar. No máximo podemos executar `$ node app` no terminal e se 
nenhuma mensagem de erro aparecer está tudo ok.

Precisamos de um jeito para emitir o evento, que definimos acima, com a mensagem do usuário.
Faremos isso no front-end. Vamos criar então um arquivo HTML e um JavaScript bem básicos
apenas para testar o Socket.io.

Mas antes precisamos definir um local para o nosso front-end. Precisamos de uma pasta
estática onde ficará o nosso front-end e onde, mais adiante, vamos implementar o Angular 2.

O Node executa todo arquivo JavaScript do lado do servidor. Uma pasta estática em um projeto
Node significa que os arquivos JavaScript contidos nela não serão executados pelo Node e
sim pelo navegador, no lado do cliente. É o que nós precisamos, então vamos seguir e
configurar essa pasta.

Crie uma pasta chamada `public` na raiz do projeto e no arquivo `app.js` configure-a como
estática. As novas linhas adicionadas estão destacada com setas:

<pre><code class="language-js">// importando o módulo path do node
const path = require('path');

// definindo a pasta public como o local onde o front-end reside
app.use(express.static(path.join(__dirname, "public")));

Novamente o arquivo app.js na íntegra:

// importando o módulo express
const express = require('express');

// criando uma instância do express
const app = express();

// criando o servidor http para a nossa app
const server = require("http").Server(app);

// importando o Socket.io e executando-o passando nosso server
// como parâmetro
const io = require("socket.io").listen(server);

// ----> importando o módulo path do node
const path = require('path'); // <----

// ----> definindo a pasta public como o local onde o front-end reside
app.use(express.static(path.join(__dirname, "public"))); // <----

// ouvindo o evento 'connection' no servidor e criando um novo
// socket para cada nova conexão
io.on("connection", socket => {
    socket.on("mensagem_mano", msg => {
        io.emit("mensagem_mano", msg);
    });
});

// importando nosso arquivo de rotas e executando-o imediatamente 
// depois com a instância do Express sendo passada por parâmetro
const routes = require("./routes/routes.js")(app);

server.listen(3000, () =>
    console.log("Listening on port %s...", server.address().port));

</code></pre>

No códigio acima **importamos o módulo `path`** para nos auxiliar na manipulação de caminhos
de arquivos do servidor e **criamos um Middleware** com `use` avisando ao servidor que a pasta
`public` é estática.

Agora que temos uma pasta estática, **crie os arquivos HTML e JS** dentro dela, para emitirmos
eventos com o Socket.io precisamos usar a biblioteca **Socket.io Client** que vamos importar no HTML.

- Index.html

<pre><code class="language-markup">&lt;!DOCTYPE html>
&lt;html lang="en">

    &lt;head>
        &lt;meta charset="UTF-8">
        &lt;title>Socket.io&lt;/title>
    &lt;/head>

    &lt;body>
        &lt;ul class="messages">&lt;/ul>
        &lt;input class="chatBox" placeholder="Digite aqui..." />

        &lt;script src="https://cdn.socket.io/socket.io-1.4.5.js">&lt;/script>
        &lt;script src="/index.js">&lt;/script>
    &lt;/body>
&lt;/html>
</code></pre>

No código acima **criamos uma lista onde as mensagens serão listadas**, **um `input` do tipo
`text` para enviar mensagens** e **adicionamos 2 arquivos JavaScript**: o primeiro é o **Socket.io Client** que importamos via `CDN` e o **JavaScript da nossa aplicação** que criaremos abaixo:

- Index.js

<pre><code class="language-js">// Selecionando os elementos do HTML
var $messages = document.querySelector('.messages'); // área de mensagens
var $inputMessage = document.querySelector('.chatBox'); // caixa de texto

// Instanciando o Socket.io
var socket = io();

// sempre que o usuário apertar qualquer tecla do teclado em
// qualquer lugar da tela
window.addEventListener('keydown', function (event) {
    // Se caso a tecla for enter chama a função que envia
    // a mensagem digitada no input e limpa o input
    if (event.which === 13) {
        sendMessage();
        cleanInput();
    }
});

function cleanInput() {
    $inputMessage.value = '';
}

function sendMessage() {
    var message = $inputMessage.value;
    console.log('enviando mensagem', message);

    // Se a mensagem não for vazia
    if (message) {
        // pede ao servidor para executar o evento 'mensagem_mano'
        // e transmitir 1 parâmetro que vai para todos os usuários
        // conectados, inclusive para quem enviou
        socket.emit('mensagem_mano', message);
    }
}

// Sempre que o servidor emitir o evento 'mensagem_mano', o socket do
// usuário conectado vai capturar esse evento e chamar a função de callback
// que atualiza a área de mensagem com a nova mensagem recebida
socket.on('mensagem_mano', function (msg) {
    console.log('recebendo a mensagem', msg);
    var node = document.createElement("li");
    var textNode = document.createTextNode(msg);
    node.appendChild(textNode);
    $messages.appendChild(node);
});
</code></pre>

O código acima dispensa explicações. Ele se auto explica em tudo o que está sendo feito.

Se você rodar o servidor agora vai ver que está tudo funcionando:

`$ node app`

Abra a aplicação em 2 navegadores e faça o teste!

![Ezgif.com-video-to-gif.gif](img/ezgif.com-video-to-gif.gif)

Nosso Back-end está pronto. Por hora!

#Conclusão

Neste artigo/tutorial **configuramos o servidor** Node com ajuda do Express e
**instalamos o Socket.io Server fizemos a integração** para criar sockets com usuários e transmitir mensagens em
_broadcasting_. A parte do Socket está 100%.]

Além disso **configuramos a pasta `public` como estática** no servidor para o Node ignorar os arquivos
`.js` que pertencem ao front-end.

Voltaremos ao backend quando formos persistir as mensagens no Couchbase, vou também
explicar as diferenças entre o Couchbase e o MongoDB.

Do lado do cliente **criamos o Front-end puramente com HTML5 e JavaScript** e **integramos
com o Socket.io Client**. Na segunda
parte desse artigo vou mostrar como migrar nosso Front-end para Angular 2, fazer o request
no servidor para buscar as mensagens no end-point que criamos e como integrar o Socket.io-client no
Angular 2 usando observables. Em um próximo artigo, também vou mostrar como fazer tudo isso
com Ionic 2 e Firebase ;)

O código fonte dessa parte do artigo está disponível em
https://github.com/felipeblini/CEAN-Stack-and-Socket.io-chat-tutorial-part1.

Deixe o seu comentário, dúvidas, xingamentos e etc… Nos vemos no próximo artigo!