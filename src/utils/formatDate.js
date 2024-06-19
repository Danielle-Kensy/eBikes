export function formatarData(dataString) {
    // Criar um objeto de data a partir da string fornecida
    let data = new Date(dataString);

    // Extrair dia, mês e ano
    let dia = data.getUTCDate().toString().padStart(2, '0');
    let mes = (data.getUTCMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero
    let ano = data.getUTCFullYear();

    // Retornar data formatada
    return `${dia}/${mes}/${ano}`;
}