const billInfo = document.getElementById("bill-info")
const tipPerPeople = document.getElementById("tip-per-people");
const totalPerPeople = document.getElementById("total-per-people");
const resetBtn = document.getElementById("btn-reset");

// console.log(billInfo);
function calBill(bill,tip=0,numOfPeople){
    const tipAmount = bill * tip/100;
    const billAmount =  Number(bill) + tipAmount;
    
    // console.log('billamount: ', billAmount);
    return [tipAmount / numOfPeople, billAmount/numOfPeople];
}

// 
billInfo.addEventListener('change',e=>{
    e.preventDefault();
    console.log("active");
    const formData =Object.fromEntries(new FormData(billInfo));
    console.log(formData);
    if (!formData.numOfPeople || !formData.tip || !formData.numOfPeople  ) return ; // avoid 
    
    const result = calBill(formData.bill,formData.tip,formData.numOfPeople)
    console.log(result)
    tipPerPeople.innerText = `$${result[0].toFixed(2)}`;
    totalPerPeople.innerText = `$${result[1].toFixed(2)}`;
});

// reset

resetBtn.addEventListener('click',e=>{
    billInfo.reset();
    tipPerPeople.innerText = "$0.00";
    totalPerPeople.innerText = "$0.00";
})

