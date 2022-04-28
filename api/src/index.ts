import express from 'express'

let port: number = 3002 


const main = async () => {
    const app = express();
    app.get("/", (_req,res) => {
        res.send("Testing Testing");
    });
    app.listen(port, ()=> {
        console.log(`listneing on localhost:${port}`)
    });
};


main();
