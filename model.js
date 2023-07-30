const { default: mongoose } = require('mongoose')
const shortId = require('shortid')

const shortLinkSchema = new mongoose.Schema({
    longurl: {
        type: String,
        required: true
    },
    shorturl: {
        type: String,
        required: true,
        default: shortId.generate
    }

})

module.exports = mongoose.model('ShortUrl', shortLinkSchema)
