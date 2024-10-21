const {
  JsonDatabase,
} = require("wio.db");

const General = new JsonDatabase({
  databasePath: "./DatabaseJson/dbPanel.json"
});

const TicketOpen = new JsonDatabase({
  databasePath: "./DatabaseJson/ticketOpen.json"
})

const buttons = new JsonDatabase({
  databasePath: "./DatabaseJson/buttons.json"
})

const ranking = new JsonDatabase({
  databasePath: "./DatabaseJson/ranking.json"
})

module.exports = {
  General,
  TicketOpen,
  buttons,
  ranking
}