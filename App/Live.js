export class Live{
    constructor(container,speed){
        this.container=container;
        this.speed=speed;
    }
    element=document.createElement('div');
    starInterval=null;
    speed=Math.floor(Math.random()*10);

    
    
    init(){
       
   
    this.element.classList.add('star');
        this.container.appendChild(this.element);
        this.element.style.left=Math.floor(Math.random()*(window.innerWidth-this.element.offsetWidth))+"px";
        this.element.style.top="0px";
        this.move();
        

        
    }


 move(){
        this.starInterval=setInterval(()=>{
            
            this.element.style.top=parseInt(this.element.style.top)+10+"px";
            
        },this.speed)
    }
remove(){
    this.element.remove();
}

}