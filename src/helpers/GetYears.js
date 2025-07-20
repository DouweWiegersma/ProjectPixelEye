export function generateReleaseYears(start = 1950, end = new Date().getFullYear()) {
    const years = [];
    for (let year = end; year >= start; year--) {
        years.push(year);
    }
    return years;
}
