require("dotenv").config();
const express = require("express");
const db = require("./db/conn.js");

app.get("/users", async(req, res) => {
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