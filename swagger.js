const swaggerAutoGen = require('swagger-autogen')()
const j2s = require('joi-to-swagger')
const {userSchema, countrySchema} = require('./joiValidators')

const { swagger: user } = j2s(userSchema);
const { swagger: country } = j2s(countrySchema);


const doc = {
    info: {
        title: "Roaming Wanderer Documentation",
        description: "This is the API documentation for Roaming Wanderer",
    },
    '@definitions': {
        user: user,
        country: country,
      },    
    host: "localhost:3000",
    schemes: ['http'],
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/router/v1/admin.routes.js', './src/router/v1/trip.routes.js']

swaggerAutoGen(outputFile, endpointsFiles, doc)