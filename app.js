// SLIDER IFRAMES
let slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide'))

// set up 
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0

// event listeners
slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img')
  // disable default image drag
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())
  // touch events
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)
  // mouse events
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slide.addEventListener('mousemove', touchMove)
  slide.addEventListener('mouseleave', touchEnd)
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

// prevent menu popup on long press
/* window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
} */

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

// use a HOF so we have index in a closure
function touchStart(index) {
  return function (event) {
    currentIndex = index
    startPos = getPositionX(event)
    isDragging = true
    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID)
  isDragging = false
  const movedBy = currentTranslate - prevTranslate

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1

  setPositionByIndex()

  slider.classList.remove('grabbing')
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

// SCROLLMAGIC 

let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();

timeline
  .to(".rocas", 10, { y: 90 })
  .to(".logo", 10, { y: 250}, "-=10")
  .to(".fondo", 10, { y: 200 },  "-=10")
  .to(".productos", 10, { top: "0%" }, "-=10")

let scene = new ScrollMagic.Scene({
  triggerElement: "scroll",
  duration: "100%",
  triggerHook: 0,
})
  .setTween(timeline)
  .setPin("scroll")
  .addTo(controller);


/*NAV ABIERTO CERRADO */
  function myFunction() {
    var x = document.getElementById("nav");
    if (x.className === "abierto") {
      x.className += " cerrado";
    } else {
      x.className = "abierto";
    }
  };
  function togel() {
    var x = document.getElementById("nav");
    if (x.className === "abierto") {
      x.className += " abierto";
    } else {
      x.className = "abierto";
    }
  }
