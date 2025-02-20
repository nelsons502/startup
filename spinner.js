const spinner = document.querySelector(".spinner");
const spinButton = document.getElementById("spin-button");
const resultText = document.getElementById("result-text");

spinButton.addEventListener("click", () => {
    const totalWedges = spinner.children.length; // Number of options
    const randomIndex = Math.floor(Math.random() * totalWedges); // Random index
    const anglePerWedge = 360 / totalWedges; // Degrees per wedge
    const rotation = 360 * 3 + randomIndex * anglePerWedge; // 3 full spins + random wedge

    // Spin the spinner
    spinner.style.transition = "transform 4s ease-out";
    spinner.style.transform = `rotate(${rotation}deg)`;

    // After spinning, show the result
    setTimeout(() => {
        const chosenWedge = spinner.children[randomIndex].textContent;
        resultText.textContent = chosenWedge;
    }, 4000); // Match the spin duration
});