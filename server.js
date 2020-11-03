const express = require("express")
const app = express()

app.use(express.static("./index.html"))

app.listen(process.env.PORT || 3000,() => {
    console.log("listening at port 3000")
})