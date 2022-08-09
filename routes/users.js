const express = require("express")
const router = express.Router()
const collection = require("../config/database")

// get all documents
router.get("/", (req, res) => {
    //res.send("User List")
    collection.find().toArray((err, result) => {
        if (err) throw err;
        res.json(result);
    });
})

// New Record Form will be handled in the Frontend
// router.post("/new", (req, res) => {
//     res.send("User New Form")
// })

// add a document
router.post("/", (req, res) => {
    collection.insertOne(req.body, (err, res) => {
        if (err) throw err;  
    });
    res.send("1 document inserted");
})

router
    .route("/:id")
    .get((req, res) => {    
        //res.send(`Get User with ID ${req.params.id}`)
        collection.findOne({_id: req.params.id}, (err, result) => {
            if (err) throw err;
            res.send(result)
        });       
    })
    .put((req, res) => {    
        res.send(`Update User with ID ${req.params.id}`)
    })
    .delete((req, res) => {    
        res.send(`Update User with ID ${req.params.id}`)
    })

module.exports = router