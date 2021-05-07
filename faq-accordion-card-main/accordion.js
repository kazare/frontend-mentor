window.onload = () => {
  const questions = document.getElementsByClassName('question');

  for (let i = 0; i < questions.length; i += 1) {
    questions[i].addEventListener('click', function accordion() {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  }
};
