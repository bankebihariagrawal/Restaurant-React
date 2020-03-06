const clock = document.querySelector('.clock');
const hr = document.querySelector('#hr'); 
const mn = document.querySelector('#mn');
const se = document.querySelector('#se');
//deg = 6 because 360(total angle)/60;
const deg = 6;
setInterval(()=> {
    let date = new Date();
    let hour = date.getHours() * 30 ;
    let minute = date.getMinutes() * deg;
    let second = date.getSeconds() * deg;
    hr.style.transform = `rotateZ(${hour+(minute/12)}deg)`;
    mn.style.transform = `rotateZ(${minute}deg)`;
    se.style.transform = `rotateZ(${second}deg)`;
    console.log(hour,minute,second ,hour+(minute/12) , minute,second);
},1000);