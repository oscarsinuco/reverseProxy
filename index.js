const express = require('express')
const http = require('http')
const fs = require('fs');
const app = express()
const port = process.env.PORT || 3000


const archivo = 'file'

const download_file = (url) => {
    return new Promise((resolve, reject) => {
        let file = fs.createWriteStream('./'+archivo);
        http.get(url, function (response) {
            response.on('data', function (chunk) {
                file.write(chunk)
            })
            response.on('end', function () {
                console.log('download file completed.')
                resolve('File download completed.')
            })
        })
    })
}

app.get('/', (req, res) => {
    download_file(req.query.url)
        .then(response => {
            res.download('./'+archivo)
        })
        .catch(error => {
            res.status(404).send({
                error: 'El archivo no pudo ser encontrado'
            })
        })
});
app.listen(port, () => console.log(`Example app listening on port port!`))