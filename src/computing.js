var ComputingService = function () {
    const operators = ['+', '-', '*', '/'];
    const functions = ['sum'];
    function isFomular(expression) {
        if (expression == undefined || expression == '')
            return false;
        return expression.substring(0, 2) == '"=' && expression.slice(-1) == '"';
    }

    function getFormularCells(expression) {
        var cellString = expression.substring(2, expression.length - 1);
        var operator = '';
        var cells = [];
        for (var i = 0; i < cellString.length; i++) {
            var c = cellString[i];
            if (operators.indexOf(c) > -1) {
                operator = c;
                cells = cellString.split(c);
                break;
            }
        }

        return {
            cell1: cells[0],
            cell2: cells[1],
            operator: operator
        }
    }

    function isFunction(expression) {
        var result = false;
        if (expression == undefined || expression == '')
            return result;
        functions.forEach(item => {
            if (expression.indexOf('"=' + item + '(') > -1)
                result = true;
        });
        return result;
    }

    function getFunctionCells(expression) {
        var funcName = "";
        var cells = [];
        functions.forEach(item => {
            if (expression.indexOf('"=' + item + '(') > -1)
                funcName = item;
        });
        var cellsOnlyStr = expression.replace('"=' + funcName + '(', '').replace(')"', '');
        var cellBegin = cellsOnlyStr.split(':')[0];
        var cellEnd = cellsOnlyStr.split(':')[1];

        var cellBeginNumber = +cellBegin.match(/\d+/)[0];
        var cellEndNumber = +cellEnd.match(/\d+/)[0];
        var cellChar = cellBegin.substring(0, cellBegin.indexOf(cellBeginNumber));
        for (var i = cellBeginNumber; i <= cellEndNumber; i++) {
            var cell = $("#" + cellChar.toUpperCase() + i)[0];
            cells.push(cell);
        }
        return {
            funcName: funcName,
            cells: cells
        }
    }

    return {
        isFomular: isFomular,
        isFunction: isFunction,
        getFormularCells: getFormularCells,
        getFunctionCells: getFunctionCells
    }
}