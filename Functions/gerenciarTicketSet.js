const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationCommand, ApplicationCommandType, SelectMenuBuilder, StringSelectMenuBuilder } = require("discord.js")
const { owner } = require("../config.json")
const { General } = require("../DataBaseJson/index")

async function gerenciarTicketSet(client, interaction) {
    interaction.update({
        embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`- **Selecione abaixo qual opção do ticket você deseja configurar:**`)
            .addFields(
                {
                    name: `Título`, value: `${General.get("ticket.title") === "" ? "\`Não definido.\`" : `\`${General.get("ticket.title")}\``}`
                },
                {
                    name: `Descrição`, value: `${General.get("ticket.description") === "" ? "\`Não definido.\`" : `\`${General.get("ticket.description")}\``}`
                },
                {
                    name: `Miniatura`, value: `${General.get("ticket.miniatura") === "" ? "\`Não definido.\`" : `**[Clique Aqui](${General.get("ticket.miniatura")})**`}`
                },
                {
                    name: `Banner`, value: `${General.get("ticket.banner") === "" ? "\`Não definido.\`" : `**[Clique Aqui](${General.get("ticket.banner")})**`}`
                }
            )
            .setColor('#808080')
            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .setTimestamp()
        ],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .addOptions(
                    {
                        value: `gerenciarTituloSet`,
                        label: `Título`,
                        emoji: `1297656827831521342`,
                    },
                    {
                        value: `gerenciarDescriptionSet`,
                        label: `Descrição`,
                        emoji: `1297698054505500742`
                    },
                    {
                        value: `gerenciarMiniaturaSet`,
                        label: `Miniatura`,
                        emoji: `1297698562033061939`
                    },
                    {
                        value: `gerenciarBannerSet`,
                        label: `Banner`,
                        emoji: `1297698562033061939`
                    }
                )
                .setCustomId(`selectTicketSet`)
                .setPlaceholder(`Clique aqui para selecionar uma opção`)
                .setMaxValues(1)
            ),
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId(`voltarPersonalizacao`).setLabel(`Voltar`).setEmoji(`1297592608079745095`).setStyle(2)
            )
        ],
        ephemeral: true
    })
}

module.exports = {
    gerenciarTicketSet
}