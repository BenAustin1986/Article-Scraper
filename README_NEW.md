# Hacker News Scraper
This project is a basic web scraper that uses Playwright to fetch the top articles from Hacker News and saves them to a CSV file. The script is flexible and allows you to specify different websites, the number of articles to scrape, and the output file name. It also enriches the scraped data with additional details from the articles.

## Prerequisites
Node.js (v12.18.0 or higher)
npm (v6.14.4 or higher)
Getting Started
Follow these instructions to set up and run the project.

### Cloning the Repository
Clone the repository from GitHub:
git clone https://github.com/BenAustin1986/QA_WOLF_TAKE_HOME.git
cd Article-Scraper

### Installation
Install the necessary packages:
npm install

### Usage
You can run the script with default settings or customize it using command-line arguments.

Example:
node index.js --url=https://news.ycombinator.com --numArticles=15 --outputFile=my_top_articles.csv

Example with aliases:
node index.js --u=https://news.ycombinator.com --n=15 --o=my_top_articles.csv
Default Run

To scrape the top 10 articles from Hacker News and save them to top_articles.csv, simply run:
node index.js

#### Testing
To run the tests:
npm test
Note: Two tests will fail, but the test in index.test.js will pass.
