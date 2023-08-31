gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

gsap.from("#nav",{
  y:-40,
  opacity:0,
  duration:0.5,
  delay:1  
})
gsap.from("#page1 video",{
  opacity:0,
  duration:0.5,
  delay:1.5, 
})
gsap.from("#a",{
  y:40,
  opacity:0,
  duration:0.5,
  delay:2  
})
gsap.from("#b",{
  y:40,
  opacity:0,
  duration:0.5,
  delay:2  
})
gsap.from("#page3 #fi",{
  y:20,
  opacity:0,
  duration:0.5,
  scrollTrigger:{
    trigger:"#page3",
    scroller:"#main",
    start:"top 50%",
    end:"top 0%",
    scrub:2,
    // markers :true
  }
})
gsap.from("#page3 #bi",{
  y:20,
  opacity:0,
  duration:0.5,
  scrollTrigger:{
    trigger:"#bi",
    scroller:"#main",
    start:"top 70%",
    end:"top 20%",
    scrub:2,
    // markers :true
  }
})
gsap.from("#page3 h2, #page3 button",{
  y:40,
  opacity:0,
  duration:0.5,
  scrollTrigger:{
    trigger:"#page3 h2",
    scroller:"#main",
    start:"top 80%",
    end:"top 70%",
    scrub:2,
    // markers :true
  } 
})

