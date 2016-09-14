User goes to '/'
  - If user is already logged into session, redirect to logged in content (wombat)
  - If user is not logged in, redirect to login page with register for new account option

User goes to '/register'
User tries to register a new account
User enters email, password and possibly other details
If the email does not already exist in the database
  - insert email into db, hash password and insert also
Else
  - return user to page with error message of "user already exists" etc..
After user registers successfully, redirect to homepage/ welcome page/ site tour video etc...

User goes to '/login'
User enters in a email/ username (whichever is the primary key) and password
  - If email is not found in database, stay on page, with error message/s (could also provide input warnings, i.e your CAPSLOCK is on etc..)
Email is found, password is hashed and compared for a match
  - If password does not match, stay on page with error message/s
After password match redirect user to homepage/ news feed etc... (first logged in route)
User is now able to navigate to any of the logged in pages
