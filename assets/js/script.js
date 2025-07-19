const input = document.querySelector('#input');
const btnEnviar = document.querySelector('#enviar');
const img = document.querySelector('#imagem');
const resultado = document.querySelector('#resultado');
const btnBaixar = document.querySelector('#baixar')

const buscar =  (valor) =>{
    const resp = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${valor}`

    return resp
};

btnEnviar.addEventListener('click',() => {
    const vlrinput = input.value;
    const data = buscar(vlrinput);
    
    img.src = data
})

btnBaixar.addEventListener('click', async () => {
    if (!img.src || !input.value) {
        resultado.innerHTML = 'Primeiro crie um QR code';
        return;
    }
    resultado.innerHTML = '';
    const response = await fetch(img.src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "QR-code.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});
