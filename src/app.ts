import * as http from 'http';

const hostname = '127.0.0.1';
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const server = http.createServer((req, res) => {
    if (!req.url) throw new Error('URL was undefined');
    const url = new URL(req.url, `http://${req.headers.host}`);

    switch (url.pathname) {
        case '/healthcheck':
            healthcheck(req, res);
            break;
        default:
            notFound(req, res)
            break;
    }
});

const healthcheck = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        status: 'OK',
        errors: [],
    }));
}

const notFound = (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        status: 'ERROR',
        errors: ['Requested resource not found'],
    }));
}


server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});