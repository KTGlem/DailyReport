// script.js

const taskOptions = {
  MarketGarden: [
    "Assembly & Packaging",
    "Bed Cleanup - Post Harvest",
    "Bed Prep (Tarp, Amend, Till)",
    "Bed Prep (Ground Cover, Drip Tape)",
    "Build Cat Tunnel",
    "Clean Bins",
    "Clean Wash & Pack",
    "Direct Sow",
    "Fertilize & Amend",
    "Fish Fertilizer",
    "Harden Off",
    "Harvest / Pack",
    "Hill Beds",
    "Irrigate",
    "Irrigation - Setup",
    "Irrigation - Repairs",
    "Mulch",
    "Nursery Sow",
    "Organizing & Materials Prep",
    "Pot Up",
    "Prune / Trellis",
    "Sprout Potatoes",
    "Transplant",
    "Weed"
  ],
  Mushrooms: [
    "Harvesting",
    "Cleaning & Sanitizing",
    "Dehydrating",
    "Labelling"    
  ],
  CommercialKitchen: [
    "Veg Prep",
    "Cooking",
    "Portioning",
    "Labelling",
    "Cleaning & Sanitization",
    "Dehydrating"
  ],
  Admin: [
    "Sales & Marketing",
    "Social Media",
    "Crop Planning",
    "Documentation & SOPs",
    "Staff Management & Scheduling",
    "Customer Support & CSA",
    "Maintenance"
  ]
};

const cropOptions = [
  "AAA-Multiple",
  "Mushrooms",
  "Basil",
  "Beans: Bush & Pole",
  "Beets",
  "Bok Choy",
  "Broccoli",
  "Brussels Sprouts",
  "Cabbage",
  "Carrots",
  "Cilantro",
  "Collards",
  "Corn",
  "Cucumbers",
  "Dill",
  "Eggplant",
  "Fennel",
  "Garlic",
  "Husk Cherry (Ground Cherry)",
  "Kale",
  "Kohlrabi",
  "Leeks",
  "Lettuce",
  "Lettuce: Salad Mix",
  "Melons",
  "Onions",
  "Onions: Scallions",
  "Oregano",
  "Pac Choi (Bok Choy)",
  "Parsley",
  "Parsnips",
  "Peas",
  "Peppers",
  "Potatoes",
  "Radishes",
  "Sage",
  "Shallots",
  "Spinach",
  "Summer Squash",
  "Sweet Potatoes",
  "Swiss Chard",
  "Thyme",
  "Tomatoes",
  "Turnips",
  "Watermelons",
  "Winter Squash"
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

  // Clear all but the first placeholder option
  taskField.innerHTML = '<option value="" disabled selected hidden>Select a task...</option>';

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
  });
  
  // Add styling to make header look like a clickable link - MOVED THIS INSIDE THE MAIN DOMContentLoaded
  const header = document.querySelector("h1");
  header.innerHTML = `<a href="https://docs.google.com/spreadsheets/d/10hQO58RhY1IeBRYz8FqaO3LB1lhU-3RC5NiYZOS2E8U/edit?usp=sharing" target="_blank" style="color: #007BFF; text-decoration: underline;">Daily Report</a>`;

}); // This closing brace correctly matches the main DOMContentLoaded.
