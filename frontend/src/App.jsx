import { useState } from 'react'

import './App.css'
import { Transaction, Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import axios from "axios"

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/XSxdigqiku8RSwG5PW_WANmDULdmx7lB")

const fromPubkey = new PublicKey("DsvtRGD7xvU1H1gkBNtg1LCg7NJmRzTuaaNpNBY7gGL7")

function App() {
  const [count, setCount] = useState(0)

  async function sendSol() {
    const ix = SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey("DB32vzYuLB14xiEGzsdpJ3YGyyUzFNyHP2aVfHVoABp6"),
      lamports: 0.01 * LAMPORTS_PER_SOL
    })

    const tx = new Transaction().add(ix);

    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash

    tx.feePayer = fromPubkey

    //Convert the transaction to a bunch of bytes

    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    })

    console.log(serializedTx)

    await axios.post("http://localhost:3000/api/v1/txn/sign", {
      message: serializedTx,
      retry: false
    })

  }

  return (
    <>
      <input type='text' placeholder="Amount"></input>
      <input type='text' placeholder="Address"></input>
      <button onClick={sendSol}>Submit</button>
    </>
  )
}

export default App
