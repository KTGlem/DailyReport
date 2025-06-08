// script.js

const taskOptions = {
  MarketGarden: [
    "Assembly & Packaging / Ensamblaje y Embalaje",
    "Bed Cleanup - Post Harvest / Limpieza de Camas - Post Cosecha",
    "Bed Prep (Tarp, Amend, Till) / Preparación de Camas (Lona, Enmendar, Labrar)",
    "Bed Prep (Ground Cover, Drip Tape) / Preparación de Camas (Cubierta, Cinta de Goteo)",
    "Build Cat Tunnel / Construir Túnel para Gatos",
    "Clean Bins / Limpiar Contenedores",
    "Clean Wash & Pack / Limpiar Lavado y Empaque",
    "Direct Sow / Siembra Directa",
    "Fertilize & Amend / Fertilizante y Enmendar",
    "Fish Fertilizer / Fertilizante de Pescado",
    "Harden Off / Endurecer Plántulas",
    "Harvest / Pack / Cosechar / Empacar",
    "Hill Beds / Acolchar Camas",
    "Irrigate / Regar",
    "Irrigation - Setup / Riego - Configuración",
    "Irrigation - Repairs / Riego - Reparaciones",
    "Mulch / Acolchado",
    "Nursery Sow / Siembra en Vivero",
    "Organizing & Materials Prep / Organización y Preparación de Materiales",
    "Pot Up / Trasplantar a Macetas",
    "Prune / Trellis / Podar / Entutorar",
    "Sprout Potatoes / Brotar Patatas",
    "Transplant / Trasplantar",
    "Weed / Desmalezar"
  ],
  Mushrooms: [
    "Harvesting / Cosecha",
    "Cleaning & Sanitizing / Limpieza y Sanitización",
    "Dehydrating / Deshidratación",
    "Labelling / Etiquetado"
  ],
  CommercialKitchen: [
    "Veg Prep / Preparación de Verduras",
    "Cooking / Cocina",
    "Portioning / Porcionado",
    "Labelling / Etiquetado",
    "Cleaning & Sanitization / Limpieza y Sanitización",
    "Dehydrating / Deshidratación"
  ],
  Admin: [
    "Sales & Marketingg",
    "Social Media",
    "Crop Planning",
    "Documentation & SOPs",
    "Staff Management & Scheduling",
    "Customer Support & CSA",
    "Maintenance / Mantenimiento"
  ]
};

const cropOptions = [
  "AAA-Multiple / AAA-Múltiple",
  "Mushrooms / Hongos",
  "Basil / Albahaca",
  "Beans: Bush & Pole / Frijoles: Arbusto y Trepador",
  "Beets / Betabels",
  "Bok Choy / Col China",
  "Broccoli / Brócoli",
  "Brussels Sprouts / Coles de Bruselas",
  "Cabbage / Repollo",
  "Carrots / Zanahorias",
  "Cilantro / Cilantro",
  "Collards / Berza",
  "Corn / Maíz",
  "Cucumbers / Pepinos",
  "Dill / Eneldo",
  "Eggplant / Berenjena",
  "Fennel / Hinojo",
  "Garlic / Ajo",
  "Husk Cherry (Ground Cherry) / Tomatillo de Cascara (Tomate de Suelo)",
  "Kale / Col Rizada",
  "Kohlrabi / Colirrábano",
  "Leeks / Puerros",
  "Lettuce / Lechuga",
  "Lettuce: Salad Mix / Lechuga: Mezcla para Ensalada",
  "Melons / Melones",
  "Onions / Cebollas",
  "Onions: Scallions / Cebollas: Cebolletas",
  "Oregano / Orégano",
  "Pac Choi (Bok Choy) / Pac Choi (Col China)",
  "Parsley / Perejil",
  "Parsnips / Chirivías",
  "Peas / Guisantes",
  "Peppers / Pimientos",
  "Potatoes / Patatas",
  "Radishes / Rábanos",
  "Sage / Salvia",
  "Shallots / Chalotes",
  "Spinach / Espinacas",
  "Summer Squash / Calabaza de Verano",
  "Sweet Potatoes / Batatas",
  "Swiss Chard / Acelga",
  "Thyme / Tomillo",
  "Tomatoes / Tomates",
  "Turnips / Nabos",
  "Watermelons / Sandías",
  "Winter Squash / Calabaza de Invierno"
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

    // Clear all but placeholder
    taskField.innerHTML = '<option value="" disabled selected hidden>Select a task... / Seleccione una tarea...</option>';

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
});

// Make header a link
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("h1");
  header.innerHTML = `<a href="https://docs.google.com/spreadsheets/d/10hQO58RhY1IeBRYz8FqaO3LB1lhU-3RC5NiYZOS2E8U/edit?usp=sharing" target="_blank" style="color: #007BFF; text-decoration: underline;">Daily Report</a>`;
});
