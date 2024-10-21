const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder, TextInputStyle } = require("discord.js");
const { owner } = require("../config.json");
const { General, buttons } = require("../DataBaseJson/index");

async function gerenciarFuncoes(client, interaction) {
  const selectMenuBuilder = new StringSelectMenuBuilder()
   .setCustomId(`selectOptionsView`)
   .setPlaceholder(`Clique aqui para ver as opções`)
   .setMaxValues(1);

  const buttonRow = new ActionRowBuilder()
   .addComponents(
      new ButtonBuilder().setCustomId(`adicionarFunção`).setLabel(`Adicionar Função`).setEmoji(`1297607061722370079`).setStyle(General.get("buttonsColor")).setDisabled(buttons.get("ticket").length === 25 ? true : false),
      new ButtonBuilder().setCustomId(`removerFunção`).setLabel(`Remover Função`).setEmoji(`1297607055808532480`).setStyle(General.get("buttonsColor")).setDisabled(buttons.get("ticket").length === 0 ? true : false),
      new ButtonBuilder().setCustomId(`resetarFunções`).setLabel(`Resetar Funções`).setEmoji(`1297607679459459082`).setStyle(General.get("buttonsColor")).setDisabled(buttons.get("ticket").length === 0 ? true : false),
      new ButtonBuilder().setCustomId(`voltarPanel`).setLabel(`Voltar`).setEmoji(`1297592608079745095`).setStyle(2)
    );

  if (buttons.get("ticket").length === 0) {
    selectMenuBuilder.setDisabled(true);
    buttons.get("ticket0").map((rs) => {
      selectMenuBuilder.addOptions({
        value: `${rs.customId}_0`,
        label: rs.label,
        description: `Cor do botão: ${rs.style}`
      });
    });
  } else {
    buttons.get("ticket").map((rs) => {
      selectMenuBuilder.addOptions({
        value: `${rs.customId}_2`,
        label: rs.label,
        description: `Cor do botão: ${rs.style}`
      });
    });
  }

  interaction.update({
    embeds: [
      new EmbedBuilder()
       .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
       .setDescription(`> Olá **${interaction.user.username}** logo abaixo você pode Adicionar, Remover e Resetar as funções do seu bot, para ver as funções do bot abra o select menu`)
       .setColor('#808080') // aqui você define o cinza
       .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
       .setTimestamp()
    ],
    components: [new ActionRowBuilder().addComponents(selectMenuBuilder), buttonRow],
    ephemeral: true
  });
}

module.exports = {
  gerenciarFuncoes
};