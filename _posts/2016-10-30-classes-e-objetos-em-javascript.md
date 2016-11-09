---
layout: post
title: Classes e Objetos em Javascript
date: 2016-10-30 20:29:18
ref: post-005
lang: pt
country: br
feature-img: "img/js.jpg?v=1"
categories: 
- javascript
- poo
tags: 
- javascript
- poo
---

O ECMAScript 2015 trouxe a implementação da palvara reservada <code class="inline">class</code>,
porém isso não trouxe a capacidade de orientação a objetos ao JavaScript. Essa capacidade já existia desde
as primórdios da linguagem, tanto é que <code class="inline">class</code> sempre foi
uma palavra-chave reservada, mesmo não tendo nenhuma utilidade no passado. Isso também não alterou o sistema
de orientação a objetos do JavaScript. A palavra-chave <code class="inline">class</code> é apenas um açucar
sintático pra fazermos exatamente o que já fazíamos antes: *funções construtoras de objetos*.

Por isso estudar e entender o jeito antigo de criar classes, objetos e heranças é essencial para um bom
programador JavaScript pois debaixo dos panos tudo ainda acontece do mesmo jeito.

Você talvez tenha ouvido falar, no passado, que o JavaScript não é uma linguagem orientada a objetos.
Mas sim, o JavaScript sempre foi uma linguagem orientada a objetos. A verdade é que ele
tem uma orientação a objetos completa que é muito mais potente que várias linguagens
clássicas por aí. 

Sempre houve tipos primitivos e objetos no JavaScript, sendo 5 os tipos primitivos:
 
- undefined
- null
- boolean
- number
- string

Sendo que _boolean_, _number_ e _string_ possuem suas versões em classes, diferenciados pela primeira
letra em maiúscula:

- Boolean
- Number
- String

Um objeto base o qual todos os outros objetos herdam

