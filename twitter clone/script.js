document.querySelector('#foryou').addEventListener('click', () =>{
    document.querySelector('.underlinecolor1').classList.remove("hidden");
    document.querySelector('.underlinecolor2').classList.add("hidden");
    document.querySelector('.underlinecolor3').classList.add("hidden");
})

document.querySelector('#following').addEventListener('click', () => {
    document.querySelector('.underlinecolor2').classList.remove("hidden");
    document.querySelector('.underlinecolor1').classList.add("hidden");
    document.querySelector('.underlinecolor3').classList.add("hidden");
});

document.querySelector('#bgmi').addEventListener('click', () =>{
    document.querySelector('.underlinecolor3').classList.remove("hidden");
    document.querySelector('.underlinecolor2').classList.add("hidden");
    document.querySelector('.underlinecolor1').classList.add("hidden");
})


document.querySelector('.subscribebtn').addEventListener('click' , ()=>{
    document.querySelector('.subscribebtn').innerText = "Subscribed"
})