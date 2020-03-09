/**
 * Cypress testing 101
 */
describe('e2e test with cypress', () => {

    beforeEach(() => {
        cy.visit('/');
    })
    it('runs first test with cypress', () => {
        expect(true).equal(true)
    });

    it('can click the play/pause button', () => {
        cy.wait(5000);
        cy.get('button.play').click();
        cy.get('.toggle-visualizer').click();
        cy.wait(500);
        cy.get('p.card-text.active-interaction')
            .contains('Paused: true') 
    });

    // it('Can randomly toggle video', () => {
    //     cy.clock();
    //     cy.tick(5000);
    //     cy.wait(5000);
    //     cy.get('button.play').click();
    //     cy.tick(5000);
    //     cy.wait(5000);
    //     cy.get('button.play').click();
    // });

    // it('Can render chart', () => {
    //     cy.clock()
    //     cy.tick(5000);
    //     cy.wait(5000);
    //     cy.get('.toggle-visualizer').click();
    //     cy.tick(5000);
    //     cy.wait(5000);
    //     cy.get('.toggle-visualizer').click();
    //     cy.wait(5000);
    //     cy.get('button.play').click();
    // })

    it('Can show interaction table', () => {
        cy.wait(5000);
        cy.get('.video-container').click();
        cy.get('#reactivity-table')
            .contains('Time(s)')
        cy.wait(5000);
        cy.get('.video-container').click();
        cy.wait(5000);
        cy.get('button.play').click();
    });

    it('Can rate moment in the video', () => {
        cy.wait(5000);
        cy.get('button.rating').click();
        cy.wait(1000);
        cy.get('.rating-value')
            .clear()
            .type(6)
            .should('have.value', '6')
        cy.wait(2000);
        cy.get('button.submit-rating').click();
        cy.wait(2000);
        cy.get('.toggle-visualizer').click();
        cy.wait(2000);
        cy.get('button.play').click();
    });
})