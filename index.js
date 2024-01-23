
const express = require("express")
const cors = require("cors");


const {connection} = require("./config/db")
const {userControl} = require("./routes/user.route")
const {appointmentControl} = require("./routes/doctor.route")

const app = express();
app.use(cors())
app.use(express.json())

const PORT = 8080


app.get("/", (req, res) => {
    res.send({ message: "It is working..." })
})

app.use("/user", userControl)
app.use("/appointment", appointmentControl)

app.listen(PORT, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("someting wrong while conneting")
        console.log(error)
    }
    console.log(`Server is running on port ${PORT}`)
})