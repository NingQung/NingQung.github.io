const main = document.querySelector("main");
const nav = document.querySelector("nav");
const nav_li = document.querySelectorAll("li");
const nav_nav = document.getElementById("nav_nav");
const mainSec = document.querySelectorAll("main section");
const cursor_circle = document.getElementById("cursor_circle");
const cursor_bar = document.querySelectorAll("div.cursorbar");
const transition_duration = 600;
var canscroll = true;
var cantouchmove = 0;
var mainPos=0;
//#region initialize
nav_display("home");
ms_display(0);
//#endregion
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
    nav_display(mainSec[mainPos].id);
    ms_display(mainPos);
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
    main.style.top = `${mainPos*-100}vh`;
    setTimeout(()=>{
      cantouchmove = 0;
    },transition_duration);
  }
});
nav_li.forEach(function(e,index){
  e.addEventListener('click',()=>{
    nav_display(e.id);
    mainPos = index;
    ms_display(mainPos);
  })
});
function nav_display(e){
  nav_nav.className = `in_${e}`;
}
function ms_display(e){
  switch(e){
    case 0:
      main.className = "in_home";
      break;
    case 1:
      main.className = "in_profile";
      break;
    case 2:
      main.className = "in_project";
      break;
    case 3:
      main.className = "in_dailyLog";
      break;
    case 4:
      main.className = "in_contect";
      break;
  }
}


var cancursor=true
window.addEventListener('mousedown' , e =>{
  if(e.button == 1){
    e.preventDefault();
    e.stopPropagation();
    return false;
  }else if(e.button == 0 && cancursor){
    cancursor = false;
    cursor_circle.className = "cursor_active";
    cursor_circle.style.top = e.y+"px";
    cursor_circle.style.left = e.x+"px";
    setTimeout(()=>{
      cursor_circle.className = "";
      cancursor = true;
    },500);
  }
})//
let cursor_p=[{x:0,y:0},{x:0,y:0},{x:0,y:0}]
window.addEventListener("mousemove",e=>{
  
  cursor_p[0].x=e.pageX;
  cursor_p[0].y=e.pageY;
})
function cursorEff (){
  cursor_bar.forEach(function(e,index){
    e.style.top = cursor_p[index].y +index*15+"px";
    e.style.left =cursor_p[index].x +index*5+"px";
  })
  cursor_p[2].x=(cursor_p[2].x-cursor_p[1].x)*0.3 +cursor_p[1].x;
  cursor_p[2].y=(cursor_p[2].y-cursor_p[1].y)*0.3 +cursor_p[1].y;
  cursor_p[1].x=(cursor_p[1].x-cursor_p[0].x)*0.3 +cursor_p[0].x;
  cursor_p[1].y=(cursor_p[1].y-cursor_p[0].y)*0.3 +cursor_p[0].y;
}
function cursoranimate(){
  cursorEff();
  window.requestAnimationFrame(cursoranimate);
}
cursoranimate();