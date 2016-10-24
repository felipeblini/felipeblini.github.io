---
layout: post
title: O Que não é Permitido no ‘Strict Mode’ do Javascript?
date: 2016-10-24 10:09:41
categories: 
- JavaScript
tags: 
- javascript
ref: post-004
lang: pt
country: br
---

A diretiva <code class="inline">"use strict";</code> do JavaScript foi incluída no *ECMAScript 5* e define
que o código JavaScript será executado em _Strict Mode_ (modo estrito), o que nos obriga a
seguir algumas regras de codificação para escrevermos um código mais “seguro”.

##Porquê Strict Mode?

O JavaScript é uma linguagem muito dinâmica e “liberal”, o que nos permite escrever código sem convenção nenhuma e fazer coisas muito estranhas que em qualquer outra linguagem nunca seria permitido. Como por exemplo usar uma variável sem declará-la antes.

O problema é que essa liberdade pode causar comportamentos estranhos e de difícil identificação e correção.

Com o Strict Mode ativado o interpretador do JavaScript irá sempre retornar um erro e travar a execução do código sempre que encontrar alguma dessas “coisas estranhas” no código. O que ele basicamente faz então é converter “coisas estranhas” em erros reais. Isso nos dá mais segurança de que nosso código vai se comportar como o esperado.

##Como e Onde Declarar o Stric Mode?

O __stric mode__ é ativado adicionando <code class="inline">“strict mode”;</code> no começo do script ou de uma função e se aplica apenas ao contexto onde foi inserido. Caso seja inserido no começo do script, será aplicado em todo o código. Caso for incluído no começo de uma função será aplicado apenas no contexto da função.

##As “Coisas Estranhas” que o __Strict Mode__ não permite

####Utilizar variável sem declarar

<pre><code class="language-js">"use strict";
x = 3.14;  // isso vai retornar um erro
obj = {p1:10, p2:20}; // também vale para objetos
var y = 3.14 // ok
</code></pre>


####Deletar variáveis ou objeto

<pre><code class="language-js">"use strict";
var x = 3.14;
delete x;  // isso vai retornar um erro
</code></pre>


####Deletar função

<pre><code class="language-js">"use strict";
function x(p1, p2) {}; 
delete x;  // isso vai retornar um erro
</code></pre>


####Duplicar nome de parâmetros

<pre><code class="language-js">"use strict";
function x(p1, p1) {}; // isso vai retornar um erro
</code></pre>


####Números em Octal

<pre><code class="language-js">"use strict";
var x = 010; // isso vai retornar um erro
</code></pre>


####Caracteres de Escape

<pre><code class="language-js">"use strict";
var x = \010; // isso vai retornar um erro
</code></pre>


####Escrever em uma propriedade read-only

<pre><code class="language-js">"use strict";
var obj = {};
Object.defineProperty(obj, "x", {value:0, writable:false});

obj.x = 3.14; // isso vai retornar um erro
</code></pre>


####Escrever em uma propriedade get-only

<pre><code class="language-js">"use strict";
var obj = {get x() {return 0} };

obj.x = 3.14; // isso vai retornar um erro
</code></pre>


####Deletar uma propriedade que não pode ser deletada

<pre><code class="language-js">"use strict";
delete Object.prototype; // isso vai retornar um erro
</code></pre>


####Usar palavras reservadas como ‘arguments’ e ‘eval’ em nome de variáveis

<pre><code class="language-js">"use strict";
var eval = 3.14; // isso vai retornar um erro

var arguments = 3.14; // isso também vai retornar um erro

// Isso serve também para as palavras reservadas:
// implements
// interface
// let
// package
// private
// protected
// public
// static
// yield
</code></pre>


####Usar a declaração while

<pre><code class="language-js">"use strict";
with (Math){x = cos(2)}; // isso vai retornar um erro
</code></pre>


####Restrição na função eval()

A função <code class="inline">eval()</code> não pode criar variáveis no escopo onde ela é usada

<pre><code class="language-js">"use strict";
eval ("var x = 2");
alert (x); // a variável 'x' não existe aqui
</code></pre>


