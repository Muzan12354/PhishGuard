function toggleReveal() {
    document.getElementById('revealBox').classList.toggle('active');
  }

  function toggleLaw() {
    document.getElementById('lawSections').classList.toggle('active');
  }

  // Animate the TRUST -> DECEPTION -> ACCESS -> DAMAGE flow when it scrolls into view
  const flowSteps = document.querySelectorAll('.flow-step');
  const flowWrap = document.getElementById('flowWrap');
  let flowAnimated = false;

  function animateFlow() {
    flowSteps.forEach((step, i) => {
      setTimeout(() => step.classList.add('lit'), i * 400);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !flowAnimated) {
        animateFlow();
        flowAnimated = true;
      }
    });
  }, { threshold: 0.5 });

  observer.observe(flowWrap);