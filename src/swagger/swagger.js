const router = require('koa-router')()
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')
const swaggerDefinition = {
    info: {
        title: 'carpark swagger',
        version: '1.0.0',
        description: 'API',
    },
    basePath: '/'
};
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../routes/*.js')]
};

const swaggerSpec = swaggerJSDoc(options)
router.get('/swagger.json', async function (ctx) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
})
module.exports = router