import { crawlerHelper } from '../../../support/crawlerHelper';

describe('Crawler Test Suite', () => {

    beforeEach(() => {
        crawlerHelper.reset('https://uitestingplayground.com/');
        cy.task('deleteOldReportsAndScreenshots');
    });

    it('crawls the website, checks links, takes screenshots and validates spelling', () => {
        // Sākam kravlošanas procesu ar helpera palīdzību
        crawlerHelper.visitNextUrl();
    });

});