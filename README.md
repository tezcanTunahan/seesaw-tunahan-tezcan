# seesaw-tunahan-tezcan

## Thought Process and Design Decisions

I started the project by focusing on HTML and CSS, as my primary goal was to create an exact replica of the [Preview Example](https://seesaw.samet-sevindi.workers.dev). Through a bit of reverse engineering, I successfully matched the core design and layout. While there might be minor differences in the smaller details, the overall look and feel are very similar to the original.

When I moved on to the JavaScript implementation, my initial approach was functional. However, as someone who frequently uses React but has a background in Java, I realized that switching to an Object-Oriented approach using **Classes** made the code significantly cleaner and more maintainable. I settled on two main classes: `Seesaw` and `Weight`. Although there is always room for further optimization, I am quite happy with the clarity and structure of the final result.

**Comparison:**
- **Original:** [Preview Link](https://seesaw.samet-sevindi.workers.dev)
- **My Result:** [Live Demo](https://tezcantunahan.github.io/seesaw-tunahan-tezcan/)

## Trade-offs and Limitations

One of the main challenges I faced involved the physics of the weights. 
- **First Approach:** Initially, I appended the weight elements directly to the `seesaw-plank` element. While this meant I didn't have to manually update their position when the plank rotated, it created a visual bug: since the parent was rotated, the weights would "fall" at an angle rather than dropping straight down.
- **Final Solution:** To fix this, I changed the approach and appended the weights to the `seesaw-clickable` container instead. This solved the rotation issue during the fall, but it required me to calculate the weight's final X and Y coordinates based on the plank's tilt. 

I solved this using **trigonometry**. By treating the plank's tilt as a right-angled triangle, I calculated the precise landing position based on the rotation angle and the weight's distance from the center. I then applied these coordinates using smooth animations.

## AI Assistance

I chose **not** to use AI to write the actual code for this project. I find that relying on AI-generated code can sometimes sabotage my own thought process and reduce my control over the logic. 

However, I did use AI as a tool for quick information—essentially like a faster, distraction-free version of Google. It helped me find answers to specific technical questions without the noise of advertisements or irrelevant search results.

## How to Run Locally
git clone https://github.com/tezcanTunahan/seesaw-tunahan-tezcan.git

cd seasaw-tunahan-tezcan

Simply open `index.html` in your browser. or you can use live server.
