process.env.DEBUG = 'nuxt:*'

const { Nuxt, Builder } = require('nuxt')

const server = require('express')()
const basicAuth = require('express-basic-auth');
const port = 1360;

// Nous instancions Nuxt.js avec les options
const config = require('./nuxt.config.js')
config.dev = (process.env.NUXT_ENV_RUN_MODE !== 'PROD' && process.env.NUXT_ENV_RUN_MODE !== 'STAGING');


async function start(){
    const app = new Nuxt(config)

    if(config.dev){
        const builder = new Builder(app);
        await builder.build();
    }else{
        await app.ready();
    }

    // Faire le rendu chaque route avec Nuxt.js
    server.use(app.render)

    if('STAGING' == process.env.NUXT_ENV_RUN_MODE){
        server.use(basicAuth({
            users: { 'wdd': 'wddceq', 'gtab': 'Gt@b!Un1PwD#S' },
            challenge: true
        }));
    }

    server.listen(port, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:' + port)
    }) 
}

start();