const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const app=express();
app.use(express.json());
app.use(cors());
const db=mysql.createConnection({
     host : "bvfksokz3tms5a7rfrjp-mysql.services.clever-cloud.com",
     user : "uzbij4jrzghij4wi",
     password : "GUFxuJlawMgNBnniR2Xz",
     database : "bvfksokz3tms5a7rfrjp"
})
app.post('/signup', (req, res) => {
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    const sql = "INSERT INTO signupdetails(`name`,`email`,`password`)VALUES(?,?,?)";

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

       

app.post('/login', (req, res) => {
    const mail = req.body.email;
    const pwd = req.body.password;

    const admin = "billa@gmail.com";
    const adminpwd = "Murugan2";
    db.query("SELECT * FROM  signupdetails WHERE email=? AND password=? ", [mail, pwd], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        else if (mail === admin && pwd === adminpwd ) {
            console.log("Admin is in danger");
            return res.status(200).json({ role: "admin" });
        }
        else if (data.length > 0) {
            console.log("User is in cheer up!!");
            return res.status(200).json({ role: "user" });
        }
        else {
            console.log("Invalid credentials");
            return res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

app.get("/Admin", (req, res) => {
    console.log("Request to /Admin received");
    const q = "select * from bookdetails";
    db.query(q, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      
      return res.json(data);
    });
  });
  app.get("/future", (req, res) => {
    console.log("Request to /Admin received");
    const q = "select * from futurebookdetails";
    db.query(q, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      
      return res.json(data);
    });
  });
  app.post("/books", (req, res) => {
    const publishDate = new Date(req.body.publish_date);
    const currentDate = new Date();

    // Check if the book's publish date is in the future
    if (publishDate > currentDate) {
        // If it's a future book, insert into futurebookdetails table
        const futureBookValues = [
            null,  // You might need to provide a unique ID, or use auto-increment
            req.body.title,
            req.body.author,
            req.body.description,
            req.body.publish_date
        ];

        const futureBookSql = "INSERT INTO futurebookdetails (`ID`, `Title`, `Author`, `Description`, `Publish_Date`) VALUES (?, ?, ?, ?, ?)";

        db.query(futureBookSql, futureBookValues, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            console.log("Future Book has been added successfully");
        });
    } 
    else {
        // If it's a current book, insert into bookdetails table
        const currentBookValues = [
            req.body.title,
            req.body.author,
            req.body.description,
            req.body.publish_date
        ];

        const currentBookSql = "INSERT INTO bookdetails (`Title`, `Author`, `Description`, `Publish_Date`) VALUES (?, ?, ?, ?)";

        db.query(currentBookSql, currentBookValues, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            console.log("Current Book has been added successfully");
        });
    }

    return res.json("Book has been added successfully");
  });

  

app.delete("/Admin/:id",(req,res)=>{
    const bookId=req.params.id;
    console.log("this is bookid"+bookId)
    const q="delete from bookdetails where ID=?"
    db.query(q,[bookId],(err,data)=>{
        if(err){console.log(err);
        return res.json(err);}
        return res.json("Book has been deleted successfully");
    })
})
app.put("/Admin/:id",(req,res)=>{
    const bookId=req.params.id;
    console.log("this is bookid"+bookId)
    const q="update bookdetails set `Title`=? ,`Author`=?,`Description`=?,'Publish_Date`=? where ID=?";
    const value=[
        req.body.title,
        req.body.author,
        req.body.description,
        req.body.publish_date
    ]
    db.query(q,[...value,bookId],(err,data)=>{
        if(err){console.log(err);
        return res.json(err);}
        return res.json("Book has been updated successfully");
    })
})
app.listen(3000,()=>{
    console.log("Server is running...")
})