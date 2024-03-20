import { useEffect } from "react";

export function useKey(key, action) {
    useEffect(
        function () {
            function callback(e) {
                if (e.code.toLowerCase() === key.toLowerCase()) {
                    action();
                    console.log("executing action on key ", key);
                }
            }

            document.addEventListener("keydown", callback);

            // Return cleanup function for removing these event listeners;
            return function () {
                document.removeEventListener("keydown", callback);
            };
        },
        [action, key]
    );
}
