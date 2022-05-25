require("dotenv").config();
const express = require("express");
const db = require("./db/conn.js");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(express.static("frontend"));
app.use(cors())

// ====================== WISH LIST =================================
//get wishlist of user
app.get("/wishlist/:id", async(req, res) => {
     let id = req.params.id
     try {
     const data = await db.query('SELECT * FROM wishlist WHERE user_id = $1;', [id])
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

// post game to wishlist
app.post("/", async (req,res) =>{

     try{
     const data = await db
      .query("INSERT INTO wishlist (title, release_date, platforms, user_id) VALUES($1, $2, $3) RETURNING*;", [
         title, 
         release_date, 
         platforms,
         user_id
     ])
     res.send(data.rows)
     } catch (error) {
          console.error(err.message)
     }
})
// ================================= USERS =========================================
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

app.get("/users/:id", async(req, res) => {
     let id = req.params.id
     try {
     const data = await db.query('SELECT * FROM users WHERE user_id = $1;', [id])
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

app.post('/users/', async(req, res) => {
     try {
          // const name = req.body.name
          // const userName =  req.body.user_name
          // const password = req.body.password
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

app.listen(process.env.PORT,()=>{
    console.log(`Listening on PORT: ${5050}...`)
})