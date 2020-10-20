import Express from 'express'
import bodyParser from 'body-parser'

import database from './config/database'
import userRoute from './routes/userRoute'
import postagemRoute from './routes/postagemRoute'

const app = Express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.set('json spaces', 2);

userRoute(app)
postagemRoute(app)

function Dispara20Seconds(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('Utilizando Promisse')
        },7000)
    })
}

async function asyncCall() {
    console.log('chamando a promisse com asincronismo e await');
    const result = await  Dispara20Seconds();
    console.log(result);
    // expected output: "resolved"
}

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))
app.get('/mensagem',(req,res)=>res.send('Utilizei esta req para enviar para a rota / esta string, UTILIZAR POSTMAN com ROTAS, onde é possível uso dos MODELS nas requisições, utilizar BANCO DE DADOS, SERVIDOR DE APLICAÇÃO é o BABEL. Pode-se utilizar DOCKER para virtualizar a aplicação. '))
app.get('/promisse',(req,res)=>res.send(asyncCall()))



database.connect().then(() => {
    app.listen(port, () => console.log('Api rodando na porta 3000'))
})