// This file wraps IndexedDB with Promise-based functions for cost management.

/**
 * Opens or creates the IndexedDB.
 * @returns {Promise<IDBDatabase>}
 */
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('costManagerDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('costs')) {
                db.createObjectStore('costs', {keyPath: 'id', autoIncrement: true});
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Adds a new cost item to the 'costs' store.
 * @param {Object} costData - The cost data to be added.
 * @param {number} costData.sum - The sum of the cost.
 * @param {string} costData.category - The category of the cost.
 * @param {string} costData.description - The description of the cost.
 * @param {string} costData.date - The date of the cost.
 * @returns {Promise<number>} A promise that resolves to the ID of the added cost item.
 */
export function addCost(costData) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const tx = db.transaction('costs', 'readwrite');
            const store = tx.objectStore('costs');
            const request = store.add({
                sum: costData.sum,
                category: costData.category,
                description: costData.description,
                date: costData.date,
            });
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Retrieves all unique categories from the 'costs' store.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of unique categories.
 */
export function getCategories() {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const tx = db.transaction('costs', 'readonly');
            const store = tx.objectStore('costs');
            const categories = [];
            store.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    const category = cursor.value.category;
                    if (!categories.includes(category)) {
                        categories.push(category);
                    }
                    cursor.continue();
                } else {
                    resolve(categories);
                }
            };
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Deletes a cost item from the 'costs' store by ID.
 * @param {number} id - The ID of the cost item to be deleted.
 * @returns {Promise<void>} A promise that resolves when the cost item is deleted.
 */
export function deleteCost(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const tx = db.transaction('costs', 'readwrite');
            const store = tx.objectStore('costs');
            const request = store.delete(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Retrieves all costs for a specific month and year.
 * @param {number} month - The month for which to retrieve costs (1-12).
 * @param {number} year - The year for which to retrieve costs.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of cost items for the specified month and year.
 */
export function getCostsByMonthYear(month, year) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDB();
            const tx = db.transaction('costs', 'readonly');
            const store = tx.objectStore('costs');
            const costs = [];
            store.openCursor().onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    const cost = cursor.value;
                    const costDate = new Date(cost.date);
                    if (
                        costDate.getMonth() + 1 === month &&
                        costDate.getFullYear() === year
                    ) {
                        costs.push(cost);
                    }
                    cursor.continue();
                } else {
                    resolve(costs);
                }
            };
        } catch (error) {
            reject(error);
        }
    });
}
