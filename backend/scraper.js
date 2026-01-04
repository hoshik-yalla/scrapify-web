import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Scrape article content from a given URL
 * Filters out navigation, ads, headers, footers, and other non-content elements
 */
export async function scrapeArticle(url) {
  try {
    // Fetch the webpage
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('script').remove();
    $('style').remove();
    $('nav').remove();
    $('header').remove();
    $('footer').remove();
    $('aside').remove();
    $('iframe').remove();
    $('.advertisement').remove();
    $('.ad').remove();
    $('.social-share').remove();
    $('.comments').remove();
    $('.related-articles').remove();
    $('[class*="sidebar"]').remove();
    $('[class*="navigation"]').remove();
    $('[class*="menu"]').remove();
    $('[id*="sidebar"]').remove();
    $('[id*="navigation"]').remove();
    $('[id*="menu"]').remove();

    // Try to find the main article content
    let content = '';
    
    // Common article selectors
    const articleSelectors = [
      'article',
      '[role="main"]',
      'main',
      '.article-content',
      '.post-content',
      '.entry-content',
      '.content',
      '#content',
      '.story-body',
      '.article-body'
    ];

    for (const selector of articleSelectors) {
      const element = $(selector).first();
      if (element.length) {
        content = element.text();
        if (content.length > 200) {
          break;
        }
      }
    }

    // Fallback: get all paragraph text
    if (!content || content.length < 200) {
      content = $('p').map((i, el) => $(el).text()).get().join('\n');
    }

    // Clean up the content
    content = content
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
      .trim();

    // Validate content length
    if (content.length < 200) {
      throw new Error('Article content too short or unable to extract meaningful text');
    }

    if (content.length > 8000) {
      // Truncate to reasonable length for processing
      content = content.substring(0, 8000);
    }

    return {
      success: true,
      content,
      url
    };

  } catch (error) {
    console.error('Scraping error:', error.message);
    throw new Error(`Failed to scrape article: ${error.message}`);
  }
}
