//console.log('client side JS is loaded !')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //Stops the brower from refreshing on submit event
    const location = searchElement.value
    if(location)
    {
        messageOne.textContent = 'Loading...'
    }
    messageTwo.textContent = ''
    const url = 'http://localhost:3000/weather?address='+location
    //console.log(url)
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
               messageOne.textContent = data.error
            }
            else
            {
                messageOne.textContent = data.location
                messageTwo.textContent = 'It is currently '+data.forecast.summary+ '. The temperature outside is '+data.forecast.temperature+ ' degrees and feels like '+data.forecast.feelslike+ ' degrees.'
            }
        })
    })

})
