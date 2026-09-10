const expenses = [
    { category: 'food', amount: 35 },
    { category: 'transport', amount: 12 },
    { category: 'coffee', amount: 18 },
    { category: 'book ', amount: 65 },
    { category: 'movie', amount: -20 },
];

const cleanExpenses = (list) => {
    return list.filter(e => e.amount >= 0);
}

const totalExpenses = (list) => {
    return list.reduce((total, e) => total + e.amount, 0);
};

const averageExpense = (list) => {
    const total = totalExpenses(list);
    return (total / list.length).toFixed(2);
};

const largeExpenses = (list) => {
    return list.filter(e => e.amount >= 50);
};

const categoryNames = (list) => {
    return list.map(e => e.category);
};



console.table(expenses);
console.log('清洗后：', cleanExpenses(expenses));
console.log('总消费：', totalExpenses(cleanExpenses(expenses)));
console.log('平均消费：', averageExpense(cleanExpenses(expenses)));
console.log('大额消费：', largeExpenses(cleanExpenses(expenses)));
console.log('消费类别：', categoryNames(cleanExpenses(expenses)));
console.log('大额消费：', largeExpenses(cleanExpenses(expenses)));