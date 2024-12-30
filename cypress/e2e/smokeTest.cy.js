// for auto suggestion, we use the below 2 lines:
/// <reference types="Cypress" />
/// <reference types="Cypress-iframe" />
import 'cypress-iframe'

describe('Smoke Tests', () => {


    it('Verify user is able to login to Portal with valid username & password', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/auth/login')

        cy.wait(2000)
        cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('adam.gil2050@yahoo.com')
        cy.get('#password').clear().type('Password#123')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(7000)

        cy.get('h1').contains('Welcome')
        cy.contains('Sign Off').should('be.visible')
        cy.wait(1000)
        cy.get('a').contains('Sign Off').click()
        cy.wait(3000)
        
    })

    it('Verify user is not able to login to Portal with invalid username & valid password', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/auth/login')
        cy.wait(2000)
        cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('adam.gil2050@yahooo.com')
        cy.get('#password').clear().type('Password#123')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(4000)
        cy.get('p').contains('Incorrect username or password').should('be.visible')
        cy.wait(3000)
        
    })

    it('Verify user is not able to login to Portal with valid username & invalid password', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/auth/login')
        cy.wait(2000)
        cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('adam.gil2050@yahoo.com')
        cy.get('#password').clear().type('Password#123!')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(4000)
        cy.get('p').contains('Incorrect username or password').should('be.visible')
        cy.wait(3000)
        
    })

    it('Verify user is not able to login to Portal with invalid username & invalid password', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/auth/login')
        cy.wait(2000)
        cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('adam.gil2050@yahoo.co')
        cy.get('#password').clear().type('Password#123!')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(4000)
        cy.get('p').contains('Incorrect username or password').should('be.visible')
        cy.wait(3000)
    })

    it('Verify user is able to navigate to different tabs in Portal', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/auth/login')

        cy.wait(2000)
        cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('adam.gil2050@yahoo.com')
        cy.get('#password').clear().type('Password#123')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(7000)

         // Click on different tabs
         cy.get('.label-container').contains('Payments').should('be.visible').click()
         cy.wait(2000)
         cy.get('.label-container').contains('Requests').should('be.visible').click()
         cy.wait(2000)
         cy.get('.label-container').contains('Amenities').should('be.visible').click()
         cy.wait(2000)
         cy.get('.label-container').contains('Profile').should('be.visible').click()
         cy.wait(2000)
         cy.get('.label-container').contains('Messages').should('be.visible').click()
         cy.wait(2000)
         cy.get('.label-container').contains('Help').should('be.visible').click()
         cy.wait(2000)
        
    })

    it('Verify user is able to create service request from Portal', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/auth/login')
        cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('andrew.saimonds2024@yahoo.com')
        cy.get('#password').clear().type('Password#123')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(5000)
        cy.contains('Sign Off').should('be.visible')
        cy.log('Login successful')
        
        cy.get('.label-container').contains('Requests').should('be.visible').click()
        cy.wait(4000)
        cy.get('p').contains('Create or view a service request').should('be.visible').click()
        cy.wait(2000)
        
        cy.contains(' Submit Service Request ').should('be.enabled').click()
        cy.wait(2000)
        cy.get('button').contains('Submit').should('not.be.enabled')

        cy.get('#priority').select('Medium')
        cy.get('#requestType').select('Appliance Problem')
        cy.get('#subject').clear().type('Test SR Creation')
        cy.get('#description').clear().type('SR Created by automation Code')
        cy.get('#accessEntryNotes').select('No entry required')
        cy.get('#specialInstructionsForAccess').clear().type('Testing')

        cy.wait(2000)
        cy.get('button').contains('Submit').should('be.enabled').click()
        cy.wait(3000)
        cy.contains("Your service request has been submitted, we'll respond within two business days").should('be.visible')  
        cy.log('Service Request creation is successful')
        cy.wait(3000)
    })

    it('Verify user as Admin is able to start and stop impersonation in Portal', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/auth/login')

        cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('sunqa02@gmail.com')
        cy.get('#password').clear().type('Password#123')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(3000)
        cy.contains('Sign Off').should('be.visible')
        cy.log('Login successful')
        
        cy.contains('Customer Management and Impersonation').should('be.visible').click()
        cy.wait(2000)

        // Start Impersonation
        cy.contains('Start Impersonation ').should('not.be.enabled')
        cy.get('#customerEmail').clear().type('andrew.saimonds2024@yahoo.com')
        cy.contains('Start Impersonation ').click()  
        cy.wait(3000)

        cy.get('h1').contains('Welcome').should('be.visible')
        cy.get('button').contains('Pay Now').should('be.enabled')

        // View the invoices
        cy.get('a').contains('View Balance').click()
        cy.wait(3000)

        // Click on different tabs
        cy.get('.label-container').contains('Payments').should('be.visible').click()
        cy.wait(2000)
        cy.get('.label-container').contains('Requests').should('be.visible').click()
        cy.wait(2000)
        cy.get('.label-container').contains('Amenities').should('be.visible').click()
        cy.wait(2000)
        cy.get('.label-container').contains('Profile').should('be.visible').click()
        cy.wait(2000)
        cy.get('.label-container').contains('Messages').should('be.visible').click()
        cy.wait(2000)
        cy.get('.label-container').contains('Help').should('be.visible').click()

        // Stop impersonation
        cy.contains('Stop Impersonation').should('be.enabled').click()
        cy.contains('Customer Management and Impersonation').should('be.visible')
        cy.log('Stopped impersonation')
        
    })


    it('Verify user as Concierge is able to start and stop impersonation in Portal', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/auth/login')

        cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('lanceque58@gmail.com')
        cy.get('#password').clear().type('Password#123')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(3000)
        cy.contains('Sign Off').should('be.visible')
        cy.log('Login successful')
        
        cy.contains('Customer Management and Impersonation').should('be.visible').click()
        cy.wait(2000)

        // Start Impersonation
        cy.contains('Start Impersonation ').should('not.be.enabled')
        cy.get('#customerEmail').clear().type('andrew.saimonds2024@yahoo.com')
        cy.contains('Start Impersonation ').click()  
        cy.wait(3000)

        cy.get('h1').contains('Welcome').should('be.visible')
        cy.get('button').contains('Pay Now').should('be.disabled')

        // View the invoices
        cy.get('a').contains('View Balance').click()
        cy.wait(3000)

        // Click on different tabs
        cy.get('.label-container').contains('Payments').should('be.visible').click()
        cy.wait(2000)
        cy.get('.label-container').contains('Requests').should('be.visible').click()
        cy.wait(2000)
        cy.get('.label-container').contains('Amenities').should('be.visible').click()
        cy.wait(2000)
        cy.get('.label-container').contains('Profile').should('be.visible').click()
        cy.wait(2000)
        cy.get('.label-container').contains('Messages').should('be.visible').click()
        cy.wait(2000)
        cy.get('.label-container').contains('Help').should('be.visible').click()

        // Stop impersonation
        cy.contains('Stop Impersonation').should('be.enabled').click()
        cy.contains('Customer Management and Impersonation').should('be.visible')
        cy.log('Stopped impersonation')
        
    })


    it.skip('Verify Rent Payment widget is loading in Portal', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/auth/login')
        //cy.wait(2000)
        //cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('adam.gil2050@yahoo.com')
        cy.get('#password').clear().type('Password#123')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(7000)

        cy.get('button').contains('Pay Now').should('be.enabled').click()
        cy.wait(2000)
        cy.get('button').contains('Agree & Continue').should('be.enabled').click()
        cy.wait(2000)
        cy.get('button').contains('Next').should('be.enabled').click()
        cy.wait(10000)
        cy.get('button').contains('Continue').should('be.visible')
        
        /*
        cy.get('#credit-card-radio').check()
        //handle iframe
        cy.frameLoaded('iframe')
        cy.iframe('iframe').find('#card-number').type('6011111111111117')
        cy.get('#card-name-on-account').type('Adam Gill')
        cy.get('#exp-date').type('2027-12')
        cy.get('#card-cvv').type('123')
        cy.get('#state').select('Michigan')
        */
        
    })

    it('Verify user is able to view payment history', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/auth/login')
        cy.wait(2000)
        cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('adam.gil2050@yahoo.com')
        cy.get('#password').clear().type('Password#123')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(7000)

        cy.get('button').contains('Pay Now').should('be.enabled')
        cy.wait(2000)
        cy.get('a').contains('View Balance').should('be.visible').click()
        cy.wait(5000)

        cy.get('h1').contains('Current Balance').should('be.visible')
        cy.get('h1').contains('Account History').should('be.visible')
        cy.wait(3000)
    })
    
    it('Verify user is able to create and submit an application from Portal', () => {
        cy.visit('https://customer-portal-qa.aws.sunwebportal.com/apply/demo')
        cy.get('#propertyCode').clear().type('pnr')
        cy.get('#siteNumber').clear().type('630')  
        cy.get('#applicationType').select('Purchase: SH-Cash')
        cy.get('a[href]').click()
        cy.wait(4000)

        cy.get('button').contains('Sign In').click()
        cy.wait(2000)
        cy.get('button').contains('Log in').should('be.disabled')
        cy.get('#username').clear().type('andrew.saimonds2024@yahoo.com')
        cy.get('#password').clear().type('Password#123')
        cy.get('button').contains('Log in').should('be.enabled').click()
        cy.wait(7000)

        cy.get('#applicant_single').check()
        cy.get('#moveInDate').type('2025-01-01')
        cy.get('button').contains('Begin Application').should('be.enabled').click()
        cy.wait(4000)

        // Personal Info 
        cy.get('button').contains('Next').should('be.disabled')
        cy.get('#dateOfBirth').type('2000-01-01')
        cy.get('#addressLine1').clear().type('27777 Franklin Rd')
        cy.get('#addressLine2').clear().type('300')
        cy.get('#city').clear().type('Southfield')
        cy.get('#state').select('Michigan')
        cy.get('#zipcode').clear().type('48034')
        cy.get('#country').select('United States')
        cy.get('#socialSecurityNumber').clear().type('456-00-1234')
        cy.get('#primaryPhoneNumber').clear().type('313-098-5678')
        cy.get('#secondaryPhoneNumber').clear().type('480-134-0987')
        cy.get('#applicant_unmarried').check()
        cy.get('#dependentCount').clear().type('2')
        cy.wait(2000)
        cy.get('#dependentAge').clear().type('2,4')
        cy.get('button').contains('Next').should('be.enabled').click()

        // Identity verification
        cy.wait(2000)
        cy.get('button').contains('Next').should('be.disabled')
        cy.contains('Plaid Success').click()
        cy.get('button').contains('Next').should('be.enabled').click()
        
        // Communication Preferences
        cy.wait(2000)
        cy.get('button').contains('Next').should('be.disabled')
        cy.get('#personal_agree_1').check()
        cy.get('#personal_agree_2').check()
        cy.get('#personal_agree_3').check()
        cy.wait(2000)
        cy.get('button').contains('Next').should('be.enabled').click()

        // Residential History
        cy.wait(2000)
        cy.get('button').contains('Next').should('be.disabled')
        cy.get('[class="form-checkbox ng-untouched ng-pristine ng-valid"]').check()
        cy.get('#residenceTimeYears_0').clear().type('3')
        cy.get('#residenceTimeMonths_0').clear().type('3')
        cy.get('#applicant_rent_0').check()
        cy.wait(2000)
        cy.get('#landlordName_0').clear().type('Jack Rudolf')
        cy.get('#landlordPhoneNumber_0').clear().type('313-568-0887')
        cy.get('#residenceMonthlyPayment_0').clear().type('1500')
        cy.get('button').contains('Next').should('be.enabled').click()

        // Finance Options page
        cy.wait(2000)
        cy.get('button').contains('Next').should('be.disabled')
        cy.get('#paymentMethodCash').check()
        cy.wait(1000)
        cy.get('button').contains('Next').should('be.enabled').click()

        // Financial/Employment History 
        cy.wait(3000)
        cy.get('button').contains('Next').should('be.disabled')
        cy.get('#employmentType-0').select('Employed')
        cy.get('#title-0').clear().type('DevOps')
        cy.get('#companyName-0').clear().type('Sun')
        cy.get('#addressLine1').clear().type('27777 Franklin Rd')
        cy.get('#addressLine2').clear().type('200')
        cy.get('#city-0').clear().type('Southfield')
        cy.get('#state_0').select('Michigan')
        cy.get('#zipcode-0').clear().type('48034')
        cy.get('#phone-0').clear().type('313-437-0987')
        cy.get('#isCurrent-0').check()
        cy.get('#start-0').clear().type('2020-01-01')
        cy.get('#monthlyGross-0').clear().type('5000')
        cy.get('button').contains('Next').should('be.enabled').click()

        // Finances/Recurring Expenses
        cy.wait(2000)
        cy.get('button').contains('Next').should('be.enabled').click()

        // Occupants
        cy.wait(2000)
        cy.get('button').contains('Next').should('be.enabled')
        cy.get('button fa-icon').last().click()
        cy.get('button').contains('Next').should('be.disabled')
        cy.wait(2000)
        cy.get('#firstName').clear().type('Taylor')
        cy.get('#lastName').clear().type('Smith')
        cy.get('#socialSecurityNumber').should('be.disabled')
        cy.get('#dateOfBirth').type('2000-01-01')
        cy.wait(3000)
        //cy.get('#socialSecurityNumber').should('be.enabled')
        
        //cy.get('fieldset input[name="socialSecurityNumber"]').fill('876-09-8904')
        cy.get('#socialSecurityNumber').type('450-77-0981', {force: true})
        cy.get('#relationToPrimary').select('Cousin')
        cy.get('button').contains('Next').should('be.enabled').click()

        /* 
        cy.wait(2000)
        cy.get('button fa-icon').last().click()
        cy.get('button').contains('Next').should('be.disabled')
        cy.wait(2000)
        cy.get('#firstName').clear().type('Taylor')
        cy.get('#lastName').clear().type('Junior')
        cy.get('#dateOfBirth').type('2022-01-01')
        cy.wait(2000)
        cy.get('#socialSecurityNumber').should('be.disabled')
        cy.get('#relationToPrimary').select('Daughter')
        cy.get('button').contains('Next').should('be.enabled').click()
        */

        // Questionairre
        cy.wait(2000)
        cy.get('button').contains('Next').should('be.disabled')
        cy.get('#answer-no-5').check()
        cy.get('#answer-no-6').check()
        cy.get('#answer-no-hasPetsAtLocation').check()
        cy.get('#answer-no-0').check()
        cy.get('#answer-no-1').check()
        cy.get('#answer-no-2').check()
        cy.get('#answer-no-3').check()
        cy.get('#answer-no-4').check()
        cy.get('button').contains('Next').should('be.enabled').click()

        // Disclosure Agreement
        cy.wait(2000)
        cy.get('button').contains('Agree & Pay Now').should('be.enabled').click()

        // Application Fee
        //cy.get('button').contains('Next').should('be.disabled')
        cy.get('#promoCode').clear().type('PNR-24-249')
        //cy.get('#promoCode').clear().type('CMC-24-248')
        cy.contains('Apply').click()
        cy.wait(3000)
        cy.get('button').contains('Next').should('be.enabled').click()


        // Review-Submit 
        cy.wait(1000)
        cy.get('button').contains('Submit Application').should('be.disabled')
        cy.get('#termsConditionsInitials').clear().type('AS')
        cy.get('#termsConditionsConsent').check()
        cy.get('button').contains('Submit Application').should('be.enabled').click()
        cy.wait(3000)
        cy.get('p').contains('We have received your application!').should('be.visible')
        cy.log('Application Creation is successful')

        
    })


})
