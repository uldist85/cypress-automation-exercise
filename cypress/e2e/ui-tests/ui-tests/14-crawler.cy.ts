describe('Crawler Test Suite', () => {



    it('crawls the website and checks for broken links', () => {

        // Izveidojam Set, lai saglabātu apmeklētos URL, lai izvairītos no atkārtotas apmeklēšanas
        //Atšķirībā no parasta masīva ([]), Set ir maģiska īpašība: tas automātiski ignorē dublikātus
        //<string> — Šī ir TypeScript tipu norāde. Tā pasaka kompilatoram: "Šajā kolekcijā drīkst glabāt tikai un vienīgi teksta virknes (strings)."
        const visited = new Set<string>();

        const toVisit = ['/'] // Sākam ar mājaslapas sākumlapu

        let pagesCount = 0;
        const maxPages = 30; // Drošības robeža, lai nekad neaizietu bezgalībā

        function visitNextUrl() {
            if (!toVisit.length) { // Ja saraksts toVisit ir tukšs, tad esam apmeklējuši visas lapas
                cy.log('Crawling complete. All pages have been visited.');
                //Pārvēršam Set par parastu masīvu un saglabājam failā
                cy.writeFile('cypress/results/pages.json', Array.from(visited));
                return; // Pārtraucam funkciju, jo vairs nav ko apmeklēt
            }
            cy.log(` to visit: ${toVisit.join(', ')}`); // Izvada logā, kuras lapas tiks apmeklētas
            const url = toVisit.shift(); // Paņemam pirmo URL no saraksta, ko apmeklēt
            visited.add(url!); // Pievienojam šo URL apmeklēto sarakstam. "!" nozīmē: "Es zinu, ka šī vērtība nav null vai undefined."  
            cy.visit(url!); // Apmeklējam šo URL. Atkal, "!" nozīmē: "Es zinu, ka šī vērtība nav null vai undefined."
            cy.screenshot(`page-snapshot-${pagesCount}`, {
                capture: 'fullPage' // Uzņem pilna garuma ekrānuzņēmumu no augšas līdz apakšai
            });

            //VALODAS UN PAREIZRAKSTĪBAS PĀRBAUDE
            cy.document().then((doc) => {
                const text = doc.body.innerText;

                // Pārbaudām, vai lapa nav tukša
                if (text && text.length > 20) {
                    // Paņemam pirmās 3000 rakstzīmes (lai neparslogotu API)
                    const sample = text.substring(0, 3000);

                    cy.request({
                        method: 'POST',
                        url: 'https://api.languagetool.org/v2/check',
                        form: true,
                        body: {
                            language: 'en-US', // Pārbaudām angļu valodu
                            text: sample
                        },
                        failOnStatusCode: false // Ja API atgriež kļūdu, neapturam visu Cypress testu
                    }).then((response) => {
                        if (response && response.body && response.body.matches) {
                            const matches = response.body.matches;

                            // Atlasām tikai pareizrakstības kļūdas (misspelling)
                            const spellingErrors = matches.filter(
                                (m: any) => m.rule.issueType === 'misspelling'
                            );

                            cy.log(`Lapā atrasta pareizrakstības kļūdas: ${spellingErrors.length}`);

                            // Pārbaudām, ka kļūdu skaits nav lielāks par 30
                            expect(spellingErrors.length).to.be.lessThan(30);
                        }
                    });
                }
            });


            cy.get('a')
                .should(Cypress._.noop) // Šī rinda ir tikai, lai pārliecinātos, ka visi linki ir ielādēti pirms turpinām
                .then(($links) => {
                    const links = $links
                        //toArray funkcija kas parvers jquery objektu par parastu js massivu, tad izvelas tikai href atribūtu un filtrē tikai tos url kas nav null un nesākas ar http
                        .toArray()
                        //map izvelk tikai href atribūtu no katra linka ka piemeram /about
                        .map((link) => link.getAttribute('href'))
                        //url !== null — izmet ārā tukšos elementus, kam nebija href adreses.
                        //!url.startsWith('http') — atstāj tikai tās adreses, kas NESĀKAS ar "http"
                        //Tā kā pilnas ārējās adreses sākas ar http:// vai https://, šis solis tās izslēdz un atstāj tikai lokālos ceļus 
                        // //(piemēram, /account_created, #top, /cart).
                        .filter((url): url is string => url !== null && !url.startsWith('http'))
                    //.push(...) — Standarta JavaScript masīva komanda, kas pasaka: "Pievieno šī saraksta pašās beigās jaunus elementus."
                    //...links — Tas nozīmē: "Pievieno visus jaunus URL, ko atradām šajā lapā, sarakstam toVisit, bet tikai tos, kas vēl nav apmeklēti."
                    toVisit.push(...links.filter((link) => !visited.has(link))); // Pievienojam jaunus URL sarakstam, ko apmeklēt, bet tikai tos, kas vēl nav apmeklēti
                    console.log('Local URLs found on the page:', links);
                    visitNextUrl(); // Rekursīvi apmeklējam nākamo URL sarakstā toVisit
                }
                )
        }



        visitNextUrl(); // Sākam ar pirmo URL apmeklēšanu   





    })

})