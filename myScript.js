

let initialNavColor;

document.addEventListener("readystatechange", function(){
    console.log("show");
    let title = document.getElementsByTagName("title")[0].innerHTML;
    let currentPage;
    document.getElementsByTagName('body')[0].style.backgroundColor = "#E8E8E3";
    if(title.includes("home")){
        currentPage = "nav-home"
        setWhiteBackground();
    }else if(title.includes("about")){
        currentPage = "nav-about"
    }else if(title.includes("contact")){
        currentPage = "nav-contact"
    }else if(title.includes("resources")){
        currentPage = "nav-resources"
    }else if(title.includes("payroll")){
        currentPage = "nav-payroll";
    }else if(title.includes("services")){
        currentPage = "nav-services";
    }

    if(title.includes("home")){
        initialNavColor = "transparent";
    }else{
        initialNavColor = "rgba(0,0,0,0.7)"
    }
    document.getElementsByTagName('nav')[0].style.backgroundColor = initialNavColor;
    document.getElementById(currentPage).className = "selected";
})


function setWhiteBackground(){
    document.getElementsByTagName('body')[0].style.backgroundColor = "white";
}

let timer = null;

let x = window.matchMedia("(max-width: 1024px)");/*min-width: 1024px*/

function setNavbar(x){
    mobileNavbar();
}
setNavbar(x);

window.addEventListener('resize', function(e){
    setNavbar(x);
});


function desktopNavbar(){
    console.log("desktop");
    let navbar = document.getElementsByTagName('nav')[0];/**/
    navbar.style.backgroundColor="rgba(0,0,0,0.7)";
}

function mobileNavbar(){
    window.addEventListener('scroll', function(e){
       
        let navbar = document.getElementsByTagName('nav')[0];
        if(window.scrollY >10){
            navbar.style.backgroundColor="rgba(0,0,0,0.7)";
        }else{
            navbar.style.backgroundColor= initialNavColor;
        }
        
    });
}

function toggle(){
    let menuBtnDivs = document.getElementById("menu-btn").getElementsByTagName("div");
    let div = menuBtnDivs[0];
    let div2 = menuBtnDivs[1];
    if(div.classList.contains("lean-right")){//close menu
        div.classList.remove("lean-right");
        div2.classList.remove("lean-left");
        div.classList.add("top-parallel");
        div2.classList.add("bottom-parallel");
        closeNav();
    }else{
        div.classList.remove("top-parallel");
        div2.classList.remove("bottom-parallel");
        div.classList.add("lean-right");
        div2.classList.add("lean-left");
        openNav();
    }
}

function openNav(){
    document.getElementById("mobile-menu").style.width = "250px";
}

function closeNav(){
    document.getElementById("mobile-menu").style.width = "0";
}

function calcMortgagePayment(p,i,y){
    let r = (i/1200);
    let n = y*12;
    let x = Math.pow(1+r,n);
    let m = p*(r*x/(x-1));
    return formatNum(Math.round(m));
}

function calcTotalMortgage(p,i,y){
    let r = (i/1200);
    let n = y*12;
    let x = Math.pow(1+r,n);
    let m = p*(r*x/(x-1));
    return formatNum(Math.round(m*n));
}
function validateInput(){
    let mA = document.getElementById("mortgage-amount");
    let iR = document.getElementById("interest-rate");
    let mP = document.getElementById("mortgage-period");
    let p = parseFloat(mA.value);
    let i = parseFloat(iR.value);
    let y = parseInt(mP.value);
    if(p>0 && i>=0 && y>0){
        removeErrorClass(mA,iR,mP);
        return true;
    }else{
        if(p<=0 || !p){
            mA.className = "error";
        }else{
            mA.className = "";
        }
        if(i<0 || !i){
            iR.className = "error";
        }else{
            iR.className = "";
        }
        if(y<=0 || !y){
            mP.className = "error";
        }else{
            mP.className = "";
        }
        return false;
    }
}

function removeErrorClass(mA,iR,mP){
    if(mA.classList.contains("error")){
        mA.className = "";
    }
    if(iR.classList.contains("error")){
        iR.className = "";
    }
    if(mP.classList.contains("error")){
        mP.className = "";
    }
}

function enterMortgageInfo(){
    if(validateInput()){
        let p = document.getElementById("mortgage-amount").value;
        let i = document.getElementById("interest-rate").value;
        let y = document.getElementById("mortgage-period").value;
        document.getElementById("monthly-payment").innerHTML=calcMortgagePayment(p,i,y);
        document.getElementById("total-mortgage").innerHTML = calcTotalMortgage(p,i,y);
    }
}

function resetCalculator(){
    document.getElementById("mortgage-amount").value="";
    document.getElementById("interest-rate").value="";
    document.getElementById("mortgage-period").value="";
}

function formatNum(x){
    return "$ "+x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

/*FORM SUBMISSION */
const myForm = document.getElementById("myForm");
const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener("click", function(event){
    event.preventDefault();
    const xhr  = new XMLHttpRequest();
    
    xhr.open("post", "https://p10.secure.webhosting.luminate.com/forms?ssc=us1&login=elisabethb_cpatrust",true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            console.log("Done");
            if (xhr.status == 200) {
                console.log("200");
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(new FormData(myForm));
});
