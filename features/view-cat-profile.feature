Feature: View profile
  As a user, 
  I want to see the image of a particular cat
  So that I can get to know the cats better

  Scenario: I want to a cat's profile
    Given I am viewing the page at "/cats"
    When I click on the link "Fluffy"
    Then I can see the image "https://s-media-cache-ak0.pinimg.com/564x/4e/76/fb/4e76fbd4ceef2a98096ba7af626c8281.jpg"
