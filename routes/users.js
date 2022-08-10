const express = require("express")
const router = express.Router()
const { collection, ObjectId } = require("../config/database")

// get all documents
router.get("/", (req, res) => {
    //res.send("User List")
    // collection.find().toArray((err, result) => {
    collection.find({}, { projection: { _id: 0 } }).toArray((err, result) => {
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
        const id = new ObjectId(req.params.id)
        collection.findOne({_id: id}, (err, result) => {
            if (err) throw err;
            res.send(result)
        });       
    })
    .put((req, res) => {    
        //res.send(`Update User with ID ${req.params.id}`)
        const id = new ObjectId(req.params.id)
        let myquery = { _id: id };
        let newvalues = { $set: req.body };
        collection.updateOne(myquery, newvalues, (err, res) => {
            if (err) throw err;
        });
        res.send("1 document updated");
    })
    .delete((req, res) => {    
        //res.send(`Update User with ID ${req.params.id}`)
        const id = new ObjectId(req.params.id)
        let myquery = { _id: id };
        collection.deleteOne(myquery, function(err, obj) {
            if (err) throw err;
        });
        res.send("1 document deleted");
    })

module.exports = router