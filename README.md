# team17


### Login/Signup Page ###
<img src=https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/Authentication/authentication.png"
width="400" height="250">

* Login page shows up at the initial start of the webapp
* To login as an admin user, under the login form username: admin, password: admin
* To login as regular user, username: user, password: password
* Upon logging in, user will be taken to tasks page (tasks shows up differently depending on admin or regular user)


### User Profile Page ###



### Users Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/UsersPage/user_users_page.png" width="400" height="250" />

* Access User Page by "/UserPage" or by clicking on User in the navigation bar
* If you click on the "learn more" button on the user cards, you will be taken to that users profile page
* If you click on the user icon, username or user rating (stars) in the users list, you will also be taken to the users profile page


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

# Admin Pages #

### Admin Users Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/UsersPage/admin_users_page.png" width="400" height="250" />

* Access User Page by "/AdminUserPage"
* If you click on the "learn more" button on the user cards, you will be taken to that users profile page
* If you click on the user icon, username or user rating (stars) in the users list, you will also be taken to the users profile page
* If you click on the "x" button you will remove that users from the list or that card from the page


### Admin All Tasks Page ###
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/AllTasks/admin_alltasks.png" width="400" height="250" />
<img src="https://github.com/csc309-fall-2020/team17/blob/master/viewOfPages/AllTasks/admin_view_reported_tasks.png" width="400" height="250" />

* Admins are able to have identical functionality in the "/alltasks" page, with the addition of being able to view and remove reported postings. You are able to view reported postings by clicking on the "See Reported" button on the bottom right of the screen. You are then able to click on the "x" button on the inappropriate task to delete the posting.

