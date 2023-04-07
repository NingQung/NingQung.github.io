const main = document.querySelector("main");
const d_mainField = document.getElementById("main_fielda");
var canscroll = true;
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
    console.log(mainPos);
    
    main.style.top = `${mainPos*-100}px`;
    setTimeout(()=>{
      canscroll = true;
    },1000);
  }
  
  
});