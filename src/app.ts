import express from 'express';
import cors from 'cors';
import compression from 'compression';
import routes from './routes/routes';

class App {
    public express: express.Application;
    public constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(compression());
    }

    private routes() {
        this.express.use(routes);
    }
}

export default new App().express;
