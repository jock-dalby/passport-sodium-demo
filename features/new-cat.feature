Feature: New cat

  Scenario: I want to add a new cat
    Given I am viewing the page at "/cats/new"
    When I enter "Snowball" into the "name" input
    And I click on the input with value "Create Cat"
    Then I am redirected to the "/cats" page
    And I can see the list item "Snowball"

