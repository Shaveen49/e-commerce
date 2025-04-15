const {connection} = require("../db/dbConnecntion")
const bcrypt = require('bcrypt')
const saltRounds  = 10;

const login = (req,res)=>{
    connection.query(
        'select * from users where email = ?'
        [req.body.email],
        (err,rows)=>{
            if(err){
                console.log(err)
                return res.status(500).send("Database error")
            }
            if(rows.length===0){
                return res.status(401).send("Invalid email or Password")
            }
            
            const user = rows[0];

            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(err){
                    console.log(err)
                    return res.status(500).send("Error comparing passwords")
                }
                if(result){
                    res.send("Login successful")
                }else{
                    return res.status(401).send("Invalid credentials")
                }
            })
        }
    )
}

