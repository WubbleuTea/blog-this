module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            console.log(amount+ " is the amount")
          return `${word.toLowerCase()}s`;
        }
    
        return word.toLowerCase();
    },
    current_year: () => {
        return `${new Date().getFullYear()}`;
    }
}
