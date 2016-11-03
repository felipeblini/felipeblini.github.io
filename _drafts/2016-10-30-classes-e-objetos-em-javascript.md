---
layout: post
title: Classes e Objetos em Javascript
date: 2016-10-30 20:29:18
categories: 
- javascript
- poo
tags: 
- javascript
- poo
---

O ECMAScript 2015 trouxe a implementação da palvara reservada <code class="inline">class</code>,
porém isso não trouxe a capacidade de orientação a objetos no JavaScript. Essa capacidade já existia desde
as primeiras versões da linguagem, tanto é que <code class="inline">class</code> sempre foi
uma palavra-chave reservada, mesmo não tendo nenhuma utilidade no passado. Isso também não alterou o sistema
de orientação a objetos do JavaScript. A palavra-chave <code class="inline">class</code> é apenas um açucar
sintético pra fazermos exatamente o que já fazíamos antes: funções construtoras de objetos.

Por isso estudar e usar o jeito antigo de criar classe, objetos, heranças e etc é essencial para o bom
entendimento da linguagem pois por de baixo dos panos tudo ainda é baseado
em <code class="inline">prototypes</code>.

Você talvez tenha ouvido falar, no passado, que o JavaScript não é uma linguagem orientada a objetos.
Mas a verdade é que sim, o JavaScript sempre foi uma linguagem orientada a objetos, tem
uma orientação a objetos completa e muito mais potente que várias linguagens clássicas do mercado. 

Sempre houve tipos primitivos e objetos no JavaScript, sendo os tipos primitivos:
- undefined
- null
- boolean
- number
- string

Sendo que boolean, number e string têm suas versões em classes, diferenciados pela primeira
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
A maneira mais fácil é com Objetos Literais:

<pre><code class="language-js">var objetoFruta = {};
    console.log(typeof objetoFruta); // "object"
</code></pre>

Podemos também criar usando a classe *Object* mencionada acima:

<pre><code class="language-js">var objetoFruta = new Object();
    console.log(typeof objetoFruta); // "object"    
</code></pre>

Para adicionar propriedades e métodos é muito simples:

<pre><code class="language-js">// passando as propriedades e métodos na criação do objeto literal
    var objetoFruta = {
        // propriedades
        nome: 'banana',
        cor: 'amarelo',

        // métodos
        toString: function() {
            console.log(this.nome + ", " + this.cor);
        }
    };
</code></pre>

Note que separamos tudo com vírgula. Podemos também criar objetos dinamicamente em tempo
de execução:

<pre><code class="language-js">var objetoFruta = {};

    // propriedades
    objetoFruta.nome = 'pêra';
    objetoFruta.cor = 'verde';

    // métodos
    objetoFruta.toString = function() {
        console.log(this.nome + ", " + this.cor);
    }

    objetoFruta.toString(); // 'pêra, verde'
</code></pre>

Note também que usamos a palavra-chave reservada <code class="inline">this</code> dentro dos métodos.
O <code class="inline">this</code> nesse caso representa o dono do métod, nesse caso o 
<code class="inline">objetoFruta</code>.

O <code class="inline">this</code> no JavaScript nem sempre é o que esperamos que seja. O valor
dele depende muito do contexto e estar confortável sobre o valor do <code class="inline">this</code>
no JavaScript é talvez o mais complicado da linguagem.

Ok, criamos nossos primeiros objetos. Agora vamos criar novas frutas.

<pre><code class="language-js">var fruta = new objetoFruta(); // TypeError: objetoFruta is not a constructor</code></pre>

Ops, deu erro. Os códigos acima criam apenas objetos literais pra uso imediato, para serem passados
por parâmetro, pra encapsularem dados e/ou funções, entre outos usos, muito útil em programação
funcional, mas não muito usual em programação orientada a objetos.

Para criarmos novas instâncias do nosso objeto <code class="inline">objetoFruta</code>,
com valores de propriedades diferentes, precisamos fazer uso de classes e no JavaScript
classes são *Funções Construtoras*.

##Funções Construtoras

**Toda classe em JavaScript é uma função construtora**. Como qualquer classe em orientação a objetos, elas possuem
estado (locais para armazenamento de dados) e comportamento (funcionalidades e métodos públicos e privados).

O estado do objeto são variáveis e os métodos, além das classes, também são funções.
Podemos verificar isso investigando o objeto String mencionano anteriormente:

<pre><code class="language-js">// o objeto String é uma função
    console.log(typeof String); // "function"

    // criando uma instância do objeto String
    var st = new String("abc");

    // o método split do objeto String é também uma função
    console.log(typeof st.split); // "function"
