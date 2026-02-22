const tabs = document.querySelectorAll(".tab");
const boxes = document.querySelectorAll(".code-box");
const preview = document.getElementById("preview");
const themeToggle = document.getElementById("themeToggle");
const previewThemeToggle = document.getElementById("previewThemeToggle");
const copyBtn = document.getElementById("copyBtn");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        boxes.forEach(b => b.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.target).classList.add("active");
    });
});

function updatePreview() {
    const html = document.getElementById("html").value;
    const css = document.getElementById("css").value;

    const content = `
        <style>${css}</style>
        ${html}
    `;

    preview.srcdoc = content;
}

document.querySelectorAll(".code-box").forEach(box => {
    box.addEventListener("input", updatePreview);
});

/* Theme toggle for whole page */
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
});

/* Theme toggle for preview */
previewThemeToggle.addEventListener("click", () => {
    const doc = preview.contentDocument;
    if (!doc) return;

    const current = doc.body.getAttribute("data-theme");

    if (current === "dark") {
        doc.body.setAttribute("data-theme", "light");
        doc.body.style.background = "white";
        doc.body.style.color = "black";
    } else {
        doc.body.setAttribute("data-theme", "dark");
        doc.body.style.background = "#111";
        doc.body.style.color = "white";
    }
});

/* Copy button */
copyBtn.addEventListener("click", () => {
    const activeBox = document.querySelector(".code-box.active");
    navigator.clipboard.writeText(activeBox.value);
});
