const express = require('express')
const app = express()
const PORT = 3000
const fetch = require('node-fetch')

app.use(express.static('views'));
app.use(express.static('js'));
app.use(express.text());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
app.get('/search', (req, res, next) => {
    res.sendFile(__dirname + '/views/search.html')
})
app.post('/search', async (req, res) => {
    console.log(req.body)

    let { riotApi } = require('./config.json');
    let username = req.body.username
    const result = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${riotApi}`, {
        method: "GET",
    })
    let data = await result.text()
    let userinfo = await JSON.parse(data)

    const searchById = await fetch(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userinfo.id}?api_key=${riotApi}`, {
        method: "GET",
    })
    let temp = await searchById.text()
    let userTEMP = await JSON.parse(temp)
    let userWL = []

    for (let i = 0; i < 2; i++) {
        if (userTEMP[i]) {
            if (userTEMP[i].queueType != 'RANKED_TFT_PAIRS') {
                userWL.push(userTEMP[i])
            }
        }
    }


    res.send(JSON.stringify({
        profile: {
            username,
            icon: userinfo.profileIconId,
            level: userinfo.summonerLevel,
            type: userWL[0].queueType,
            tier: `${userWL[0].tier} ${userWL[0].rank} ${userWL[0].leaguePoints}`,
            win: userWL[0].wins,
            lose: userWL[0].losses,
        }
    }))
})

app.listen(PORT, () => {
    console.log('Running at ' + PORT);
})