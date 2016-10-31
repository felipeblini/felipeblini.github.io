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
uma palavra reservada, mesmo não tendo nenhuma utilidade no passado. Isso também não alterou o sistema
de orientação a objetos do JavaScript. A palavra <code class="inline">class</code> é apenas um açucar
sintético pra fazermos exatamente o que já fazíamos antes: funções construtoras de objetos.

Por isso estudar e usar o jeito antigo de criar classe, objetos, heranças e etc é essencial para o bom
entendimento da linguagem pois por de baixo dos panos tudo ainda é baseado
em <code class="inline">prototypes</code>.

Você talvez tenha ouvido falar, no passado, que o JavaScript não é uma linguagem orientada o objetos.
Mas a verdade é que o JavaScript sempre foi uma potente linguagem orientada a objetos.

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

**Toda classe em JavaScript é uma função** com propriedades e funcionalidades. Podemos testar isso
imprimindo a classe String na tela:

<pre><code class="language-js">console.log(String);</code></pre>

Isso vai imprimir:

<pre><code class="language-markup">function String() { [native code] }</code></pre>

Com isso comprovamos que a classe <code class="inline">String</code> é uma função, e isso serve para qualquer classe.

Podemos chamar _classes_ em JavaScript de **Funções Construtoras** ou **Objetos Construtores**.

Criar objetos no JavaScript é trivial. Isso pode ser feito da seguinte forma:

<pre><code class="language-js">// objeto literal
    var objetoFruta = {};

    // ou usando a função construtora Object()

    var objetoFruta2 = new Object();
</code></pre>

Verificando os tipos das variáveis:

<pre><code class="language-js">typeof fruta; // 'object'
    typeof fruta2; // 'object'
</code></pre>

Para adicionar propriedades e métodos é muito simples:

<pre><code class="language-js">// passando as propriedades e métodos na criação do objeto literal
    var objetoFruta = {
        nome: 'banana',
        cor: 'amarelo',
        toString: function() {
            console.log(this.nome + ", " + this.cor);
        }
    };

    //ou usando a natureza dinâmica do JavaScript
    
    var objetoFruta2 = {};

    objetoFruta2.nome = 'pêra';
    objetoFruta2.cor = 'verde';
    objetoFruta2.toString = function() {
        console.log(this.nome + ", " + this.cor);
    }

    objetoFruta2.cor = 'cor-de-pêa';

    objetoFruta.toString(); // 'banana, amarelo'
    objetoFruta2.toString(); // 'pêra, cor-de-pêra'
</code></pre>

Note que assim como as classes, métodos também são funções. Isso é possível pois funções no JavaScript
são objetos de primeira classe e podem ser usadas para diversos objetivos, inclusive passadas 
como parâmetros em outras funções e assinaladas a variáveis.

Note também que usamos a palavra reservada <code class="inline">this</code> que referencia
os donos dos métodos, no caso os objetos <code class="inline">objetoFruta</code> e
<code class="inline">objetoFruta2</code>.

O <code class="inline">this</code> no JavaScript nem sempre é o que esperamos que seja. O valor
dele depende muito do contexto e estar confortável sobre o valor do <code class="inline">this</code>
no JavaScript é talvez o mais complicado na linguagem.

O código acima cria apenas instâncias objetos, não muito usual em uma programação orientada
a objetos.

Se quisermos criar novas instâncias do nosso objeto
<code class="inline">objetoFruta</code> nos depararemos com um erro:

<pre><code class="language-js">var fruta3 = new objetoFruta(); // TypeError: objetoFruta is not a constructor</code></pre>

Para fazermos isso criamos funções construtoras. Que fazem o papel de classes no JavaScript e
que podem ser instanciadas, como mostrado no códugo abaixo:

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

    objetoFruta.toString(); // 'banana, amarelo'
    objetoFruta2.toString(); // 'pêra, cor-de-pêra'
</code></pre>

Nos dois códigos acima estamos usando, além de classes, outra cnceito do paradigma de
orientação a objetos: **polimorfismo**. Toda função em JavaScript herda de Object, e Object
possui um método chamado <code class="inline">toString()</code> que está sendo sobrescrito
pelo nosso método customizado de mesmo nome <code class="inline">toString()</code>.

Podemos checar essa herança da seguinte forma:

<pre><code class="language-js">// verificando se nossas frutas são instâncias de Fruta
    console.log(objetoFruta instanceof Fruta); // true
    console.log(objetoFruta2 instanceof Fruta); // true
    
    // verificando se a função construtora Fruta é uma instâcia de Object
    console.log(Fruta instanceof Object); // true

    // do mesmo jeito que String, Boolean e Number também são
    console.log(String instanceof Object); // true
    console.log(Boolean instanceof Object); // true
    console.log(Number instanceof Object); // true
</code></pre>

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
são chamadas com a palavra <code class="inline">new</code> e retornam o objeto criado.

<pre><code class="language-js">console.log(ClasseFruta); // function() { ... }
    console.log(Fruta); // function () { ... }
</code></pre>

##Porquê o Padrão _prototypes_ é o Ideal?

Criar múltiplos objetos usando a estrutura do código anterior (com ou sem a palavra <code class="inline">class</code>)
consome bastante memória pois cada instância de um objeto é completamente distinto das outras.
Isso significa que a memória usada para referenciar as funções (métodos) de uma instância
não é compartilhada entre todas as outras. Podemos verificar isso no código abaixo:

<pre><code class="language-js">var Fruta = function(nome, cor) {
        this.nome = nome;
        this.cor = cor;
        this.toString = function() {
            console.log(this.nome + ", " + this.cor);
        }
    }

    var obj1 = new Fruta("fruta 1", "cor 1");
    var obj2 = new Fruta("fruta 2", "cor 2");

    // redefinindo o método de uma instância de um objeto
    obj2.toString = function() {
        console.log("Cada instância de Fruta têm suas próprias definições de funções");
    }

    obj1.toString(); // imprime 'fruta 1, cor 1'
    obj2.toString(); // imprime 'Cada instância de Fruta têm suas próprias definições de funções'
    // comprovando que a referência desse método para obj2 é única para essa instância 
</code></pre>





O que é mais legal em JavaScript, na minha opnião, é que ele não nos obriga a programar
com orientação a objetos como outras linguagens tradicionais fazem. Eu particularmete gostei
da adição do açucar sintético <code class="inline">class</code> mesmo eu não o usando,
acho que fica fácil para aqueles vindo de linguagens como Java e C# começar e entender JavaScript.
Eu prefiro a programação funcional do javascript, mas o que eu mais gosto no JavaScript é
a liberdade que ele nos dá pra escolher o paradigma que preferirmos usar. Podemos fazer
a mesma coisa usando toda a potência da programação orientada a objetos ou apenas programação
funcional.






