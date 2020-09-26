const http = require('http')
const querystring = require('querystring')

const port = process.argv[2]
const servers = {}
const contentType = {'Content-Type': 'text/plain'}

const requestHandler = (request, response) => {
    if (request.method == 'POST') {
        updateHandler(request, response)
    } else if (request.method == 'GET') {    
        listHandler(request, response)    
    } else {
        errorHandler(request, response)
    }
}

const updateHandler = (request, response) => {
    var body = ''
    request.on('data', (data) => body += data)
    request.on('end', () => {
        const params = querystring.parse(body)
        if (params['name']) {
            const ip = request.connection.remoteAddress
            console.log(`ip: ${ip}, name: ${params['name']}`)
            servers[params['name']] = {
                ip: ip,
                updatedAt: new Date()
            }
        } else {
            console.log(`Ignoring request ${body}`)
        }

        response.writeHead(200, contentType)
        response.write('OK\n')
        response.end()
    })
}

const listHandler = (request, response) => {
    response.writeHead(200, contentType)
    response.write(JSON.stringify(servers))
    response.end()
}

const errorHandler = (request, response) => {
    response.writeHead(500, contentType)
    response.end()
}

http.createServer(requestHandler).listen(port, (err) => {
    if (err) {
        return console.log('Could not initiate the server', err)
    }

    console.log(`server is listening on ${port}`)
})