import { Request, Response, NextFunction } from 'express'
import ProvedorJwt from './ProvedorJwt'
import RepositorioUsuario from '@/core/usuario/service/RepositorioUsuario'
import Usuario from '@/core/usuario/model/Usuario'

export default function UsuarioMiddleware(repositorio: RepositorioUsuario) {
  return async (req: Request, resp: Response, next: NextFunction) => {
    const acessoNegado = () => resp.status(403).send('Token inválido')
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      acessoNegado()
      return
    }

    const provedorJwt = new ProvedorJwt(process.env.JWT_SECRET!)

    const usuarioToken = provedorJwt.obter(token) as Usuario
    const usuario = repositorio.buscarPorEmail(usuarioToken.email)

    if (!token) {
      acessoNegado()
      return
    }

    ;(req as any).usuario = usuario

    next()
  }
}
