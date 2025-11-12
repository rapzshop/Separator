function separateCode() {
    const input = document.getElementById("inputCode").value;
    const outputContainer = document.getElementById("outputContainer");
    outputContainer.innerHTML = "";

    if (!input.trim()) {
        outputContainer.innerHTML = "<p style='color:#ff6b6b'>⚠️ Harap tempelkan kode terlebih dahulu.</p>";
        return;
    }

    const codeBlocks = [];

    // HTML
    const htmlMatch = input.match(/<html[\s\S]*?<\/html>/i);
    if (htmlMatch) {
        codeBlocks.push({ type: "HTML", code: htmlMatch[0] });
    }

    // CSS
    const cssMatches = input.match(/<style[\s\S]*?<\/style>/gi);
    if (cssMatches) {
        cssMatches.forEach(css => {
            codeBlocks.push({ type: "CSS", code: css.replace(/<\/?style>/gi, "").trim() });
        });
    }

    // JavaScript
    const jsMatches = input.match(//gi);
    if (jsMatches) {
        jsMatches.forEach(js => {
            codeBlocks.push({ type: "JavaScript", code: js.replace(/<\/?script.*?>/gi, "").trim() });
        });
    }

    // Python
    const pyMatches = input.match(/```python([\s\S]*?)```/gi);
    if (pyMatches) {
        pyMatches.forEach(py => {
            const cleaned = py.replace(/```python|```/gi, "").trim();
            codeBlocks.push({ type: "Python", code: cleaned });
        });
    }

    // Plain Text / Unknown
    if (codeBlocks.length === 0) {
        codeBlocks.push({ type: "Unknown / Plain Text", code: input.trim() });
    }

    codeBlocks.forEach(block => {
        const div = document.createElement("div");
        div.classList.add("code-card");
        div.innerHTML = `
            <div class="code-title">${block.type}</div>
            <pre>${escapeHtml(block.code)}</pre>
            <button class="copy-btn" onclick="copyCode(this)">Salin</button>
        `;
        outputContainer.appendChild(div);
    });
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function copyCode(btn) {
    const pre = btn.previousElementSibling;
    const text = pre.innerText;
    navigator.clipboard.writeText(text).then(() => {
        btn.innerText = "✅ Disalin!";
        setTimeout(() => btn.innerText = "Salin", 1500);
    });
}
