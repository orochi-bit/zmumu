const Discord = require("discord.js")
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ApplicationCommandType, isStringSelectMenu, ChannelType, ModalBuilder, TextInputBuilder, ComponentType } = require("discord.js")
const { General, TicketOpen, buttons, ranking } = require("../../DataBaseJson/index")
const { owner } = require("../../config.json")
const { panel } = require("../../Functions/panel")
const { gerenciarTicket } = require("../../Functions/gerenciarTicket")
const { gerenciarCanais } = require("../../Functions/gerenciarCanais")
const moment = require("moment")

module.exports = {
    name: "interactionCreate",
    run: async (interaction, client, message) => {

        if (interaction.isButton() && interaction.customId === "assumirTicket") {
            if (!interaction.member.roles.cache.has(General.get("cargoSuportt"))) {
                interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Espere! Apenas um staff pode usar isso.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')], ephemeral: true });
                return;
            }
            TicketOpen.set(`${interaction.channel.id}.staff`, interaction.user.id);
            ranking.add(`${interaction.user.id}`, 1)
            const descriptionTicketDentro = General.get("ticketDentro.description") === "" ? "\`\`\`Descrição não definida.\`\`\`" : `${General.get("ticketDentro.description")}`
            const tempTicketOpen = `<t:${Math.floor(moment().toDate().getTime() / 1000)}:R>`;
            const ticketName = TicketOpen.get(`${interaction.channel.id}`).ticketName;

            const ticketAberto = new EmbedBuilder()
                .setAuthor({ name: `${General.get("ticketDentro.title") === "" ? "Ticket" : `${General.get("ticketDentro.title")}`}`, iconURL: client.user.displayAvatarURL() })
                .setDescription(descriptionTicketDentro.replace("#ID", interaction.channel.id).replace("#STAFF", `${TicketOpen.get(`${interaction.channel.id}.staff`) === null ? "\`Nenhum staff assumiu ainda.\`" : `<@${TicketOpen.get(`${interaction.channel.id}.staff`)}>`}`).replace("#USER", `<@${TicketOpen.get(`${interaction.channel.id}.userOpen`)}>`))
                .addFields(
                    {
                        name: `Assumido`, value: `${tempTicketOpen}`, inline: true
                    },
                    {
                        name: `Ticket Name`, value: `\`${ticketName}\``, inline: true
                    }
                )
                .setColor(General.get("colorOfice"))
                .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                .setTimestamp()

            if (General.get("ticketDentro.miniatura")) {
                embedOpen.setThumbnail(`${General.get("ticketDentro.miniatura")}`)
            }

            if (General.get("ticketDentro.banner")) {
                embedOpen.setImage(`${General.get("ticketDentro.banner")}`)
            }

            const rowTicketAberto = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId(`assumirTicket`).setLabel(`Assumir Ticket`).setEmoji(`1297703551598067764`).setStyle(General.get("buttonsColor")).setDisabled(true),
                    new ButtonBuilder().setCustomId(`pokarUser`).setLabel(`Notificar Usuário`).setEmoji(`1297703688336314448`).setStyle(General.get("buttonsColor"))
                )

            if (General.get("payments.sistema") === true) {
                rowTicketAberto.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`paymentTicket`)
                        .setLabel(`Realizar Pix`)
                        .setEmoji(`1297586328417992828`)
                        .setStyle(General.get("buttonsColor"))
                        .setDisabled(General.get("payments.pix") && General.get("payments.qrcode") === "" ? false : true)
                )
            }

            rowTicketAberto.addComponents(
                new ButtonBuilder().setCustomId(`fecharTicket`).setLabel(`Deletar Ticket`).setEmoji(`1297704030923132928`).setStyle(4)
            );

            const cargoPerm = General.get("cargoSuportt");
            const contentTopic = cargoPerm ? `${interaction.user} | <@&${cargoPerm}>` : `${interaction.user}`;
            await interaction.update({
                content: contentTopic,
                embeds: [ticketAberto],
                components: [rowTicketAberto]
            })
            const user = client.users.cache.get(TicketOpen.get(interaction.channel.id).userOpen);
            interaction.followUp({ embeds: [new EmbedBuilder().setAuthor({ name: `Você assumiu este ticket com êxito.`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor('#808080')], ephemeral: true })
            if (user) {
                user.send({
                    embeds: [new EmbedBuilder().setAuthor({ name: `Um staff assumiu o seu ticket em "${interaction.guild.name}"`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setURL(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`)
                                    .setLabel(`・Ir para o Ticket`)
                                    .setStyle(5)
                            )
                    ],
                    ephemeral: true
                });
            }
        }

        if (interaction.isButton() && interaction.customId === "pokarUser") {
            if (!interaction.member.roles.cache.has(General.get("cargoSuportt"))) {
                interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Espere! Apenas um staff pode usar isso.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')], ephemeral: true });
                return;
            }

            const threadId = interaction.channel.id;
            const userId = TicketOpen.get(threadId).userOpen;

            const user = client.users.cache.get(userId);
            interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Usuário notificado com êxito.`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor('#808080')], ephemeral: true })
            if (user) {
                user.send({
                    embeds: [new EmbedBuilder().setAuthor({ name: `Tem um staff te chamando no seu ticket do servidor "${interaction.guild.name}"`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setURL(`https://discord.com/channels/${interaction.guild.id}/${threadId}`)
                                    .setLabel(`・Ir para o Ticket`)
                                    .setStyle(5)
                            )
                    ],
                    ephemeral: true
                });
            }
        }

        if (interaction.isButton() && interaction.customId === "fecharTicket") {
            if (!interaction.member.roles.cache.has(General.get("cargoSuportt"))) {
                interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Espere! Apenas um staff pode usar isso.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')], ephemeral: true });
                return;
            }

            const modal = new ModalBuilder()
                .setCustomId(`modalFecharTicket`)
                .setTitle(`Confirmar Fechar`)

            const option1 = new TextInputBuilder()
                .setCustomId(`confimFecharOption`)
                .setLabel(`Confirme escrevendo (SIM)`)
                .setPlaceholder(`SIM`)
                .setStyle(Discord.TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(3)

            const optionx1 = new ActionRowBuilder().addComponents(option1)

            modal.addComponents(optionx1)
            await interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalFecharTicket") {

            const confirm = interaction.fields.getTextInputValue("confimFecharOption").toLowerCase()

            if (confirm === "sim") {

                interaction.deferReply({ embeds: [new EmbedBuilder().setAuthor({ name: `Deletando ticket...`, iconURL: "https://cdn.discordapp.com/emojis/1242108652069064714.png?size=2048" }).setColor('#808080')], ephemeral: true })

                const tempTicket = `<t:${Math.floor(moment().toDate().getTime() / 1000)}:f> (<t:${Math.floor(moment().toDate().getTime() / 1000)}:R>)`;

                const channelLogsPriv = interaction.guild.channels.cache.get(General.get(`channelLogs`));
                if (channelLogsPriv) {
                    await channelLogsPriv.send({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({ name: `Ticket Finalizado`, iconURL: "https://cdn.discordapp.com/emojis/1242109060518772847.png?size=2048" })
                                .setDescription(`- **Informações:**\n - **ID DO TICKET FECHADO:** \`${interaction.channel.id}\`\n - **QUEM ABRIU O TICKET:** <@${TicketOpen.get(`${interaction.channel.id}.userOpen`)}>\n - **QUEM ASSUMIU O TICKET:** ${TicketOpen.get(`${interaction.channel.id}.staff`) === null ? "\`Nenhum staff assumiu o Ticket.\`" : `<@${TicketOpen.get(`${interaction.channel.id}.staff`)}>`}\n - **DATA E HORÀRIO:** ${tempTicket}`)
                                .setColor(General.get("colorOfice"))
                                .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                                .setTimestamp()
                        ]
                    });
                };

                interaction.channel.delete()

                const threadId = interaction.channel.id;
                const userId = TicketOpen.get(threadId).userOpen;
                const user = client.users.cache.get(userId);
                if (General.get("channelFeedbacks")) {
                    const feedbackmsg = await user.send({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({ name: `Atendimento Finalizado`, iconURL: "https://cdn.discordapp.com/emojis/1242109071306526820.png?size=2048" })
                                .setDescription(`- Olá, nos botões abaixo você pode avaliar como foi seu atendimento com os staffs da ${interaction.guild.name}`)
                                .setColor(General.get("colorOfice"))
                                .setFooter({ text: `Você tem 2 minutos para avaliar o atendimento`, iconURL: interaction.guild.iconURL() })
                                .setTimestamp()
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder().setCustomId(`1de3`).setLabel(`1/3`).setEmoji(`1297701436242661428`).setStyle(General.get("buttonsColor")),
                                    new ButtonBuilder().setCustomId(`2de3`).setLabel(`2/3`).setEmoji(`1297701436242661428`).setStyle(General.get("buttonsColor")),
                                    new ButtonBuilder().setCustomId(`3de3`).setLabel(`3/3`).setEmoji(`1297701436242661428`).setStyle(General.get("buttonsColor"))
                                )
                        ],
                        ephemeral: true
                    }).then(async (msg) => {
                        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 120000 })

                        collector.on("collect", async (interaction) => {

                            const tempTicket = `<t:${Math.floor(moment().toDate().getTime() / 1000)}:f> (<t:${Math.floor(moment().toDate().getTime() / 1000)}:R>)`;

                            if (interaction.isButton() && interaction.customId === "1de3") {
                                interaction.update({ embeds: [new EmbedBuilder().setAuthor({ name: `Avaliação enviada com êxito, obrigado por avaliar!`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor('#808080')], components: [] })
                                const channelFeedbacks = interaction.client.channels.cache.get(General.get(`channelFeedbacks`));
                                if (channelFeedbacks) {
                                    await channelFeedbacks.send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setAuthor({ name: `Ticket Avaliado`, iconURL: "https://cdn.discordapp.com/emojis/1242108633639161987.png?size=2048" })
                                                .setDescription(`O usuário ${interaction.user} deu seu feedback do atendimento do ticket`)
                                                .addFields(
                                                    {
                                                        name: `Avaliação`, value: `\`⭐ 1/3\` | \`O Atendimento foi péssimo.\``
                                                    },
                                                    {
                                                        name: `Data & Horário`, value: `\`⏰\`${tempTicket}`
                                                    }
                                                )
                                                .setColor('#808080')
                                                .setFooter({ text: `${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
                                                .setTimestamp()
                                        ]
                                    });
                                };
                                const channelLogsPriv = interaction.client.channels.cache.get(General.get(`channelLogs`));
                                if (channelLogsPriv) {
                                    await channelLogsPriv.send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setAuthor({ name: `Ticket Avaliado`, iconURL: "https://cdn.discordapp.com/emojis/1242108633639161987.png?size=2048" })
                                                .setDescription(`O usuário ${interaction.user} avaliou o ticket com 1/3 o atendimento foi péssimo.`)
                                                .addFields(
                                                    {
                                                        name: `Precisa melhorar?`, value: `\`🔍 Precisa melhorar bastante...\``
                                                    }
                                                )
                                                .setColor('#808080')
                                                .setFooter({ text: `${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
                                                .setTimestamp()
                                        ]
                                    });
                                };
                            }

                            if (interaction.isButton() && interaction.customId === "2de3") {
                                interaction.update({ embeds: [new EmbedBuilder().setAuthor({ name: `Avaliação enviada com êxito, obrigado por avaliar!`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor('#808080')], components: [] })
                                const channelFeedbacks = interaction.client.channels.cache.get(General.get(`channelFeedbacks`));
                                if (channelFeedbacks) {
                                    await channelFeedbacks.send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setAuthor({ name: `Ticket Avaliado`, iconURL: "https://cdn.discordapp.com/emojis/1242108633639161987.png?size=2048" })
                                                .setDescription(`O usuário ${interaction.user} deu seu feedback do atendimento do ticket`)
                                                .addFields(
                                                    {
                                                        name: `Avaliação`, value: `\`⭐ 2/3\` | \`O atendimento não foi muito bom, mas também não foi muito ruim.\``
                                                    },
                                                    {
                                                        name: `Data & Horário`, value: `\`⏰\`${tempTicket}`
                                                    }
                                                )
                                                .setColor('#808080')
                                                .setFooter({ text: `${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
                                                .setTimestamp()
                                        ]
                                    });
                                };
                                const channelLogsPriv = interaction.client.channels.cache.get(General.get(`channelLogs`));
                                if (channelLogsPriv) {
                                    await channelLogsPriv.send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setAuthor({ name: `Ticket Avaliado`, iconURL: "https://cdn.discordapp.com/emojis/1242108633639161987.png?size=2048" })
                                                .setDescription(`O usuário ${interaction.user} avaliou o ticket com 2/3 o atendimento não foi muito bom, mas também não foi muito ruim.`)
                                                .addFields(
                                                    {
                                                        name: `Precisa melhorar?`, value: `\`🔍 Precisa melhorar um pouco.\``
                                                    }
                                                )
                                                .setColor('#808080')
                                                .setFooter({ text: `${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
                                                .setTimestamp()
                                        ]
                                    });
                                };
                            }

                            if (interaction.isButton() && interaction.customId === "3de3") {
                                interaction.update({ embeds: [new EmbedBuilder().setAuthor({ name: `Avaliação enviada com êxito, obrigado por avaliar!`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor('#808080')], components: [] })
                                const channelFeedbacks = interaction.client.channels.cache.get(General.get(`channelFeedbacks`));
                                if (channelFeedbacks) {
                                    await channelFeedbacks.send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setAuthor({ name: `Ticket Avaliado`, iconURL: "https://cdn.discordapp.com/emojis/1242108633639161987.png?size=2048" })
                                                .setDescription(`O usuário ${interaction.user} deu seu feedback do atendimento do ticket`)
                                                .addFields(
                                                    {
                                                        name: `Avaliação`, value: `\`⭐ 3/3\` | \`O atendimento foi excelente.\``
                                                    },
                                                    {
                                                        name: `Data & Horário`, value: `\`⏰\`${tempTicket}`
                                                    }
                                                )
                                                .setColor('#808080')
                                                .setFooter({ text: `${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
                                                .setTimestamp()
                                        ]
                                    });
                                };
                                const channelLogsPriv = interaction.client.channels.cache.get(General.get(`channelLogs`));
                                if (channelLogsPriv) {
                                    await channelLogsPriv.send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setAuthor({ name: `Ticket Avaliado`, iconURL: "https://cdn.discordapp.com/emojis/1242108633639161987.png?size=2048" })
                                                .setDescription(`O usuário ${interaction.user} avaliou o ticket com 3/3 o atendimento foi excelente.`)
                                                .addFields(
                                                    {
                                                        name: `Precisa melhorar?`, value: `\`🔍 Não necessita melhorar.\``
                                                    }
                                                )
                                                .setColor('#808080')
                                                .setFooter({ text: `${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
                                                .setTimestamp()
                                        ]
                                    });
                                };
                            }

                        })

                        collector.on("end", async (collected, reason) => {
                            if (reason === "time" && collected.size === 0) {
                                const channelFeedbacks = interaction.client.channels.cache.get(General.get(`channelFeedbacks`));
                                if (channelFeedbacks) {
                                    channelFeedbacks.send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setAuthor({ name: `Ticket Não Avaliado`, iconURL: "https://cdn.discordapp.com/emojis/1242108600655282226.png?size=2048" })
                                                .setDescription(`O usuário ${interaction.user} **NÃO** deu seu feedback do atendimento do ticket`)
                                                .addFields(
                                                    {
                                                        name: `Avaliação`, value: `\`Nenhuma avaliação.\``
                                                    },
                                                    {
                                                        name: `Data & Horário`, value: `\`⏰\` ${tempTicket}`
                                                    }
                                                )
                                                .setColor('#808080')
                                                .setFooter({ text: `${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
                                                .setTimestamp()
                                        ]
                                    });
                                }
                                const channelLogsPriv = interaction.client.channels.cache.get(General.get(`channelLogs`));
                                if (channelLogsPriv) {
                                    channelLogsPriv.send({
                                        embeds: [
                                            new EmbedBuilder()
                                                .setAuthor({ name: `Ticket Não Avaliado`, iconURL: "https://cdn.discordapp.com/emojis/1242108600655282226.png?size=2048" })
                                                .setDescription(`O usuário ${interaction.user} não avaliou o ticket.`)
                                                .setColor('#808080')
                                                .setFooter({ text: `${interaction.user.username} | ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL() })
                                                .setTimestamp()
                                        ]
                                    });
                                }

                                msg.edit({
                                    embeds: [new EmbedBuilder().setAuthor({ name: `Você demorou demais para avaliar.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')],
                                    components: []
                                });
                            }
                        });
                    });
                }
            } else {
                interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Você não escreveu "SIM" corretamente, tente novamente.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')], ephemeral: true })
            }
        }

        if (interaction.isButton() && interaction.customId === "paymentTicket") {
            if (General.get("payments.qrcode") === "") {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `Realizar Pix`, iconURL: "https://cdn.discordapp.com/emojis/1242109069100318783.png?size=2048" })
                            .setFields(
                                {
                                    name: `Chave Pix`, value: `${General.get("payments.pix") === "" ? "\`Não definido.\`" : `\`${General.get("payments.pix")}\``}`
                                },
                                {
                                    name: `Qr Code`, value: `\`Não definido.\``
                                }
                            )
                            .setColor(General.get("colorOfice"))
                            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                            .setTimestamp()
                    ],
                    ephemeral: true
                })
            } else {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({ name: `Realizar Pix`, iconURL: "https://cdn.discordapp.com/emojis/1242109069100318783.png?size=2048" })
                            .setFields(
                                {
                                    name: `Chave Pix`, value: `${General.get("payments.pix") === "" ? "\`Não definido.\`" : `\`${General.get("payments.pix")}\``}`
                                },
                                {
                                    name: `Qr Code`, value: ` `
                                }
                            )
                            .setImage(General.get("payments.qrcode"))
                            .setColor(General.get("colorOfice"))
                            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                            .setTimestamp()
                    ],
                    ephemeral: true
                })
            }
        }

    }
}