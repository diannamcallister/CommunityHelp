/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();
const path = require('path')
const cors = require("cors")
app.use(cors());

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'djqheeaw6',
    api_key: '825943769215489',
    api_secret: 'q8awLZPApBt8nqRWYMAjQHPKvPM'
});

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user.js");
const { Task } = require("./models/task.js");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));


function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

// Middleware for authentication of resources - TODO change this
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}


/*** Session handling **************************************/
//Create a session and session cookie
app.use(
    session({
        secret: "our hardcoded secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000, //TODO change this expiry date
            httpOnly: true
        }
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByEmailPassword(email, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            res.send(user);
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/
// User API Route
app.post('/api/users', mongoChecker, async (req, res) => {
    

    // Create a new user
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        location: req.body.location,
        profession: req.body.profession,
        isAdmin: req.body.isAdmin,
    })


    try {
        // Save the user
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') 
        }
    }
})

/** Student resource routes **/
// a POST route to *create* a student
// app.post('/api/students', mongoChecker, authenticate, async (req, res) => {
//     log(`Adding student ${req.body.name}, created by user ${req.user._id}`)

//     // Create a new student using the Student mongoose model
//     const student = new Student({
//         name: req.body.name,
//         year: req.body.year,
//         creator: req.user._id // creator id from the authenticate middleware
//     })


