---
layout: post
title:  "Como eu diminui um Page Load de 1 minuto para 15 segundos em uma página feita com WordPress"
ref: post-003
lang: pt
country: br
date: 2016-09-08 21:27 -0300
feature-img: "img/motorcycle-696027_1280.jpg"
categories:
    - wordpress
    - performance
---

Este foi um trabalho que eu fiz para um hostel em [Budapeste - Hungria](https://www.lonelyplanet.com/hungary/budapest).
O site do hostel foi feito com WordPress e apresentava extrema lentidão no carregamento da página,
e discrepâncias e erros na responsividade do layout quando visitado em telas pequenas.

O site não tinha nenhum tipo de otimização. O antigo desenvolvedor apenas instalou o WordPress, adicionou o template [Nice Hostel](https://themeforest.net/item/nice-hotel-wordpress-theme/2661854) e entregou
um Page Load de incríveis 1:09. Muito tempo de espera para um site onde uma das _Personas_ é
o(a) viajante com pressa para reservar um quarto, não?

Pois é, a missão dada foi diminuir esse tempo de espera para poucos segundos e um carregamento
total da página para no máximo 15 segundos sob uma conexão de 1mbps com o cache desabilitado,
ou seja, quando o usuário estiver visitando o site pela primeira. Outra tarefa era melhorar a reponsividade do site.

Eis o resultado:

<iframe src="https://player.vimeo.com/video/157547302" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<em>Missão dada é missão cumprida</em>

Concordam que agora ficou muito mais rápido pra um viajante recém chegado em Budapeste,
acessar o site e reservar um quarto, certo?

Enquanto agora o cara navega pelos quartos, vê as fotos e já reserva um quarto,
no site antigo o usuário ainda estaria esperando a página ser carregada, tédio!

E ficou claro que a taxa de desistência do site diminuiu de 65% pra quase 0% e o hostel agora
não está perdendo mais nenhuma visita e faturando muito mais.

##Como foi possível fazer tamanha melhoria em um Page Load?

Primeiro, nenhum arquivo Javascript e CSS deve ser colocado em produção sem antes ser **minificado e uglificado**.
Existem diversas maneiras de se fazer isso e vários plugins no WordPress que fazem isso pra gente.
A maneira que eu prefiro fazer é baixar e abrir localmente o tema usado no WordPress, identificar todas as dependências do front-end,
analizá-las e **eliminar código desnecessário** e depois **minificar, uglificar** e **concatenar** com qualquer
ferramenta.

Se as alterações no tema forem frequentes é recomendo automatizar esse processo com o 
[Grunt](http://gruntjs.com/) ou o [Gulp](http://gulpjs.com/).
No caso desse projeto eu minifiquei e concatenei com ferramentas online mesmo e preservei o original (muito importante)
já que alterações futuras seriam muito pontuais. Uma das dependências que eu identifiquei e eliminei e que estava
consumindo muito tempo de carregamento, por exemplo, foi o leitor de _feeds RSS_ que esse tema possui como padrão
e que não era usado em nenhum momento pelo site, era um download desnecessário.

A concatenação dos arquivos (junção dos estilos em um único arquivo CSS e dos JavaScripts em um único arquivo JS)
é recomendado pois os navegadores carregam um número limitado de arquivos por vez, em blocos,
e até que esse bloco seja totalmente carregado os outros arquivos ficam na fila de espera
e isso atrasa o carregamento da página. Então se você tem mais de 1 CSS na página é uma boa prática
juntá-los em um único CSS, assim o navegador carrega todos em uma única requisição evitando atrasos no download de outros recursos da página e
diminuindo drasticamente o carregamento. Identifiquei também muitos códigos CSS inline e incorporado em tags HTML. Removi e coloquei
em arquivos CSS externos. CSS's inline podem reduzem o número de requisições porém aumenta o tamanho do HTML.
Em alguns casos pode ser bom, porém deve ser analizado com atenção.
Nesse projeto específico tinha muito CSS inline e incorporado, então valeu a pena criar um css externo.

Depois podemos dar ao usuário uma percepção de que o site está sendo carregado mais rápido, aumentando
o tempo de resposta da renderização do HTML.
Fazemos isso **referenciando os arquivos nos lugares certos** no HTML. Estilos **CSS dentro da
tag head** e _scripts_ **JavaScript no final da página**. O navegador
precisa fazer o download e executar cada _script_ JS e isso bloqueia o carregamento de outros recursos até
que isso seja feito pra cada _script_. Colocando-os no final da página nós garantimos que até
chegar o momento de executar _scripts_, a parte mais importante da página, feita somente com HTML e os estilos CSS,
já estará visível para o usuário ao invés dele ficar vendo uma tela em branco (como era o caso, mostrado no vídeo acima).

Pra melhorar ainda mais esse carregamento foi feito **compressão dos htmls e assets com GZIP**, todas **imagens** foram
**otimizadas**, configuradas para **carregar progressivamente** e depois **comprimidas** manualmente, usando a técnica
[_Lossy Compression_](https://en.wikipedia.org/wiki/Lossy_compression)
com o [TinyJpg](https://tinyjpg.com/) e o [TinyPng](https://tinypng.com/) e depois instalado
o plugin [TinyImg](https://br.wordpress.org/plugins/tiny-compress-images/) no WordPress pra que
todas as próximas imagens _"upadas"_ fossem comprimidas automaticamente.

Outro grande gargalo identificado foi a imagem de fundo da página. Como era basicamente um fundo preto com
um desenho simples, feita erroneamente em um JPG grande, a solução foi extrair esse desenho, transformá-lo em um PNG pequeno, otimizá-lo
e repetí-lo no eixo x do _viewport_ junto com uma cor de _background_ preta, eliminando assim muitos _kilobytes_ de download e espera do usuário.

Temas de WordPress carregam muita coisa desnecessária que muitas vezes nunca são usadas e só fazem aumentar o tempo de carregamento da página.
Esse era também o caso desse projeto, muitos recursos do tema estavam sendo carregados e nunca usados.
Foi necessário então identificar todas essas dependências e eliminá-las.
Podemos fazer isso manualmente, porém existem plugins no WordPress como o
[Asset Queue Manager](https://wordpress.org/plugins/asset-queue-manager/) que nos
ajudam com isso e foi usado neste caso para esse propósito.

E para as bibliotecas JavaScript de terceiros é recomendado configurar execução assíncrona
com o atributo <code class="inline">async</code> que também pode ser feita com o <code class="inline">defer</code>, exemplo:

<pre><code class="language-markup">&lt;script async src="https://third-party.com/resource.js" />
</code></pre>

Isso faz com que o _script_ seja executado assincronamente, assim que ele estiver disponível, não bloqueando a continuação do carregamento da página. 
Em navegadores que não suportam esse atributo, existe outra maneira de fazer isso, como mostrado abaixo:

<pre><code class="language-javascript">(function(d, t) {
    var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    g.src = 'https://third-party.com/resource.js';
    s.parentNode.insertBefore(g, s);
}(document, 'script'));
</code></pre>

É claro que você precisa tomar cuidado para não quebrar outros _scripts_ que dependem desse _script_
pois a ordem de inserção dos _script_ na página, nesse caso, deixa de ser relevante.

Outra coisa que melhora muito a performance no mobile é criar
**versões específicas de imagens para telas pequenas**. O usuário que está acessando o site pelo celular 
em uma tela de 320px de largura, por exemplo, não precisa fazer o download de uma imagem com 780px de largura.
Nesse caso foram criados _breakpoints_ no CSS que carregam e exibem imagens específicas
para telas pequenas, médias e grandes.  

Além de tudo isso, todo o código JavaScript do tema foi refatorado e muito código refeito para
usar abordagens mais performáticas e recomendadas. Um exemplo é guardar o tamanho do array em
_loops for_ eliminando esse cálculo de ser feito em cada interação, otimizando assim a performance do JavaScript.
Isso é feito como mostrado no exemplo abaixo:

<pre><code class="language-javascript">var arr = new Array(1000),
    len, i;

for (i = 0; i < arr.length; i++) {
  // Ruim - o tamanho precisa ser calculado 1000 vezes
}

for (i = 0, len = arr.length; i < len; i++) {
  // Bom - o tamanho só é calculado 1 vez e depois armazenado
}
</code></pre>

<em>Fonte: https://browserdiet.com/pt/#cache-array-lengths</em>

Um site muito legal que serve como um guia definitivo criado por [Zeno Rocha](https://zenorocha.com/)
pra todo esse processo de melhoria de performance
é o [https://browserdiet.com/pt/](https://browserdiet.com/pt/).


E no final de tudo isso o feedback recebido pelo cliente foi:

> Man, you are the best! Thanks a lot!!!!!!!!!!!!!!

You're welcome! :)

