import express from 'express'

const app = express()

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.get('/api/jokes',(req,res)=>{
    const jokes = [
        {
            id : 1,
            title  : 'Joke 1',
            content : 'Why was the math book sad?'
        },
        {
            id : 2,
            title  : 'Joke 2',
            content : 'Why was the physics book sad?'
        },
        {
            id : 3,
            title :  'Joke 3',
            content : 'Why was the chemistry book sad?'
        },
        {
            id : 4,
            title : 'Joke 4',
            content : 'Why was the biology book sad?'
        },
        {
            id : 5,
            title : 'Joke 5',
            content : 'Why was the computer science book not sad?'
        }
    ]

    res.send(jokes)
})

const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`Serve at http://localhost:${port}`);
});