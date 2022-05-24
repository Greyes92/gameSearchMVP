require("dotenv").config();
const express = require("express");
const db = require("./db/conn.js");

const app = express()

app.use(express.json())
app.use(express.static("frontend"));

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



app.listen(process.env.PORT,()=>{
    console.log(`Listening on PORT: ${5050}...`)
})