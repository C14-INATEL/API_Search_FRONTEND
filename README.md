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