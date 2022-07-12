const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'mydb'
};

let pessoas = '';
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Nei Fassula')`
connection.query(sql)
connection.query('SELECT * FROM people', (err, rows) => {
    if (err) throw err

    pessoas = '<ul>'
    rows.forEach(pessoa => {
        pessoas = pessoas + `<li>${pessoa.name}(${pessoa.id})</li>`
    });
    pessoas = pessoas + '</ul>'    
})
connection.end()


app.get('/', (req,res) => {
    
    res.send(
        `<h1>Full Cycle Rocks!!</h1>
         <h2>Lista:</h2>
         ${pessoas}`
    );
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

