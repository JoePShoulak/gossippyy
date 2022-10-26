module.exports = {
  // get_emoji: () => {
  //   const randomNum = Math.random();
  //   let book = "📗";

  //   if (randomNum > 0.7) {
  //     book = "📘";
  //   } else if (randomNum > 0.4) {
  //     book = "📙";
  //   }

  //   return `<span for="img" aria-label="book">${book}</span>`;
  // },

  format_time: (date) => {
    // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
    return date.toLocaleTimeString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },
};
