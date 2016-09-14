Feature: List cats
  
  @watch
  Scenario: I want to see all the cats
    Given I am viewing the page at "/"
    Then I can see the list item "fluffy"
    And I can see the list item "tick"
