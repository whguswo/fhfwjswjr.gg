const profileIcon = document.querySelector('#profileIcon')
const queueType = document.querySelector('#queueType')
const tier = document.querySelector('#tier')
const nickname = document.querySelector('#nickname')
const search = document.querySelector('#submit')
const username = document.querySelector('#username')
const win = document.querySelector('#win')
const lose = document.querySelector('#lose')

search.addEventListener('click', () => {
    location.href = `/search?userName=${username.value}`
})

const getParameter = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
const displayInfo = (userinfo) => {
    profileIcon.src = `https://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/${userinfo.profile.icon}.png`
    nickname.innerText = userinfo.profile.username
    if (userinfo.profile.type.indexOf('SOLO') != -1) {
        queueType.innerText = `솔로랭크 : ${userinfo.profile.tier}`
    }
    win.innerText = userinfo.profile.win + '승'
    lose.innerText = userinfo.profile.lose + '패'
}

window.addEventListener('load', async (e) => {
    let username = getParameter("userName")
    console.log(username)
    let userinfo = await fetch(`/search`, {
        method: 'POST',
        body: JSON.stringify({
            username
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let data = await userinfo.text()
    userinfo = await JSON.parse(data)
    console.log(userinfo)
    displayInfo(userinfo)
}) 