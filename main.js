const billInfo = document.getElementById("bill-info")
const tipPerPeople = document.getElementById("tip-per-people");
const totalPerPeople = document.getElementById("total-per-people");
const resetBtn = document.getElementById("btn-reset");
const arletMes = document.getElementsByClassName("arlet");
const numOfPeople = document.getElementById("numOfPeople");

const selectBox = document.querySelector('.custom-select');
const inputHidden = document.getElementById('tip');
const optionsBox = selectBox.querySelector('.options');
// const optionItems = optionsBox.querySelectorAll('p[data-value]');
// const customInput = document.getElementById('customOption');

// console.log(billInfo);
function calBill(bill,tip=0,numOfPeople){
    const tipAmount = bill * tip/100;
    const billAmount =  Number(bill) + tipAmount;
    // console.log('billamount: ', billAmount);
    return [tipAmount / numOfPeople, billAmount/numOfPeople];
}

// control form of data()
billInfo.addEventListener('change',e=>{
    e.preventDefault();
    // console.log("active");
    
    const formData =Object.fromEntries(new FormData(billInfo));
    console.log(formData);
    
    // avoid missing data
    if (!formData.numOfPeople || !formData.tip || !formData.numOfPeople  ) return ; 
    
    arletMes.classList.add('hid');
    numOfPeople.classList.remove("input-arlet");
    
    if(formData.numOfPeople < 1) {
    arletMes.classList.remove('hid');
    numOfPeople.classList.add("input-arlet");
    };
    
    // caculate data
    const result = calBill(formData.bill,formData.tip,formData.numOfPeople)
    
    // console.log(result)
    
    //display caculated data
    tipPerPeople.innerText = `$${result[0].toFixed(2)}`;
    totalPerPeople.innerText = `$${result[1].toFixed(2)}`;
});

// reset-button control

resetBtn.addEventListener('click',e=>{
    billInfo.reset();
    tipPerPeople.innerText = "$0.00";
    totalPerPeople.innerText = "$0.00";
    optionsBox.querySelector(".chosen")?.classList.remove("chosen");
})

// control fake tip component

optionsBox.addEventListener("click",e => { 
    // handle event click out of element
    if(e.target.tagName !== "P" && e.target.tagName !=="INPUT") return;
    
    optionsBox.querySelector(".chosen")?.classList.remove("chosen");
    
    // handle fixed tip
    if(e.target.tagName === "P"){
        inputHidden.value = e.target.dataset.value;
        e.target.classList.add("chosen");
    }
    
    //handle custom tip
    if(e.target.tagName === "INPUT"){
        e.target.addEventListener("input",()=>{
            inputHidden.value = e.target.value;
        })
    }
})