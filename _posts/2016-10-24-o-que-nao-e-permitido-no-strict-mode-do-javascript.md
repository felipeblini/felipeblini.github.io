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
feature-img: "img/black-164164_1280.jpg"
---

A diretiva <code class="inline">"use strict";</code> do JavaScript foi incluída no **ECMAScript 5** e define
que o código JavaScript será executado em _Strict Mode_ (modo restrito), o que nos obriga a
seguir algumas regras de codificação para escrevermos um código mais “seguro”.

##Porquê _Strict Mode_?

O JavaScript é uma linguagem muito dinâmica e flexível, o que nos permite escrever código
sem seguir nenhuma convenção e fazer coisas muito estranhas que em qualquer outra linguagem
nunca seria permitido. Como por exemplo usar uma variável sem declará-la antes.

O problema é que essa liberdade toda pode causar comportamentos estranhos do código podendo
se as vezes de difícil identificação e correção.

Com o _Strict Mode_ ativado o JavaScript fica menos flexível e o interpretador irá sempre
retornar um erro e travar a execução do código sempre que encontrar alguma dessas
“coisas estranhas” no código. O que ele basicamente faz então é converter “coisas estranhas”
em erros reais. Isso nos dá mais segurança de que nosso código vai se comportar como o
esperado.

##Como e Onde Declarar o Stric Mode?

O _Strict Mode_ é ativado adicionando o literal <code class="inline">“strict mode”;</code>
no começo de scripts ou de funções e se aplica apenas ao contexto onde foi inserido.
Caso seja inserido no começo do script, será aplicado a todo o código.
Caso for incluído no começo de uma função será aplicado apenas no contexto da função.

##As “Coisas Estranhas” que o _Strict Mode_ não permite

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


