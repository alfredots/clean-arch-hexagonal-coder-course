import dotenv from 'dotenv'
import express from 'express'
import RepositorioUsuarioSqLite from './external/db/RepositorioUsuarioSqLite'
import SenhaCripto from './external/auth/SenhaCripto'
import RegistrarUsuario from './core/usuario/service/RegistrarUsuario'
import RegistrarUsuarioController from './external/api/RegistrarUsuarioController'
import LoginUsuario from './core/usuario/service/LoginUsuario'
import LoginUsuarioController from './external/api/LoginUsuarioController'
import ObterProdutoPorId from './core/produto/service/ObterProdutoPorId'
import ObterProdutoPorIdController from './external/api/ObterProdutoPorIdController'
import UsuarioMiddleware from './external/api/UsuarioMiddleware'
dotenv.config()

const app = express()
const port = process.env.API_PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(port, () => {
  console.log('Servidor executando na porta ' + port)
})

/** Rotas Abertas */
const repositorioUsuario = new RepositorioUsuarioSqLite()
const provedorCripto = new SenhaCripto()
const registrarUsuario = new RegistrarUsuario(provedorCripto, repositorioUsuario)
const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCripto)

new RegistrarUsuarioController(app, registrarUsuario)
new LoginUsuarioController(app, loginUsuario)

/** Rotas Protegidas */
const usuarioMiddleware = UsuarioMiddleware(repositorioUsuario)
const obterProdutoPorId = new ObterProdutoPorId()
new ObterProdutoPorIdController(app, obterProdutoPorId, usuarioMiddleware)
