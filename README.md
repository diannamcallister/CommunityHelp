# team17 - Community Help Application

### Link to deployed Site ###
* https://community-help-page.herokuapp.com/

### Link to Document about Backend ###
* This link is to a google doc that contains much more detailed information about our backend, the endpoints we used and what the database currently looks like.
* We have also explained in detail, in this README, what endpoints were used in which page.
* https://docs.google.com/document/d/1aIwDBXRldGXVoEJD1dpXOCWvNExqAj2c0RZto9elAmM/edit?usp=sharing
* We also have a Postman collection that you can easily import and use in your postman: https://www.getpostman.com/collections/65430f5db7c2947f6387
* Copy this link, then in Postman go to Import > Link > and paste the link!


### Structure of Code ###
* All of our API routes for the backend are in the "team17/server.js" file 
* In "team17/src/actions" there are seperate JS files for each page. These files contain the fetch calls needed for each page.
* In "team17/src/Components", there is a seperate folder for each page. 
* "team17/src/images" contains any images used for the application.
* "team17/src/basics-stylesheets.css" contains styling for any common elements within the application such as buttons, text inputs and headers.

*Note: all screenshots on this file are of the toronto location.Also, note that you cannot create an admin user by registering. You can only do so through postman. The idea is that admin users will need to email the organization (which is us) to get admin permission. This is because we do not want just anyone to become an admin.

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

* Access User Page by clicking on "Users" in the navigation bar.
* If you click on the "learn more" button on the user cards, you will be taken to that users profile page.
* If you click on the user icon, username or user rating (stars) in the users list, you will also be taken to the users profile page.
* Thus, users can view the people in their location that are contributing the most to their community. They can also look at their own contribution to their community based on their rank in the users page.

#### User Page Routes ####
* In the user page, we recieve the current user that is using the application. We then extract the location of the current user and call the backend route "/api/users/:location" to get a list of users. This list object will contain users, as well as a "avgRating" field associated with each user which is the average rating of the user based on all the reviews that user has. The returned object is ordered in decending order of avgRating. 
* The frontend recieves the ordered object and populates the top three users (i.e. the top three users with the highest rating in that given location), and displays those users in the top three cards on the userpage. 
* All other users of that location are listed in decending order of avgRating in the list underneath the top three cards on the user page.
* (Note: the avgRating is not stored in the backend, it is simply returned by this endpoint. Since reviews are contantly being updated it makes more sence to re-calculate the avgRating when this endpoint is called.)


### User Profile Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/UserProfile/user_profile.jpg" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/UserProfile/user_edit_profile.jpg" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/UserProfile/user_rating.jpg" width="400" height="250" />

* Access the User Profile page by clicking Profile on the dashboard or by navigating to  Users and click "learn more" for any given user. We receive the current user thats logged and the the userviewing  as two different objects. The page is populated with the image, name, location and profession passed from the user. If the user viewing the page has the same _id as the user object then Edit Profile button is accessible.

 
* Upon clicking Edit Profile fields name, image, location and profession can be populated with new inputs, after clicking save changes a call to the backend to patch these changes is made and the updated profile page is rendered.  


* By clicking on "See Ratings" a get call is made to the database to get the three most recent reviews and when post is clicked a new review is patched into the user object in the database.


### All Tasks Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/AllTasks/user_alltasks.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/AllTasks/new_job.png" width="400" height="250" />

* Access a high-level view of all tasks by "/alltasks", or signing in through the authentication page will bring you here automatically, or by clicking on "Job Board" in the navigation bar
* From this page, you are able to add a new job posting by clicking on the button "Add New Job" on the bottom right of the screen. This button will allow for a modal to pop up, where you can fill in all the necessary information about the new task that you are creating; all fields must be filled in for the new job posting to be created.
* From this page, you are also able to see your specific job postings by click on the button "See Your Postings" on the bottom right of the screen. This button will filter through all the jobs, to only display the jobs that were created by you
- You are able to click on a specific task that is shown, which will redirect you to "/task" - aka the Task Description Page (described below).

