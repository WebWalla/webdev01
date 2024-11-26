let hexElements = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];

let btn = document.querySelector(".btn");
let colorCode = document.querySelector(".colorCode");

btn.addEventListener("click",function(){
    let hexCode ="#";
    for(let i=0; i<6 ;i++){
        hexCode += hexElements[getRandomNumber()];
    }
    document.body.style.backgroundColor = hexCode;
    console.log(hexCode);
    colorCode.textContent = hexCode;
})

function getRandomNumber(){
    return Math.floor(Math.random() * hexElements.length)
}