<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Smooth Horizontal Scroll</title>

<!-- GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

<!-- Lenis Smooth Scroll -->
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis"></script>

           <meta name="robots" content=" noindex,  nofollow">

<style>


/* Section Wrapper */
.section {
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: visible; 
}

/* Title Area */
.inner-title {
    position: absolute;
    top: 30px;
    left: 60px;
    z-index: 20;
    color:#e31e24;
}


@media only screen and (max-width:768px){

.inner-title {
 
    left: 20px;
 
}

.inner-title h2 {
   font-size: 26px;
    margin-top: 5px;
    font-weight: 200;
    margin-bottom: 34px;
    line-height: 32px;
   
}
}



.inner-title .title {
    font-size: 20px;
    font-weight: 600;
}



/* Horizontal Cards */
.horizontal-scroll {
    display: flex;
    gap: 10px;
    padding-left: 10vw;
    padding-right: 10vw;
    width: max-content;
}

.card {
    min-width:300px;
    background: #fff;
    border-radius: 18px;
    padding: 5px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    transform: translateY(80px);
    opacity: 0;
}

.card img {
    width: 100%;
    border-radius: 14px;
}



</style>
</head>
<body>

<div class="section">

						
						   <div class="inner-title">
        <div class="title ">Our Events</div>
        <h2 class="">Design Your Interior with Confidence</h2>
    </div>
				
    <!-- Horizontal Scroll Wrapper -->
    <div class="horizontal-scroll">

        <div class="card">
            <img src="assets/image/col-kit3.jpg">
            <!-- <h3>Laminates</h3> -->
        </div>

        <div class="card">
            <img src="assets/image/coll-bed.jpg">
        </div>

        <div class="card">
            <img src="assets/image/coll-kit.jpg">
        </div>

        <div class="card">
            <img src="assets/image/coll-liv.jpg">
        </div>

          <div class="card">
            <img src="assets/image/coll-wash.jpg">
        </div>

         <div class="card">
            <img src="assets/image/coll-off.jpg">
        </div>





       

    </div>

  

</div>

<script>
// Lenis Smooth Scroll
const lenis = new Lenis({ duration: 1.3, smooth: true });
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Horizontal Scroll using GSAP
let scrollLength = document.querySelector(".horizontal-scroll").scrollWidth;
let viewport = window.innerWidth;

gsap.to(".horizontal-scroll", {
    x: () => -(scrollLength - viewport),
    ease: "none",
    scrollTrigger: {
        trigger: ".section",
        start: "top top",
        end: () => "+=" + (scrollLength - viewport),
        scrub: 1,
        pin: true,
        anticipatePin: 1
    }
});

// Card animations
gsap.utils.toArray(".card").forEach((card, i)=>{
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            containerAnimation: ScrollTrigger.getById("hscroll"),
            start: "left center"
        }
    });
});
</script>

</body>
</html>
