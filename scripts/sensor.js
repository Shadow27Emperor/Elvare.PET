// Step Counter State
let stepCount = 0;
let lastStepTime = 0;
const threshold = 12.0; // Sensitivity: lower = more sensitive
const stepDelay = 350;  // Milliseconds between steps (prevents double counting)

async function initSensors() {
    // Handle iOS Permission Request
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
            const permissionState = await DeviceMotionEvent.requestPermission();
            if (permissionState === 'granted') {
                window.addEventListener('devicemotion', handleMotion);
            }
        } catch (error) {
            console.error("Sensor access denied");
        }
    } else {
        // Non-iOS devices
        window.addEventListener('devicemotion', handleMotion);
    }
}

function handleMotion(event) {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    // Calculate Vector Magnitude: sqrt(x^2 + y^2 + z^2)
    const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
    const currentTime = new Date().getTime();

    // Peak Detection Logic
    if (magnitude > threshold && (currentTime - lastStepTime) > stepDelay) {
        stepCount++;
        lastStepTime = currentTime;
        
        // Trigger UI Update
        onStepDetected(stepCount);
    }
}

function onStepDetected(count) {
    console.log("Steps Walked:", count);
    // Update your HTML elements here
    // document.getElementById('total-steps').innerText = count.toLocaleString();
}