</code></pre>

Com isso comprovamos que a classes e métodos em JavaScript são todos funções. Isso é possível
pois funções no JavaScript são objetos de primeira classe e podem ser usadas para diversas
finalidade. Podemos passar funções como parâmetros para outras funções, assinalar funções
a variáveis e por ai vai.

A diferença de funções construtoras é que elas servem para construir e retornar novos objetos.

É muito simples criar uma função contrutora. Basta criar uma função que não retorna nada. Por
convenção usamos a primeira letra em maiúscula:

 <pre><code class="language-js">var Fruta = function() {};</code></pre>

 E usamos da seguinte forma:

<pre><code class="language-js">var appple = new Fruta();
    var banana = new Fruta();
</code></pre>

Muito simples!

Agora vamos deixá-la mais usual, parecendo-se mais com uma classe:

<pre><code class="language-js">var Fruta = function(nome, cor) {
        this.nome = nome;
        this.cor = cor;
        this.toString = function() {
            console.log(this.nome + ", " + this.cor);
        }
    }
</code></pre>

Agora sim podemos criar instâncias de Fruta:

<pre><code class="language-js">var objetoFruta = new Fruta('banana', 'amarelo');
    var objetoFruta2 = new Fruta('pêra', 'verde');

    objetoFruta.toString(); // "banana, amarelo"
    objetoFruta2.toString(); // "pêra, verde"
</code></pre>

Acabamos de criar uma classe em JavaScript e duas instâncias dessa classe.

A classe que criamos acima é uma função contrutora. Uma função construtora é uma função normal
que não retorna nada e usa o <code class="inline">this</code> pra definir propriedades e métodos.
Com isso conseguimos novas instâncias dessa classe executando a função precedida da palavra-chave
<code class="inline">new</code> que retornará um novo objeto.

Todo objeto em JavaScript criado com a palavra-chave <code class="inline">new</code>
tem uma propriedade extra chamada <code class="inline">constructor</code> que aponta de volta
para a função construtora usada para construí-lo. Podemos checar isso da seguinte forma:

<pre><code class="language-js">console.log(objetoFruta.constructor); // function (nome, cor) {
        // this.nome = nome;
        // this.cor = cor;
    // }
</code></pre>

Podemos até criar novas instâncias do objeto através da propriedade <code class="inline">constructor</code>
de qualquer instância desse objeto:

<pre><code class="language-js">var objFruta3 = new objetoFruta.constructor("nova fruta", "nova cor"); // "nova fruta, nova cor"</code></pre>

Nos exemplos acima estamos usando, além de classes e objetos, um conceito muito crucial
do paradigma de orientação a objetos: **polimorfismo**. Toda função em JavaScript herda
de Object. O Object é uma classe/função construtora e possui um método chamado <code class="inline">toString()</code>
que está sendo sobrescrito na nossa classe contrutora **Fruta** pelo nosso método
customizado de mesmo nome <code class="inline">toString()</code>.

Podemos checar essa herança da seguinte forma:

<pre><code class="language-js">var objetoFruta = new Fruta('banana', 'amarelo');
    var objetoFruta2 = new Fruta('pêra', 'verde');
    
    // verificando se nossos objetos fruta são instâncias de Fruta
    console.log(objetoFruta instanceof Fruta); // true
    console.log(objetoFruta2 instanceof Fruta); // true
    
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
completamente distinta das outras, ou seja, elas são instâncias do mesmo objetos porém
não compartilham nada entre si. São compltamente independentes.

Isso significa que as funções usadas nos métodos de cada instância do objeto não
compartilham o mesmo espaço de memória. Podemos verificar isso no código abaixo:

<pre><code class="language-js">var Fruta = function(nome, cor) {
        this.nome = nome;
        this.cor = cor;
        this.toString = function() {
            console.log(this.nome + ", " + this.cor);
        }
    }

    var banana = new Fruta("banana", "amarelo");
    var banana2 = new Fruta("banana", "amarelo");

    // Para cada instância é criada uma nova função diferente para toString()
    console.log(obj1.toString === obj2.toString); // false

    // O que é um disperdiço de memória já que elas fazem exatamente a a mesma coisa
    banana.toString(); // "banana, amarelo"
    banana2.toString(); // "banana, amarelo"

    // E nos permite aterar o método de uma única instância em tempo de execução
    banana2.toString = function() {
        console.log("");
    }

    banana1.toString(); // "banana, amarelo"
    banana2.toString(); // ""
</code></pre>

