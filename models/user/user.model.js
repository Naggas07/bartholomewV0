const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const generateRandomToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const userSchema = new mongoose.Schema({
      name: {
          type: String,
          required: [true, 'name is required'],
          minlength: [3, 'name needs at las 3 chars'],
          trim: true
      },
      fullname: {
          type: String,
          required: true
      },
      username: {
          type: String,
          required: [true, 'username is your office user'],
          unique: true,
          minlength: 3,
        //   maxlength: 8,
          trim: true,
          uppercase: true
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [EMAIL_PATTERN, 'Email is invalid']
      },
      password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password needs at last 8 chars']
      },
      image:{
          type: String
      },
      rol:{
          type: String,
          enum: ['Admin', 'Marketing', 'Budget', 'Objetives', 'Accounting', 'Reader'],
          required: true
      },
      department: {
          type: String
      },
      state: {
          type: String,
          default: 'OK'
      },
      lastLogin: {
          type: Date,
          default: new Date()
      },
      validated: {
          type: Boolean,
          default: false
      },
      validateToken: {
          type: String,
          default: generateRandomToken
      }
  }, {timestamps: true})

userSchema.pre('save', function(next) {
    const user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(user.password, salt)
                    .then(hash => {
                        user.password = hash
                        next()
                    })
            })
            .catch(error => next(error))
    }else{
        next()
    }
})

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
  }

  const User = mongoose.model('User', userSchema)

  module.exports = User

