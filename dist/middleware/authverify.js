// import * as jwt from "jsonwebtoken";
// import { Response } from "../model/Response";
// export default (req, res, next) => {
//     const token = req.header("x-auth-token");
//     if(!token) {
//         return res.status(401).json(new Response(true, null, "Acesso negado. Sem token"));
//     }
//     try {
//         const decoded = jwt.verify(token, "private-key")
//         req.user = decoded
//         next()
//     } catch (ex) {
//         return res.status(401).send(new Response(true, null, "token invalido "))
//     }
// }
