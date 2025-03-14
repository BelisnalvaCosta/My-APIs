document.getElementById("buscar-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    let medicamento = document.getElementById("medicamento").value;
    let response = await fetch(`/buscar?medicamento=${medicamento}`);
    let data = await response.json();
    document.getElementById("resultado").innerText = data.message;
});
