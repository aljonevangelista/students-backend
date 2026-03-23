// SQL


const connection = require ('../config/db.js');


//get all users
exports.getAllUsers = (req,res)=>{
    connection.query('SELECT * FROM Student', (err,rows,fields) => {
        if (err) throw err;
            res.json(rows);
    });
};


//Search a user by Id
exports.getUserById = (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM Student WHERE id=?', [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};


//Search a user by course
exports.getUserByCourse=(req,res)=> {
    const course=req.params.course;
    connection.query('SELECT * FROM Student WHERE course=?', [course], (err, rows,fields)=> {
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
    const {name, age, course,gender, year} = req.body;
    connection.query('INSERT INTO Student (name, age, course, gender, year) VALUES (?,?,?,?,?)',[name, age, course, gender, year], (err,result)=> {
        if(err) throw err;
        res.json({message:'User Created Successfully', userId:
        result.insertId});
    })
}


//update
//crud -update
exports.updateUser=(req,res)=>{
    const {id, name, age, course, gender, year} = req.body;
    connection.query('UPDATE  Student SET name=?, age=?, course=?, gender=?, year=?, WHERE id=?', [name, age, course, gender, year, id], (err,result) => {
        if (err) throw err;
        if(result.affectedRows>0)
            res.json({message:'User Update Succesfully'});
        else
            res.status(404).json({message:'User not found'});
    });
};

//delete
//crud-delete

exports.deleteUser=(req,res)=>{
    const {id}  = req.body;

    connection.query('DELETE FROM Student WHERE id=?', [id], (err,result) => {
        if (err) throw err;
        if(result.affectedRows>0)
            res.json({message:'User Deleted Succesfully'});
        else
            res.status(404).json({message:'User not found'});
    });
};
