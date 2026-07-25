export class CrawlerHelper {
    // Pievienojam jaunu privato mainigo, lai saglabātu sākuma URL
    private visited = new Set<string>();
    // Pievienojam jaunu privato mainigo, lai saglabātu nākamos apmeklējamās lapas URL
    private toVisit: string[] = []; // Sākotnēji tukšs masīvs
    // Pievienojam jaunu privato mainigo, lai saglabātu apmeklēto lapu skaitu
    private pagesCount = 0;
    // Pievienojam jaunu privato mainigo, lai ierobežotu apmeklēto lapu skaitu
    private readonly maxPages = 30;
    // Pievienojam jaunu privato mainigo, lai saglabātu pareizrakstības kļūdu ziņojumu
    private spellingReport: Array<{ url: string; errorsCount: number; errors: any[] }> = [];

    // Pievienojam startUrl parametru, ko varēs padot no testiem
    reset(startUrl: string) {
        // Resetējam visited un toVisit masīvus, kā arī pagesCount un spellingReport
        this.visited.clear();
        this.toVisit = [startUrl]; // Sākam ar to adresi, ko iedosim
        // Resetējam apmeklēto lapu skaitu un pareizrakstības kļūdu ziņojumu
        this.pagesCount = 0;
        // Resetējam pareizrakstības kļūdu ziņojumu
        this.spellingReport = [];
    }

    visitNextUrl() {
        // ... vecais kods bez izmaiņām no testa
        if (!this.toVisit.length || this.pagesCount >= this.maxPages) {
            cy.log('Crawling complete or max pages limit reached.');
            cy.writeFile('cypress/results/pages.json', Array.from(this.visited));
            cy.writeFile('cypress/results/spelling-errors.json', this.spellingReport);
            return;
        }
        // Pievienojam logu, lai redzētu, kādas lapas vēl ir jāapmeklē
        cy.log(`to visit: ${this.toVisit.join(', ')}`);
        // Pievienojam logu, lai redzētu, cik lapas jau ir apmeklētas
        const url = this.toVisit.shift();
        // Pievienojam logu, lai redzētu, kura lapa tiek apmeklēta
        this.visited.add(url!);
        this.pagesCount++;

        // Pievienojam faila nosaukumu, lai saglabātu ekrānšāviņus ar unikāliem nosaukumiem
        cy.visit(url!, { failOnStatusCode: false });
        // Pievienojam logu, lai redzētu, kura lapa tiek apmeklēta
        cy.screenshot(`page-snapshot-${this.pagesCount}`, {
            capture: 'fullPage'
        });

        cy.url().then((currentUrl) => {
            // Pārbaudām, vai lapa ir ielādēta un vai ir teksts, ko var pārbaudīt
            cy.document().then((doc) => {
                const text = doc.body.innerText;
                if (text && text.length > 20) {
                    const sample = text.substring(0, 3000);

                    cy.request({
                        method: 'POST',
                        url: 'https://api.languagetool.org/v2/check',
                        form: true,
                        body: {
                            language: 'en-US',
                            text: sample
                        },
                        failOnStatusCode: false
                    }).then((response) => {
                        if (response && response.body && response.body.matches) {
                            const spellingErrors = response.body.matches.filter(
                                (m: any) => m.rule.issueType === 'misspelling'
                            );

                            if (spellingErrors.length > 0) {
                                this.spellingReport.push({
                                    url: currentUrl,
                                    errorsCount: spellingErrors.length,
                                    errors: spellingErrors.map((e: any) => ({
                                        message: e.message,
                                        context: e.context?.text,
                                        suggestions: e.replacements?.map((r: any) => r.value).slice(0, 3)
                                    }))
                                });
                            }
                            expect(spellingErrors.length).to.be.lessThan(30);
                        }
                    });
                }
            });
        });

        cy.get('a')
            .should(Cypress._.noop)
            .then(($links) => {
                const links = $links
                    .toArray()
                    .map((link) => link.getAttribute('href'))
                    .filter((href): href is string => href !== null);

                // Apstrādājam saites: ja tās ir relatīvas, pievienojam bāzes domēnu, lai kravlers nepazustu
                const currentOrigin = new URL(url!).origin;
                const processedLinks = links.map((href) => {
                    if (href.startsWith('/')) {
                        return `${currentOrigin}${href}`;
                    }
                    return href;
                }).filter((href) => href.startsWith(currentOrigin)); // Pārliecināmies, ka nepārejam uz citām lapām

                const newUniqueLinks = processedLinks.filter(
                    (link) => !this.visited.has(link) && !this.toVisit.includes(link)
                );
                this.toVisit.push(...newUniqueLinks);

                this.visitNextUrl();
            });
    }
}

export const crawlerHelper = new CrawlerHelper();