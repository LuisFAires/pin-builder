# Pin Builder

Esse projeto é um bot que cria pins no seu perfil no Pinterest de forma automática para gerar backlinks.

## Como utilizar:

1. Instalar puppeteer.

    ```bash
    npm i puppeteer
    ```

2. Fazer login e após fechar a janela.

    ```bash
    node .\login.js
    ```

3. Preencher o arquivo content.json com as informações dos pins a serem criados.

4. Depois de tudo configurado basta rodar o bot.

    ```bash
    node .\pinner.js
    ```

## Observações:

* Deve ser especificado um caminho para o arquivo de imagem salvo em seu computador (**urls da web não funcionam**).

* É necessário que sua  conta tenha **pelo menos uma pasta** criada.

* O intervalo de criação dos pins não deve ser diminuido ou sua conta será penalizada.

* É recomendável a criação de no mínimo 50 pins para sua conta não ser penalizada.