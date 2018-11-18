var Config = Config || (function() {
    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var columnsCount = 100;
    var rowsCount = 100;
    var formularType = "formular";
    var functionType = "function";
    return {
        letters: letters,
        digits: digits,
        columnsCount: columnsCount,
        rowsCount: rowsCount,
        formularType: formularType,
        functionType: functionType
    }
})();