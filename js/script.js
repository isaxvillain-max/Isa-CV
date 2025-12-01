// script.js - small interactions & neon micro-animations
(function(){
  // set dynamic year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // subtle portrait tilt & parallax
  const mask = document.querySelector('.portrait-mask');
  const capsule = document.querySelector('.capsule-wrap');
  if(mask && capsule){
    capsule.addEventListener('mousemove', (e) => {
      const rect = capsule.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * 8; // rotateX
      const ry = (px - 0.5) * -12; // rotateY

      mask.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      // Slight parallax for capsule background
      const bg = document.querySelector('.capsule-bg');
      if(bg) bg.style.transform = `translate(${(px-0.5)*10}px, ${(py-0.5)*6}px) scale(1.02)`;
    });
    capsule.addEventListener('mouseleave', () => {
      mask.style.transform = '';
      const bg = document.querySelector('.capsule-bg');
      if(bg) bg.style.transform = '';
    });
  }

  // animate small neon paths (fade-in)
  document.addEventListener('DOMContentLoaded', () => {
    const paths = document.querySelectorAll('.bg-svg path, .loop path');
    paths.forEach((p, i) => {
      p.style.transition = `stroke-opacity 1.2s ease ${(i*0.12)}s, stroke-width 0.9s ease`;
      p.style.strokeOpacity = p.getAttribute('data-target-opacity') || p.style.strokeOpacity || 0.05;
    });
  });

})();
