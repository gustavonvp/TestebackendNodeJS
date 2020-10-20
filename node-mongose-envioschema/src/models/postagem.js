import Mongoose from 'mongoose'

const schema = new Mongoose.Schema({
    title: String,
    content: String,
    author: String,
    publishDate:  { type: Date, default: Date.now }
},
{
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: { 
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
          }
    },
    versionKey: false,
})

const PostagemModel = Mongoose.model('Postagem', schema)

export default PostagemModel