#### All Tasks Page Routes ####
* In the all tasks page, we recieve the current user that is using the application. We then extract the location of the current user and call the backend route "/api/tasks/:location" to get a list of tasks from the same location as the user currently using the application.
* The frontend recieves the response body of all tasks and populates the task cards to display the image, title, and description of the task.

### Task Description Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/TaskDescription/task_description_dif_user_task.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/TaskDescription/task_description.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/TaskDescription/editing_task.png" width="400" height="250" />

* Access all information about a specific task, as well as see all comments for that specific task ("/task" is the URL for this page, however is populated from "/alltasks", so should only be routed to by clicking on a specific task in "/alltasks", rather than by changing the URL in the browser).
* If the task posting is that of another user (it is NOT your job posting), you will be able to view and add comments to the task, report the task if you believe it is inappropriate, click on the name of the person who posted it to route to their profile page, or click on the name of someome who commented and route to their profile page.
* If the task posting IS yours, you will have all the same functionality as if the posting wasn't yours, with the addition of being able to delete or edit the task posting. You are able to edit any of the fields of the posting, or delete the posting completely so that it can no longer be viewed.

#### Task Description Page Routes ####
* In the task description page, we recieve the current user that is using the application, as well as the selected task's information. This way, we don't have to hit the database upon loading this page since we already have all this information!
* If a user chooses to report a task by clicking on the "Report Task" button, then the patch endpoint "/api/task/:id" is called, where "id" is the id of the task, to update the isReported field of the task. A user can also choose to unselect the "Report Task" button, making the post no longer be reported.
* If a user adds a comment to a task, then the put endpoint "api/task/:id/comments" is called, where "id" is the id of the task, and the comment (as well as information about the user who put the comment) is then saved in the database to be able to be retrieved at a later date.
* If the current user is looking at a task that they created, then they have the option to update their task. If the user updates their task, then the put endpoint "api/tasks/:id" where "id" is the id of the task is called so that the updated information of the task can be saved to the database.
* If the current user is looking at a task that they created, then they have the option to delete their task. If the user deletes their task, then the delete endpoint "api/tasks/:id" where "id" is the id of the task, is called so that the task is removed from the database.

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

* Access User Page by "Users" on the navigation bar
* If you click on the "learn more" button on the user cards, you will be taken to that users profile page
* If you click on the user icon, username or user rating (stars) in the users list, you will also be taken to the users profile page
* If you click on the "x" button you will remove that users from the list or that card from the page

#### Admin User Page Routes ####

* The admin user page populates the page with users from the admin users location in the same way as the User Page (see User Page Routes section). 
* The other API route that is used in this page is the "/UserProfile/:delete_id" which takes in the ID of the user to delete and then deletes that user from the database. (Note: If you delete a user it will be deleted from the backend, but information about that user can still be found in the google doc, if you wish to add the user in as it was!)
* When the "x" button is clicked, the frontend will send the id of the user to be deleted to the backend. 
* Thus, the admin user is able to delete users from the database as they see fit. For example, if the admin see's that some user is always at the bottom of the list and that this user has consistantly low ratings, they can delete that user. 


### Admin All Tasks Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/AllTasks/admin_alltasks.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/AllTasks/admin_view_reported_tasks.png" width="400" height="250" />

* Admins are able to have identical functionality in the "/alltasks" page, with the addition of being able to view and remove reported postings. You are able to view reported postings by clicking on the "See Reported" button on the bottom right of the screen. You are then able to click on the "x" button on the inappropriate task to delete the posting.

#### Admin All Tasks Page Routes ####

* The admin all tasks page populates the page with tasks from the admin users' location in the same way as the usual user's All Tasks Page (see All Tasks Page Routes section). 
* The admin has the extra button called "See Reported Tasks", which will display only reported tasks. If a task has been reported, it indicates that the task possibly contains some type of inappropriate information. If the admin user deems that the content of the task should not be present on the application and so the application should be deleted, the admin user can select the "x" button to delete the task, which will call the delete endpoint "/api/tasks/:id" where "id" is the id of the task, to remove the task from the database.
