const lifts = {
    lift1: {
        currentFloor: 2,  
        isOverloaded: false
    },
    lift2: {
        currentFloor: 3,   
        isOverloaded: false
    },
    lift3: {
        currentFloor: 3,   
        isOverloaded: true 
    },
    lift4: {
        currentFloor: 0,   
        isOverloaded: false
    }
};

function getUserFloor() {
    const userFloorSelect = document.getElementById("user-floor");
    return parseInt(userFloorSelect.value);  // Get selected floor as integer
}


function fetchLiftData() {
    // Update each lift's position and status in the UI
    for (let i = 1; i <= 4; i++) {
        const lift = lifts[`lift${i}`];
        document.getElementById(`current-floor-${i}`).innerText = lift.currentFloor;
        const liftStatus = document.getElementById(`lift-status-${i}`);

        if (lift.isOverloaded) {
            liftStatus.innerText = 'Overloaded';
            liftStatus.classList.remove('normal');
            liftStatus.classList.add('overloaded');
        } else {
            liftStatus.innerText = 'Normal';
            liftStatus.classList.remove('overloaded');
            liftStatus.classList.add('normal');
        }
        moveLift(i, lift.currentFloor); // Move the lift visually
    }

    // Recommend the best lift based on the user's floor
    recommendLift(lifts);
}

// Function to move the lift based on the current floor
function moveLift(liftNumber, floor) {
    const liftBox = document.getElementById(`lift-box-${liftNumber}`);
    let position = '0px';

    switch (floor) {
        case 6:
            position = '600px';
            break;
        case 5:
            position = '500px';
            break;
        case 4:
            position = '400px';
            break;
        case 3:
            position = '300px';
            break;
        case 2:
            position = '200px';
            break;
        case 1:
            position = '100px';
            break;
        case 0:
            position = '0px';
            break;
        default:
            console.error('Invalid floor');
    }

    liftBox.style.bottom = position;
}

// Function to recommend the best lift based on status
function recommendLift(lifts) {
    let recommendedLift = null;
    let closestFloor = Infinity;

    // Get the user's current floor from the dropdown
    const userFloor = getUserFloor();

    // Find the closest lift that is not overloaded
    for (let i = 1; i <= 4; i++) {
        const lift = lifts[`lift${i}`];
        if (!lift.isOverloaded) {
            const distance = Math.abs(lift.currentFloor - userFloor);
            if (distance < closestFloor) {
                closestFloor = distance;
                recommendedLift = i;
            }
        }
    }

    // Display the recommended lift
    const recommendationElement = document.getElementById('recommended-lift');
    if (recommendedLift !== null) {
        recommendationElement.innerText = `Lift ${recommendedLift}`;
    } else {
        recommendationElement.innerText = "No lifts available";
    }
}

// Trigger the data fetch and recommendation when the user selects a floor
function onFloorChange() {
    fetchLiftData();  // Recalculate the best lift based on the new user floor
}

// Initial fetch on page load
fetchLiftData();
