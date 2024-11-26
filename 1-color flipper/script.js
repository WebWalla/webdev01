let colors = ['red','green','blue','yellow', 'white', 'gray', 'pink', 'orange'];

let btn = document.querySelector(".btn");
let container = document.querySelector(".container");
let colorCode = document.querySelector(".colorCode")


btn.addEventListener("click",function(){
    let randomNumber = Math.floor(Math.random() * 8);
    console.log(randomNumber)
    document.body.style.backgroundColor = colors[randomNumber];
    colorCode.innerText = colors[randomNumber]
})