Além disso, já que essas instâncias não compartilham nada entre si, podemos alterar
funcionalidades de um objeto sem precisar passar pela classe, diretamente em sua instância
em tempo de execução.

Isso é uma característica muito comum em [linguagens dinâmicas](https://en.wikipedia.org/wiki/Dynamic_programming_language)
e é conhecida como [Monkey patch](https://en.wikipedia.org/wiki/Monkey_patch), encontrada também em
[Ruby](https://www.ruby-lang.org/en/), [Phyton](https://www.python.org/)
e diversas outras linguagens dinâmicas.

Porém esse comportamento pode nos trazer grandes problemas lidando com programação orientada
a objetos, por isso é uma má prática prática, poi deixa o código confuso em relação ao que
cada instância do objeto pode ou não fazer e qual é realmente a responsabilidade
da classe que os criou, causando muitas vezes comportamentos inesperados. Além de tudo,
estamos ferindo os dois primeiros princípios básicos de orientação a objetos definidos
em [S.O.L.I.D](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)).

Em alguns casos, como em programação funcional, esse comportamento certamente é de
bom uso. Porém em orientação a objetos sempre é uma melhor prática extender a classe.

##Porquê o Padrão _prototypes_ é o Ideal?

Toda função em JavaScript, e portanto toda função construtora, tem um protótipo. O protótipo
de uma função é uma propriedade que descreve seus métodos. Podemos extender esses métodos alterando o
protótipo da função e/ou herdandando o protótipo de outra função.

Esse protótipo está disponível em <code class="inline">prototype</code>.
Toda função em JavaScript tem essa propriedade que é um objeto contendo todos os
métodos associados à instância dessa função/classe que foi criada a partir dela
com a palavra-chave <code class="inline">new</code>.

O protótipo de toda função é _Object_. Vamos analisar nossa função/classe Fruta:

<pre><code class="language-js">var Fruta = function(nome, cor) {
        this.nome = nome;
        this.cor = cor;
    }

    console.log('Protótipo de Fruta', Fruta.prototype); // "Protótipo de Fruta" [object Object] { ... }
</code></pre>

Como esperado o protótipo da nossa função Fruta é o obeto _Object_ que, como já mencionado, é
a função construtora de todas as funções no JavaScript.

Sabendo que o JavaScript é uma linguagem dinâmica e com esse nosso novo conhecimento de que
funções têm a propriedade <code class="inline">prototype</code> e que essa é um objeto,
podemos adicionar nossas próprias propriedades e métodos nesse objeto.

Vamos criar a mesma classe usando <code class="inline">prototype</code> e entender como com
prototype criamos instânciamos objetos de maneira mais eficiente:

<pre><code class="language-js">var Fruta = function(nome, cor) {
        this.nome = nome;
        this.cor = cor;
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

    // as funções não são mais a mesma
    console.log(banana.toString === pera.toString); // false

    banana.toString(); // "ananab"
    pera.toString(); // ""
    laranja.toString(); // "ajnaral"

    // toString de pêra é agora uma função distinta
    console.log(banana.toString === pera.toString); // false

    // toString de banana e laranja continuam sendo a mesma função
    console.log(banana.toString === laranja.toString); // true
</code></pre>

Como a propriedade <code class="inline">prototype</code> é um objeto, podemos definir nossas
propriedades e métodos no estilo de objetos literais:

<pre><code class="language-js">var Fruta = function() {}

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
Porém variáveis de instância como <code class="inline">nome</code> e <code class="inline">nome</code>
são dados personalizados para cada instâncias e o JavaScript vai criar referências únicas
para cada propriedade de qualquer forma não tendo assim diferença no uso da memória.
Coloque propriedades no <code class="inline">prototype</code> somente se você quiser assinalar
valores iniciais para elea cada vez que uma instância nova é criada.

Então é uma boa prática seguir essa convenção: métodos no <code class="inline">prototype</code>
e propriedades dentro da função, definidas com o <code class="inline">this</code>, exemplo:

<pre><code class="language-js">var Fruta = function(nome, cor) {
        // propriedades dentro da função
        this.nome = nome;
        this.cor = cor;
    }

    // métodos no prototype
    Fruta.prototype.toString = function() {
        console.log(this.nome + ", " + this.cor);
    }
</code></pre>

Uma coisa legal de entender em JavaScript é que objetos em seu nível mais baixo são arrays
associativo de chave e valor. Cada propriedade e função de um objeto é definida
como um item desse array.

Podemos comprovar isso acessando propriedades e métodos no
estilo de arrays e percorrendo os itens desse array:

<pre><code class="language-js">var banana = new Fruta("banana", "amarelo");

    // acessando propriedades
    console.log(banana.nome); // "banana"
    console.log(banana["nome"]); // "banana"
    
    // executando o método toString()
    banana.toString() // "banana, amarelo"
    banana["toString"](); // "banana, amarelo"

    // percorrendo os itens do array
    for(item in banana) {
        console.log(item); // "nome", "cor", "toString"
    }
</code></pre>

#Prototypal Inheritance

Podemos fazer uma herança prototípica e extender a classe fruta adicionando novas funcionalidades
a ela. Isso é conhecido como [Prototypal Inheritance](https://en.wikipedia.org/wiki/Prototype-based_programming).
Vamos supor que queremos que Fruta herde as funcionalidades de uma classe chamada Natureza com
os métodos nascer, crescer e morrer:

<pre><code class="language-js">// criando a superclasse Natureza
    function Natureza() {};

    // Adicionando comportamntos em seu objeto prototype
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
    [object Object] { -> Percebe-se que Natureza herda todos métodos de Object adicionando seus próprios metodos abaixo:
    crescer: function () {
        window.runnerWindow.proxyConsole.log(this.nome + ' ' + this.cor + ' crescendo...');
    },
    morrer: function () {
        window.runnerWindow.proxyConsole.log(this.nome + this.nome + ' ' + this.cor + ' morrendo...');
    },
    nascer: function () {
        window.runnerWindow.proxyConsole.log(this.nome + ' ' + this.cor + ' nascendo...');
    }
    }*/

    // criando a subclasse Fruta
    function Fruta(nome, cor, temSemente) {
        this.nome = nome; 
        this.cor = cor;
        this.temSemente = temSemente
    };

    // checando o protótipo de Fruta
    console.log('Protótipo de Fruta', Fruta.prototype);

    // como esperado o protótipo de Fruta é Object
    // "Protótipo de Fruta" [object Object] {

    // extendendo Fruta
    Fruta.prototype = Natureza.prototype;

    // adicionando um método específico para frutas
    Fruta.prototype.temSemente = function() {
        console.log(this.temSemente);
    }

    // checando novamente o protótipo de Fruta
    console.log('Novo Protótipo de Fruta', Fruta.prototype);

    /* Fruta agora tem todos os métodos de Object, de Natureza e o seu método específico temSemente()
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
    morango.nascer() // "morango vermelho nascendo..."

    uva.crescer(); // "uva roxa crescendo..."
    morango.crescer() // "morango vermelho crescendo..."

    uva.morrer(); // "uva roxa morrendo..."
    morango.morrer(); // "morango vermelho morrendo..."
</code></pre>

Ainda podemos sobrescrever métodos da superclasse em nossa subclasse:

<pre><code class="language-js">function Natureza(datanascimento) {
        this.datanascimento = datanascimento;
    };

    function Fruta(nome, cor, temSemente, dataNascimento) {
        // chamando o construtor da superclasse
        Natureza.call(this, dataNascimento);

        this.nome = nome; 
        this.cor = cor;
        this.temSemente = temSemente
    };

    var dataNascimento = new Date().toDateString();

    var uva = new Fruta("uva", "roxa", true, dataNascimento);

    console.log(uva.datanascimento); // "Wed Nov 02 2016"

</code></pre>

#Object.create()

O ECMAScript 5 introduziu o método estático <code class="inline">create</code> no objeto
<code class="inline">Object</code>. [Object.create()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
permitindo-nos uma maneira muito simples de criar novos objetos com os parâmetros opcionais
<code class="inline">proto</code> que especifica o protótipo no qual o novo objeto será baseado e
<code class="inline">propertiesObject</code> que especifica propriedades e descritores dessas
propriedades que serão atachadas no novo objeto. Sua sintaxe é a seguinte: 

**Object.create(proto, [, propertiesObject])**

Como objetos literais criados em tempo de execução, _Object.create_ não é muito útil 
em programação orientada a objetos, porém é muito útil em programação funcional.
Esse método é apenas uma maneira mais fácil de criarmos objetos literais, mencionados no
começo desse artigo.

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

Temos também a possibilidade de definir propriedades do objeto com descritores 
<code class="inline">writable</code> que indica se o campo é apenas leitura ou não,
<code class="inline">enumerable</code> indicando se essa propriedade pode ser listada em um for..in
<code class="inline">configurable</code> que define se o tipo da propridade pode mudar e se
ela pode ser deletada do objeto correspondente e <code class="inline">value</code> definindo
o valor da propriedade. 

<pre><code class="language-js">var MyClass = function() {};

    var properties = {
        p: {
             value: 42,
             writable: false,
             enumerable: true,
             configurable: false
            }
        };

    // cria um objeto herdando o protótipo de MyClass e com propriedas definidas 
    var obj = Object.create(MyClass.prototype, properties);

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


É bem comun em Factory Function em vários frameworks que usamos, o
[JQuery](https://jquery.com/) usa bastante <code class="inline">Object.create()</code>
por baixo dos panos.

Sempre que você tiver uma função construtora, porém você está instanciando apenas um
objeto dela usando <code class="inline">new</code>, talvez fique mais elegante você
substituir isso por <code class="inline">Object.create</code>.

====================================


Usando o açúcar sintético <code class="inline">class</code> pra chegarmos no mesmo
resultado, fazemos:

<pre><code class="language-js">class ClasseFruta {
        constructor(nome, cor) {
            this.nome = nome;
            this.cor = cor;
        }
            
        toString () {
            // aqui podemos chamar o método toString() da classe mãe Object
            super.toString();

            // e/ou colocar nosso código customizado 
            console.log(this.nome + ", " + this.cor);
        }
    }

    var objetoFruta = new Fruta('banana', 'amarelo');
    var objetoFruta2 = new Fruta('pêra', 'verde');

    objetoFruta.toString(); // 'banana, amarelo'
    objetoFruta2.toString(); // 'pêra, cor-de-pêra'
</code></pre>

A classe <code class="inline">Fruta</code> criada no primeiro exemplo e a classe
<code class="inline">ClasseFruta</code> criada com a nova implementação
<code class="inline">class</code> ambas são Funções Construtoras e fazem a mesma coisa:
são chamadas com a palavra-chave <code class="inline">new</code> e retornam o objeto criado.

<pre><code class="language-js">console.log(ClasseFruta); // function() { ... }
    console.log(Fruta); // function () { ... }
</code></pre>

Com a implementação de <code class="inline">class</code> no ES2015 podemos extender
classes com a palavra-chave <code class="inline">extends</code> seguida do nome da classe mãe,
como mostrado abaixo:

<pre><code class="language-js">class Animal {
        constructor () {}

        sayHello() {
            return 'Hey There!';
        }
    }

    // a classe LogView está estendendo a classe View
    class Cao extends Animal {
        sayHello() {
            var saudacoes = super.sayHello();
            console.log(saudacoes);
        }
    }
</code></pre>


O JavaScript, apesar de ser potente em orientação a objetos, é por natureza uma
linguagem funcional. Por isso ele não tem um sistema de herança apropriado,
porém ele tem <code class="inline">prototype</code>.

Todo objeto em JavaScript, quando criado, tem sua definição herdada de um protótipo
(<code class="inline">prototype</code>). Aliás esse protótipo também é um objeto que
por sua vez também tem um protótipo. Exceto pelo objeto _Object_, que é o último protótipo
da cadeia de protótipo ([Prototype Chain](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)),
todos os objetos no JavaScript tem um protótipo.

Protótipos são funções construtoras de objetos (classes) e nele podemos atachar métodos,
que também são funções. Atachando funções em protótipo nos dá a vantagem de que todos os
objetos instânciados compartilharão a mesma referência da função que define um método,
por exemplo:

<pre><code class="language-js">var Animal = function (nome) {
    this.nome = nome;
    }

    Animal.prototype.sayHello = function() {
    console.log(this.nome + ' esta dizendo Olá');
    }

    var animal1 = new Animal('Bob');

    animal1.sayHello();

    Animal.prototype.sayHello = function() {
        console.log(this.nome + ' agora fala inglês, Hello!');
    }

    animal1.sayHello(); // 'Bob esta dizendo Olá'

    animal2 = new Animal('Jack'); // 'Bob fala inglês agora, Hello!'

    animal2.sayHello(); // 'Jack fala inglês agora, Hello!'
</code></pre>







O que é mais legal em JavaScript, na minha opnião, é que ele não nos obriga a programar
com orientação a objetos como outras linguagens tradicionais fazem. Eu particularmete gostei
da adição do açucar sintético <code class="inline">class</code> mesmo eu não o usando,
acho que fica fácil para aqueles vindo de linguagens como Java e C# começar e entender JavaScript.
Eu prefiro a programação funcional do javascript, mas o que eu mais gosto no JavaScript é
a liberdade que ele nos dá pra escolher o paradigma que preferirmos usar. Podemos fazer
a mesma coisa usando toda a potência da programação orientada a objetos ou apenas programação
funcional.






