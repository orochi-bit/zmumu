const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationCommand, ApplicationCommandType, SelectMenuBuilder, StringSelectMenuBuilder } = require("discord.js")
const { owner } = require("../config.json")
const { General } = require("../DataBaseJson/index")

async function gerenciarCargos(client, interaction) {
    interaction.update({
        embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`- **Selecione abaixo qual cargo você deseja configurar:**`)
            .addFields(
                {
                    name: `Cargo Staff`, value: `${General.get("cargoSuportt") === "" ? "\`Não definido.\`" : interaction.guild.roles.cache.get(General.get("cargoSuportt"))}`, inline: true
                },
                {
                    name: `Cargo Membro`, value: `${General.get("cargoMember") === null ? "\`Não definido.\`" : interaction.guild.roles.cache.get(General.get("cargoMember"))}`, inline: true
                }
            )
            .setColor('#808080')
            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .setTimestamp()
        ],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId(`changeCargoStaff`).setLabel(`Cargo Staff`).setEmoji(`1297586000704569545`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`changeCargoMember`).setLabel(`Cargo Membro`).setEmoji(`1297605948030062773`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`voltarPanel`).setLabel(`Voltar`).setEmoji(`1297592608079745095`).setStyle(2)
            )
        ],
        ephemeral: true
    })
}

module.exports = {
    gerenciarCargos
}