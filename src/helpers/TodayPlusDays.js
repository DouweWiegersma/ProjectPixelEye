function todayPlusDays(days){
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

export default todayPlusDays;