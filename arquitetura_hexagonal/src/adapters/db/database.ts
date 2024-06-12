import sqlite3 from 'sqlite3'

const DBSOURCE = "./arqhex.db"

const SQL_ITENS_CREATE = `
    CREATE TABLE usuarios
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      nome   VARCHAR(255) NOT NULL,
      email   VARCHAR(255) NOT NULL,
      senha   VARCHAR(255) NOT NULL
    );
`

export const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        //console.log('Base de dados conectada com sucesso.')
        database.run(SQL_ITENS_CREATE, (err) => {
            if (err) {
                // Possivelmente a tabela já foi criada
            } else {
                //console.log('Tabela usuários criada com sucesso.')
            }
        })
    }
})
