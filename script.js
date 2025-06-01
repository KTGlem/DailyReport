// script.js

const taskOptions = {
  MarketGarden: [
    "Bed Cleanup - Post Harvest",
    "Bed Prep (Tarp, Amend, Till)",
    "Bed Prep (Ground Cover, Drip Tape)",
    "Build Cat Tunnel",
    "Clean Bins",
    "Nursery Sow"
    // ... add remaining MarketGarden tasks from CSV
  ],
  Mushrooms: [
    "Harvest",
    "Turnover",
    "Bag Filling",
    "Sterilization"
    // ... add other tasks
  ],
  CommercialKitchen: [
    "Cooking",
    "Labeling",
    "Packaging"
    // ... add other tasks
  ],
  Admin: [
    "Email",
    "Planning",
    "Bookkeeping"
    // ... add other tasks
  ]
};

const cropOptions = [
  "AAA-Multiple",
  "Mushrooms",
  "Basil"
  // ... load remaining unique crop names from CSV
];

document.addEventListener("DOMContentLoaded", () => {
  const dateField = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateField.value = today;

  const focusAreaField = document.getElementById("focusArea");
  const taskField = document.getElementById("task");
  const cropField = document.getElementById("crop");

  focusAreaField.addEventListener("change", () => {
    const area = focusAreaField.value;
    taskField.innerHTML = "<option value=''>Select</option>";
    if (taskOptions[area]) {
      taskOptions[area].forEach(task => {
        const opt = document.createElement("option");
        opt.value = opt.textContent = task;
        taskField.appendChild(opt);
      });
    }
  });

  cropOptions.forEach(crop => {
    const opt = document.createElement("option");
    opt.value = opt.textContent = crop;
    cropField.appendChild(opt);
  });

  const form = document.getElementById("reportForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://api.sheetbest.com/sheets/7a7b6717-a71e-4ac3-a4ba-855d9844c152", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Submitted successfully!");
        form.reset();
        dateField.value = today;
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      alert("Error submitting data: " + err.message);
    }

    // Add styling to make header look like a clickable link
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("h1");
  header.innerHTML = `<a href="https://docs.google.com/spreadsheets/d/10hQO58RhY1IeBRYz8FqaO3LB1lhU-3RC5NiYZOS2E8U/edit?usp=sharing" target="_blank" style="color: #007BFF; text-decoration: underline;">Daily Report</a>`;
});
  });
});
