document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("timeForm");
    const entryList = document.getElementById("entryList");
    const totalHoursDisplay = document.getElementById("totalHours");
    const categorySummaryDisplay = document.getElementById("categorySummary");

    let entries = JSON.parse(localStorage.getItem("entries")) || [];

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const category = document.getElementById("category").value;
        const hours = parseFloat(document.getElementById("hours").value);
        const description = document.getElementById("description").value;

        if (hours <= 0 || description.trim() === "") {
            alert("Enter a valid number of hours and description!");
            return;
        }

        const entry = { category, hours, description };
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));
        updateUI();
        form.reset();
    });

    function updateUI() {
        entryList.innerHTML = "";
        let totalHours = 0;
        let categoryHours = {};

        entries.forEach((entry, index) => {
            totalHours += entry.hours;
            categoryHours[entry.category] = (categoryHours[entry.category] || 0) + entry.hours;

            const li = document.createElement("li");
            li.innerHTML = `${entry.category}: ${entry.hours}h - ${entry.description} 
                <button onclick="removeEntry(${index})">Delete</button>`;
            entryList.appendChild(li);
        });

        totalHoursDisplay.textContent = `Total hours: ${totalHours}`;
        categorySummaryDisplay.innerHTML = Object.keys(categoryHours)
            .map(cat => `<p>${cat}: ${categoryHours[cat]}h (${((categoryHours[cat] / totalHours) * 100).toFixed(1)}%)</p>`)
            .join("");
    }

    window.removeEntry = (index) => {
        entries.splice(index, 1);
        localStorage.setItem("entries", JSON.stringify(entries));
        updateUI();
    };

    updateUI();
});
