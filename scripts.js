// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "") // Verifica quais caracteres não são números e substitui por nada
    
    // Transforma o valor em centavos (exemplo: 150/100 = 1.5 equivalente a R$1,50)
    value = Number(value)/100

    amount.value = formatCurrencyBRL(value) // Passa o valor da função formatadora para o valor do input, dessa forma, não aceitando números
}

function formatCurrencyBRL(value) {
    // Formata o valor no padrão BRL
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    // Retorna o valor formatado
    return value
}

// Captura o evento de submit do formulário para obter os valores
form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    // Cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
})