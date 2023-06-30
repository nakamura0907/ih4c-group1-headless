/** 旅のしおり-観光スポット版ストレージ */
export const travelBrochuresSpotsStorage = {
    key: 'travel-brochures-spots',
    isValidObject: (object: any): object is Array<string> => {
        return Array.isArray(object) && object.every((item) => typeof item === 'string');
    },
    get: () => {
        const storedSpots = localStorage.getItem(travelBrochuresSpotsStorage.key);
        if (!storedSpots) {
            travelBrochuresSpotsStorage.init();
            return [];
        }
        const parsedSpots = JSON.parse(storedSpots);
        if (!travelBrochuresSpotsStorage.isValidObject(parsedSpots)) {
            travelBrochuresSpotsStorage.init();
            return [];
        }
        return parsedSpots;
    },
    set: (spotId: string) => {
        if (travelBrochuresSpotsStorage.has(spotId)) {
            return;
        }

        const storedSpots = travelBrochuresSpotsStorage.get();
        const updatedSpots = [...storedSpots, spotId];
        localStorage.setItem(travelBrochuresSpotsStorage.key, JSON.stringify(updatedSpots));
    },
    remove: (spotId: string) => {
        const storedSpots = travelBrochuresSpotsStorage.get();
        const updatedSpots = storedSpots.filter((storedSpotId) => storedSpotId !== spotId);
        localStorage.setItem(travelBrochuresSpotsStorage.key, JSON.stringify(updatedSpots));
    },
    has: (spotId: string) => {
        const storedSpots = travelBrochuresSpotsStorage.get();
        return storedSpots.includes(spotId);
    },
    count: () => {
        const storedSpots = travelBrochuresSpotsStorage.get();
        return storedSpots.length;
    },
    init: () => {
        localStorage.setItem(travelBrochuresSpotsStorage.key, JSON.stringify([]));
    },
};