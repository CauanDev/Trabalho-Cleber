# Trabalho 2 - Sistema de Gestão de Restaurante

## Descrição do Projeto
O Sistema de Gestão de Restaurante tem como objetivo gerenciar pedidos, funcionários e reservas de uma maneira eficiente e fácil de usar, implementado em PHP utilizando Composer, NPM e outras tecnologias modernas.

## Pré-requisitos

Antes de iniciar, você precisará garantir que os seguintes programas estejam instalados no seu ambiente:

1. **PHP**: O PHP é necessário para executar o servidor e o backend da aplicação.
   - Versão recomendada: PHP 7.4 ou superior.
   
2. **Composer**: O Composer é um gerenciador de dependências para o PHP. Ele facilita a instalação das bibliotecas necessárias para o projeto.
   - [Instalação do Composer](https://getcomposer.org/download/)

3. **NPM**: O NPM (Node Package Manager) é utilizado para gerenciar as dependências do front-end.
   - [Instalação do NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Instalação do Projeto

Siga os passos abaixo para configurar o projeto no seu ambiente local:

1. **Clone o repositório**

   Primeiramente, clone o repositório para o seu diretório local:

   ```bash
   git clone https://github.com/CauanDev/Trabalho-Cleber.git
   cd Trabalho-Cleber
   ```
2. **Instale as dependências PHP**
   ```bash
     composer install
   ```
3. **Instale as dependências JavaScript**
   ```bash
    npm install
   ```
4. **Configuração do ambiente**
    ```bash
    cp .env.example .env (Ou copie o arquivo .env.example e renomeie para .env somente)
    ```
5. **Configuração do Banco de Dados**

   Dentro do arquivo .env, configure corretamente o banco de dados, preenchendo as variáveis de conexão conforme necessário:
   ```bash
    DB_CONNECTION=pgsql
    DB_HOST=localhost
    DB_PORT=5432
    DB_DATABASE=laravel
    DB_USERNAME=root
    DB_PASSWORD=
   ```
6. **Rodando as Migrations**
   Dentro da pasta do projeto, rode o seguinte comando:
   ```bash
   php artisan migrate
   ```
7. **Executando o Projeto**
   Dentro da pasta do projeto, rode os seguintes comando:
   ```bash
   npm run build
   php artisan serve
   ```
8. **Acesse o Sistema**
    Após executar os dois comandos, abra o servidor de desenvolvimento do Laravel para acessar a aplicação.

