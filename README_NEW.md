# Hacker News Scraper

This project is a basic web scraper that uses [Playwright](https://playwright.dev/) to fetch the top articles from [Hacker News](https://news.ycombinator.com/) and saves them to a CSV file. The script is flexible and allows you to specify different websites, the number of articles to scrape, and the output file name. It also enriches the scraped data with additional details from the articles.

## Prerequisites

- Node.js (v12.18.0 or higher)
- npm (v6.14.4 or higher)

## Getting Started

Follow these instructions to set up and run the project.

### Installation

1. Install the necessary packages:

    ```bash
    npm install
    ```

### Usage

You can run the script with default settings or customize it using command-line arguments.

example: node index.js --url=https://news.ycombinator.com --numArticles=15 --outputFile=my_top_articles.csv
example with aliases: node index.js --u=https://news.ycombinator.com --n=15 --o=my_top_articles.csv

#### Default Run

To scrape the top 10 articles from Hacker News and save them to `top_articles.csv`, simply run:

```bash
node index.js
```

#### Testing

To test run

```bash
npm test
```
 2 tests will fail, but the one ran from 'index.test.js' will pass.
