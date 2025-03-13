document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("entry-form");
  const list = document.getElementById("entry-list");
  const totalHours = document.getElementById("total-hours");
  const categorySummary = document.getElementById("category-summary");
  
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  renderEntries();

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const category = document.getElementById("category").value;
      const hours = parseFloat(document.getElementById("hours").value);
      const description = document.getElementById("description").value;

      if (isNaN(hours) || hours <= 0) {
          alert("Please enter a valid number of hours.");
          return;
      }

      const entry = { category, hours, description };
      entries.push(entry);
      localStorage.setItem("entries", JSON.stringify(entries));
      renderEntries();
      form.reset();
  });

  function renderEntries() {
      list.innerHTML = "";
      let total = 0;
      let categoryCount = {};

      entries.forEach((entry, index) => {
          total += entry.hours;
          categoryCount[entry.category] = (categoryCount[entry.category] || 0) + entry.hours;
          
          const li = document.createElement("li");
          li.innerHTML = `${entry.category}: ${entry.hours}h - ${entry.description} <button onclick="deleteEntry(${index})">Delete</button>`;
          list.appendChild(li);
      });

      totalHours.textContent = `Total Hours: ${total}`;
      categorySummary.innerHTML = Object.keys(categoryCount)
          .map(cat => `<p>${cat}: ${categoryCount[cat]}h (${((categoryCount[cat] / total) * 100).toFixed(2)}%)</p>`)
          .join("\n");
  }

  window.deleteEntry = function (index) {
      entries.splice(index, 1);
      localStorage.setItem("entries", JSON.stringify(entries));
      renderEntries();
  };
});