import Usuario from '@/core/usuario/model/Usuario'
import RepositorioUsuario from '@/core/usuario/service/RepositorioUsuario'
import { database } from './database'

export default class RepositorioUsuarioSqLite implements RepositorioUsuario {
  
  async inserir(usuario: Usuario) {
    const sql = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`
    const params = [usuario.nome, usuario.email, usuario.senha]
    database.run(
      sql,
      params,
      function (error: { message: any; }) {
        if (error) {
          console.error(error.message);
        }
      }
    );
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const sql = `select * from usuarios where email = '${email}'`
    
    const promise = new Promise(function(resolve,reject){
      database.all(sql, function(err: any, rows: any) {
         if(err){return reject(null);}
         resolve(rows);
       });
    });

    const rows = await promise
      .then((rows: any) => rows)
      .catch((error) => error)

    if(rows.length === 0) {
      return null
    }

    const usuario:Usuario = {
      id: rows[0]?.id,
      nome: rows[0]?.nome,
      email: rows[0]?.email,
      senha: rows[0]?.senha
    }

    return usuario
  }
}
