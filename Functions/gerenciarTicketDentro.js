const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationCommand, ApplicationCommandType, SelectMenuBuilder, StringSelectMenuBuilder } = require("discord.js")
const { owner } = require("../config.json")
const { General } = require("../DataBaseJson/index")

async function gerenciarTicketDentro(client, interaction) {
    interaction.update({
        embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`- **Selecione abaixo qual opção do ticket você deseja configurar:**\n\n> O que pode usar na descrição e qual sua função? - \`#ID | Mostrar ID do ticket\`, \`#USER | Mostrar quem abriu o ticket\`, \`#STAFF | Mostrar quem assumiu o ticket\``)
            .addFields(
                {
                    name: `Título`, value: `${General.get("ticketDentro.title") === "" ? "\`Não definido.\`" : `\`${General.get("ticketDentro.title")}\``}`
                },
                {
                    name: `Descrição`, value: `${General.get("ticketDentro.description") === "" ? "\`Não definido.\`" : `${General.get("ticketDentro.description")}`}`
                },
                {
                    name: `Miniatura`, value: `${General.get("ticketDentro.miniatura") === "" ? "\`Não definido.\`" : `**[Clique Aqui](${General.get("ticketDentro.miniatura")})**`}`
                },
                {
                    name: `Banner`, value: `${General.get("ticketDentro.banner") === "" ? "\`Não definido.\`" : `**[Clique Aqui](${General.get("ticketDentro.banner")})**`}`
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
                        value: `gerenciarTituloDentro`,
                        label: `Título`,
                        emoji: `1297656827831521342`,
                    },
                    {
                        value: `gerenciarDescriptionDentro`,
                        label: `Descrição`,
                        emoji: `1297698054505500742`
                    },
                    {
                        value: `gerenciarMiniaturaDentro`,
                        label: `Miniatura`,
                        emoji: `1297698562033061939`
                    },
                    {
                        value: `gerenciarBannerDentro`,
                        label: `Banner`,
                        emoji: `1297698562033061939`
                    }
                )
                .setCustomId(`selectTicketDentro`)
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
    gerenciarTicketDentro
}