const idb = {
    openCostsDB: function (dbName, version) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('costs')) {
                    db.createObjectStore('costs', {keyPath: 'id', autoIncrement: true});
                }
            };

            request.onsuccess = () => {
                const db = request.result;
                resolve({
                    addCost: function (costData) {
                        return new Promise((resolve, reject) => {
                            const tx = db.transaction('costs', 'readwrite');
                            const store = tx.objectStore('costs');
                            const request = store.add({
                                sum: costData.sum,
                                category: costData.category,
                                description: costData.description,
                                date: new Date().toISOString()
                            });
                            request.onsuccess = () => resolve(request.result);
                            request.onerror = () => reject(request.error);
                        });
                    }
                });
            };

            request.onerror = () => reject(request.error);
        });
    }
};