const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationCommand, ApplicationCommandType, SelectMenuBuilder, StringSelectMenuBuilder } = require("discord.js")
const { owner } = require("../config.json")
const { General } = require("../DataBaseJson/index")

async function gerenciarBot(client, interaction) {
    interaction.update({
        content: ``,
        embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`- **Selecione abaixo qual opção do BOT você deseja configurar:**`)
            .addFields(
                {
                    name: `Name Bot`, value: `\`${client.user.username}\``
                },
                {
                    name: `Avatar Bot`, value: `**[Clique Aqui](${client.user.displayAvatarURL()})**`
                },
                {
                    name: `Banner Bot`, value: `${client.user.bannerURL() === undefined ? "\`Não definido.\`" : `**[Clique Aqui](${client.user.bannerURL()})**`}`
                }
            )
            .setColor('#808080')
            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .setTimestamp()
        ],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId(`gerenciarBotName`).setLabel(`Alterar Nome`).setEmoji(`1297587068196749443`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`gerenciarBotAvatar`).setLabel(`Alterar Avatar`).setEmoji(`1297591627539419199`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`gerenciarBotBanner`).setLabel(`Alterar Banner`).setEmoji(`1297591627539419199`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`gerenciarBotStatus`).setLabel(`Alterar Status`).setEmoji(`1297592231200559144`).setStyle(General.get("buttonsColor"))
            ),
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setURL(`https://discord.com/oauth2/authorize?client_id=${interaction.client.application.id}&scope=bot%20applications.commands&permissions=8`).setLabel(`Adicionar Bot`).setEmoji(`1297592408778866771`).setStyle(5),
                new ButtonBuilder().setCustomId(`voltarPanel`).setLabel(`Voltar`).setEmoji(`1297592608079745095`).setStyle(2)
            )
        ],
        ephemeral: true
    })
}

module.exports = {
    gerenciarBot
}