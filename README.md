GH CAPSTONE PROJECT: GOGH ON! 
 *
Deployed link:
https://goghon.herokuapp.com/*

Ataa Amanda Ellie Quynh

about GOGH ON!:
                   
A virtual collaborative drawing space where users express their creativity - together!
Create a piece of art with up to 4 friends

CURRENT FEATURES:
  - generate an avatar
  - create a room
  - generate a link to the room (to copy/paste to friends
  - chat with users in your room (while you wait for everyone to join)
  - START your session (more modes in prog), where you can continue chatting, and start drawing!
  - When you're done:
      - END your session by pressing 'end session' in your drawing toolbox
      - SAVE your piece to your computer, or scrap it/start a new session!
                                   
 
 *UNDER DEVELOPMENT*.
 Fun game modes to help get past creative blocks and/or just play with friends TO COME!


FOR THE DEVELOPERS:
*
Deploy immediately by pushing your branch to Heroku:

git push heroku main
*











*
LEAVING the rest here (for now)... in case we wind up creating a db for some ungodly reason:
*
* Update project name and description in `package.json`
* `npm install`
* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
* These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

* By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)


### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

* **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku config:set JWT=<your secret here!>` to set a secret for JWT signing

Database Setup

  3.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno (This creates your production database)

  4.  `heroku config:set SEED=true` to get heroku to sync and seed your database

  5.   note everytime your app restarts, the database tables will be dropped and re-created. To avoid this you can `config:unset SEED`


* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.


