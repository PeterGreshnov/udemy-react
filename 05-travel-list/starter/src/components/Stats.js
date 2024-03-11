function Stats({ items }) {
    if (!items.length)
        return (
            <p className="stats">
                <em>Start packing 🚀</em>
            </p>
        );

    const numItems = items.length;
    const numPacked = items.filter((i) => i.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100).toFixed(0);

    return (
        <footer className="stats">
            <em>
                {percentage === "100"
                    ? "GO GO GO ✈️"
                    : `💼 You have ${numItems} items on your list, and you already
                packed ${numPacked} (${percentage}%)`}
            </em>
        </footer>
    );
}

export default Stats;
