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
        const storedSpots = travelBrochuresSpotsStorage.get();
        const updatedSpots = [...storedSpots, spotId];
        localStorage.setItem(travelBrochuresSpotsStorage.key, JSON.stringify(updatedSpots));
    },
    remove: (spotId: string) => {
        const storedSpots = travelBrochuresSpotsStorage.get();
        const updatedSpots = storedSpots.filter((storedSpotId) => storedSpotId !== spotId);
        localStorage.setItem(travelBrochuresSpotsStorage.key, JSON.stringify(updatedSpots));
    },
    init: () => {
        localStorage.setItem(travelBrochuresSpotsStorage.key, JSON.stringify([]));
    },
};