puppeteer = require('puppeteer');
fs = require('fs');

fs.readFile('./content.json', 'utf8',async (err,data) => {
    if (err) {
        return console.log(err);
    }
    //console.log(data);
    let content = JSON.parse(data);
    for (pin of content.pins) {
        console.log("\n"+pin.title+"\n")
        await pinIt(pin.img, pin.title, pin.text, pin.url)
    }
});

async function pinIt(img, title, text, url) {
    //VARIAVEIS DOS INPUTS E ELEMENTOS
    let inputFile = "input[type=file]";
    let titleInput = "textarea[class='TextArea__textArea TextArea__bold TextArea__enabled TextArea__large TextArea__wrap']";
    let descriptionInput = "div[class='public-DraftStyleDefault-block public-DraftStyleDefault-ltr']";
    let alternativeButton = "#__PWS_ROOT__ > div:nth-child(1) > div.appContent > div > div > div > div.XiG.gpV.ujU.zI7.iyn.Hsu > div.XbT.zI7.iyn.Hsu > div > div > div > div.hs0.un8.C9i > div > div > div > div > div > div:nth-child(2) > div > div.l7T.ujU.zI7.iyn.Hsu > div > div:nth-child(1) > div.hjj.zI7.iyn.Hsu > div > button > div";
    let alternativeInput = "textarea[class='TextArea__textArea TextArea__enabled TextArea__small TextArea__wrap TextArea__muted']";
    let urlInput = "textarea[class='TextArea__textArea TextArea__dark TextArea__hide_scrollbars TextArea__enabled TextArea__medium TextArea__nowrap TextArea__sm']";
    let publishButton = "button[data-test-id='board-dropdown-save-button']";

    try {
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: "./pinterest_user_data",
            defaultViewport: null,
        });
        let page = await browser.newPage();

        await page.goto("https://br.pinterest.com/pin-builder/");

        //FAZ UPLOAD DA IMAGEM
        console.log("Selecionando imagem...");
        await page.waitForSelector(inputFile);
        let [fileChooser] = await Promise.all([page.waitForFileChooser(), page.click(inputFile)]);
        await fileChooser.accept([img]);

        //DIGITA O TITULO

        console.log("Digitando titulo...");
        await page.waitForSelector(titleInput);
        await page.waitForTimeout(500);
        await page.type(titleInput, title);

        //TRATA TEXTO
        if (text.length > 500) {
            text = text.substr(0, 450) + "...";
        }

        //DIGITA DESCRIÇÃO
        console.log("Digitando descrição...");
        //é necessário clicar no no elemento antes de digitar pois é div e não input nem textarea
        await page.click(descriptionInput);
        await page.type(descriptionInput, text);

        //DIGITA ALTERNATIVO
        console.log("Digitando texto alternativo...");
        await page.click(alternativeButton);
        await page.type(alternativeInput, text);

        //DIGITA A URL
        console.log("Digitando url...");
        await page.type(urlInput, url);

        //BOTÃO PUBLICAR
        console.log("Publicando...");
        try {
            await page.click(publishButton);
            await page.waitForTimeout(30000);

            console.log("Fechando navegador...");
            await browser.close();

            console.log("Esperando intervalo...");
            await page.waitForTimeout(480000);
        } catch (err) {
            console.log("Não foi possível clicar em publicar, IMAGEM INVÁLIDA?\n");
            await browser.close();
        }
    } catch (err) {
        console.log("Erro ao fazer pin\n");
        console.log(err);
        await browser.close();
    }
}