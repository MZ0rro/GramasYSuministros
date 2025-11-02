const inputImagen = document.getElementById("inputImagen");
const btnImagen = document.getElementById("btnImagen");
const preview = document.getElementById("preview");

// Cuando se hace clic en el botón, se abre el selector de archivos
btnImagen.addEventListener("click", () => {
  inputImagen.click();
});

// Cuando el usuario elige una imagen
inputImagen.addEventListener("change", (event) => {
  const archivo = event.target.files[0];
  if (archivo && archivo.type.startsWith("image/")) {
    const lector = new FileReader();
    lector.onload = (e) => {
      preview.innerHTML = `<img src="${e.target.result}" alt="Vista previa" 
          style="width:100%; height:100%; object-fit:cover; border-radius:10px;">`;
    };
    lector.readAsDataURL(archivo);
  } else {
    alert("Por favor selecciona un archivo de imagen válido (png, jpg, jpeg).");
  }
});
