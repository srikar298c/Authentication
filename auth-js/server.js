const express = require('express')
const app = express()

app.get('/root', (req, res) => {
    res.send('Here I am');
})

PORT = 3000
app.listen(PORT, () => {
    console.log(`app is up and running on the port:${PORT}`);
})