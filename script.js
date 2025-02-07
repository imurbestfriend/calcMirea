document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const historyList = document.getElementById("history-list");

    loadHistory();

    function insert(value) {
        const lastChar = display.value.slice(-1);

        if (isOperator(lastChar) && isOperator(value)) {
            return;
        }

        display.value += value;
    }

    function isOperator(char) {
        return ['+', '-', '*', '/', '^'].includes(char);
    }

    function clearDisplay() {
        display.value = "";
    }

    function deleteLast() {
        display.value = display.value.slice(0, -1);
    }

    function calculate() {
        if (display.value.trim() === "") {
            alert("Введите выражение перед расчетом");
            return;
        }

        try {
           
            const expression = display.value;
            const result = eval(expression.replace("^", "**"));
            
            addToHistory(expression, result);
            
            display.value = result;
        } catch (error) {
            display.value = "Ошибка";
        }
    }

    function addToHistory(expression, result) {
        const history = getHistory();
        history.push({ expression, result });

        // Сохраняем обновленную историю в localStorage
        localStorage.setItem('history', JSON.stringify(history));

        // Добавляем новый элемент в список истории
        const listItem = document.createElement("li");
        listItem.textContent = `${expression} = ${result}`;
        historyList.appendChild(listItem);
    }

    // Функция для получения истории из localStorage
    function getHistory() {
        const history = localStorage.getItem('history');
        return history ? JSON.parse(history) : [];
    }

    function loadHistory() {
        const history = getHistory();
        history.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.expression} = ${item.result}`;
            historyList.appendChild(listItem);
        });
    }

    function clearHistory() {
        historyList.innerHTML = ""; 
        localStorage.removeItem('history'); 
    }
    window.insert = insert;
    window.clearDisplay = clearDisplay;
    window.deleteLast = deleteLast;
    window.calculate = calculate;
    window.clearHistory = clearHistory;
});
