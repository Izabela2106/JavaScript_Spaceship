import {Spaceship} from "./Spaceship.js"
import {Enemy} from "./Enemy.js"
import {Live} from "./Live.js"

class Game{
    enemies=[];
    livesArr=[];
    enemiesInterwal=null;
    gameInterval=null;
        livesInterval=null;
    points=0;
    lives=3;
    speed=0;

    elements={
        container:document.getElementById('container'),
      points:document.getElementById('score'),
        lives:document.getElementById('lives'),
        modalText:document.getElementById('modalText'),
        modalButton:document.getElementById('modalButton'),
                modal:document.getElementById('modal'),

        
    };

    ship=new Spaceship(this.elements.container);
    
    init(){
      this.ship.init();
        this.newGame();
        this.elements.modalButton.addEventListener('click',()=>{this.newGame()})
    }
        
        
        newGame(){
                this.elements.modal.classList.add('hide');
        this.points=0;
        this.lives=3;
            this.updateLives();
            this.updatePoints();
        this.makeEnemies();
        this.gameLoop();
    }

    makeEnemies(){
        this.enemiesInterwal=setInterval(()=>{
            this.makeNewEnemy();
        },2000)
        this.livesInterval=setInterval(()=>{
            this.newLive();
        },30000)
    }
  


makeNewEnemy(){
    let levelNumber=0;
    if(this.points<20){
        levelNumber=2;
        this.speed=120;
    }
    if(this.points>=20 && this.points<40){
        levelNumber=3;
        this.speed=100;
    }
    if(this.points>=40 && this.points<60){
        levelNumber=4;
        this.speed=70;
    }
    if(this.points>=60){
        levelNumber=5;
        this.speed=50;
    }
    if(this.points>=100){
        this.speed=40;
    }
    
    
     
    
     let enemy=new Enemy(this.elements.container,levelNumber,this.speed);
    enemy.init();
    this.enemies.push(enemy);
 }


newLive(){
    let live=new Live(this.elements.container,this.speed);
    live.init();
    this.livesArr.push(live);
}


gameLoop(){
    this.gameInterval=setInterval(()=>{
        this.checkCollision()
    },10)
}


checkCollision(){
     
    this.enemies.forEach((enemy,Enemyindex,enemies)=>{
        const enemyPosition={
               top:enemy.element.offsetTop,
               right:enemy.element.offsetLeft+enemy.element.offsetWidth,
               bottom:enemy.element.offsetTop+enemy.element.offsetHeight,
               left:enemy.element.offsetLeft,
           }
        if(parseInt(enemy.element.style.top) > (window.innerHeight-enemy.element.offsetHeight-8)){
           enemy.explode();
            enemies.splice(Enemyindex,1);
            if(this.lives>1){
            this.lives--;
                this.elements.container.classList.add('warning');
                setTimeout(()=>{
                    this.elements.container.classList.remove('warning')
                },100)
                this.updateLives();
            }
            else{
                this.endGame();
            }
           }
        this.ship.bullets.forEach((bullet,index,bullets)=>{
            const bulletPosition={
               top:bullet.element.offsetTop,
               right:bullet.element.offsetLeft+bullet.element.offsetWidth,
               bottom:bullet.element.offsetTop+bullet.element.offsetHeight,
               left:bullet.element.offsetLeft,
           }
        if(parseInt(bullet.element.style.top)+bullet.element.offsetHeight<0){
            bullet.remove();
            bullets.splice(index,1);
        }
        let {right,bottom,left,top}=bullet.element.getBoundingClientRect();
        let {right:enemyRight,bottom:enemyBottom,left:enemyLeft,top:enemyTop}=enemy.element.getBoundingClientRect(); 
        
            if(bulletPosition.bottom >= enemyPosition.top && bulletPosition.top <=enemyPosition.bottom && bulletPosition.right >=enemyPosition.left && bulletPosition.left <= enemyPosition.right ){
                enemies.splice(Enemyindex,1);
                bullets.splice(index,1);
                enemy.explode();
                bullet.remove();
                
                this.points++;
                this.updatePoints();



            }
            
    })
    })
    
    
    const shipPosition={
               top:this.ship.element.offsetTop,
               right:this.ship.element.offsetLeft+this.ship.element.offsetWidth,
               bottom:this.ship.element.offsetTop+this.ship.element.offsetHeight,
               left:this.ship.element.offsetLeft,
           }
    
     this.livesArr.forEach((live,liveIndex,lives)=>{
        const livePosition={
               top:live.element.offsetTop,
               right:live.element.offsetLeft+live.element.offsetWidth,
               bottom:live.element.offsetTop+live.element.offsetHeight,
               left:live.element.offsetLeft,
           }
        if(live.element.offsetTop >= window.innerHeight-live.element.offsetHeight-5){
             live.remove();
            lives.splice(liveIndex,1);
        }
        
        if(livePosition.bottom >= shipPosition.top && livePosition.top <=shipPosition.bottom && livePosition.right >=shipPosition.left && livePosition.left <= shipPosition.right ){
            live.remove();
            lives.splice(liveIndex,1);
            this.lives++;
            this.updateLives();
        }
    
    
    
})
}
updatePoints(){
this.elements.points.textContent=`Score:${this.points}`;
}
updateLives(){
    this.elements.lives.textContent=`Lives:${this.lives}`;

}


endGame(){
    this.elements.modalText.textContent=`You scored ${this.points}!`;
    this.elements.modal.classList.remove('hide');
    clearInterval(this.enemiesInterwal);
    clearInterval(this.livesInterval);
    this.enemies.forEach(enemy=>{
        enemy.explode();
    })
    this.enemies.length=0;
    this.livesArr.forEach(live=>{
        live.remove();
    })
    this.livesArr.length=0;
    this.ship.bullets.forEach(bullet=>{
        bullet.remove();
    })
    this.ship.bullets.length=0;
}




}








const game=new Game();
game.init();