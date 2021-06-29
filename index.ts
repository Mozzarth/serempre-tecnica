import { app } from './backend/server';

function App(req :any, res:any) {
    if (!req.url) {
        req.url = '/';
        req.path = '/';
    }
    return app(req, res);
}

exports.serempremozzarth = App