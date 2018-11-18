var Init = Init || (function () {
    var getColumns = function () {
        let numColAdd = Config.columnsCount - Config.letters.length;
        let tempList = Config.letters;
        let result = [];
        Config.letters.forEach(letter => {
            if (result.length >= numColAdd)
                return Config.letters.concat(result);
            tempList.forEach(tempLetter => {
                if (result.length < numColAdd)
                    result.push(letter + '' + tempLetter);
            });
        });
        return Config.letters.concat(result);
    }

    return {
        getColumns: getColumns
    }
})();