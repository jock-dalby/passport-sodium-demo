Feature: Test Register


  Scenario: I want to see if register is working
    Given I am viewing the page at "/register"
    When I enter "jimmy" into the "username" input
    And I enter "stfromgdu" into the "password" input
    And I click on the input with value "Register"
    Then I am redirected to "/login"
    # And I can see the image "http://pawn.hss.cmu.edu/~67103/images/wombats/wombat4.jpg"
