document.addEventListener('DOMContentLoaded', () => {
  const numStars = 200; // Adjust number as needed
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    // Set random position and size
    star.style.position = "fixed";
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
    const size = Math.random() * 2 + 1; // 1px to 3px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.backgroundColor = "white";
    star.style.borderRadius = "50%";
    // Apply a twinkle effect with random duration and delay
    const duration = Math.random() * 5 + 3; // between 3s and 8s
    const delay = Math.random() * 5;
    star.style.animation = `twinkle ${duration}s ${delay}s infinite ease-in-out`;
    document.body.appendChild(star);
  }
});
