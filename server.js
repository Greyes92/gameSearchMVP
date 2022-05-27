require("dotenv").config();
const express = require("express");
const db = require("./db/conn.js");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(express.static("public"));
// app.use(cors())

// ====================== WISH LIST =================================
//get wishlist of one user
app.get("/wishlist/:user_name", async(req, res) => {
     try {
     const username = req.params.user_name
     const {rows} = await db.query('SELECT * FROM wishlist WHERE user_name = $1;', [username])
        if ({rows}.rows.length === 0){
          res.send({ status: 404, message: "That user doesn't exist!" })
          } else {
            res.send({rows}.rows)
            console.log({rows}.rows)
          }
     } catch (err) {
     console.error(err.message)
     }

})

// post game to wishlist
// app.post("/wishlist/:title/:release_date/:platforms/:user_name", async (req,res) =>{
app.post("/wishlist", async (req,res) => {
     try{
     // const title = req.params.title
     // const release_date = req.params.release_date
     // const platforms = req.params.platforms
     // const user_name = req.params.user_name
     const {title, release_date, platforms, user_name} = req.body
     const {rows} = await db
      .query("INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES($1, $2, $3, $4) RETURNING*;", [
         title, 
         release_date, 
         platforms,
         user_name
     ])
     res.send({rows}.rows)
     console.log({rows}.rows)
     } catch (error) {
          console.error(error.message)
     }
})

// app.delete("/wishlist/:title/:user_name", async(req, res) => {
app.delete("/wishlist", async(req, res) => {
     try{
          // const title = req.params.title
          // const user_name = req.params.user_name
          const {title, user_name} = req.body
          const {rows} = await db
          .query("DELETE FROM wishlist WHERE title = $1 AND user_name = $2 RETURNING*;", [
               title,
               user_name
          ])
          res.send({rows}.rows)
          console.log({rows}.rows)
          console.log("game has been deleted")
     } catch (error) {
          console.log(error.message)
     }
})


// ================================= USERS =========================================
//gets all users
app.get("/users", async(req, res) => {
     try {
     const data = await db.query('SELECT * FROM users',)
        if (data.rows.length === 0){
          res.send({ status: 404, message: "That user doesn't exist!" })
          } else {
            res.send(data.rows)
            console.log(data.rows)
          }
     } catch (err) {
     console.error(err.message)
     }

})

//get one user
app.get("/users/", async(req, res) => {
     try {
          const {id} = req.params.id
          const {rows} = await db.query('SELECT * FROM users WHERE user_id = $1;', [id])
          if ({rows}.rows.length === 0){
          res.send({ status: 404, message: "That user doesn't exist!" })
          console.log({rows}.rows)
          } else {
            res.send({data: {rows}.rows, message: "Here is the requested user"})
            console.log({rows}.rows)
          }
     } catch (err) {
     console.error(err.message)
     }

})

//adds a user
app.post('/users/', async(req, res) => {
     try {
          const {name, user_name, password} = req.body
          const {rows} = await db.query('INSERT INTO users (name, user_name, password) VALUES ($1, $2, $3) RETURNING*;',
          [
               name,
               user_name,
               password
          ])
          res.send({data: {rows}, message: "New user has been created."})
          console.log({rows})
          console.log('User was created')
     } catch (err) {
          console.log(err.message)
     }
})

app.patch('/users/', async(req, res) => {
     try {
          const {currentUserName, newname, newpassword} = req.body
          console.log(req.body)
          const {rows} = await db.query('UPDATE users SET name = $2, password = $3 WHERE user_name = $1 RETURNING*;',
          [
               currentUserName,
               newname,
               newpassword
          ])
          res.send({data: {rows}, message: "Your info has been updated!"})
          console.log({rows})
          console.log('User info was updated.')
     } catch (err) {
          console.log(err.message)
     }
})

//deletes a user
app.delete("/users", async(req, res) => {
     try{
          const {user_name} = req.body
          const {rows} = await db
          .query("DELETE FROM users WHERE user_name = $1;", [user_name])
          res.send({rows}.rows)
          console.log({rows}.rows)
          console.log("The user has been deleted")
     } catch (error) {
          console.log(error.message)
     }
})


app.listen(process.env.PORT,()=>{
    console.log(`Listening on PORT: ${5050}...`)
})