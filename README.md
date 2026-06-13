# ProjectFrontEnd

Esse projeto utiliza Angular CLI [Angular CLI](https://github.com/angular/angular-cli) versão 21.2.7.

## Abrir Aplicação

A aplicação está sendo disponibilizada em dois links, um contendo uma Snapshot (versão de teste) e outro com uma versão estável

#### ⚠ Atenção ⚠ 

- O Sistema está disponível apenas no navegador Google Chrome, sendo necessário aceitar O Acesso de outros Dispositivos na sua Rede Local
- É possivel abrir a aplicação por outros navegadores e pelo celular mas podem apresentar Falhas

<img src="/src/assets/readme-photos/AceitarDispositivosRedeLocal.jpeg" width="500">

### Stable Release

Contem uma Versão MVP da aplicação onde o usuário pode avaliar, sugerir alterações e reportar bugs.

Link de Acesso a Release: https://api-search-nine.vercel.app/

### Snapshot

Essa Snap contém uma funcionalidade de verificar quantas vezes a senha foi vazada, a funcionalidade está sendo testada porém pode ser aproveitada.

** Atenção! O sistema retorna a sua senha digitada diretamente para a API HaveIBeenPowned, a senha não fica armazenada em nenhum lugar **

Ao cliacar no botão adicionar um email em central-emails um botão Verificar senha estará disponível, clique nele para testar a nova função

<img src="/src/assets/readme-photos/AdicionarEmail.png" width="500">

Digite sua senha e clique em verificar para saber quantas vezes sua senha foi vazada

<img src="/src/assets/readme-photos/VerificarVazamentoSenha.png" width="500">


Link de Acesso a Snapshot: https://project-qzii6.vercel.app/

## Uso da Aplicação

A Aplicação Abrirá na página home padrão onde você pode se direcionar para Login, Register ou contatar supporte

<img src="/src/assets/readme-photos/Home.png" width="500">

Caso você não tenha uma conta na API_Search, crie-a em Register

<img src="/src/assets/readme-photos/Register.png" width="500">

Caso já tenha, faça Login

<img src="/src/assets/readme-photos/Login.png" width="500">

Após entrar na Aplicação, você Você verá uma tela com suas contas cadastradas

<img src="/src/assets/readme-photos/CentralEmails.png" width="500">

Caso ainda não tenha uma conta, adicione uma clicando no botão Novo Email

<img src="/src/assets/readme-photos/AdicionarEmail.png" width="500">

Ao Registrar um Alerta Aparecerá indicando que o email foi registrado na sua conta

<img src="/src/assets/readme-photos/SucessAddEmail.png" width="500">

Aguarde Alguns segundos e pronto, sua conta mostrará quantas vezes foram vazadas

Para visualizar mais detalhes, clique no email cadastrado e abrirá uma lista com mais detalhes sobre onde, o que e quando foi vazado esse email.

<img src="/src/assets/readme-photos/ListLeakedEmail.png" width="500">

Ao cliclar novamente mais detalhes sobre o vazamento irão aparecer

<img src="/src/assets/readme-photos/ClicarVazamento.png" width="500">

Nos links disponíveis você pode ver noticias detalhando o vazamento e a fonte que informou

<img src="/src/assets/readme-photos/SiteLeakedFont.png" width="500">



## Uso de IA

#### Modelos Utilizados: ChatGPT/Gemini/Claude

#### Para quê foram usados:

- Na maior Parte a IA Auxiliou no Apredizado, Ajudando na busca de documentações, links de comunidades e de vídeos no Youtube que permitiu no desenvolvimento de testes unitários, criação da Pipeline, comandos para Servidor Ubuntu, criação de bancos em PostGree, ligar DNS CloudFlare em um domínio.

**Pesquisa de documentação do Crude do SpringBoot**

IA: ChatGPT FREE

PROMPT
```
Me forneça a parte da documentação oficial do SpringBoot com relação a explicação e criação do crude
```

Resultado: Aceita, Indicou links relevantes para a criação do Crude


- Alguns trechos ela Auxiliou no desenvolvimento de testes unitários para o Angular, ajuste de rotas, centralização de divs do frontend, tentativa de correção de erros e explicação de Bugs.

**Problema em disponibilizar a aplicação em multi navegadores**

IA: ChatGPT FREE

PROMPT
```
Porque minha aplicação disponível no vercel só funciona no google chrome e só quando eu habilito acesso de outros dispositivos na minha rede local + Imagem 1 apresentada no Readme
```

Resultado: Aceita Parcialmente, como não informou a solução fica aberto uma Tarefa de Revisão das atividades de CORS e de Serviços para identificar o problema

**Introdução a criação de testes no Jasmine e Karma**

IA: Gemini

PROMPT
```
Poderia me introduzir ao jasmine e karma, e me ajudar a criar um teste simples para validar o pipeline
```

Reultado: Rejeitada, a explicação não foi clara utilizando termos muito técnicos e não explicava o que eles faziam somente como implementar

**Criação de testes Unitários em Angular**

IA: Claude

PROMPT
```
A partir dessa imagem, e do arquivo spec.ts adicione os testes equivalentes para verificar se quando houver um erro de campo como: campo vázio, dominio errado, nome muito curto ele abre a janela de erro.
```

**Criação de User History**

IA: Claude

PROMPT
```
 Preciso criar as histórias de usuário para o meu projeto da faculdade, seguindo o padrão exigido pelo professor.

O sistema é uma aplicação web com front-end em Angular e back-end em Spring Boot. A ideia principal é que o usuário crie uma conta com nome, e-mail e senha — sendo que a senha deve ter no mínimo 12 caracteres, com pelo menos uma letra maiúscula, uma minúscula e um caractere especial.

Após o login, o usuário acessa uma página chamada "Contas Monitoradas", onde pode cadastrar seus e-mails para verificar se foram expostos em algum vazamento de dados. O sistema consulta a API do HaveIBeenPwned e retorna os vazamentos encontrados. Quando o usuário clica em um vazamento, aparecem mais detalhes sobre o incidente e um link para o site que documentou a ocorrência.

Além disso, o usuário pode verificar se uma senha específica já foi exposta. Por questões de segurança, essa funcionalidade não armazena nada: o front-end transforma a senha em hash SHA-1, envia apenas os 5 primeiros caracteres para o HIBP usando k-anonymity, e a comparação é feita localmente.

Por favor, crie 5 histórias de usuário no formato "Como <perfil>, eu quero <ação> para que <benefício>", cada uma cobrindo uma funcionalidade diferente do sistema. Cada história deve ter critérios de aceitação no padrão Given/When/Then, prioridade (alta/média/baixa), status (entregue, parcial ou descartada) e rastreabilidade no formato: história → issue/PR → teste automatizado.
```

Resultado: Aceita, A IA simplificou e definiu muito bem os objetivos da User History

### O que não foi feito por IA

No BackEnd descartando os testes unitários e o config o restante do código e modificações no teste unitário foram feitos a mão, com utilização paralela apenas para correção de bugs.

No FrontEnd Na questão visual, tanto css quanto html foram feitas a mão, utilizada IA apenas em correção de alinhamento de divs, os testes unitários foram feitos pela ia porem com correções a mão. Na questão de Rotas e Consumo da API foram também feitas a mão.

#### User History

##### Cadastro de nova conta

<img src="/src/assets/readme-photos/UserHistory-Photos/1.jpeg" width="500">

##### Login com email e senha

<img src="/src/assets/readme-photos/UserHistory-Photos/2.jpeg" width="500">

##### Verificar email em Vazamentos

<img src="/src/assets/readme-photos/UserHistory-Photos/3.jpeg" width="500">

##### Verificar se senha foi exposta

<img src="/src/assets/readme-photos/UserHistory-Photos/4.jpeg" width="500">

##### Ver detalhes de um vazamento e acessar a fonte

<img src="/src/assets/readme-photos/UserHistory-Photos/5.jpeg" width="500">

##### Visualizar histórico de verificações

<img src="/src/assets/readme-photos/UserHistory-Photos/6.jpeg" width="500">

## Documentação associada ao Projeto

Caso não consiga acessar algun dos links abaixo, favor enviar email a **igor.luan.solutions@gmail.com** para receber o devido acesso

### Notion

Foi documentado as primeiras partes do projeto, infelizmente ele possui um limite de uso gratuito então a documentação se encerrou na segunda refatoração de banco de dados

https://app.notion.com/p/Api-Search-35b5830b9e958078be82d86135f91bef?source=copy_link

Documentação do Servidor

https://app.notion.com/p/Ubunto-Server-3564471cb5e380be8b27e18c7a5b6515?source=copy_link

### Clickup 

Foi utilizado para a aplicação do método Kanbam utilizando kanbam board

https://app.clickup.com/90171198454/v/b/f/90178553866

### Google Agendas 

Foi uma tentativa de documentar o que cada um estava trabalhando quando acontecia mudanças no projeto porem que não eram vistas em código, porem como a demanda por execução foi maior a documentação foi deixada de lado, Periodo Relevante Antes de 15 de Maio 2026

https://calendar.google.com/calendar/u/1?cid=aWdvcnNpbHZhdG9sZWRvb2ZjQGdtYWlsLmNvbQ