const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationCommand, ApplicationCommandType, SelectMenuBuilder, StringSelectMenuBuilder } = require("discord.js")
const { owner } = require("../config.json")
const { General } = require("../DataBaseJson/index")

async function panel(client, interaction) {
    interaction.update({
        embeds: [
            new EmbedBuilder()
                .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
                .setThumbnail(`${client.user.displayAvatarURL()}`)
                .setDescription(`> Olá **${interaction.user.username}** logo abaixo terá várias funções para você usar e modificar seu bot/ticket`)
                .addFields(
                    {
                        name: `Sistema`, value: `${General.get("sistema") === true ? "\`Ligado\`" : "\`Desligado\`"}`, inline: true
                    },
                    {
                        name: `Versão Bot`, value: `\`2.0.0\``, inline: true
                    },
                    {
                        name: `Ping Bot`, value: `\`${client.ws.ping} ms\``, inline: true
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
                                value: `sistemaOnOff`,
                                label: `${General.get("sistema") === true ? "Sistema Ligado" : "Sistema Desligado"}`,
                                description: `Ligar ou desligar o sistema de ticket`,
                                emoji: `1297578681887359016`
                            },
                            {
                                value: `gerenciarTicket`,
                                label: `Ticket`,
                                description: `Configure algumas partes do seu ticket`,
                                emoji: `1297584933442949160`
                            },
                            {
                                value: `gerenciarCanais`,
                                label: `Canais`,
                                description: `Configure os canais para o bot`,
                                emoji: `1297585277346381874`
                            },
                            {
                                value: `gerenciarCargos`,
                                label: `Cargos`,
                                description: `Configure os cargos para o bot`,
                                emoji: `1297586000704569545`
                            },
                            {
                                value: `gerenciarPayments`,
                                label: `Pagamentos`,
                                description: `Configure a forma de pagamento para o bot`,
                                emoji: `1297586328417992828`
                            },
                            {
                                value: `gerenciarFunções`,
                                label: `Configurar Funções`,
                                description: `Configure as funções do ticket`,
                                emoji: `1297586555044626463`
                            },
                            {
                                value: `gerenciarBot`,
                                label: `Meu Bot`,
                                description: `Configure o seu bot`,
                                emoji: `1297587068196749443`
                            }
                        )
                        .setCustomId(`panelSelectMenu`)
                        .setPlaceholder(`Clique aqui para ver as opções`)
                        .setMaxValues(1)
                )
        ],
        ephemeral: true
    })
}

module.exports = {
    panel
}