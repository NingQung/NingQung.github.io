const main = document.querySelector("main");
const nav = document.querySelector("nav");
const nav_li = document.querySelectorAll("li");
const nav_nav = document.getElementById("nav_nav");
const d_mainField = document.getElementById("main_field_0");
const cursor_circle = document.getElementById("cursor_circle");
const cursor_bar = document.querySelectorAll("div.cursorbar");
const transition_duration = 600;
var canscroll = true;
var cantouchmove = 0;
var mainPos=0;
//#region initialize
nav_display(mainPos);
ms_display();
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
    nav_display(mainPos);
    ms_display();
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
nav_li.forEach(e => {
  e.addEventListener('click',()=>{
    mainPos = parseInt(e.className.slice(-1))
    nav_display(mainPos);
    ms_display();
  })
  e.addEventListener('mouseover',()=>{
    nav_display(parseInt(e.className.slice(-1)));
  })
  e.addEventListener('mouseleave',()=>{
    nav_display(mainPos);
  })
});
function nav_display(e){
  if(e==mainPos){
    nav_nav.style.backgroundColor = "aqua";
    nav_nav.style.boxShadow = "2px 2px 10px 1px aqua"
  }else{
    nav_nav.style.backgroundColor = "red";
    nav_nav.style.boxShadow = "2px 2px 10px 1px red"
  }
  nav_nav.style.top = `calc(2rem * ${e} + 6vh*${e*2+1})`
}
function ms_display(){
  main.style.top = `${mainPos*-100}vh`;
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
})
let cursor_p=[{x:0,y:0},{x:0,y:0},{x:0,y:0}]
window.addEventListener("pointermove",e=>{
  
  cursor_p[0].x=e.pageX;
  cursor_p[0].y=e.pageY;
})
function cursorEff (){
  cursor_bar.forEach(function(e,index){
    e.style.top = cursor_p[index].y +index*15+"px";
    e.style.left =cursor_p[index].x +index*5+"px";
  })
  cursor_p[2].x=cursor_p[1].x;
  cursor_p[2].y=cursor_p[1].y;
  cursor_p[1].x=cursor_p[0].x;
  cursor_p[1].y=cursor_p[0].y;
}
function cursoranimate(){
  cursorEff();
  window.requestAnimationFrame(cursoranimate);
}
cursoranimate();