var express = require('express');
var router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');



//Setup the swagger here
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
            title: 'Logger apis', // Title (required)
            version: '1.0.0', // Version (required)
        },
        host: "http://localhost:3000",
        schemes: [ "http" ],
        tags: [
            {
                name: "posts",
                description: "Posts related apis"
            },
            {
                name: "tasks",
                description: "Tasks related apis"
            },
            {
                name: "timeTable",
                description: "Time table related apis"
            },
            {
                name: "users",
                description: "User related apis"
            }
        ]
    },
    // Path to the API docs
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocs));

module.exports = router;
