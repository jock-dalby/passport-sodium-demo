Feature: Test Login


  Scenario: I want to see if login is working
    Given I am viewing the page at "/login"
    When I enter "pete" into the "username" input
    And I enter "pete123" into the "password" input
    And I click on the input with value "Log in"
    Then I am redirected to "/"
    And I can see the image "http://pawn.hss.cmu.edu/~67103/images/wombats/wombat4.jpg"
