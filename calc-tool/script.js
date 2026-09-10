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

const createReport = (list) => {
    const valid = cleanExpenses(list);

    if (valid.length === 0) {
        return '没有有效的消费记录';
    }

    const total = totalExpenses(valid);
    const average = averageExpense(valid);
    const large = largeExpenses(valid);

    return `消费记录月报
有效记录：${valid.length}条
总消费：${total}元
平均消费：${average}元
大额消费：${large.length}条`;
};

console.table(expenses);

try {
    console.log(createReport(expenses));
} catch (err) {
    console.error('报告生成失败：', err.message);
}