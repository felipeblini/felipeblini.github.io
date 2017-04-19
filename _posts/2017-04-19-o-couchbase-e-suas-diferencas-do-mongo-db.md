---
layout: post
title: O Couchbase e suas Diferenças do MongoDB
date: 2017-04-18 22:38:20
ref: post-009
lang: pt
country: br
feature-img: "img/couchbase-mongodb.jpg"
categories:
- Couchbase
- NoSQL
- MongoDB
- Databases
tags: 
- Couchbase
- NoSQL
- MongoDB
- Databases
- Comparações
---

O **MongoDB** e o **Couchbase** fazem parte do mundo **NoSql (Not only SQL)** que é composto
por uma vasta gama de bancos de dados, cada com sua especialidade. Temos bancos
especializados em documentos, especialistas em chave-valor, especialistas em grafos,
temos os que armazenam dados em colunas e por aí vai. Todos com algo em comum: **garantir escalabilidade!**

O **Couchbase** se garante muito bem sendo um dos líderes do segmento e é usado por apps e
sites como **Viber**, **PayPal**, **LinkedIn** e **eBay**, servindo facilmente _terabytes_ e _petabytes_ de
dados.

O Couchbase, assim como o **MongoDB**, é famoso por ser potente pois tem grande escalabilidade entre máquinas, o que
é perfeito para startup e grandes companhias que precisam distribuir suas enormes
base de dados entre vários _cores_ garantindo desempenho para seus sistemas.

O que difere os dois é que o MongoDB armazena dados em documentos `JSON`. O Coubase
também tem um potente sistema de documentos armazenados em `JSON` porém podemos dizer que ele
é híbrido pois também armazena dados em **chave-valor** (_key/value_). Diferente do MongoDB que tem
a capacidade de armazenar dados apenas em documentos, o que não é ideal para aplicações que
armazenam dados simples em quantidades extremas, como é o caso de um **chat**.

Armazenar dados em documentos pode causar armazenamento extra de _bytes_ que podemos
facilmente virar _petabytes_ de dados desnecessários para
um aplicativo que não precisa desse tipo de armazenamento. Para esses casos é preferível
utilizar armazenamento do tipo chave-valor.

## Um pouco da História do Couchbase

Muito antes do termo **NoSQL** os bancos de dados relacionais tinham a ajuda de uma tecnologia
chamada **Memcached** para atenderem a demanda de escalabilidade de aplicações modernas. 
O Memcached, usado muito hoje em dia ainda, é um sistema de armazenamento distribuído de
chave-valor usado para camada de cache distribuído de aplicações.

Os desenvolvedores do Memcached viram uma grande oportunidade de entregar mais além de cache
e entregaram novas funcionalidades como protocolos binário, melhor gerenciamento de cluster,
e o mais importante: persistência.

Esse novo produto ficou conhecido como **Membase**. Uma tecnologia disruptiva que mudou o
jeito que aplicações armazenavam dados e que rapidamente ganhou popularidade entre os
desenvolvedores que precisavam de enorme escalabilidade.

E então, paralelamente, no mundo do NoSQL, surgiu o **CouchDB** que, assim como o MongoDB, armazena documentos
em `JSON` e é potente e amigável.

O **CouchDB** e o **Membase** cresceram, ficaram maduros e os desenvolvedores dos dois
produtos se juntaram e criaram o **Couchbase**. Um novo banco de dados criado do zero e otimizado
com as melhores tecnologias dos dois produtos anteriores.

O resultado é um banco de dados NoSQL, open-source, com potente escalabilidade, extremamente
rápido, que nos dá a opção de armazenar dados em `JSON` através de documentos e em chave/valor.
E ainda nos dá a possibilidade de escalar de maneira muito fácil entre vários _cores_ devido
ao seu passado com Memcached.

Assim podemos usar suas características de chave/valor e escalabilidade para armazenar e
recuperar, por exemplo, o enorme número de mensagens que um aplicativo de _chat_ tem de maneira mais rápida
e usar sua característica de documentos para armazenar as informações de cada usuário por exemplo.

O Couchbase ainda nos dá a possibilidade de sincronizarmos nossos dados locais e _online_,
possibilitando que nosso app também funcione _offline_, sincronizando os dados quando o usuário
fica _online_ de novo.

O Couchbase pode ser baixado em [http://www.couchbase.com](http://www.couchbase.com).
