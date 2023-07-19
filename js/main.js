// 스크롤 컨테이너와 페이지들을 선택
const scrollContainer = document.querySelector('.scroll-container');
const pages = document.querySelectorAll('.page');
const circles = document.querySelectorAll('.circles > li');
const h_logo = document.querySelector(".h_logo");
const gamePack = document.querySelector(".gamePack");
const play = document.querySelector(".playWrap");
const closeBtn = document.querySelector(".close");
const vidLink = document.querySelector(".vidLink");
const vidWrap = document.querySelector(".vidWrap");

// 현재 페이지의 인덱스를 저장할 변수를 초기화합니다.
let currentPageIndex = 0;

// wheel 이벤트 핸들러를 등록
scrollContainer.addEventListener('wheel', function(event) {
// 스크롤을 움직이는 방향을 확인
    const delta = Math.sign(event.deltaY);

    // 현재 페이지의 인덱스를 변경
    currentPageIndex = Math.min(Math.max(currentPageIndex + delta, 0), pages.length - 1);
    
    // 스크롤 컨테이너를 이동
    scrollContainer.scrollTo({
        left: pages[currentPageIndex].offsetLeft,
        behavior: 'smooth'
    });
    for(let j=0; j<circles.length; j++){
            circles[j].classList.remove('on');
            
        }
    circles[currentPageIndex].classList.add('on');
    
});
// 페이지네이션
for(let i=0; i<circles.length; i++){
    circles[i].onclick = function(){ //해당 동그라미 버튼 클릭 시
        currentPageIndex = i; // 해당 동그라미 순번과 같은 숫자값이 currentPageIndex에 담김
        for(let j=0; j<circles.length; j++){
            circles[j].classList.remove('on');
            
        }
        circles[currentPageIndex].classList.add('on');
        scrollContainer.scrollTo({
            left: pages[currentPageIndex].offsetLeft,
            behavior: 'smooth'
        });
                        
    }
}
window.onload = ()=>{
    h_logo.style.transform = `translate(-50%,-50%) scale(${1})`
    h_logo.style.opacity = 1;
}
let toggle = true; // toggle을 위한 변수
h_logo.onclick = function(){ // 로고 클릭시 게임팩구매화면 나오게
    if(toggle === true){
        h_logo.style.top = ("15%");
        setTimeout(function() {
            gamePack.style.opacity = '1';
        }, 1000);
        toggle = !toggle
    }
    else{
        gamePack.style.opacity = '0';
        setTimeout(function() {
            h_logo.style.top = ("50%");
        }, 500);
        toggle = !toggle
    }
}
//동영상화면 켜고 끄기
play.onclick = function(e){
    e.preventDefault();
    vidLink.querySelector(".video").contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    vidLink.style.height = "100%"
}
closeBtn.onclick = function(){
    vidLink.querySelector(".video").contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    vidLink.style.height = "0%"
}

// 캐러셀
const leftBtn = document.querySelector(".leftBtn");
const rightBtn = document.querySelector(".rightBtn");
const carouselMove = document.querySelector(".carousel");
carousel(leftBtn, rightBtn, carouselMove);

function carousel(left, right, move) {
  right.onclick = function() {
    left.style.display = "none";
    right.style.display = "none";
    move.style.transition = "margin-left 1s ease-in-out";
    move.style.marginLeft = "-66.666666%";
    setTimeout(function() {
        move.append(move.children[0]);
      move.style.transition = "none";
      move.style.marginLeft = "-33.333333%";
      right.style.display = "flex";
      left.style.display = "flex";
    }, 1000);
    console.log(move.children[0]);
  };

  left.onclick = function() {
    left.style.display = "none";
    right.style.display = "none";
    move.style.transition = "margin-left 1s ease-in-out";
    move.style.marginLeft = "0%";
    setTimeout(function() {
     move.prepend(move.children[move.children.length - 1]);
      move.style.transition = "none";
      move.style.marginLeft = "-33.333333%";
      right.style.display = "flex";
      left.style.display = "flex";
    }, 1000);
  };
}