//     // Save student to the database
//     // async-await version:
//     try {
//         const result = await student.save() 
//         res.send(result)
//     } catch(error) {
//         log(error) // log server error to the console, not to the client.
//         if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
//             res.status(500).send('Internal server error')
//         } else {
//             res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
//         }
//     }
// })
// a GET route to get all Users
app.get('/UserProfileAll/', async (req, res) => {

    // Get the User
    try {
        const U = await User.find()
        // res.send(students) // just the array
        res.send(U) // can wrap students in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})
// a GET route to get a User
app.get('/UserProfile/:profile_id', async (req, res) => {

    // Get the User
    try {
        const U = await User.find({email: req.params.profile_id})
       
        res.send(U) 
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})

// a PATCH route to edit a User
app.patch('/UserEditProfile', async (req, res) => {

    // Get the User
    try {
        
        
        const user_edited = await User.findOneAndUpdate({email: req.body.email}, {firstName: req.body.firstName, lastName: req.body.lastName, location: req.body.location, profession: req.body.profession},{new: true})
        
        //send edited profile
        res.send(user_edited) 
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})

// a DELETE route to remove a User not sure what route
app.delete('/UserProfile/:delete_id', async (req, res) => {

    const id = req.params.delete_id

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	// Delete a User by their id
	try {
        const getUser = await User.find({_id: id})
        const allTasks = await Task.find({location: getUser[0].location}).populate({path: 'owner'});;
        for (let i=0; i < allTasks.length; i++) {
            if (allTasks[i].owner._id == id) {
                await Task.findByIdAndRemove(allTasks[i]._id);
            }
        }
        const user = await User.findByIdAndRemove(id)
		if (!user) {
			res.status(404).send()
		} else {   
			res.send(user)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}

})
// A Patch route to upload an image
app.patch('/UserImage/:user_id', multipartMiddleware, async (req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
    } 

    if (req.files.image !== undefined) {
        cloudinary.uploader.upload(
            req.files.image.path, // req.files contains uploaded files
            async function (result) {

                const id = req.params.user_id
                // Save task to the database
                // async-await version:
                try {
                    const new_user = await User.findOneAndUpdate({"_id": id},{$set:{image: result.url}},{new: true});
                    res.send(new_user)

                } catch(error) {
                    log(error) // log server error to the console, not to the client.
                    if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                        res.status(500).send('Internal server error')
                    } else {
                        res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
                    }
                }
        });
    } 
})
// a POST route to create a task
app.post('/api/tasks', multipartMiddleware, async (req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
    } 
    
    if (req.files !== undefined && req.files.image !== undefined) {
        cloudinary.uploader.upload(
            req.files.image.path, // req.files contains uploaded files
            async function (result) {

                const task = new Task({
                    owner: JSON.parse(req.body.owner),
                    image: result.url,
                    location: req.body.location,
                    title: req.body.title,
                    description: req.body.description,
                    numVolunteers: req.body.numVolunteers,
                    numHours: req.body.numHours,
                    price: req.body.price,
                    isReported: false,
                    comments: []
                })
        
        
                // Save task to the database
                // async-await version:
                try {
                    const result = await task.save()	
                    res.send(result)
                } catch(error) {
                    log(error) // log server error to the console, not to the client.
                    if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                        res.status(500).send('Internal server error')
                    } else {
                        res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
                    }
                }
        });
    } else {
        // Create a new task using the Task mongoose model

        let owner = {}
        try {
            owner = JSON.parse(req.body.owner)
        } catch (error) {
            owner = req.body.owner;
        }

        const task = new Task({
            owner: owner,
            location: req.body.location,
            title: req.body.title,
            description: req.body.description,
            numVolunteers: req.body.numVolunteers,
            numHours: req.body.numHours,
            price: req.body.price,
            isReported: false,
            comments: []
        })


        // Save task to the database
        // async-await version:
        try {
            const result = await task.save()	
            res.send(result)
        } catch(error) {
            log(error) // log server error to the console, not to the client.
            if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                res.status(500).send('Internal server error')
            } else {
                res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
            }
        }
    }
})

//get all tasks from a specific location
app.get('/api/tasks/:location', async (req, res) => {

    const location = req.params.location;
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	// Get the tasks
	try {
        const tasks = await Task.find({location: location}).populate({ path: 'comments',
        populate: {
            path: 'commenter',
        }
    }).populate({path: 'owner'});
		res.send(tasks) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error - after try")
	}
})
// example of what should be sent from UI: [{ "op": "replace", "path": "/nameOfFieldToChange", "value": }]
app.patch('/api/tasks/:id', async (req, res) => {

	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
    }

    // Find the fields to update and their values.
	const fieldsToUpdate = {}
	req.body.map((change) => {
		const propertyToChange = change.path.substr(1) // getting rid of the '/' character
		fieldsToUpdate[propertyToChange] = change.value
	})
	// const fieldsToUpdate = {isReported: req.body.isReported};

	// Update the student by their id.
	try {
		const task = await Task.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
		if (!task) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(task)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

app.put('/api/tasks/:id', multipartMiddleware, async (req, res) => {
    const id = req.params.id
    

	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
    }

	// Replace the student by their id using req.body
	try {
        if (req.files !== undefined && req.files.image !== undefined) {

            cloudinary.uploader.upload(
                req.files.image.path, // req.files contains uploaded files
                async function (result) {

    
                    const user = JSON.parse(req.body.owner);
                    const owner = await User.findById({"_id": user._id});

                    const comments = JSON.parse(req.body.comments);
    
                    const task = {
                        owner: owner,
                        image: result.url,
                        location: req.body.location,
                        title: req.body.title,
                        description: req.body.description,
                        numVolunteers: req.body.numVolunteers,
                        numHours: req.body.numHours,
                        price: req.body.price,
                        isReported: req.body.isReported,
                        comments: comments
                    }
            
                const newTask = await Task.findOneAndReplace({_id: id}, task, {new: true, useFindAndModify: false})
                if (!newTask) {
                    res.status(404).send()
                } else {   
                    res.send(newTask)
                }
            });
        } else {

            // usual stuff 
            const task = await Task.findOneAndReplace({_id: id}, req.body, {new: true, useFindAndModify: false})
            if (!task) {
                res.status(404).send()
            } else {   
                res.send(task)
            }
        }
	} catch (error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

app.put('/api/tasks/:id/comments', async (req, res) => {
    // Add code here

    const id = req.params.id;

    // Good practise: Validate id immediately.
    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
        return;  // so that we don't run the rest of the handler.
    }

    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    const newComment = {
        commenter: req.body.commenter,
        comment: req.body.comment
    };

    // If id valid, findById
    try {
        const task = await Task.findById(id)
        if (!task) {
            res.status(404).send('Resource not found')  // could not find this student
        } else {
            /// sometimes we might wrap returned object in another object:
            let comments = task.comments;
            comments.push(newComment);

            const fieldsToUpdate = {comments: comments};
            const updatedTask = await Task.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
            if (!updatedTask) {
                res.status(404).send('Resource not found')
            } else {   
                res.send(updatedTask);
            }
        }
    } catch(error) {
        log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

/// a DELETE route to remove a task by their id.
app.delete('/api/tasks/:id', async (req, res) => {
	const id = req.params.id

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send('Resource not found')
		return;
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	// Delete a student by their id
	try {
		const task = await Task.findByIdAndRemove(id)
		if (!task) {
			res.status(404).send()
		} else {   
			res.send(task)
		}
	} catch(error) {
		log(error)
		res.status(500).send() // server error, could not delete.
	}
})

//get all users that are within a specific location and return sorted object in 
//decending order of ratings
app.get('/api/users/:location', mongoChecker, async (req, res) => {
 
    const user_location = req.params.location
  
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
  
    try {
        //finding all users in database with location = user_location
        const users = await User.find({location: user_location})

        //getting the average ratings of each user in users at the same location as user_location
        let user_to_sort = []

        // Iterating through each users review to find average of all their ratings
        users.map((user) => {
            let total_reviews = 0
            let curr_total = 0
            user.reviews.map((review) => {

                total_reviews ++
                curr_total += review.rating
                
            })
           
            if (curr_total !== 0) {
                let avg_rate = Number(Math.floor(curr_total/total_reviews))
                user_to_sort.push({"user": user, "avgRating": avg_rate})
            } else {
                user_to_sort.push({"user": user, "avgRating": Number(0)})
            }
        })
     
        // Sorting all the users in decending order of avgRating
        let sorted_users = user_to_sort.sort(function(a, b) {return b.avgRating - a.avgRating})
        
        res.send( sorted_users )
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
  
 })
 
 //patch method to add new review to a specific user
 app.patch('/api/users/:id', mongoChecker, async (req, res) => {
	
    //Getting the current user id from the parameter
	const user_id = req.params.id

	if (!ObjectID.isValid(user_id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
    }
    
	try {
        // push new review to user.reviews
        const user = await User.findOneAndUpdate({_id: user_id}, {$push: {'reviews': {reviewer: req.body.reviewer,
            comment: req.body.comment,
            rating: Number(req.body.rating),
            time: req.body.time}}}, {new: true, useFindAndModify: false})
		if (!user) {
			res.status(404).send('Resource not found')
		} else {   
			res.send(user)
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

app.delete('/api/users/:id/:review_id', async (req, res) => {

	const id = req.params.id;
	const review_id = req.params.review_id;

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id valid, findById
	try {
		const user = await User.findById(id)
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			/// sometimes we might wrap returned object in another object:
			let reviews = user.reviews.filter((review) => review.id !== review_id);
			const fieldsToUpdate = {reviews: reviews};

			const updatedUser = await User.findOneAndUpdate({_id: id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false})
			if (!updatedUser) {
				res.status(404).send('Resource not found')
			} else {   
				res.send(updatedUser);
			}
		}
	} catch(error) {
		log(error)
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/my-app/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    // const goodPageRoutes = ["/", "/login", "/dashboard"]; //TODO change "good" routes
    // if (!goodPageRoutes.includes(req.url)) {
    //     // if url not in expected page routes, set status to 404.
    //     res.status(404);
    // }

    // send index.html
    res.sendFile(path.join(__dirname, "/my-app/build/index.html")); //TODO add index.html to client
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
