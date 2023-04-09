const main = document.querySelector("main");
const nav = document.querySelector("nav");
const nav_li = document.querySelectorAll("li");
const nav_nav = document.getElementById("nav_nav");
const d_mainField = document.getElementById("main_field_0");
const cursor_circle = document.getElementById("cursor_circle");
const transition_duration = 600;
var canscroll = true;
var cantouchmove = 0;
var mainPos=0;

window.addEventListener('wheel',e =>{
  if(canscroll){
    canscroll = false;
    
    if(e.deltaY > 0){//down
      if(mainPos<4){
        mainPos++;
      }
    }else{//up
      if(mainPos>0){
        mainPos--;
      }
      
    }
    
    main.style.top = `${mainPos*-100}vh`;
    setTimeout(()=>{
      canscroll = true;
    },transition_duration);
  }
  
  
});
let pre_touch;
window.addEventListener('touchmove',e=>{
  cantouchmove++
  if(cantouchmove==1){
    pre_touch = e.touches[0].clientY;
  }else if(cantouchmove==2){
    if(pre_touch - e.touches[0].clientY>0){
      if(mainPos<4){
        mainPos++;
      }
    }else{
      if(mainPos>0){
        mainPos--;
      }
    }
    main.style.top = `${mainPos*-100}px`;
    setTimeout(()=>{
      cantouchmove = 0;
    },transition_duration);
  }
})
nav_li.forEach(e => {
  e.addEventListener('click',()=>{
    nav_nav.className = "";
    nav_nav.className = `in_${e.id}`;
  })
});


function main_dispaly_func(){
  if(mainPos == 0){
    nav.style.display = "none";
  }
}
document.addEventListener('mousedown' , e =>{
  if(e.button == 1){
    e.preventDefault();
    e.stopPropagation();
    return false;
  }else if(e.button == 0){
    cursor_circle.className = "cursor_active";
    cursor_circle.style.top = e.y+"px";
    cursor_circle.style.left = e.x+"px";
    setTimeout(()=>{
      cursor_circle.className = "";
    },500);
  }
})