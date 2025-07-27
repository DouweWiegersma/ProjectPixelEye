function engelsNaarNederlandseDatum(engelseDatumString) {
    const maanden = [
        "januari", "februari", "maart", "april", "mei", "juni",
        "juli", "augustus", "september", "oktober", "november", "december"
    ];

    const datum = new Date(engelseDatumString);


    const dag = datum.getDate();
    const maand = maanden[datum.getMonth()];
    const jaar = datum.getFullYear();

    return `${dag} ${maand} ${jaar}`;
}

export default engelsNaarNederlandseDatum;