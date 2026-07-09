GLOBALS_CSS = """@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand-maroon: #a30a35;
  --brand-gray: #e6e6e6;
  --brand-black: #000000;
}

body {
  background-color: var(--brand-gray);
  color: var(--brand-black);
}

.wordmark-stroke {
  fill: none;
  stroke: #ffffff;
  stroke-width: 26;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-stroke 0.7s ease forwards;
}

.wordmark-fill {
  fill: var(--brand-maroon);
  fill-opacity: 0;
  stroke: none;
  animation: fill-in 0.5s ease forwards;
}

@keyframes draw-stroke {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fill-in {
  to {
    fill-opacity: 1;
  }
}

"""
with open("app/globals.css", "w") as f:
    f.write(GLOBALS_CSS)
print("Wrote app/globals.css")
