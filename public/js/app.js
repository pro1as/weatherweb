

const WForm = document.querySelector('form')
const searchE = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')



WForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const loc = searchE.value
    msg1.textContent = '...'
    msg2.textContent = ''

    fetch(`http://localhost:3000/weather?address=${loc}`).then(response => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            }
            else {
                msg1.textContent = data.forecast
                msg2.textContent = data.loc
            }
        })
    })

})