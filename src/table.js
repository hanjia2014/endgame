var Table = function () {
    var computingService = new ComputingService();
    var storeService = new StoreService();
    function getFunctionResult(cellId, expression) {
        var targetCell = $('#' + cellId)[0];
        if (targetCell == null) return;

        var result = computingService.getFunctionCells(expression);
        switch (result.funcName) {
            case "sum":
                var sum = 0;
                result.cells.forEach(cell => {
                    if (cell.innerText != null && cell.innerText != "") {
                        var cellSessionObj = {
                            id: cell.id.toUpperCase(),
                            value: cell.innerText,
                            calcRequired: true,
                            calcType: Config.functionType,
                            resultCellId: targetCell.id,
                            expression: expression
                        };

                        storeService.set(cellSessionObj.id, cellSessionObj);
                    }
                    sum = sum + +cell.innerText;
                });
                targetCell.innerText = sum;
                var resultSessionObj = {
                    id: targetCell.id,
                    value: sum,
                    calcRequired: false
                };
                if (storeService.get(targetCell.id) != null) {
                    var savedItem = storeService.get(targetCell.id);
                    resultSessionObj.calcRequired = savedItem.calcRequired;
                    if (savedItem.calcType != null)
                        resultSessionObj.calcType = savedItem.calcType;
                    if (savedItem.resultCellId != null)
                        resultSessionObj.resultCellId = savedItem.resultCellId;
                    if (savedItem.expression != null)
                        resultSessionObj.expression = savedItem.expression;
                }
                storeService.set(targetCell.id, resultSessionObj);
                break;
        }
    }
    function getFormularResult(cellId, expression) {
        var targetCell = $('#' + cellId)[0];
        if (targetCell == null) return;

        var result = computingService.getFormularCells(expression);
        if (result != null) {
            var cell1Value = +$('#' + result.cell1.toUpperCase())[0].innerText;
            var cell2Value = +$('#' + result.cell2.toUpperCase())[0].innerText;
            var outcome = 0;
            switch (result.operator) {
                case '+':
                    outcome = cell1Value + cell2Value;
                    break;
                case '-':
                    outcome = cell1Value - cell2Value;
                    break;
                case '*':
                    outcome = cell1Value * cell2Value;
                    break;
                case '/':
                    outcome = cell1Value / cell2Value;
                    break;
            }
        }
        targetCell.innerText = outcome;
        var resultSessionObj = {
            id: targetCell.id,
            value: outcome,
            calcRequired: false
        };

        if (storeService.get(targetCell.id) != null) {
            var savedItem = storeService.get(targetCell.id);
            resultSessionObj.calcRequired = savedItem.calcRequired;
            if (savedItem.calcType != null)
                resultSessionObj.calcType = savedItem.calcType;
            if (savedItem.resultCellId != null)
                resultSessionObj.resultCellId = savedItem.resultCellId;
            if (savedItem.expression != null)
                resultSessionObj.expression = savedItem.expression;
        }
        storeService.set(targetCell.id, resultSessionObj);

        if (cell1Value != null && cell1Value != "") {
            var cell1SessionObj = {
                id: result.cell1.toUpperCase(),
                value: cell1Value,
                calcRequired: true,
                calcType: Config.formularType,
                resultCellId: targetCell.id,
                expression: expression
            };

            storeService.set(cell1SessionObj.id, cell1SessionObj);
        }

        if (cell2Value != null && cell2Value != "") {
            var cell2SessionObj = {
                id: result.cell2.toUpperCase(),
                value: cell2Value,
                calcRequired: true,
                calcType: Config.formularType,
                resultCellId: targetCell.id,
                expression: expression
            };

            storeService.set(cell2SessionObj.id, cell2SessionObj);
        }
    }
    function calculate(element) {
        if (computingService.isFunction(element.target.innerText)) {
            getFunctionResult(element.target.id, element.target.innerText);
        } else if (computingService.isFomular(element.target.innerText)) {
            getFormularResult(element.target.id, element.target.innerText);
        } else {
            var key = element.target.id;
            var value = element.target.innerText;
            if (element.target.innerText != null && element.target.innerText != '') {
                var sessionObj = storeService.get(key);
                if (sessionObj != null && sessionObj.calcRequired) {
                    if (sessionObj.calcType == Config.formularType) {
                        getFormularResult(sessionObj.resultCellId, sessionObj.expression);
                    }
                    if (sessionObj.calcType == Config.functionType) {
                        getFunctionResult(sessionObj.resultCellId, sessionObj.expression);
                    }
                } else {
                    var valueObj = {
                        id: key,
                        value: value,
                        calcRequired: false
                    };
                    storeService.set(key, valueObj);
                }
            } else {
                storeService.remove(key);
            }
        }
    }
    var loadCellValue = function (cell) {
        var sessionCellValue = storeService.get(cell.id);
        if (sessionCellValue != null && sessionCellValue != "") {
            cell.innerText = sessionCellValue.value;
        }
    }
    var render = function (rowsCount, columns, tbl) {
        var header = document.createElement('thead');
        var headingRow = document.createElement('tr');

        var blankCell = document.createElement('td');
        var blankText = document.createTextNode('');
        blankCell.appendChild(blankText);
        headingRow.appendChild(blankCell);


        columns.forEach(column => {
            var headingCell = document.createElement('td');
            headingCell.setAttribute("width", "200");
            var headingText = document.createTextNode(column);
            headingCell.appendChild(headingText);
            headingRow.appendChild(headingCell);
        });

        header.appendChild(headingRow);
        tbl.appendChild(header);
        var tblBody = document.createElement("tbody");

        for (var i = 0; i < rowsCount; i++) {
            var row = document.createElement("tr");
            for (var j = 0; j <= columns.length; j++) {
                var cell = document.createElement("td");
                if (j == 0) {
                    var cellText = document.createTextNode(i + 1);
                } else {
                    var cellText = document.createTextNode('');
                    var cellId = columns[j - 1] + '' + (i + 1);
                    cell.setAttribute("id", cellId);
                    cell.setAttribute("contenteditable", "true");

                    loadCellValue(cell);

                    cell.addEventListener("blur", calculate);
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        tbl.setAttribute("border", "2");
    }

    return {
        render: render,
        loadCellValue: loadCellValue
    }
}