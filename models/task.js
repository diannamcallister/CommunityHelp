/* Student mongoose model */
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    commenter: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comment: String
});

const Task = mongoose.model('Task', {
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User' 
	},
	image: {
		type: String
	},
	location: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	title: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	description: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	numVolunteers: {
		type: Number,
		required: true,
		minlegth: 1,
		trim: true
	},
	numHours: {
		type: Number,
		required: true,
		minlegth: 1,
		trim: true
	},
	price: {
		type: Number,
		required: true,
		minlegth: 1,
		trim: true
	},
	isReported: {
		type: Boolean,
		required: true,
		minlegth: 1,
		trim: true
	},
	comments: [CommentSchema]
})

module.exports = { Task }
