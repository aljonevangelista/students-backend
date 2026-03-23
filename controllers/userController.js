// SQL


const connection = require ('../config/db.js');


//get all users
exports.getAllUsers = (req,res)=>{
    connection.query('SELECT * FROM userdata', (err,rows,fields) => {
        if (err) throw err;
            res.json(rows);
    });
};


//Search a user by Id
exports.getUserById = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM userdata WHERE id=?', [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};


//Search a user by course
exports.getUserByCourse=(req,res)=> {
    const course=req.params.course;
    connection.query('SELECT * FROM userdata WHERE course=?', [course], (err, rows,fields)=> {
        if(err) throw err;
        if(rows.length>0)
            res.json(rows);
        else
            res.status(404).json
            ({message:'User not found'});
    });
}


//Create a new User
//crud - create
exports.createUser=(req,res)=> {
    const {fname, lname, course, year} = req.body;
    connection.query('INSERT INTO userdata (first_name, last_name, course, year) VALUES (?,?,?,?)',[fname, lname, course, year], (err,result)=> {
        if(err) throw err;
        res.json({message:'User Created Successfully', userId:
        result.insertId});
    })
}


//update

exports.updateUser=(req,res)=>{
    const {id, fname, lname, course, year} = req.body;
    connection.query('UPDATE  userdata SET first_name=?, last_name=?, course=?, year=? WHERE id=?', [fname, lname, course, year,id], (err,result) => {
        if (err) throw err;
        if(result.affectedRows>0)
            res.json({message:'User Update Succesfully'});
        else
            res.status(404).json({message:'User not found'});
    });
};

//delete

exports.deleteUser=(req,res)=>{
    const {id}  = req.body;
    connection.query('DELETE FROM userdata WHERE id=?', [id], (err,result) => {
        if (err) throw err;
        if(result.affectedRows>0)
            res.json({message:'User Deleted Succesfully'});
        else
            res.status(404).json({message:'User not found'});
    });
};
