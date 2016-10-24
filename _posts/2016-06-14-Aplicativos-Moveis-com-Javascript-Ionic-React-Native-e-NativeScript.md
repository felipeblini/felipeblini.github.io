---
layout: post
title:  "Aplicativos Móveis com JavaScript: Ionic, React Native e NativeScript. Qual escolher?"
ref: post-001
lang: pt
country: br
date:   2016-06-14 19:48 -0300
feature-img: "img/mobile_js.jpg"
categories:
    - ionic
    - javascript
    - nativescript
    - react native
---

O mundo dos aplicativos móveis é muito diferente do mundo Web. Para nós desenvolvedores Web que quisermos entrar nesse mundo precisamos estar concientes dessas diferenças e algumas complexidades como gerenciamento de memória, concorrências entre threads, deploy nas lojas de aplicativos, experiência do usuário na hora do download/instalação, capacidades de cada plataforma mobile e experiência do usuário são uma delas.

Felizmente no mundo dos Aplicativos Web Modernos temos visto o surgimento de vários frameworks que nos permitem abstrair todas essas complexidades, focarmos no código e desenvolvermos aplicativos móveis com o que já está em nossa caixa de ferramentas: HTML/XML, CSS e JavaScript. E o PhoneGap/Cordova também está ai pra nos ajudar.

Em um ecossistema com várias opções qual tecnologia escolher entre as diversas disponíveis do mercado? Vamos analizar três delas aqui:

Ionic
================================

O Ionic é um framework baseado no Angular (um dos mais fortes frameworks de JavaScript do mercado) para desenvolvimento de aplicativos móveis com tecnologias Web. Com o Ionic você consegue desenvolver aplicativos móveis híbridos com HTML, CSS e JavaScript para Android, iOS e Windows Phone.

Os aplicativos desenvolvidos com Ionic não são nativos mas se parecem e agem como tal, o que o Ionic faz é estilizar o HTML que você escreve para se parecer com os componentes UI nativos de cada plataforma móvel e usa o Apache Cordova para fazer tais componentes se comportarem como nativos comunicando-se com as APIs nativas.

O ionic foi criado em 2013 pela Drifty, empresa criada por 2 amigos de infância com a missão de facilitar o desenvolvimento Web e mobile e mais tarde viram a grande oportunidade de ajudar desenvolvedores a criar aplicativos móveis <i>Cross-Platform</i> usando padrões Web modernos, criaram o Ionic e receberam um investimento inicial de $1 milhão pra continuarem o desenvolvimento e hoje o Ionic é mais popular framework de desenvolvimento de aplicativos móveis do mercado com, segundo um dos fundadores, 200 apps sendo criadas com Ionic todos os dias. A comunidade realmente é gigante e você encontra suporte pra qualquer dúvida e bug que surgir durante o desenvolvimento da sua app com uma simples e rápida busca no Google.


###Vantagens:

- Baseado no Angular
- Write once, run anywhere (escreva uma vez, rode em qualquer lugar).
- A curva de aprendizagem é muito pequena, você constrói um app com pouco esforço e complexidade
- Pode visualizar seu aplicativo direto no Browser durante o desenvolvimento sem a necessidade de ficar emulando dispositivos.
- A comunidade é enorme, você consegue suporte e resolve bugs muito rápido
- Muito bem documentado e vasto número de tutoriais espalhados pela internet
- Plano de suporte para times e empresas que ajuda no desenvolvimento, testes, empacotamento, publicacão e distribuição
- Manutenção de código centralizada já que o código que roda no Android é o mesmo que roda no iOS e Windows Phone
- Mais leve
- Ecossistema de ferramentas e serviços como Inonic View, Push Notification, User Authentication, Live Deployment, Native App Package, Ionic Creator, Analytics Service e um CLI para scaffoldind de templates e comandos extremamente úteis na hora do desenvolvimento, testes e distribuição


###Desvantagens

- Problemas de performance em alguns ambientes, principalmente em Androids mais antigos
- Pode apresentar discrepâncias entre componentes UI que você escreve e o que é renderizado na plataforma nativa
- Não é seguro que funcione bem em 100% dos dispositivos


###Conclusão

