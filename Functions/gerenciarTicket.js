const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationCommand, ApplicationCommandType, SelectMenuBuilder, StringSelectMenuBuilder } = require("discord.js")
const { owner } = require("../config.json")
const { General } = require("../DataBaseJson/index")

async function gerenciarTicket(client, interaction) {
    interaction.update({
        embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`- **Selecione abaixo qual opção do ticket você deseja configurar:**`)
            .setColor('#808080')
            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .setTimestamp()
        ],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId(`changeTicketSet`).setLabel(`Ticket Set`).setEmoji(`1297591226908020756`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`changeTicketAberto`).setLabel(`Ticket Aberto`).setEmoji(`1297610121257422989`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`changeButtonsColor`).setLabel(`Buttons Color`).setEmoji(`1297650470390861884`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`voltarPanel`).setLabel(`Voltar`).setEmoji(`1297592608079745095`).setStyle(2)
            )
        ],
        ephemeral: true
    })
}

module.exports = {
    gerenciarTicket
}