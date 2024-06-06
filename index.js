const { chromium } = require('playwright');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const log = require('loglevel');
const yargs = require('yargs');
const path = require('path');

/**
 * Configure logging level
 */
log.setLevel('info');

/**
 * Command-line arguments
 */
const argv = yargs
    .option('url', {
        alias: 'u',
        description: 'URL of the website to scrape',
        type: 'string',
        default: 'https://news.ycombinator.com/'
    })
    .option('numArticles', {
        alias: 'n',
        description: 'Number of articles to scrape',
        type: 'number',
        default: 10
    })
    .option('outputFile', {
        alias: 'o',
        description: 'Output file for saving articles',
        type: 'string',
        default: 'top_articles.csv'
    })
    .help()
    .alias('help', 'h')
    .argv;

/**
 * Configuration options
 */
const config = {
    url: argv.url,
    numArticles: argv.numArticles,
    outputFile: argv.outputFile
};

/**
 * Function to scrape top articles
 * @async
 * @function scrapeTopArticles
 */
async function scrapeTopArticles() {
    log.info('Starting browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    log.info(`Navigating to ${config.url}`);
    await page.goto(config.url);

    log.info('Extracting top articles...');
    const articles = await page.evaluate((num) => {
        const rows = document.querySelectorAll('.athing');
        const topArticles = [];
        for (let i = 0; i < Math.min(num, rows.length); i++) {
            const title = rows[i].querySelector('.titleline > a').innerText;
            const url = rows[i].querySelector('.titleline > a').href;
            topArticles.push({ title, url });
        }
        return topArticles;
    }, config.numArticles);

    await browser.close();
    log.info('Browser closed.');

    if (articles.length === 0) {
        log.warn('No articles found.');
        return;
    }

    log.info('Writing articles to CSV...');
    const writer = createObjectCsvWriter({
        path: path.join(__dirname, config.outputFile),
        header: [
            { id: 'title', title: 'Title' },
            { id: 'url', title: 'URL' }
        ]
    });

    await writer.writeRecords(articles);
    log.info(`Articles saved to ${config.outputFile}`);
}

/**
 * Main function to run the script
 */
(async () => {
    try {
        await scrapeTopArticles();
        log.info('Script completed successfully.');
    } catch (error) {
        log.error('An error occurred:', error);
    }
})();

module.exports = { scrapeTopArticles };