O ionic é um framework incrível que te permite criar aplicativos móveis incríveis de maneira muito rápida e tem uma comunidade enorme pronta pra te ajudar, o Ionic modifica automaticamente a aparência do app dependendo da plataforma que o usuário está para funcionar de maneira fiel à experiência que o usuário está acostumado. Ele é renderizado e roda embarcado dentro de um navegador (webview) pré-existente no SO dos smartphones e que não é perceptível para o usuário final, rodando como se fosse nativo. 

Por não ser 100% nativo, pode apresentar problemas de performance principalmente em Androids mais antigos (inferiores ao 4.0) com pouco poder de processamento. O que não é um grande problema, no passado essa abordagem era impeditiva, atualmente a diferença de performance comparado ao nativo é mínima porém notável em alguns ambientes. Leve em conta também que hoje em dia cada vez mais vemos celulares munidos com hardware de alta capacidade de processamento que renderiza jogos que muitos computadores desktop não é capaz de renderizar e tecnologias como [CrossWalk Project](https://crosswalk-project.org/), que resolve o problema de performance em webviews em Androids mais antigos. Por esses motivo o Ionic não terá problema nenhum em renderizar um simples aplicativo que usa pouco hardware. Porém, como dito, funciona bem para aplicativos mais simples e de pequeno porte, que usa poucas funcionalidades nativas, onde a performance não é mandatória, ou o prazo desenvolvimento for curto, ou se for para prototipação ou o orçamento é baixo. Vale ressaltar que no Ionic 2 a história é outra, a equipe do Ionic está fazendo um trabalho incrível no Ionic 2 porém a forma de desenvolver será totalmente diferente já que este será baseado no Angular 2.


*Ionic Framework via Drifty:**

> Free and open source, Ionic offers a library of mobile-optimized HTML, CSS and JS components, gestures, and tools for building highly interactive apps. Built with Sass and optimized for AngularJS.

Site oficial: [http://ionicframework.com](http://ionicframework.com)


React Native
=================================

O React Native é baseado no React, o framework front-end criado pelo Facebook e usado no Facebook. O React é o competidor direto do Angular em relação à popularidade, tutoriais e comunidade. É um excelente framework e muito performático, como pode ser notado usando o Facebook. No React Native não é diferente, os aplicativos desenvolvidos com ele não apresentam problemas de performance já que eles são nativos! O React Native nos permite desenvolver aplicativos móveis com HTML, CSS e JavaScript. O código é compilado pra código nativo (Java, Object-C, Swift) entregando uma experiência nativa ao usuário final.

Não é uma plataforma de desenvolvimento de aplicativos híbridos. Diferente do Ionic a filosofia do React Native é “learn once, write anywhere” (aprenda uma vez, escreva em qualquer lugar), isso significa que você terá que escrever um código pra iOS e outro para Android, tendo que manter dois códigos diferenrentes, o que implica em maior custo em desenvolvimento e manutenção, o que é compensado na melhor organização de código que o React oferece e pelos aplicativos serem nativos sem gargalos de performance e discrepâncias entre componentes UI que os aplicativos que usam webview apresentam.


###Vantagens:

- Tem o Facebook por trás
- Baseado no React - Grande comuinidade e tutoriais espalhados pela internet
- Aplicativos com excelente performance no Android e iOS
- Experiência nativa para o usuário final
- Manutenção do código facilitada em projetos mais complexos devido à organização do mesmo
- Roda nativo, você escreve os components UI em React e eles são compilados em componentes UI nativos


###Desvantagens:

- Mais difícil de aprender e começar
- Não é híbrido. Precisa reescrever o código pra cada plataforma
- Escrever e manter códigos diferentes para o mesmo aplicativo em iOS e Androidd


###Conclusão:

O React Native é uma excelente opção, eu o recomendo para aplicativos mais complexos no qual performance é extremamente importante. O getting start dele não é tão simples como o Ionic, a curva de aprendizado é maior, você terá que se esforçar mais dedicando mais tempo no desenvolvimento e aprendizado e instalando SDK’s e configurando o ambiente que ele requer para emular e testar aplicativos no seu computador. Além disso se o seu aplicativo precisa rodar no Android e iOS você terá que escrever dois códigos e depois manter esses dois códigos, na minha opnião isso é o que mais fere a proposta dos aplicativos modernos: O mantra <i>Cross-Platform</i> “write once, run anywhere”. O react Native ao contrário divulga a proposta “learn once, write anywhere”. O que também não é um grande problema já que não temos muito o que fazer se quisermos aplicativos extremamente otimizados e performáticos para a plataforma alvo.

Uma introdução do React Native (em inglês): [https://www.youtube.com/watch?v=KVZ-P-ZI6W4](https://www.youtube.com/watch?v=KVZ-P-ZI6W4)


React Native via time do React Native

> React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about — learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native.

Site oficial: [https://facebook.github.io/react-native/](https://facebook.github.io/react-native/)


NativeScript
======================================

O NativeScript é um framework <i>Cross-Platform</i> que une, na minha opnião, o melhor dos dois concorrentes acima: O mantra “write once, run anywhere” do Ionic e a compilação pra código nativo do React Native. Isso significa que com o NativeScript você escreverá um único código com tecnologias Web e ele compilará esse único código para código nativo para iOS, Android e Windows Phone. Ele oferece todas as vantagens de ter um app nativo como performance e experiência do usuário escrevendo e mantendo um único código com JavaScript! Mazing!

A única diferença que pode ser um ponto negativo é que ele não usam HTML, ao invés disso você terá que escrever suas views em XML. O que mais uma vez não é um grande problema pois as tags XML são tags parecidas com as do HTML e nós como desenvolvedores estamos acostumados com XML.

O time de desenvolvimento do NativeScript foi formado em 2010 dentro da Tekerik inicialmente para desenvolvimento de components nativos para ser usados em aplicativos para o Windows Phone 7 que acabara de ser lançado. Após vários aplicativos lançados usando os componentes criados por eles, eles partiram para iOS e Android e identificaram a necessidade que as empresas e programadores têm em desenvolver o mesmo aplicativo para iOS, Android e Windows Phone gerando três códigos que fazem a mesma coisa aumentando e muito o custo de desenvolvimento, manutenção e evolução dos códigos que existiam pra resolver o mesmíssimo problema.

A necessidade era escrever e manter um único código para criar aplicativos móveis nativos para serem disponibilizados na três maiores lojas de aplicativos sem comprometer a experiência do usuário. No meio de 2014 eles lançaram o NativeScript com a proposta de atender essa necessidade.


###Vantagens:

- Write once, run everywhere. Escreva uma vez rode em qualquer lugar nativamente!
- CLI para scaffoldind de templates e comandos extremamente úteis na hora do desenvolvimento, testes e distribuição
- App nativa sem problema de performance
- Preserva a experiência nativa do usuário
- Compila JavaScript para código nativo em iOS e Android (Windows Phone em breve)
- Pode ser usado com Angular2 junto com TypeScript ou apenas em JavaScript Puro
- Manutenção e suporte em apenas um único código


###Desvantagens

- Projeto relativamente novo, comunidade relativamente pequena
- Poucos tutorias, casos de uso e issues no Github e Stack Overflow
- Mercado ainda pequeno


###Conclusão:

Manter mais de um código para o mesmo aplicativo não é muito produtivo e requer mais investimento em tecnologia, IDE, conhecimento, sistemas operacionais e APIs e mesmo assim, devido à necessidade de manter diversos códigos, muitas vezes aplicativos que deveriam se comportar da mesma maneira nas diferentes plataformas acabam tendo versões e funcionalidades diferentes.

O NativeScript possibilita publicarmos aplicativos móveis nativos nas três principais lojas de aplicativos escrevendo código com tecnologias web (XML, JavaScript e CSS) sem comprometermos a experiências nativa dos nosssos usuários, cada um em sua plataforma. O código será o mesmo para os três aplicativos. Ganhamos assim produtividade, eliminados tempo, custos e complexidade na detecção e suporte em bugs, erros e evolução do aplicativo em todas as plataformas.


**NativeScript via Telerik:**

> NativeScript enables developers to build native apps for iOS and Android while sharing the application code across the platforms. When building the application UI, developers use our libraries, which abstract the differences between the native platforms.

Site oficial: [http://www.telerik.com/nativescript](http://www.telerik.com/nativescript)

Conferência do time do NativeScript na TelerikNEXT: [https://www.youtube.com/watch?v=HWboi_9aba8](https://www.youtube.com/watch?v=HWboi_9aba8)