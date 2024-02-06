const app = require('./app')
const port = require('./src/configs/env').LOCAL_PORT

app.listen(port, () => {
    console.log(`app run at http://localhost:${port}`)
})