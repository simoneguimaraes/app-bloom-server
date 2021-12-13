const jwt = require("jsonwebtoken");

module.exports = function generateToken(user) {
  // A senha NUNCA pode ser enviada no token.
  const { _id, name, email, role } = user;

  // Acessando a variável de ambiente definida no .env
  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = "6h";

  return jwt.sign({ _id, name, email, role }, signature, {
    expiresIn: expiration,
  });
};


// o JWT tem duas funções:

// 1. Persistir o login do usuário (ou seja, não necessitar que o usuário faça loggin pra cada rota protegida que ele tentar acessar)
// 2. Garantir um login prévio: a única forma do usuario ter um jwt válido é tendo feito login previamente no nosso servidor