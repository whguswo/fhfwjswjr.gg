const search = document.querySelector('#submit')
const username = document.querySelector('#username')

search.addEventListener('click', () => {
    location.href = `/search?userName=${username.value}`
})