- [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

E as 4 capacidades básicas de uma linguagem orientada a objetos:

- Encapsulamento
- Agregação
- Herança, e
- Polimorfismo

Criar objetos em JavaScript é trivial. Isso pode ser feito de diversas formas.
A maneira mais simples é com objetos Literais:

<pre><code class="language-js">var obj = {};

// verificando o tipo da variável obj
console.log(typeof obj); // "object"
</code></pre>

Podemos também criar usando a classe **_Object_** mencionada acima:

<pre><code class="language-js">var obj = new Object();

// verificando o tipo da variável obj
console.log(typeof obj); // "object"    
</code></pre>

Para adicionar propriedades e métodos a um objeto literal é muito simples:

<pre><code class="language-js">// passando as propriedades e métodos na criação do objeto literal
var obj = {
    // propriedades
    nome: 'banana',
    cor: 'amarelo',

    // métodos
    toString: function() {
        console.log(this.nome + ", " + this.cor);
    }
};
</code></pre>

Note que separamos as propriedades e os métodos por vírgula. O JavaScript é uma linguagem muito
dinâmica, então podemos atachar métodos e propriedades dinamicamente
em tempo de execução:

<pre><code class="language-js">var fruta = {};

// propriedades
fruta.nome = 'pêra';
fruta.cor = 'verde';

// métodos
fruta.toString = function() {
    console.log(this.nome + ", " + this.cor);
}

fruta.toString(); // 'pêra, verde'
</code></pre>

Note também que usamos a palavra-chave reservada <code class="inline">this</code> dentro dos métodos.
O <code class="inline">this</code> nesse caso represent a o dono do método, nesse caso o 
objeto <code class="inline">fruta</code>.

O <code class="inline">this</code> no JavaScript nem sempre é o que esperamos que seja. O valor
dele depende muito do contexto e estar confortável sobre o valor do <code class="inline">this</code>
no JavaScript é talvez o mais complicado da linguagem.

Ok, criamos nossos primeiros objetos. Agora vamos criar novas frutas.

<pre><code class="language-js">var banana = new fruta(); // TypeError: fruta is not a constructor</code></pre>

Ops, deu erro. Os códigos acima criam apenas objetos literais pra uso imediato, para serem passados
por parâmetro, pra encapsularem dados e/ou funções, entre outos usos, muito útil em programação
funcional, mas não muito usual em programação orientada a objetos.

Para criarmos novas instâncias do nosso objeto <code class="inline">fruta</code>,
com dados diferentes para cada uma, precisamos fazer uso de classes e no JavaScript
classes são *Funções Construtoras*.

##Funções Construtoras

**Classes em JavaScript são funções construtoras** de objetos. Como qualquer classe em orientação a objetos, elas possuem
estado (locais para armazenamento de dados) e comportamento (funcionalidades e métodos públicos e privados).

O estado do objeto são variáveis e os métodos, além das classes, também são funções.
Podemos verificar isso investigando o objeto _String_ do JavaScript:

<pre><code class="language-js">// o objeto String é uma função
console.log(typeof String); // "function"

// criando uma instância do objeto String
var st = new String("abc");

// o método split do objeto String também é uma função
console.log(typeof st.split); // "function"
</code></pre>

Com isso comprovamos que classes e métodos em JavaScript são todos funções. Isso é possível
pois funções no JavaScript são objetos de primeira classe, isso significa que podemos
tratá-las como qualquer outro objeto, passando-as como parâmetro para outras funções,
assinalando-as a variáveis e por ai em diante.

A diferença de funções construtoras é que elas servem para construir e retornar novos objetos.

É muito simples criar uma função construtora. Basta criar uma função que não retorna nada. Por
convenção usamos a primeira letra em maiúscula:

 <pre><code class="language-js">function Fruta() {};</code></pre>

 E usamos da seguinte forma:

<pre><code class="language-js">var banana = new Fruta();
var morango = new Fruta();
</code></pre>

Muito simples!

Agora vamos deixá-la mais usual, parecendo-se mais com uma classe.

Para que possamos instanciar novos objetos com estados e comportamente, precisamos fazer o 
uso do <code class="inline">this</code>, como mostrado a seguir:

<pre><code class="language-js">function Fruta(nome, cor) {
    this.nome = nome;
    this.cor = cor;
    this.toString = function() {
        console.log(this.nome + ", " + this.cor);
    }
}
</code></pre>

Agora podemos criar novas instâncias de Fruta com dados:

<pre><code class="language-js">var banana = new Fruta('banana', 'amarelo');
var pera = new Fruta('pêra', 'verde');

banana.toString(); // "banana, amarelo"
pera.toString(); // "pêra, verde"
</code></pre>

Acabamos de criar uma classe em JavaScript e duas instâncias dessa classe.

A classe que criamos acima é uma função construtora que define propriedades e métodos com o <code class="inline">this</code>.
Com isso conseguimos novas instâncias dessa classe executando a função precedida da palavra-chave
<code class="inline">new</code> que retornará um novo objeto.

Todo objeto em JavaScript criado com a palavra-chave <code class="inline">new</code>
tem uma propriedade extra chamada <code class="inline">constructor</code> que aponta de volta
para a função construtora usada para construí-lo. Podemos checar isso da seguinte forma:

<pre><code class="language-js">console.log(banana.constructor);

/* imprime: function Fruta(nome, cor) {
  this.nome = nome;
  this.cor = cor;
  this.toString = function () {
      window.runnerWindow.proxyConsole.log(this.nome + ", " + this.cor);
  };
}*/
</code></pre>

Podemos até criar novas instâncias da classe com a propriedade <code class="inline">constructor</code>
através de qualquer instância da classe:

<pre><code class="language-js">var pera = new banana.constructor("pêra", "verde");

pera.toString(); // "pêra, verde"
</code></pre>

Nos exemplos acima estamos usando, além de classes e objetos, um conceito muito básico
do paradigma de orientação a objetos: **polimorfismo**.

Toda função em JavaScript herda
de _Object_. O _Object_ é uma classe/função construtora e possui um método chamado
<code class="inline">toString()</code> que está sendo sobrescrito na nossa classe
construtora Fruta pelo método de mesmo nome <code class="inline">toString()</code>.

Podemos checar essa herança da seguinte forma:

<pre><code class="language-js">var banana = new Fruta('banana', 'amarelo');
var pera = new Fruta('pêra', 'verde');

// verificando se nossos objetos fruta são instâncias de Fruta
console.log(banana instanceof Fruta); // true
console.log(pera instanceof Fruta); // true

// verificando se a função construtora Fruta é uma instâcia/herda de Object
console.log(Fruta instanceof Object); // true

// do mesmo jeito que String, Boolean e Number também são instâncias/herdam de Object
console.log(String instanceof Object); // true
console.log(Boolean instanceof Object); // true
console.log(Number instanceof Object); // true
</code></pre>

##We Have a Problem Captain

Criar múltiplas instâncias de objetos usando a estrutura do código anterior
consome bastante memória pois, nessa abordagem, cada instância de um objeto é
completamente distinta das outras, ou seja, elas são instâncias do mesmo objeto porém
não compartilham nada entre si. São completamente independentes.

Isso significa que as funções usadas nos métodos de cada instância da classe não
compartilham o mesmo espaço de memória.

Podemos verificar isso no código abaixo:

<pre><code class="language-js">function Fruta(nome, cor) {
    this.nome = nome;
    this.cor = cor;
    this.toString = function() {
        console.log(this.nome + ", " + this.cor);
    }
}

var banana = new Fruta("banana", "amarelo");
var banana2 = new Fruta("banana", "amarelo");

// Para cada instância é criada uma nova função diferente para toString()
console.log(banana.toString === banana2.toString); // false

// O que é um desperdiço de memória já que elas fazem exatamente a mesma coisa
banana.toString(); // "banana, amarelo"
banana2.toString(); // "banana, amarelo"

// E se quisermos extender um método em tempo de execução,
// teremos que alterar instância por instância 
banana2.toString = function() {
    console.log("");
}

banana.toString(); // "banana, amarelo"
banana2.toString(); // ""
</code></pre>

Além disso, já que essas instâncias não compartilham nada entre si, não conseguimos extender
a classe dinamicamente, teremos que alterar cada uma das instâncias da classe unicamente.

Aterar funcionalidades de uma instância única, sem passar pela classe e sem compartilhar
com as outras instâncias, é uma característica muito comum em [linguagens dinâmicas](https://en.wikipedia.org/wiki/Dynamic_programming_language)
e é conhecida como [Monkey patch](https://en.wikipedia.org/wiki/Monkey_patch), encontrada também em
[Ruby](https://www.ruby-lang.org/en/), [Phyton](https://www.python.org/)
e diversas outras linguagens dinâmicas.

Porém esse comportamento pode nos trazer grandes problemas lidando com programação orientada
a objetos, por isso é uma má prática, pois em algum momento ficaremos confusos em relação ao que
cada instância do objeto pode ou não fazer e qual é realmente a responsabilidade
da classe que os criou, causando muitas vezes comportamentos estranhos. Além de tudo,
estaremos ferindo os dois primeiros princípios básicos de orientação a objetos definidos
em [S.O.L.I.D](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)).

Em alguns casos, como em programação funcional, esse comportamento certamente é de
bom uso. Porém, em orientação a objetos sempre é uma melhor prática extender a classe.

##Porquê o Padrão _prototypes_ é o Ideal?

Toda função em JavaScript, e portanto toda função construtora, tem um protótipo. O protótipo
de uma função é uma propriedade dela que descreve seus métodos e propriedades. Podemos extender esses métodos alterando o
protótipo da função e/ou herdando o protótipo de outra função.

Esse protótipo está disponível em uma propriedade chamada <code class="inline">prototype</code>.
Toda função em JavaScript tem essa propriedade.

<code class="inline">prototype</code> é um objeto
que contém todos os métodos e propriedades associados a uma instância de uma função/classe criada com a palavra-chave <code class="inline">new</code>.

O protótipo de toda função é _Object_ e pode ser extendido. Vamos analisar nossa função/classe Fruta:

<pre><code class="language-js">function Fruta(nome, cor) {
    this.nome = nome;
    this.cor = cor;
}

console.log('Protótipo de Fruta:', Fruta.prototype); // "Protótipo de Fruta:" [object Object] { ... }
</code></pre>

Como esperado o protótipo da nossa função Fruta é o obeto _Object_ que, como já mencionado, é
a função construtora de todas as funções no JavaScript.

Sabendo que o JavaScript é uma linguagem dinâmica e com esse nosso novo conhecimento de que
funções têm a propriedade <code class="inline">prototype</code> e que essa é um objeto,
podemos adicionar nossas próprias propriedades e métodos nesse objeto.

Vamos criar a mesma classe Fruta usando <code class="inline">prototype</code> e entender
como que com prototype instânciamos objetos de maneira mais eficiente.

###Métodos no Prototype

Nesse exemplo mostro como adicionar métodos no <code class="inline">prototype</code> ao
invés de colocar direto no <code class="inline">this</code> e qual é a diferença.

Além disso vamos ver que métodos e variáveis privadas são definidos dentro da classe, fora
do <code class="inline">this</code>.

<pre><code class="language-js">function Fruta(nome, cor) {
    this.nome = nome;
    this.cor = cor;

    // variável acessível apenas dentro da classe
    var _variavelPrivada;
  
    this.metodoPrivilegiado = function () { 
        // privilegiado pois acessa variáveis privadas e é acessível externamente 
        _variavelPrivada = 0;
        console.log(_variavelPrivada);
    };
}

// adicionando o método toString à nossa classe
Fruta.prototype.toString = function() {
    console.log(this.nome + ", " + this.cor);
}

var banana = new Fruta("banana", "amarelo");
var pera = new Fruta("pêra", "verde");
var laranja = new Fruta("laranja", "laranja");

// A definição da função toString() é compartilhada entre as instâncias
console.log(banana.toString === pera.toString); // true

// O que é um disperdiço de memória já que elas fazem a mesma coisa
banana.toString(); // "banana, amarelo"
pera.toString(); // "pêra, verde"
laranja.toString(); // "laranja, laranja"

// mudanças no prototype afetam todas as instâncias existentes
// e futuras da classe
Fruta.prototype.toString = function() {
    console.log(this.nome.split("").reverse().join(""));
}

banana.toString(); // "ananab"
pera.toString(); // "arêp"
laranja.toString(); // "ajnaral"

// podemos redefinir dinamicamente um método de uma única instância
// o JavaScript vai criar uma função separada somente pra ele
pera.toString = function() {
    console.log("");
}

// pera agora tem o metodo toString independente
console.log(banana.toString === pera.toString); // false

banana.toString(); // "ananab"
pera.toString(); // ""
laranja.toString(); // "ajnaral"


// toString de banana e laranja continuam sendo a mesma função
console.log(banana.toString === laranja.toString); // true

// acessando variável privada
banana.metodoPrivilegiado(); // 0
</code></pre>

Como a propriedade <code class="inline">prototype</code> é um objeto, podemos também definir
nossas propriedades e métodos no estilo de objetos literais:

<pre><code class="language-js">function Fruta() {}

// adicionando o método toString à nossa classe
Fruta.prototype = {
    nome: "",
    cor: "",

    setNome: function(nome) {
        this.nome = nome;
    },

    setCor: function(cor) {
        this.cor = cor;
    },

    toString: function() {
        console.log(this.nome + ", " + this.cor);
    }
}

var banana = new Fruta();
banana.setNome("banana");
banana.setCor("amarelo");

var pera = new Fruta();
pera.setNome("pêra");
pera.setCor("verde");

var laranja = new Fruta();
laranja.setNome("laranja");
laranja.setCor("laranja");

banana.toString(); // "banana, amarelo"
pera.toString(); // "pêra, verde"
laranja.toString(); // "laranja, laranja"
</code></pre>

Note que podemos assinalar propriedades e funções no <code class="inline">prototype</code>.
Porém variáveis de instância como <code class="inline">nome</code> e <code class="inline">cor</code>
são dados específicos de cada instâncias e o JavaScript vai criar referências únicas
para cada propriedade de qualquer forma, não tendo assim diferença no impacto de uso da memória.

Sabendo disse é considerado por convenção uma boa prática definir métodos no <code class="inline">prototype</code>
e propriedades no <code class="inline">this</code>, dentro da função.

<pre><code class="language-js">function Fruta(nome, cor) {
    // propriedades dentro da função, usando o this
    this.nome = nome;
    this.cor = cor;
}

// e métodos no prototype
Fruta.prototype.toString = function() {
    console.log(this.nome + ", " + this.cor);
}
</code></pre>

##Encapsulamento, métodos estáticos e propriedades estáticas

No código abaixo temos uma abordagem de como podemos encapsular uma variável privada, criar
métodos privados e estáticos assim como valores estáticos como é o caso de um contador de 
instâncias da classe.

<pre><code class="language-js">function Fruta(nome, cor) {
    this.nome = nome;
    this.cor = cor;

    // incrementa quantidade de objetos instanciados
    // executado toda vez que uma instância é criada
    Fruta.incrementaQntInstancia();

    // propriedade privada, é acessada somente dentro da classe
    var _variavelPrivada = 0;

    // método privado, é acessado somente dentro da classe
    function metodoPrivado() {
        _variavelPrivada++;
    }

    // métodos privilegiados, é público e tem acesso a variáveis privadas,
    // é único pra cada instância
    this.incrementaVariavelPrivada = function() {
        metodoPrivado();
    }

    // encapsulando a variável privada
    this.getVariavelPrivada = function() {
        return _variavelPrivada;
    }

    this.setVariavelPrivada = function(valor) {
        _variavelPrivada = valor;
    }
}

// adicionando o método toString à nossa classe via prototype
// ficando assim compartilhado entre as instância e extensível
Fruta.prototype.toString = function() {
    console.log(this.nome + ", " + this.cor);
}

// propriedade estática, instâncias não tem acesso 
Fruta.qntInstancias = 0;

// método estático, instâncias não tem acesso 
Fruta.incrementaQntInstancia = function() {
    Fruta.qntInstancias++;
};

var banana = new Fruta("banana", "amarelo");
var pera = new Fruta("pêra", "verde");
var laranja = new Fruta("laranja", "laranja");
var morango = new Fruta("morango", "vermelho");

// imprime propriedade estática da classe Fruta
console.log("Quantidade de instâncias de Fruta: " + Fruta.qntInstancias); // 4

banana.setVariavelPrivada(1);
pera.setVariavelPrivada(2);
laranja.setVariavelPrivada(3);
morango.setVariavelPrivada(4);

banana.incrementaVariavelPrivada();

console.log("Variável privada de banana: " + banana.getVariavelPrivada()); // 2
console.log("Variável privada de pera: " + pera.getVariavelPrivada()); // 2
console.log("Variável privada de laranja: " + laranja.getVariavelPrivada()); // 3
console.log("Variável privada de morango: " + morango.getVariavelPrivada()); // 4
</code></pre>

##Funções/Objetos/Arrays

Uma coisa legal de entender em JavaScript é que funções são objetos de primeira classe e
objetos, em seu nível mais baixo, são arrays associativos de chave e valor. Então funções
também são arrays.

Cada propriedade e método de um objeto é definido como um item de array.

Podemos comprovar isso acessando propriedades e métodos em _array style_ e percorrendo
os itens desse array:

<pre><code class="language-js">var banana = new Fruta("banana", "amarelo");

// acessando propriedades
console.log(banana.nome); // "banana"
// ou
console.log(banana["nome"]); // "banana"

// executando o método toString()
banana.toString(); // "banana, amarelo"
// ou
banana["toString"](); // "banana, amarelo"

// percorrendo os itens do array
for(item in banana) {
    console.log(item); // "nome", "cor", "toString"
}
</code></pre>

Podemos também definir métodos estáticos para nossa função/classe e acessá-los depois
estaticamente também em _array style_:

<pre><code class="language-js">var Fruta = function(nome, cor) {
    this.nome = nome;
    this.cor = cor;
}

// definindo uma propriedade estática
Fruta['qntInstancias'] = 0;

// definindo um método estático que incrementa a propriedade estática
Fruta['incrementaQntInstancia'] = function() {
    Fruta['qntInstancias']++;
};

// executanto o método estático
Fruta['incrementaQntInstancia']();

// imprimindo o novo valor da propriedade estática
console.log(Fruta['qntInstancias']);  // 1

</code></pre>

##Prototypal Inheritance

Podemos fazer uma herança prototípica e extender a classe Fruta adicionando novas funcionalidades
a ela.

Isso é conhecido como [Prototypal Inheritance](https://en.wikipedia.org/wiki/Prototype-based_programming).
O JavaScript não tem um sistema de herança devido a sua natureza prototípica e funcional.
Porém podemos combinar funções através de seus protótipo.

Podemos tabém sobrescrever métodos da superclasse em nossa subclasse chamando nossa
classe/função através do método <code class="inline">.call()</code> existente em toda função
Javascript.

Vamos supor que queremos que Fruta herde as funcionalidades de uma classe chamada Natureza com
os métodos nascer, crescer e morrer:

<pre><code class="language-js">// criando a superclasse Natureza
function Natureza(nome, cor) {
    this.nome = nome;
    this.cor = cor;
};

// Adicionando comportamentos em seu objeto prototype
Natureza.prototype.nascer = function () {
    console.log(this.nome + ' ' + this.cor + ' nascendo...');
}

Natureza.prototype.crescer = function () {
    console.log(this.nome + ' ' + this.cor + ' crescendo...');
}

Natureza.prototype.morrer = function () {
    console.log(this.nome + ' ' + this.cor + ' morrendo...');
}

// checando o protótipo de Natureza
console.log('Protótipo de Natureza', Natureza.prototype);

/* "Protótipo de Natureza"
[object Object] { -> Percebe-se que Natureza herda todos métodos de Object adicionando
seus próprios métodos abaixo:
crescer: function () {
    window.runnerWindow.proxyConsole.log(this.nome + ' ' + this.cor + ' crescendo...');
},
morrer: function () {
    window.runnerWindow.proxyConsole.log(this.nome + ' ' + this.cor + ' morrendo...');
},
nascer: function () {
    window.runnerWindow.proxyConsole.log(this.nome + ' ' + this.cor + ' nascendo...');
}
}*/

// criando a subclasse Fruta
function Fruta(nome, cor, temSemente) {
    // chamando o construtor da superclasse e passando
    // o objeto atual como contexto
    Natureza.call(this, nome, cor);

    this.temSemente = temSemente;
};

// checando o protótipo de Fruta
console.log('Protótipo de Fruta', Fruta.prototype);

// como esperado o protótipo de Fruta é Object
// "Protótipo de Fruta" [object Object] {

// extendendo Fruta (herança prototípica)
Fruta.prototype = Natureza.prototype;

// adicionando um método específico para frutas
Fruta.prototype.temSemente = function() {
    console.log(this.temSemente);
}

// checando novamente o protótipo de Fruta
console.log('Novo Protótipo de Fruta', Fruta.prototype);

/* Fruta agora tem todos os métodos de Object, todos os métodos de Natureza
e o seu método especializado temSemente()
"Novo Protótipo de Fruta"
[object Object] {
crescer: function () {
    window.runnerWindow.proxyConsole.log(this.nome + ' ' + this.cor + ' crescendo...');
},
morrer: function () {
    window.runnerWindow.proxyConsole.log(this.nome + ' ' + this.cor + ' morrendo...');
},
nascer: function () {
    window.runnerWindow.proxyConsole.log(this.nome + ' ' + this.cor + ' nascendo...');
},
temSemente: function () {
    window.runnerWindow.proxyConsole.log(this.temSemente);
}
} */
</code></pre>

Agora podemos utilizar nossa classe Fruta da seguinte maneira:

<pre><code class="language-js">var uva = new Fruta("uva", "roxa", true);
var morango = new Fruta("morango", "vermelho", false);

uva.nascer(); // "uva roxa nascendo..."
morango.nascer(); // "morango vermelho nascendo..."

uva.crescer(); // "uva roxa crescendo..."
morango.crescer(); // "morango vermelho crescendo..."

uva.morrer(); // "uva roxa morrendo..."
morango.morrer(); // "morango vermelho morrendo..."
</code></pre>

Herança prototípica é mais potente que a herança tradicional encontrada em muitas linguagens
tradicionais, pois com protótipos é possível herdar várias classes e criar uma nova classe.
Com isso podemos herdar comportamentos de duas ou mais
classes na nossa classe Fruta. Por exemplo, Fruta tem comportamentos da classe Natureza e pode
ter comportamento de uma nova classe chamada FrutasDoPoloNorte com um método chamado seProtegerDoFrio.

#Object.create()

O ECMAScript 5 introduziu o método estático <code class="inline">create</code> no objeto
<code class="inline">Object</code>.

[Object.create()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
permite-nos construir objetos de uma maneira muito simples com os parâmetros opcionais
<code class="inline">proto</code> que especifica o protótipo no qual o novo objeto será baseado e
<code class="inline">propertiesObject</code> que especifica propriedades e descritores dessas
propriedades que serão atachadas no novo objeto criado. Sua sintaxe é a seguinte: 

**Object.create(proto, [, propertiesObject])**

Como os objetos literais criados em tempo de execução, <code class="inline">Object.create()</code>
não é muito usual em programação orientada a objetos, porém é muito útil em programação
funcional.

Esse método é apenas uma maneira mais fácil de criarmos objetos literais e únicos,
mencionados no começo desse artigo.

Ao invés de fazermos isso:

<pre><code class="language-js">// cria um objeto herdando o protótipo de Object  
var obj = {};
</code></pre>

Agora podemos definir explicitamente qual o protótipo queremos herdar: 

<pre><code class="language-js">// cria um objeto herdando o protótipo de Object 
var obj = Object.create(Object.prototype);

// o mesmo resultado acima é obtido com:
var obj = Object.create({});
</code></pre>

Por exemplo: 

<pre><code class="language-js">function MyClass() {}

// cria um objeto herdando o protótipo de MyClass 
var obj = Object.create(MyClass.prototype);

console.log(obj.constructor); // function MyClass() {}
</code></pre>

Temos também a possibilidade de definir propriedades do objeto com os descritores 
<code class="inline">writable</code> que indica se o campo é apenas leitura ou não,
<code class="inline">enumerable</code> indicando se essa propriedade pode ser listada em um laço,
<code class="inline">configurable</code> que define se o tipo da propridade pode mudar e se
ela pode ser deletada do objeto correspondente e <code class="inline">value</code> definindo
o valor da propriedade.

Isso é bem comum em _Factory Functions_ (funções que constróem objetos pra nós) em diversos frameworks
e bibliotecas que usamos no dia-a-dia. O [JQuery](https://jquery.com/) por exemplo
usa muito <code class="inline">Object.create()</code> debaixo dos panos pra nos entregar
objetos prontos para nosso uso.

Abaixo temos uma _Factory Function_ chamada <code class="inline">objFactory</code> que constrói
e nos retorna um objeto com uma propriedade <code class="inline">p</code> somente leitura e que não pode
ser excluída.

<pre><code class="language-js">var MyClass = function() {};

function objFactory(p) {
    // cria um objeto herdando o protótipo de MyClass e com propriedas definidas 
    return Object.create(MyClass.prototype, { p: {
                value: p,
                writable: false,
                enumerable: true,
                configurable: false
            }
        }); 
}

// pede para o factory construir o objeto com o valor de p igual a 42 
var obj = objFactory(42)

console.log(obj.p); // 42

// alterando o valor da propriedade p
obj.p = 1000;

// p continua 42 pois o writable dele está como false
console.log(obj.p); // 42

// deletando a propriedade p
delete obj.p;

// p continua existindo pois configurable foi definida como false
console.log(obj.p); // 42
</code></pre>

Sempre que você tiver uma função construtora e você estiver instanciando apenas um
objeto com ela usando <code class="inline">new</code>, talvez fique mais elegante você
substituir isso por <code class="inline">Object.create()</code>.

Podemos aplicar isso também ao fazer a herança prototípica da nossa classe Fruta:

<pre><code class="language-js">Fruta.prototype = Object.create(Natureza.prototype);</code></pre>

##As Palavras-Chaves _class_ e _extends_

O ECMAScript 2015 implementou as palavras-chaves <code class="inline">class</code> e 
<code class="inline">extends</code> que são nada mais que açúcares sintáticos para
_Funções Construtoras_ e herança usando <code class="inline">prototype</code>.

Para chegarmos no mesmo resultado da nossa classe Fruta anterior, fazemos:

<pre><code class="language-js">class MinhaClasseFruta {
    constructor(nome, cor) {
        this.nome = nome;
        this.cor = cor;
    }
        
    toString () {
        // aqui podemos chamar o método toString() da classe mãe Object
        super.toString();

        // e/ou colocar nosso código especializado 
        console.log(this.nome + ", " + this.cor);
    }
}

var banana = new MinhaClasseFruta('banana', 'amarelo');
var uva = new MinhaClasseFruta('uva', 'roxa');

// comprovando que, assim como prototype, os métodos de class são compartilhado
// entre suas instâncias
console.log(banana.toString === uva.toString); // true

banana.toString(); // 'banana, amarelo'
uva.toString(); // 'uva, roxa'
</code></pre>

A classe <code class="inline">Fruta</code> criada no primeiro exemplo e a classe
criada com a nova implementação de <code class="inline">class</code> ambas são _Funções
Construtoras_, por isso <code class="inline">class</code> também herda de _Objects_
implicitamente e são usadas do mesmo jeito: executando-as com a palavra-chave
<code class="inline">new</code>.

Então, classes também são funções no JavaScript:

<pre><code class="language-js">// retornam uma nova instância de objeto
var banana = new MinhaClasseFruta('banana', 'amarelo');

console.log(banana); // [object Object] {
  // cor: "amarelo",
  // nome: "banana"
// }

// classes continuam sendo função
console.log(MinhaClasseFruta); // function () { ... }
</code></pre>

<code class="inline">class</code> retornam uma nova instância de objeto e também é baseada
em <code class="inline">prototype</code>.

Agora herdando da superclasse Natureza:

<pre><code class="language-js">// criando a superclasse Natureza
class Natureza {
    constructor(nome) {
        this.nome = nome;
    }
    
    toString() {
        return this.nome;
    }
};

// criando a subclasse Fruta
class Fruta extends Natureza {
    constructor(nome, cor, temSemente) {
        // chamando o construtor da superclasse
        super(nome);

        this.cor = cor;
        this.temSemente = temSemente;    
    }
      
    toString() {
        let comOuSem = this.temSemente ? "com" : "sem"; 
        return super.toString() + ' ' + this.cor + ' ' + comOuSem + " semente";
    }
};

var banana = new Fruta("banana", "amarela", false);
var uva = new Fruta("uva", "roxa", true);

console.log(banana.toString()); // "banana amarela sem semente"
console.log(uva.toString()); // "uva roxa com semente"

// verificando o protótipo usado para construir o objeto uva
console.log(uva.constructor);

/* function Fruta(nome, cor, temSemente) {
      _classCallCheck(this, Fruta);

      // chamando o construtor da superclasse
      _get(Object.getPrototypeOf(Fruta.prototype), "constructor", this).call(this, nome);
      this.cor = cor;
      this.temSemente = temSemente;
  } */
</code></pre>

##Conclusão

O JavaScript, apesar de ser potente em orientação a objetos, é por natureza uma
linguagem funcional. Por isso ele não tem um sistema de herança apropriado,
porém ele tem <code class="inline">prototype</code>.

Todo objeto em JavaScript, quando criado, tem sua definição herdada de um protótipo
(<code class="inline">prototype</code>). Aliás esse protótipo também é um objeto que
por sua vez também tem um protótipo. Exceto pelo objeto _Object_, que é o último protótipo
da cadeia de protótipos ([Prototype Chain](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)).

Protótipos são definições de funções e objetos (métodos e propriedades) e neles podemos
"atachar" métodos, que também são funções. Atachando funções em protótipos nos dá a vantagem de
compartilhar a mesma referência de funções entre os objetos criados a partir desse
protótipo.

O que é mais legal em JavaScript, na minha opnião, é que ele não nos obriga a programar de uma
maneira engessada, seguindo um padrão definido por alguém, como
outras linguagens orientadas a objetos tradicionais fazem. Eu particularmete gostei
da adição do açucar sintático <code class="inline">class</code> mesmo eu não o usando muito,
acho que fica fácil para aqueles vindos de linguagens como Java e C# iniciar com e entender
JavaScript. Eu prefiro a programação funcional do javascript, mas o que eu mais gosto no JavaScript é
a liberdade que ele nos dá pra escolher o paradigma que preferirmos usar. Podemos fazer
a mesma coisa usando toda a potência da programação orientada a objetos ou apenas programação
funcional ou reativa.






