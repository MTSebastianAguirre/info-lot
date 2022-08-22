import express from 'express';
import http from 'http';
import { SERVER_PORT } from '../global/environment';

export default class Server {

    private static _instance: Server;
    
    public app: express.Application;
    public port: number;

    private httpServer: http.Server;

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        
        this.httpServer = new http.Server(this.app);

    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
    }

}