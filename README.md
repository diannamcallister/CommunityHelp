# team17 - Community Help Application

### Link to deployed Site ###
* https://community-help-page.herokuapp.com/

### Link to Document about Backend ###
* This link is to a google doc that contains much more detailed information about our backend, the endpoints we used and what the database currently looks like.
* We have also explained in detail, in this README, what endpoints were used in which page.
* https://docs.google.com/document/d/1aIwDBXRldGXVoEJD1dpXOCWvNExqAj2c0RZto9elAmM/edit?usp=sharing


### Structure of Code ###
* All of our API routes for the backend are in the "team17/server.js" file 
* In "team17/src/actions" there are seperate JS files for each page. These files contain the fetch calls needed for each page.
* In "team17/src/Components", there is a seperate folder for each page. 
* "team17/src/images" contains any images used for the application.
* "team17/src/basics-stylesheets.css" contains styling for any common elements within the application such as buttons, text inputs and headers.

# Overview for a normal user

Toronto Location:
* Login email: user@gmail.com
* Login Password: user123

(this user is located in toronto so you will only see users that are in toronto once you login. For more information on different users, please look at the google doc above.)

London Location:
* Login email: user2@gmail.com
* Login Password: user123

(this user is located in london so you will only see users that are in london once you login. For more information on different users, please look at the google doc above.)

In this section we will go through all the pages a normal user for the application will see/interact with. We will also be explaining the API endpoints/routes we have created.

### Login/Signup Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/Authentication/authentication.png" width="400" height="250">

* Login page shows up at the initial start of the webapp
* To login as an admin user, under the login form username: admin, password: admin
* To login as regular user, username: user, password: password
* Upon logging in, user will be taken to tasks page (tasks shows up differently depending on admin or regular user)

### Login/Signup Page Routes
* In order for a user to login, they must enter their correct email and password, which then are sent through a post call with endpoint /users/login to verify the user exists. If the user exists they are sent to the tasks page where they can see tasks in their location. If the user does not exist, an error message is shown and they cannot proceed to the tasks page and can try again.
* In order for a user to register, they must enter their name, location, profession, password (atleast 6 characters) and an email which is not in use. Once they enter these, a new user is sent through the endpoint 
/api/users and they are sent to the tasks page. If they do not enter all fields, if the user is invalid or inuse, or if their password is too short, an error message is shown and they can try again. 


### Users Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/UsersPage/user_users_page.png" width="400" height="250" />

* Access User Page by "/UserPage" or by clicking on User in the navigation bar.
* If you click on the "learn more" button on the user cards, you will be taken to that users profile page.
* If you click on the user icon, username or user rating (stars) in the users list, you will also be taken to the users profile page.
* Thus, users can view the people in their location that are contributing the most to their community. They can also look at their own contribution to their community based on their rank in the users page.

#### User Page Routes ####
* In the user page, we recieve the current user that is using the application. We then extract the location of the current user and call the backend route "/api/users/:location" to get a list of users. This list object will contain users, as well as a "avgRating" field associated with each user which is the average rating of the user based on all the reviews that user has. The returned object is ordered in decending order of avgRating. 
* The frontend recieves the ordered object and populates the top three users (i.e. the top three users with the highest rating in that given location), and displays those users in the top three cards on the userpage. 
* All other users of that location are listed in decending order of avgRating in the list underneath the top three cards on the user page.


### User Profile Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/UserProfile/UserProfile.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/UserProfile/EditProfile.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/UserProfile/UserReviews.png" width="400" height="250" />

* Access User Profile page by "/UserProfile" or by clicking "learn more" in User page for any given user.

* By clicking on the Edit Profile button, a user has the option to edit their profile to update information about them they would like to disclose

* By clicking on "See Ratings" you can see a history of reviews and ratings of previous jobs a user has completed.


### All Tasks Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/AllTasks/user_alltasks.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/AllTasks/new_job.png" width="400" height="250" />

* Access a high-level view of all tasks by "/alltasks", or signing in through the authentication page will bring you here automatically, or by clicking on "Job Board" in the navigation bar
* From this page, you are able to add a new job posting by clicking on the button "Add New Job" on the bottom right of the screen. This button will allow for a modal to pop up, where you can fill in all the necessary information about the new task that you are creating; all fields must be filled in for the new job posting to be created.
* From this page, you are also able to see your specific job postings by click on the button "See Your Postings" on the bottom right of the screen. This button will filter through all the jobs, to only display the jobs that were created by you
- You are able to click on a specific task that is shown, which will redirect you to "/task" - aka the Task Description Page (described below).

### Task Description Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/TaskDescription/task_description_dif_user_task.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/TaskDescription/task_description.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/TaskDescription/editing_task.png" width="400" height="250" />

* Access all information about a specific task, as well as see all comments for that specific task ("/task" is the URL for this page, however is populated from "/alltasks", so should only be routed to by clicking on a specific task in "/alltasks", rather than by changing the URL in the browser).
* If the task posting is that of another user (it is NOT your job posting), you will be able to view and add comments to the task, report the task if you believe it is inappropriate, click on the name of the person who posted it to route to their profile page, or click on the name of someome who commented and route to their profile page.
* If the task posting IS yours, you will have all the same functionality as if the posting wasn't yours, with the addition of being able to delete or edit the task posting. You are able to edit any of the fields of the posting, or delete the posting completely so that it can no longer be viewed.

# Overview for an Admin user

Toronto Location Admin:
* Login email: admin@gmail.com
* Login Password: admin123

(this admin user is located in toronto so you will only see users that are in toronto once you login. For more information on different users, please look at the google doc above.)

London Location Admin:
* Login email: admin2@gmail.com
* Login Password: admin123

(this admin user is located in london so you will only see users that are in london once you login. For more information on different users, please look at the google doc above.)

### Admin Users Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/UsersPage/admin_users_page.png" width="400" height="250" />

* Access User Page by "/AdminUserPage"
* If you click on the "learn more" button on the user cards, you will be taken to that users profile page
* If you click on the user icon, username or user rating (stars) in the users list, you will also be taken to the users profile page
* If you click on the "x" button you will remove that users from the list or that card from the page

#### Admin User Page Routes ####

* The admin user page populates the page with users from the admin users location in the same way as the User Page (see User Page Routes section). 
* The other API route that is used in this page is the "/UserProfile/:delete_id" which takes in the ID of the user to delete and then deletes that user from the database. 
* When the "x" button is clicked, the frontend will send the id of the user to be deleted to the backend. 
* Thus, the admin user is able to deleted users from the database as they see fit. For example, if the admin see's that some user is always at the bottom of the list and that this user has consistantly low ratings, they can delete that user. 


### Admin All Tasks Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/AllTasks/admin_alltasks.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/AllTasks/admin_view_reported_tasks.png" width="400" height="250" />

* Admins are able to have identical functionality in the "/alltasks" page, with the addition of being able to view and remove reported postings. You are able to view reported postings by clicking on the "See Reported" button on the bottom right of the screen. You are then able to click on the "x" button on the inappropriate task to delete the posting.

