const dayVal = document.getElementById("day");
const yearVal = document.getElementById("year");
const monthVal = document.getElementById("month");
const submit_btn=document.getElementById("submit");

const error_year= document.getElementById("year1");
const error_month= document.getElementById("month1");
const error_day=document.getElementById("day1");

let myDate = new Date();
const cd = myDate.getDate();
const cm = myDate.getMonth() + 1;
const cy = myDate.getFullYear();

const leapYear = (value) => {
  if (value % 4 === 0) return true;
  else return false;
};

let result = [];
const ageCalculator = (y, m, d) => {
  let m31 = [5, 7, 8, 10, 12];
  let finalYear = cy - y;
  let finalMonth = 0;
  if (cm - m < 0) {
    finalYear--;
    finalMonth = cm - m + 12;
  } else {
    finalMonth = cm - m;
  }
  let finalDate = 0;
  if (cd - d > 0) {
    finalDate = cd - d;
  } else {
    finalMonth--;
    if (cm === 1) {
      finalDate = cd - d + 31;
    } else if (m31.includes(cm - 1)) {
      finalDate = cd - d + 30;
    } else if (cm == 2 && leapYear(cy)) {
      finalDate = cd - d + 29;
    } else if (cm == 2 && !leapYear(cy)) {
      finalDate = cd - d + 28;
    } else {
      finalDate = cd - d + 31;
    }
  }
  result[0] = finalYear;
  result[1] = finalMonth;
  result[2] = finalDate;
  return result;
};

let isValid=false;

dayVal.addEventListener("input",(e)=>{
if(+dayVal.value>31){
    error_day.textContent="Must be a valid day";
    isValid=false;
    return;
}else{
    isValid=true;
    error_day.textContent="";
}
})

monthVal.addEventListener("input",(e)=>{
if(+monthVal.value>12){
    error_month.textContent="Must be a valid month";
    isValid=false;
    return;
}else if(+dayVal.value>29 && +monthVal.value===2){
    error_day.textContent="must be a valid day";
    isValid=false;
    return;
}else{
    isValid=true;
    error_month.textContent="";
}
})
yearVal.addEventListener("input",(e)=>{
if(+yearVal.value>cy){
    error_year.textContent="Must be in past";
    isValid=false;
    return;
}else{
    isValid=true;
    error_year.textContent="";
}
})

submit_btn.addEventListener("click",(error)=>{
    ageCalculator(yearVal.value,monthVal.value,dayVal.value);
    if(isValid){
        document.getElementById("dayO").innerHTML=result[2];
        document.getElementById("monthO").innerHTML=result[1];
        document.getElementById("yearO").innerHTML=result[0];
        
    }
})