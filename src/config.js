const dev = {
    MOCK: false,
    HOST: 'http://localhost',
    PORT: '3030',
    API: 'graphql'
}

const mock = {
    MOCK: true,
    HOST: '',
    PORT: '',
    API: ''
    
}

const prod = {
    MOCK: true,
    HOST: 'some env var',
    PORT: 'some port var',
    API: 'graphql'
}

let config = null
switch(process.env.REACT_APP_STAGE) {
    case 'production':
        config = prod
        break
    case 'mock':
        config = mock
        break
    default:
        config = dev
}

export default {
...config
}