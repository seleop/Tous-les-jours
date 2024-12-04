gsap.registerPlugin({ ScrollTrigger });

const opening = document.querySelector(".header__landing__opening");
const openingsubtitle = document.querySelector(".opening_subtitletext");
const headercontainer = document.querySelector(".header__container");
const header = document.querySelector("header");
const body = document.querySelector("body");
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const cooker = document.querySelector(".cooker");
const items = document.querySelectorAll(".hotitem");
const hotTitle = document.querySelector("#HOT_text");
const html = document.querySelector("html");
const newSec = document.querySelector('.newsec__container')


const hideHeaderScroll = () => {
    document.addEventListener("scroll", () => {
        if (window.scrollY >= 10) {
            header.style.opacity=0;
            setTimeout(() => {
                header.classList.add("beheaderhide");
            }, 500);
        }
        else {
            header.classList.remove("beheaderhide")
            setTimeout(() => {
                header.style.opacity=1; 
            }, 500);
        }
    });
}

function verifyScrollSmooth() {
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}


const createBannerSwiper = () => {
    let swiper = new Swiper(".bannerSection", {
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        watchSlidesProgress: true,
        autoplay: {
            delay: 500,
        },
        disableOnInteraction: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "progressbar",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            autoplayTimeLeft(s, time, progress) {
                progressCircle.style.setProperty("--progress", 1 - progress);
                progressContent.textContent = `${Math.ceil(time / 1000)}s`;
            },
        },
    });
}

//헤더 오프닝 관련 함수
const hideHeader = () => {
    openingsubtitle.addEventListener("animationend", () => {
        hideElement(opening);
            setTimeout(() => {
                opening.style.display = "none";
                styleChanger(headercontainer);
                setTimeout(() => {
                    headerAnimation(headercontainer);
                    header.style.height = "100px";
                    html.style.overflowY = "scroll";
                }, 100)
            }, 500)
    })
}

const styleChanger = (ele) => {
    ele.style.display = "flex";
    ele.style.justifyContent = "center";
    ele.style.alignItems = "center";
};

const hideElement= (element) => {
    element.style.opacity = "0";
    element.style.transition = "0.5s";
}

const headerAnimation = (ele) => {
    ele.style.opacity = "1";
    ele.style.transition = "0.5s";
}

//인터랙션 함수
const changeBgr = () => {
    gsap.to("body", {
        backgroundColor: "#0D4633",
        scrollTrigger: {
            trigger: ".GreetingSection",
            start: "top-=600 top",
            end: "top top",
            scrub: true,
        },
    });
};

const gridbgrmove = () => {
    gsap.fromTo(("#itemsectionbackground"), {
        scrollTrigger:{
            trigger:".newsec__grid__container",
            start:"top bottom",
            end:"bottom+=1000 top",
            scrub:true,
            markers:true,
        },
        y:"-200px"
    }, {y:0})
}
let ispopupgridItemRunning = false;

const createItemsectionTl = () => {
    let itemsectiontl =  gsap.timeline({
        scrollTrigger:{
            trigger:".itemsection",
            start:"top top",
            end:"bottom bottom",
            scrub:true,
            pin:".itemsection",
        },
        ease:"power4.out",
        onComplete : () => {
            if(!ispopupgridItemRunning);
            popupgridItem();
            console.log("hotitem end");
        }
    });
    itemsectiontl
        .from("#HOT_text", {x:-700, opacity:0, ease:"power4.out", delay:1})
        .from(".hotsubtextcontent", {x:-500, opacity:0, ease:"power4.out", stagger:0.1})
    return itemsectiontl;
}



const popupgridItem = () => {
    if(ispopupgridItemRunning) return

    ispopupgridItemRunning = true;

    gsap.from(".newsec_item", {
        scrollTrigger:{
            trigger:".newsec__grid__container",
            start:"top bottom",
            end:"top 30%",
            scrub:true,
            once:true,
            onLeave: () => {
                ispopupgridItemRunning = false;
            },
            ease:"power4.out",
        },
        onStart: () => {
            console.log("popup start");
        },
        onComplete: () => {
            console.log("popup end");
        },
        filter:"blur(2px)",
        stagger:{duration:1, ease:"power4.out", from:"random", each:"0.2", amount:0.3 },
        y:25,
        scale:"0.7"
    })
}




const creategreetingtl = () => {
    let greetingtl = gsap.timeline({
        scrollTrigger: {
            trigger: ".GreetingSection",
            start: "top-=230 top",
            end: "+=3000",
            scrub: true,
            pin: ".GreetingSection",
        },
    });
    greetingtl
        .from(".greeting_bgr_container", { scale: 1, duration: 2, opacity: 0.5, ease: "power4.out" })
        .to("#greetingbgrvideo", { filter: "brightness(0.3)", duration: 2 })
        .fromTo(
            "#greeting_titletext",
            { opacity: 0, fillOpacity: 0, strokeDashoffset: 1000 },
            { opacity: 1, fillOpacity: 0, strokeDashoffset: 500, duration: 1, ease: "power1.out" }
        )
        .to("#greeting_titletext", { opacity: 1, fillOpacity: 0, strokeDashoffset: 0, duration: 1, ease: "power1.out" })
        .to("#greeting_titletext", { opacity: 1, fillOpacity: 0.5, strokeDashoffset: 330, duration: 1 })
        .to("#greeting_titletext", { opacity: 1, fillOpacity: 1, strokeDashoffset: 0, duration: 1 })
        .to(".horizontal-line", { width: "20px" })
        .from("#greeting_subtitletext", { opacity: 0, y: 20, duration: 3 })
        
    return greetingtl;
};

function moveItemsecBgr(){
    gsap.to("#itemsectionbackground", {
        scrollTrigger:{
            trigger:".itemsection",
            start:"top top",
            end:"bottom top",
            scrub:true,
        },
        onComplete : () => {
            gridbgrmove()
        },
        ease:"power4.out",
        filter:"brightness(0.2)",
        transform:"scale(1.15)"
    })
}

//코드실행
window.addEventListener("resize", ScrollTrigger.update);

const lenis = new Lenis({
    duration: "2.5",
});

// hideHeader();
// hideHeaderScroll();

verifyScrollSmooth();

changeBgr();
createBannerSwiper();

creategreetingtl();
createItemsectionTl();
moveItemsecBgr();



