const main = document.querySelector("main");
const d_mainField = document.getElementById("main_field_0");
var canscroll = true;
var cantouchmove = 0;
var mainPos=0;

document.addEventListener('mousedown' , e =>{
  if(e.button == 1){
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
})

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
    
    main.style.top = `${mainPos*-100}px`;
    setTimeout(()=>{
      canscroll = true;
    },1000);
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
    },1000);
  }
})