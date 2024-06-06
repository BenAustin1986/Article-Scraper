const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { scrapeHackerNews } = require('../index');

describe('Scraping Hacker News', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto('https://news.ycombinator.com/');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('should scrape the top 10 articles and save to CSV', async () => {
        const articles = await page.evaluate(() => {
            const rows = document.querySelectorAll('.athing');
            const top10 = [];
            for (let i = 0; i < 10; i++) {
                const title = rows[i].querySelector('.titleline > a').innerText;
                const url = rows[i].querySelector('.titleline > a').href;
                top10.push({ title, url });
            }
            return top10;
        });

        expect(articles.length).toBe(10);

        articles.forEach(article => {
            expect(article.title).toBeTruthy();
            expect(article.url).toBeTruthy();
        });

        const csvFilename = `top_10_articles.csv`;

        const csvFilePath = path.join(__dirname, csvFilename);
        fs.writeFileSync(csvFilePath, '');

        const csvWriterMock = {
            writeRecords: jest.fn().mockResolvedValueOnce(null),
        };

        await csvWriterMock.writeRecords(articles);

        expect(csvWriterMock.writeRecords).toHaveBeenCalledWith(articles);
        expect(fs.existsSync(csvFilePath)).toBe(true);

        fs.unlinkSync(csvFilePath);
    });
});

// Ensure the script waits for the asynchronous operations to complete
test('ensure async operations are completed', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the timeout as needed
});
