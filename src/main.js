var App = App || (function () {
    var tableObj;
    init = function (tableId) {
        var columns = Init.getColumns();
        var tableElem = $(tableId)[0];
        tableObj = new Table();
        tableObj.render(Config.rowsCount, columns, tableElem);
    }

    reload = function(tableId) {
        var table = $(tableId)[0];
        for (var i = 0, row; row = table.rows[i]; i++) {
            for (var j = 0, cell; cell = row.cells[j]; j++) {
                if(tableObj != null){
                    tableObj.loadCellValue(cell);
                }
            }  
         }
    }

    return {
        init: init,
        reload: reload
    }
})();