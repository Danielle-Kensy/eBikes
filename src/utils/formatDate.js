export function formatDate(dataString) {
    // Criar um objeto de data a partir da string fornecida
    let data = new Date(dataString);

    // Extrair dia, mês e ano
    let dia = data.getUTCDate().toString().padStart(2, '0');
    let mes = (data.getUTCMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero
    let ano = data.getUTCFullYear();

    
    const date = `${dia}/${mes}/${ano}`
    //retornar inválido caso a data não seja válida
    if (date === "NaN/NaN/NaN") {
        return "Formato de data inválido";
    }
    // Retornar data formatada
    return date;
}