const carouselItems = document.querySelectorAll(".carousel > div");
carouselItems.forEach(function(item) {
  item.onclick = function() {
    let vidwrap = document.querySelector(".vidWrap");
    vidwrap.style.opacity = "0";
    setTimeout(function() {
        
        vidwrap.style.opacity = "1";
    }, 500);
  };
});
const vid = document.querySelector(".vidwrap .vid");
const vidImg = document.querySelector(".vidwrap .vid img");
carouselItems.forEach(function(image,idx) {
    image.onclick = function() {
        let src = this.querySelector("img").getAttribute("src");
        document.querySelector(".vid img").setAttribute("src", src);
        let videoLink = [
            "https://www.youtube.com/embed/CFhOcHP3f6Y",
            "https://www.youtube.com/embed/jC_NJvU177s",
            "https://www.youtube.com/embed/_hq5pqrqxzo",
            "https://www.youtube.com/embed/FruFtmWG8Mk",
            "https://www.youtube.com/embed/V2dKDP1-vaw",
            "https://www.youtube.com/embed/zDL6kkIaiwU",
        ]

        vidLink.querySelector(".video").setAttribute("src",videoLink[idx]);

  };
});


//게임타이틀에 마우스 올렸을 때 

const imgWrap = document.querySelector(".imgWrap");
const logo = document.querySelector(".imgWrap .h_logo");
let onoff = true;


logo.addEventListener("mouseenter",function(){
    if(onoff){
        onoff = false;
        
        let onoffTag = document.createElement("div");
        onoffTag.innerText = "Click";
        onoffTag.setAttribute("class","onoff");
        imgWrap.append(onoffTag);
    }

});

logo.addEventListener("mouseleave",function(){
    imgWrap.querySelector(".onoff").style.opacity = 0;
});


logo.addEventListener("mousemove",function(event){

    let mouseX = event.pageX;
    let mouseY = event.pageY;
    imgWrap.querySelector(".onoff").style.opacity = 1;
  
    imgWrap.querySelector(".onoff").style.left = (mouseX - 45) + "px";
    imgWrap.querySelector(".onoff").style.top = (mouseY - 45) + "px";
    

});
const slide = document.querySelectorAll(".slide");
const view = document.querySelectorAll(".slide .view");
const prev = document.querySelector(".popupWrap .prev")
const next = document.querySelector(".popupWrap .next")

let count = 0;
next.onclick = function(){
            
    if(count === 2) {
        count = 0;
    }
    else {
        count +=1
    }
    for(let i=0; i<slide.length; i++){
        slide[i].style.marginLeft = (count * -100) + "%";
    }
}
prev.onclick = function(){
    
    if(count === 0) {
        count = 2
    }
    else {
        count -=1
    }
    for(let i=0; i<slide.length; i++){
        slide[i].style.marginLeft = (count * -100) + "%";
    }
    
}
const boxWrap = document.querySelectorAll(".boxWrap");
const popup = document.querySelectorAll(".popup");
let show = true
for(let i=0; i<boxWrap.length; i++ ){
    boxWrap[i].onclick = ()=>{

        if(show === true){  
                    
            for(let i=0; i<boxWrap.length; i++){
                boxWrap[i].style.transform = `translateX(${i*-525+'px'})`
                boxWrap[i].style.zIndex = 1;    
                boxWrap[i].style.opacity = 0
                popup[i].style.zIndex = 1;    
            }
            setTimeout(function(){
                popup[i].style.opacity = 1;
                popup[i].style.zIndex = 3;
                prev.style.opacity =1;
                next.style.opacity =1;
            },500)
            boxWrap[i].style.zIndex = 3;
            boxWrap[i].style.opacity = 1;
            
            show=false
        }
        else{
            for(let i=0; i<boxWrap.length; i++){
                boxWrap[i].style.transform = 'translateX(0)'
                boxWrap[i].style.opacity = 1
                boxWrap[i].style.zIndex = 2; 
            }            
            prev.style.opacity =0;
            next.style.opacity =0;
            popup[i].style.opacity = 0;
            popup[i].style.zIndex = 1;
            show=true
        }
        
        
    }
}









