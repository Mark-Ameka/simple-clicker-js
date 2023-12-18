let score = 0;
let autoIncrement = 0;
let intervalDuration = 1000; // Initial interval duration in milliseconds

const upgrades = [
  { cost: 20, increment: 1, count: 0 },
  { cost: 150, increment: 2, count: 0 },
  { cost: 550, increment: 3, count: 0 },
  { cost: 5000, increment: 4, count: 0 },
  { cost: 20000, increment: 5, count: 0 },
  { cost: 60000, increment: 10, count: 0 },
  { cost: 200000, increment: 15, count: 0 },
  { cost: 5000000, increment: 20, count: 0 },
  { cost: 80000000, increment: 25, count: 0 },
  { cost: 900000000, increment: 30, count: 0 },
];

// main
function incrementScore() {
  score++;
  document.getElementById("scoreValue").innerText = score;
  checkUpgrades();
}

function checkUpgrades() {
  for (const upgrade of upgrades) {
    const button = document.getElementById(`upgradeButton${upgrade.cost}`);

    if (score >= upgrade.cost && !button) {
      showUpgradeButton(upgrade);
    }

    if (button) {
      button.disabled = score + autoIncrement < upgrade.cost;
    }
  }
}

function return_score() {
  return score;
}

function showUpgradeButton(upgrade) {
  const buttonId = `upgradeButton${upgrade.cost}`;

  // Create and append the upgrade button as a list item
  const upgradeButton = document.createElement("button");
  upgradeButton.id = buttonId;
  upgradeButton.classList = "btn btn-secondary text-white";
  upgradeButton.textContent = `Upgrade (+${upgrade.increment}/click) - Cost: ${upgrade.cost} - Count: ${upgrade.count}`;
  upgradeButton.onclick = () => purchaseUpgrade(upgrade);

  // console.log(
  //   `Score: ${score}, AutoIncrement: ${autoIncrement}, Upgrade Cost: ${upgrade.cost}`
  // );

  const listItem = document.createElement("li");
  listItem.appendChild(upgradeButton);

  // Append the list item to the upgrade list
  const upgradeList = document.getElementById("upgradeList");
  upgradeList.appendChild(listItem);
}

function purchaseUpgrade(upgrade) {
  if (score >= upgrade.cost) {
    score -= upgrade.cost;
    autoIncrement += upgrade.increment;
    upgrade.count++;
    document.getElementById("scoreValue").innerText = score;

    // Update the button text to show the new upgrade count
    const buttonId = `upgradeButton${upgrade.cost}`;
    const upgradeButton = document.getElementById(buttonId);
    upgradeButton.textContent = `Upgrade (+${upgrade.increment}/click) - Cost: ${upgrade.cost} - Count: ${upgrade.count}`;

    // Adjust the interval duration based on the current autoIncrement
    intervalDuration = 1000 / autoIncrement;
    clearInterval(autoIncrementInterval);
    autoIncrementInterval = setInterval(autoIncrementScore, intervalDuration);

    // Display the autoclicking rate
    const autoclickRate = document.getElementById("autoclickRate");
    autoclickRate.innerText = `Autoclicking at ${autoIncrement} clicks per second`;
  }
}

// Function to automatically increment the score every second
function autoIncrementScore() {
  score += autoIncrement;
  document.getElementById("scoreValue").innerText = score;
  checkUpgrades(); // Check for upgrades on each auto-increment
}

// Set up an interval to call autoIncrementScore every second
let autoIncrementInterval = setInterval(autoIncrementScore, intervalDuration);
