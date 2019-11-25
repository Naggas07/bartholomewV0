require('../config/db.config')

const User = require('../models/user/user.model')
const faker = require('faker')


  User.deleteMany()
  .then(() => {
    for (let i = 0; i < 10; i++) {
      const user = new User({
        name: faker.name.firstName(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: '123123123',
        image: faker.image.avatar(),
        rol: 'Admin',
        validated: true,
        createdAt: faker.date.past()
      })

      user.save()
        .then(user => {
          console.log(user.username)
        })
        .catch(console.error)
    }
  })