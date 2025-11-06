document.getElementById("btnModelos").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3002/api/modelos");
    if (!response.ok) {
      throw new Error(`Error de fetching modelos: ${response.statusText}`);
    }
    const data = await response.json();
    console.table(data.modelos);

    const nombreModelos = data.modelos.map(modelo => modelo.nombre);

    // Mostrar los modelos en el párrafo
    document.getElementById("mostrarModelos").textContent = nombreModelos.join(", ");
  } catch (error) {
    console.error("Error al obtener los modelos:", error);
    document.getElementById("mostrarModelos").textContent = "Error al obtener los modelos";
  }
});
