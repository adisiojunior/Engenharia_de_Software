const app = require('./app');

const port = 3333 | process.env.PORT;

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
