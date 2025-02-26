require("dotenv").config();
const express = require("express");
//const { userModel } = require("./models");
const { Keypair, Transaction, Connection } = require("@solana/web3.js");
const jwt = require("jsonwebtoken");
const bs58 = require("bs58");
const cors = require("cors");

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/XSxdigqiku8RSwG5PW_WANmDULdmx7lB")
const app = express();
const JWT_SECRET = "123456"
app.use(express.json());
app.use(cors());

/*app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //Validate the inputs using zod, check if the user already exists , hash the password.

    const keypair = Keypair.generate();
    await userModel.create({
        username,
        password,
        privateKey: keypair.secretKey.toString(),
        publicKey: keypair.publicKey.toString()

    })
    res.json({
        message: keypair.publicKey.toString()
    })
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userModel.findOne({
        username: username,
        password: password

    })

    if (user) {
        const token = jwt.sign({
            id: user
        }, JWT_SECRET)
        res.json({
            token
        })

    }
    else {
        res.status(403).json({
            message: "Credentials are incorrect"
        })
    }

})
*/

app.post("/api/v1/txn/sign", async (req, res) => {
    const serializedTransaction = req.body.message;
    const tx = Transaction.from(Buffer.from(serializedTransaction));
    //const user=UserModel.find({
    //     where:{
    //         id:""
    //}
    //})
    //const privateKey=user.privateKey;
    //doing it now with random keypair

    const keyPair = Keypair.fromSecretKey(bs58.default.decode(process.env.PRIVATE_KEY))
    const { blockhash } = await connection.getLatestBlockhash();
    tx.blockhash = blockhash;
    tx.feePayer = keyPair.publicKey;

    tx.sign(keyPair);



    const signature = await connection.sendTransaction(tx, [keyPair]);

    console.log(signature);


    res.json({
        message: "Signed Up"
    })
})

app.get("/api/v1/txn", (req, res) => {
    res.json({
        message: "Signed Up"
    })
})


app.listen(3000);