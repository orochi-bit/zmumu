const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationCommand, ApplicationCommandType, SelectMenuBuilder, StringSelectMenuBuilder } = require("discord.js")
const { owner } = require("../config.json")
const { General } = require("../DataBaseJson/index")

async function gerenciarCanais(client, interaction) {
    interaction.update({
        embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`- **Selecione abaixo qual canal você deseja configurar:**`)
            .addFields(
                {
                    name: `Channel Logs`, value: `${General.get("channelLogs") === "" ? "\`Não definido.\`" : interaction.guild.channels.cache.get(General.get("channelLogs"))}`, inline: true
                },
                {
                    name: `Channel Avaliations`, value: `${General.get("channelFeedbacks") === "" ? "\`Não definido.\`" : interaction.guild.channels.cache.get(General.get("channelFeedbacks"))}`, inline: true
                }
            )
            .setColor('#808080')
            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .setTimestamp()
        ],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId(`changeChannelLogs`).setLabel(`Canal Logs`).setEmoji(`1297701359600144494`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`changeChannelFeedbacks`).setLabel(`Canal Feedbacks`).setEmoji(`1297701436242661428`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`voltarPanel`).setLabel(`Voltar`).setEmoji(`1297592608079745095`).setStyle(2)
            )
        ],
        ephemeral: true
    })
}

module.exports = {
    gerenciarCanais
}