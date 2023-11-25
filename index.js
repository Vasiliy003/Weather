function perseData(data){
    let temperature = document.querySelector(".temperature")
    temperature.innerHTML = Math.round(data['current']['temperature_2m']) + 'º C'
}

function setTime(data){
    let time = document.querySelector(".time")
    data = data['datetime'].split('T')[1].split(':')
    time.innerHTML = data[0] + ':' + data[1]

    // minutes = Number(data[0]) * 60 + Number(data[1])
    // position = calculatePosition(minutes)

    // minutes = Number(data[0]) * 60 + Number(data[1])
    // position = calculatePosition2(minutes)

    minutes = Number(data[0]) * 60 + Number(data[1])
    position = calculatePosition3(minutes)

    let sun = document.querySelector(".sun")
    sun.style.top = position["top"] + "px"
    sun.style.left = position.left + "px"
}

function getWeather(){
    fetch('https://api.open-meteo.com/v1/forecast?latitude=55.0415&longitude=82.9346&current=temperature_2m&hourly=temperature_2m&timezone=Europe%2FMoscow&forecast_days=1')
    .then(response => {return response.json()})
    .then((data) => perseData(data))
    .then(err => console.log(err))

    fetch('https://worldtimeapi.org/api/timezone/Asia/Novosibirsk')
    .then(response => {return response.json()})
    .then((data) => setTime(data))
    .then(err => console.log(err))
}

getWeather()

function calculatePosition(minutes){

    //РАБОТАЕТ!! (не трогать)

    let left = (1439 - minutes) * (screen.width / 1439)
    let top = left * 0.56 

    let sun = screen.width / 100 * 12.5
    
    left = left - sun / 2
    top = top - sun / 2

    let position = {top: top, left: left}
    console.log(position)
    return position
}

function calculatePosition2(minutes){

    //РАБОТАЕТ!! (не трогать)
    
    let sun = screen.width / 100 * 12.5
    let angle = 1.57 / 1439 * (minutes) 
    let r = screen.height
    let top = -screen.height + r * Math.sin(angle)
    let left = r * Math.cos(angle)

    left = left - sun / 2
    top = top + sun / 2

    let position = {top: -top, left: left}
    console.log(position)
    return position
}

function calculatePosition3(minutes){

    //РАБОТАЕТ!! (не трогать)

    let sun = screen.width / 100 * 12.5
    let angle = 1.57 / 1439 * (minutes)
    let a = screen.width - sun / 2
    let b = screen.height - sun / 2

    let top = b * Math.sin(angle)
    let left = a * Math.cos(angle)

    top = screen.height - top

    let position = {top: top, left: left}
    console.log(position)
    return position
}