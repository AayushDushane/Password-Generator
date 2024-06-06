const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const dataIndicator = document.querySelector("[data-indicator]");
const generateButton = document.querySelector(".generateButton");
const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");

let symbol = '~!@#$%^&*()_+}{":?>-<,.';

let password = "";
let passwordLenght =10;
let checkcount = 0;


handleSlider();

//setIndicator("#ccc");




function handleSlider(){
    inputSlider.value = passwordLenght ;
    lengthDisplay.innerText = passwordLenght;

    
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min ,max ){
    return Math.floor(Math.random()*(max - min)) + min;
}

function generateRndNumber(){
   return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode( getRndInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode( getRndInteger(65,91))
}

function generateSymbol(){
    const randomSymbol = getRndInteger(0,symbol.length);
    return symbol.charAt(randomSymbol);
} 

function calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasSymbol = false;
    let hasNumber = false;

    if(uppercase.checked) hasUpper = true;
    if(lowercase.checked) hasLower = true;
    if(numbers.checked) hasNumber = true;
    if(symbols.checked) hasSymbol = true;
    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLenght >= 8){
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLenght >=6){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }
}


async function copyContent(){
    try{
       await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        
        copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}
function suffle(array){
    for(let i= array.length-1 ;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str = "";
    array.forEach((el)=>(str+=el));
    return str;
}

function handleCheckBoxes(){
    checkcount = 0;
    allCheckBoxes.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    });

    if(passwordLenght<checkcount){
        passwordLenght=checkcount;
        handleSlider();
    }

}
allCheckBoxes.forEach((check)=>{
    check.addEventListener('change', handleCheckBoxes);
})

inputSlider.addEventListener('input',(e)=>{
    passwordLenght = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});

generateButton.addEventListener('click',()=>{
   // console.log("in generation fun");
    if(checkcount==0){
        
        return;
    }
    if(passwordLenght<checkcount){
        passwordLenght=checkcount;
        handleSlider();
    }

    password = "";

    let funArr = [];

    if(uppercase.checked){
        funArr.push(generateUpperCase);
    }
    if(lowercase.checked){
        funArr.push(generateLowerCase);
    }
    if(numbers.checked){
        funArr.push(generateRndNumber);
    }
    if(symbols.checked){
        funArr.push(generateSymbol);
    }
    console.log("Above Loop");
    

    for(let i=0;i<funArr.length;i++){
        console.log("special addons" + funArr[i]);
        password+=funArr[i]();
        console.log("passisss  ::" + password);
    }
    console.log("conditon walla passwod--> "+password);

    for (let i = 0; i < passwordLenght - funArr.length; i++) {
        let randomIndex = getRndInteger(0, funArr.length);
        password += funArr[randomIndex](); 
        
    }
    console.log("Pass Is BEFORE SUFFLE"+ password);
    password = suffle(Array.from(password));
    passwordDisplay.value = password;
    console.log("Pass Is "+ password);
    calStrength();


});