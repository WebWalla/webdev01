function Solve(val){
    let v = document.getElementById("res");
    v.value += val;

}

function Result(){
    let v= document.getElementById("res");
    console.log(eval(v.value));
    v.value = eval(v.value)
}

function Clear(){
    let v= document.getElementById("res");
    v.value = "";
}

function Back(){
    let v = document.getElementById("res");
    v.value = v.value.slice(0,-1);
    
}

document.addEventListener("keydown",function(event){
    let keys = event.key;
    let validKeys = "0123456789+-*/.%";
    if(validKeys.includes(keys)){
        Solve(keys);
    }else if(keys == 'Enter'){
        Result();
    }else if(keys == 'Backspace'){
        Back();
    }
    else if(keys.toLowerCase() == 'c'){
        Clear();
    }
})