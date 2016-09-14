Feature: Register page

@watch
    Scenario: I want to see the register page
        Given I am viewing the page at "/"
        When I click on "here"
        Then I am redirected to the "/register" page
        And I can see the input item "Register"
