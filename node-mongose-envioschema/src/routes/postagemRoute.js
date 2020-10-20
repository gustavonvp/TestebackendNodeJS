import PostagemModel from '../models/postagem'

const postagemRoute = (app) => {
    
    app.route('/postagem/:id?')
        .get(async (req, res) => {
            const { id } = req.params
            const query = {};

            if (id) {
                query._id = id
            }

            try {

                const postagem = await PostagemModel.find(query)
                res.send({ postagem })
                
            } catch (error) {
                res.status(400).send({ error: 'Falha ao procurar postagem!' })
            }
        })
        .post(async (req, res) => {

            try {
                const postagem = new PostagemModel(req.body)
                await postagem.save()

                res.status(201).send('OK')
            } catch (error) {
                res.send(error)   
            }
        })
        .put(async (req, res) => {
            const { id } = req.params

            if (!id) {
                return res.status(400).send({ error: 'ID da postagem esta faltando!' })
            }

            try {
                const updatePostagem = await PostagemModel.findOneAndUpdate({ _id: id }, req.body, {
                    new: true,
                });

                console.log(updatePostagem)

                if (updatedUser) {
                    return res.status(200).send('OK')
                }


                res.status(400).send({ error: 'Não é possivel atualizar a postagem!' })

                
            } catch (error) {
                res.send(error)
            }
        })
        .delete(async (req, res) => {

            const { id } = req.params

            if (!id) {
                return res.status(400).send({ error: 'ID da postagem está faltando!' })
            }

            try {
                const deletedPostagem = await PostagemModel.deleteOne({ _id: id })

                if (deletedPostagem.deletedCount) {
                    return res.send('OK')
                }

                res.status(400).send({ error: 'Erro ao deletar a Postagem' })

            } catch (error) {
                res.send(error)
            }
        })
}

module.exports = postagemRoute