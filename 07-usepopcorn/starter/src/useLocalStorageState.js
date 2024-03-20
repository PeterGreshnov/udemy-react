import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);

        return storedValue ? JSON.parse(storedValue) : initialState;
    });

    // dedicated effect to store "watched" to localstorage
    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value));
        },
        [value, key]
    );

    return [value, setValue];
}
