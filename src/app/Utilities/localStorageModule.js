var LocalStorage;
(function (LocalStorage) {
    LocalStorage.isSupported = (function () {
        try {
            var itemBackup = localStorage.getItem("");
            localStorage.removeItem("");
            localStorage.setItem("", itemBackup);
            if (itemBackup === null)
                localStorage.removeItem("");
            else
                localStorage.setItem("", itemBackup);
            return true;
        }
        catch (e) {
            return false;
        }
    })();
    function hasItem(key) {
        return localStorage.getItem(key) !== null;
    }
    LocalStorage.hasItem = hasItem;
    function getRemainingSpace() {
        var itemBackup = localStorage.getItem("");
        var increase = true;
        var data = "1";
        var totalData = "";
        var trytotalData = "";
        while (true) {
            try {
                trytotalData = totalData + data;
                localStorage.setItem("", trytotalData);
                totalData = trytotalData;
                if (increase)
                    data += data;
            }
            catch (e) {
                if (data.length < 2) {
                    break;
                }
                increase = false;
                data = data.substr(data.length / 2);
            }
        }
        if (itemBackup === null)
            localStorage.removeItem("");
        else
            localStorage.setItem("", itemBackup);
        return totalData.length;
    }
    LocalStorage.getRemainingSpace = getRemainingSpace;
    function getMaximumSpace() {
        var backup = getBackup();
        localStorage.clear();
        var max = getRemainingSpace();
        applyBackup(backup);
        return max;
    }
    LocalStorage.getMaximumSpace = getMaximumSpace;
    function getUsedSpace() {
        var sum = 0;
        for (var key in localStorage) {
            var value = localStorage.getItem(key);
            sum += key.length + value.length;
        }
        return sum;
    }
    LocalStorage.getUsedSpace = getUsedSpace;
    function getBackup() {
        var backup = {};
        for (var i = 0; i < localStorage.length; ++i) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            backup[key] = value;
        }
        return backup;
    }
    LocalStorage.getBackup = getBackup;
    function applyBackup(backup, fClear, fOverwriteExisting) {
        if (fClear === void 0) { fClear = true; }
        if (fOverwriteExisting === void 0) { fOverwriteExisting = true; }
        if (fClear == true) {
            localStorage.clear();
        }
        for (var key in backup) {
            if (fOverwriteExisting === false && backup[key] !== undefined) {
                continue;
            }
            var value = backup[key];
            localStorage.setItem(key, value);
        }
    }
    LocalStorage.applyBackup = applyBackup;
    function consoleInfo(fShowMaximumSize) {
        if (fShowMaximumSize === void 0) { fShowMaximumSize = false; }
        var amount = 0;
        var size = 0;
        for (var key in window.localStorage) {
            var value = localStorage.getItem(key);
            console.log(amount, key, value);
            size += key.length + value.length;
            amount++;
        }
        console.log("Total entries:", amount);
        console.log("Total size:", size);
        if (fShowMaximumSize === true) {
            var maxSize = getMaximumSpace();
            console.log("Total size:", maxSize);
        }
    }
    LocalStorage.consoleInfo = consoleInfo;
})(LocalStorage || (LocalStorage = {}));
//# sourceMappingURL=localStorageModule.js.map