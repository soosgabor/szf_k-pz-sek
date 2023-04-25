const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/trainings.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "SzF képzések API",
        description: "A dokumentációt a <b>swagger-autogen</b> modul generálta."
    },
    host: "localhost:3000",
    basePath: "/api/trainings/",
    schemes: ['http', 'https'],
    consumes: ['application/json'], // A Content-Type fejléc típusa
    produces: ['application/json'], // A válasz típusa
    tags: [
        {
            "name": "Trainings",
            "description": "Szoftverfejlesztő képzéseket nyílvántartó API"
        }
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api_key",
            in: "header"
        },
        store_auth: {
            type: "oauth2",
            authorizationUrl: "https://store.swagger.io/oauth/authorize",
            flow: "implicit",
        }
    },
    components: {
        Schemas: [
            {
                name: {
                    type: String,
                    required: [true, "Please add a name"],
                    unique: true,
                    trim: true,
                    maxlength: [50, "Name can not be more than 50 characters!"],
                },
                description: {
                    type: String,
                    required: [true, "Please add a description"],
                    unique: true,
                    trim: true,
                    maxlength: [500, "Description can not be more than 500 characters!"],
                },
                website: {
                    type: String,
                    match: [
                        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                        'Please use a valid URL with HTTP or HTTPS'
                    ]
                },
                email: {
                    type: String,
                    match: [
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        'Please add a valid email'
                    ]
                },
                address: {
                    type: String,
                    required: [true, 'Please add an address']
                },
                location: {
                    // GeoJSON Point
                    type: {
                        type: String,
                        enum: ['Point']
                    },
                    coordinates: {
                        type: [Number],
                        index: '2dsphere'
                    },
                    formattedAddress: String,
                    street: String,
                    city: String,
                    state: String,
                    zipcode: String,
                    country: String
                },
                Rating: {
                    type: Number,
                    min: [1, 'Rating must be at least 1'],
                    max: [10, 'Rating must can not be more than 10']
                },
                totalCost: Number,
                photo: {
                    type: String,
                    default: "no-photo.jpg",
                },
                housing: {
                    type: Boolean,
                    default: false
                },
                careers: {
                    // Array of strings
                    type: [String],
                    required: true,
                    enum: [
                        'Web Development',
                        'Mobile Development',
                        'UI/UX',
                        'Data Science',
                        'Business',
                        'Other'
                    ]
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                }
            }
        ]
    },
    definitions: {
        Training: {
            _id: "5d713995b721c3bb38c1f5d0",
            user: "5d7a514b5d2c12c7449be045",
            $name: "Jedlik Ányos Gépipari és Informatikai Technikum", // kötelező
            $description: "Az iskola képzési profilja...", // kötelező
            website: "https://jedlik.eu",
            email: "jedlik@jedlik.eu",
            address: "7 Szent Istvan Rd Győr 9021",
            careers: ["Web Development", "UI/UX", "Business"],
            housing: true
        }
    }
}






swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        require('./server.js')
    })
