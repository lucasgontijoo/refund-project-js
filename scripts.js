// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    // Obtém o valor atual do input e remove os caracteres não numéricos
    let value = amount.value.replace(/\D/g, "")

    // Transformar o valor em centatos (exemplo: 150/100 = 1.5 é equivalente a R$ 1,50)
    value = Number(value) / 100

    // Atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
    // Formata o valor no padrão BRL (Real Brasileiro)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    // Retorna o valor formatado 
    return value
}

// Captura o evento de submit do formulário para obter os valores 
form.onsubmit = (event) => {
    // Previne o comportamento padrão de recarregar a página
    event.preventDefault()

    // Cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    // Chama a função que irá adicionar o item na lista
    expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
        // Cria o elemento para adicionar o item (li) na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o ícone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona nome e categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        // Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Cria o ícone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")

        // Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // Adiciona o item na lista
        expenseList.append(expenseItem)

        // Atualiza os totais
        updateTotals()


    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

// Atualiza os totais
function updateTotals() {
    try {
        // Recupera todos os itens (li) da lista (ul)
        const items = expenseList.children
        
        // Atualiza a quantidade de itens da lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        // Variável para incrementar o total
        let total = 0;

        // Percorre cada item (li) da lista (ul)
        for (let i = 0; i < items.length; i++) {
            const itemAmount = items[i].querySelector(".expense-amount")
            
            // Remove caracteres não numéricos e substitui a vírgula pelo ponto
            let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",",".")

            // Converte o valor para float
            value = parseFloat(value)

            // Verifica se é um número válido
            if(isNaN(value)) {
                return alert("Não foi possível calcular o total. O valor não parece ser um número.")
            }

            // Incrementar o valor total
            total += Number(value)
        }

        expensesTotal.textContent = total
    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais.")
    }
}