
let url = 'http://www.testyou.in/Login.aspx'; // url of the login page to be tested
let username = Cypress.env('username'), password = Cypress.env('password'); // login credentials
let selector_email = 'ctl00_CPHContainer_txtUserLogin'; // css seelctor (unique id) of the textbox that accepts email
let selector_password ='ctl00_CPHContainer_txtPassword'; // css seelctor (unique id) of the textbox that accepts password
let selector_button = 'ctl00_CPHContainer_btnLoginn'; // css seelctor (unique id) of the button that submits login requests
let dashboard_ele = '#ctl00_headerTopStudent_lnkbtnSignout'; // css seelctor (unique id) of any element on the dashboard page


describe('Test Demo App', () => {
    it('Visit Login Page', () => {
        cy.visit(url);
    })
    it('Login success with valid email and password', () => {
        cy.visit(url);
        cy.get('#'+selector_email).type(username);
        cy.get('#'+selector_password).type(password);
        cy.get('#'+selector_button).click();
        cy.get(dashboard_ele).should('be.visible')
    })
    it('Login fail with invalid email', () => {
        cy.visit(url)
        cy.get('#'+selector_email).type(username+'goo-goo-gaa-gaa')
        cy.get('#'+selector_password).type(password)
        cy.get('#'+selector_button).click()
        cy.get(dashboard_ele).should('not.exist')
    })
    it('Login fail with invalid password', () => {
        cy.visit(url);
        cy.get('#'+selector_email).type(username);
        cy.get('#'+selector_password).type(password+'goo-goo-gaa-gaa');
        cy.get('#'+selector_button).click();
        cy.get(dashboard_ele).should('not.exist')
    })
    it('Check for SQL Injection', () => {
        cy.visit(url);
        cy.get('#'+selector_email).type(username);
        cy.get('#'+selector_password).type(password+'\' AND 1=1');
        cy.get('#'+selector_button).click();
        cy.get(dashboard_ele).should('not.exist')
    })
    it('Login fails with blank email field', () => {
        cy.visit(url);
        cy.get('#'+selector_password).type(password);
        cy.get('#'+selector_button).click();
        cy.get(dashboard_ele).should('not.exist')
    })
    it('Login fails with blank password field', () => {
        cy.visit(url);
        cy.get('#'+selector_email).type(username);
        cy.get('#'+selector_button).click();
        cy.get(dashboard_ele).should('not.exist')
    })
    it('Login fails with both blank fields', () => {
        cy.visit(url);
        cy.get('#'+selector_button).click();
        cy.get(dashboard_ele).should('not.exist')
    })
    it('Password field is masked', () => {
        cy.visit(url);
        cy.get('input[type="password"][id="'+selector_password+'"]')
    })
})