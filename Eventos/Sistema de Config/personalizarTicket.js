const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ApplicationCommandType, isStringSelectMenu, StringSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType, RoleSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")
const { General } = require("../../DataBaseJson/index")
const { owner } = require("../../config.json")
const { panel } = require("../../Functions/panel")
const { gerenciarTicket } = require("../../Functions/gerenciarTicket")
const { gerenciarCanais } = require("../../Functions/gerenciarCanais")
const { gerenciarCargos } = require("../../Functions/gerenciarCargos")
const { gerenciarPayments } = require("../../Functions/gerenciarPayments")
const { gerenciarTicketSet } = require("../../Functions/gerenciarTicketSet")
const { gerenciarTicketSet2 } = require("../../Functions/gerenciarTicketSet2")
const { gerenciarTicketDentro } = require("../../Functions/gerenciarTicketDentro")
const { gerenciarTicketDentro2 } = require("../../Functions/gerenciarTicketDentro2")

module.exports = {
    name: "interactionCreate",
    run: async (interaction, client, message) => {

        if (interaction.isButton() && interaction.customId === "changeTicketSet") {
            gerenciarTicketSet(client, interaction)
        }

        if (interaction.isStringSelectMenu() && interaction.customId === "selectTicketSet") {
            const option = interaction.values[0]

            if (option === "gerenciarTituloSet") {

                const modal = new ModalBuilder()
                    .setCustomId(`modalTitleSet`)
                    .setTitle(`Título Set`)

                const option1 = new TextInputBuilder()
                    .setCustomId(`titleSet`)
                    .setLabel(`Título do ticket set`)
                    .setPlaceholder(`Coloque seu título aqui`)
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(100)
                    .setRequired(true)

                const optionx1 = new ActionRowBuilder().addComponents(option1)

                modal.addComponents(optionx1)
                await interaction.showModal(modal)
            }

            if (option === "gerenciarDescriptionSet") {
                const user = interaction.user;

                if (interaction.user.id !== user.id) {
                    return;
                }

                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
                            .setDescription(`- **Envie abaixo qual será a nova descrição para o ticket set:**\n\n> Para parar, digite **parar**`)
                            .addFields(
                                {
                                    name: `Descrição`, value: `${General.get("ticket.description") === "" ? "\`Não definido.\`" : `\`${General.get("ticket.description")}\``}`
                                }
                            )
                            .setColor(General.get("colorOfice"))
                            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                            .setTimestamp()
                    ],
                    components: []
                });
                const filter = (m) => m.author.id === interaction.user.id;
                const collector = interaction.channel.createMessageCollector({ filter: filter, max: 1 });

                collector.on("collect", (message) => {

                    if (message.content === "parar") {
                        message.delete();
                        gerenciarTicketSet2(client, interaction);
                        interaction.followUp({ embeds: [new EmbedBuilder().setAuthor({ name: `Você parou a mudança de descrição com êxito.`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true });
                        collector.stop();
                        return;
                    }

                    message.delete();
                    General.set("ticket.description", `${message.content}`);
                    gerenciarTicketSet2(client, interaction)
                });
            }

            if (option === "gerenciarMiniaturaSet") {

                const modal = new ModalBuilder()
                    .setCustomId(`modalMiniSet`)
                    .setTitle(`Miniatura Set`)

                const option1 = new TextInputBuilder()
                    .setCustomId(`miniSet`)
                    .setLabel(`Miniatura do ticket set`)
                    .setPlaceholder(`https://`)
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(300)
                    .setRequired(true)

                const optionx1 = new ActionRowBuilder().addComponents(option1)

                modal.addComponents(optionx1)
                await interaction.showModal(modal)
            }

            if (option === "gerenciarBannerSet") {

                const modal = new ModalBuilder()
                    .setCustomId(`modalBannerSet`)
                    .setTitle(`Banner Set`)

                const option1 = new TextInputBuilder()
                    .setCustomId(`bannerSet`)
                    .setLabel(`Banner do ticket set`)
                    .setPlaceholder(`https://`)
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(300)
                    .setRequired(true)

                const optionx1 = new ActionRowBuilder().addComponents(option1)

                modal.addComponents(optionx1)
                await interaction.showModal(modal)
            }
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalTitleSet") {
            const title = interaction.fields.getTextInputValue("titleSet")

            General.set("ticket.title", title);
            gerenciarTicketSet(client, interaction);
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalDescSet") {
            const desc = interaction.fields.getTextInputValue("descSet")

            General.set("ticket.description", desc);
            gerenciarTicketSet(client, interaction);
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalMiniSet") {
            const mini = interaction.fields.getTextInputValue("miniSet")

            if (!link(mini)) return interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `A URL da miniatura está inválida, tente novamente usando uma URL válida.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true });

            General.set("ticket.miniatura", mini);
            gerenciarTicketSet(client, interaction);
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalBannerSet") {
            const banner = interaction.fields.getTextInputValue("bannerSet")

            if (!link(banner)) return interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `A URL do banner está inválida, tente novamente usando uma URL válida.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true });

            General.set("ticket.banner", banner);
            gerenciarTicketSet(client, interaction);
        }

        // --------------------------- GERENCIAR TICKET DENTRO --------------------------- //

        if (interaction.isButton() && interaction.customId === "changeTicketAberto") {
            gerenciarTicketDentro(client, interaction)
        }

        if (interaction.isStringSelectMenu() && interaction.customId === "selectTicketDentro") {
            const option = interaction.values[0]

            if (option === "gerenciarTituloDentro") {

                const modal = new ModalBuilder()
                    .setCustomId(`modalTitleDentro`)
                    .setTitle(`Título Dentro`)

                const option1 = new TextInputBuilder()
                    .setCustomId(`titleDentro`)
                    .setLabel(`Título do ticket dentro`)
                    .setPlaceholder(`Coloque seu título aqui`)
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(100)
                    .setRequired(true)

                const optionx1 = new ActionRowBuilder().addComponents(option1)

                modal.addComponents(optionx1)
                await interaction.showModal(modal)
            }

            if (option === "gerenciarDescriptionDentro") {
                const user = interaction.user;

                if (interaction.user.id !== user.id) {
                    return;
                }

                interaction.update({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
                            .setDescription(`- **Envie abaixo qual será a nova descrição para o ticket dentro:**\n\n> Para parar, digite **parar**`)
                            .addFields(
                                {
                                    name: `Descrição`, value: `${General.get("ticketDentro.description") === "" ? "\`Não definido.\`" : `${General.get("ticketDentro.description")}`}`
                                }
                            )
                            .setColor(General.get("colorOfice"))
                            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                            .setTimestamp()
                    ],
                    components: []
                });
                const filter = (m) => m.author.id === interaction.user.id;
                const collector = interaction.channel.createMessageCollector({ filter: filter, max: 1 });

                collector.on("collect", (message) => {

                    if (message.content === "parar") {
                        message.delete();
                        gerenciarTicketDentro2(client, interaction);
                        interaction.followUp({ embeds: [new EmbedBuilder().setAuthor({ name: `Você parou a mudança de descrição com êxito.`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true });
                        collector.stop();
                        return;
                    }

                    message.delete();
                    General.set("ticketDentro.description", `${message.content}`);
                    gerenciarTicketDentro2(client, interaction)
                });
            }

            if (option === "gerenciarMiniaturaDentro") {

                const modal = new ModalBuilder()
                    .setCustomId(`modalMiniDentro`)
                    .setTitle(`Miniatura Dentro`)

                const option1 = new TextInputBuilder()
                    .setCustomId(`miniDentro`)
                    .setLabel(`Miniatura do ticket dentro`)
                    .setPlaceholder(`https://`)
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(300)
                    .setRequired(true)

                const optionx1 = new ActionRowBuilder().addComponents(option1)

                modal.addComponents(optionx1)
                await interaction.showModal(modal)
            }

            if (option === "gerenciarBannerDentro") {

                const modal = new ModalBuilder()
                    .setCustomId(`modalBannerDentro`)
                    .setTitle(`Banner Dentro`)

                const option1 = new TextInputBuilder()
                    .setCustomId(`bannerDentro`)
                    .setLabel(`Banner do ticket dentro`)
                    .setPlaceholder(`https://`)
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(300)
                    .setRequired(true)

                const optionx1 = new ActionRowBuilder().addComponents(option1)

                modal.addComponents(optionx1)
                await interaction.showModal(modal)
            }
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalTitleDentro") {
            const titleDentro = interaction.fields.getTextInputValue("titleDentro")

            General.set("ticketDentro.title", titleDentro);
            gerenciarTicketDentro(client, interaction);
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalMiniDentro") {
            const miniDentro = interaction.fields.getTextInputValue("miniDentro")

            if (!link(miniDentro)) return interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `A URL da miniatura está inválida, tente novamente usando uma URL válida.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true });

            General.set("ticketDentro.miniatura", miniDentro);
            gerenciarTicketDentro(client, interaction);
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalBannerDentro") {
            const bannerDentro = interaction.fields.getTextInputValue("bannerDentro")

            if (!link(bannerDentro)) return interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `A URL do banner está inválida, tente novamente usando uma URL válida.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true });

            General.set("ticketDentro.banner", bannerDentro);
            gerenciarTicketDentro(client, interaction);
        }

        // --------------------------- BUTTONS COLOR --------------------------- //

        if (interaction.isButton() && interaction.customId === "changeButtonsColor") {
            interaction.update({ components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId(`Azul`).setLabel(`Azul`).setStyle(1),
                    new ButtonBuilder().setCustomId(`Cinza`).setLabel(`Cinza`).setStyle(2),
                    new ButtonBuilder().setCustomId(`Verde`).setLabel(`Verde`).setStyle(3),
                    new ButtonBuilder().setCustomId(`Vermelho`).setLabel(`Vermelho`).setStyle(4)
                ),
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId(`voltarPersonalizacao`).setLabel(`Cancelar Mudança`).setStyle(4)
                )
            ] })
        }

        if (interaction.isButton() && interaction.customId === "Azul") {
            General.set("buttonsColor", "Primary")
            gerenciarTicket(client, interaction)
        }

        if (interaction.isButton() && interaction.customId === "Cinza") {
            General.set("buttonsColor", "Secondary")
            gerenciarTicket(client, interaction)
        }

        if (interaction.isButton() && interaction.customId === "Verde") {
            General.set("buttonsColor", "Success")
            gerenciarTicket(client, interaction)
        }

        if (interaction.isButton() && interaction.customId === "Vermelho") {
            General.set("buttonsColor", "Danger")
            gerenciarTicket(client, interaction)
        }

        // --------------------------- OUTRAS OPÇÃO ( VOLTAR | CANCELAR ) --------------------------- //

        if (interaction.isButton() && interaction.customId === "voltarPersonalizacao") {
            gerenciarTicket(client, interaction)
        }

        if (interaction.isButton() && interaction.customId === "voltarTicketSet") {
            gerenciarTicketSet(client, interaction)
        }

        function link(n) {
            const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
            return urlRegex.test(n)
        }

    }
}