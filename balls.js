const canvas = document.getElementById('circle-collision');
        const ctx = canvas.getContext('2d');
        const circles = [];
        const numCircles = 50; // Increase the number of circles
        const maxSpeed = 10;
    
        let textX;
        let textY;
    
        // Function to generate a random number between min and max
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }
    
        // Initialize circles with random colors
        for (let i = 0; i < numCircles; i++) {
            const color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
            const radius = window.innerWidth < 768 ? getRandom(10, 20) : getRandom(20, 50); // Adjust circle size for mobile view
            circles.push({
                x: canvas.width / 2, // Initial x-coordinate set to center of canvas
                y: canvas.height / 2, // Initial y-coordinate set to center of canvas
                radius,
                speedX: getRandom(-maxSpeed, maxSpeed),
                speedY: getRandom(-maxSpeed, maxSpeed),
                color
            });
        }
    
        // Draw a circle
        function drawCircle(circle) {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fillStyle = circle.color;
            ctx.fill();
            ctx.closePath();
        }
    
        // Update game state
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < numCircles; i++) {
                const circle = circles[i];
                drawCircle(circle);

                circle.x += circle.speedX;
                circle.y += circle.speedY;

                // Check collision with the canvas edges
                if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
                    circle.speedX = -circle.speedX;
                }

                if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
                    circle.speedY = -circle.speedY;
                }
            }

            requestAnimationFrame(update);
        }
    
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            textX = (canvas.width - 60) / 2; // Center the image horizontally
            textY = (canvas.height - 60) / 2; // Center the image vertically
        }
    
        // Call the update function after the image is loaded
        window.onload = function() {
            resizeCanvas(); // Set initial position of the image
            update(); // Start the animation
        };
    
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();