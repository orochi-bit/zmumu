const Discord = require("discord.js")
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ApplicationCommandType, isStringSelectMenu, ChannelType } = require("discord.js")
const { General, TicketOpen, buttons } = require("../../DataBaseJson/index")
const { owner } = require("../../config.json")
const { panel } = require("../../Functions/panel")
const { gerenciarTicket } = require("../../Functions/gerenciarTicket")
const { gerenciarCanais } = require("../../Functions/gerenciarCanais")
const moment = require("moment")

module.exports = {
    name: "interactionCreate",
    run: async (interaction, client, message) => {

        if (interaction.isButton()) {
            const buttonClick = buttons.get("ticket").find((button) => `${button.customId}_1` === interaction.customId)
            const buttonClickIndefinido = buttons.get("ticket0").find((button) => `${button.customId}_1` === interaction.customId)

            if (buttons.get("ticket").length === 0 ? buttonClickIndefinido : buttonClick) {

            if (General.get("sistema") === false) {
                interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `O Sistema se encontra desativado no momento.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')], ephemeral: true });
                return;
            }

            const threadName1 = `ticket・${interaction.user.username}・${interaction.user.id}`;

            const existingThread = interaction.channel.threads.cache.find(thread => thread.name === threadName1);
            
            if (existingThread) {
              interaction.reply({
                embeds: [new EmbedBuilder().setAuthor({ name: `Você já tem um ticket aberto, finalize ele primeiro antes de criar um novo.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')],
                components: [
                  new ActionRowBuilder()
                    .addComponents(
                      new ButtonBuilder()
                        .setURL(existingThread.url)
                        .setLabel(`・Ir para o Ticket`)
                        .setStyle(5)
                    )
                ], ephemeral: true
              });
              return;
            }

            const message = interaction.message;
            if (!message.channel.permissionsFor(client.user).has("CreatePrivateThreads")) {
                await interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Eu não posso abrir um tópico privado.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')], ephemeral: true });
                return;
            }

            const threadName = `ticket・${interaction.user.username}・${interaction.user.id}`;
            const thread = await interaction.channel.threads.create({
                name: threadName,
                type: Discord.ChannelType.PrivateThread,
                reason: 'Needed a separate thread for moderation',
                autoArchiveDuration: 60,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.cache.find(role => role.id === General.get("cargoSuportt")),
                        allow: ['VIEW_CHANNEL']
                    }
                ]
            })

            TicketOpen.set(`${thread.id}`, {
                userOpen: interaction.user.id,
                threadUrl: thread.url,
                ticketName: buttons.get("ticket").length === 0 ? buttonClickIndefinido.label : buttonClick.label
            });

            interaction.reply({
                embeds: [new EmbedBuilder().setAuthor({ name: `Ticket criado com êxito.`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor('#808080')],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setURL(thread.url)
                                .setLabel(`・Ir para o Ticket`)
                                .setStyle(5)
                        )
                ], ephemeral: true
            })

            const descriptionTicketDentro = General.get("ticketDentro.description") === "" ? "\`\`\`Descrição não definida.\`\`\`" : `${General.get("ticketDentro.description")}`
            const tempTicketOpen = `<t:${Math.floor(moment().toDate().getTime() / 1000)}:R>`;

            const ticketAberto = new EmbedBuilder()
                .setAuthor({ name: `${General.get("ticketDentro.title") === "" ? "Ticket" : `${General.get("ticketDentro.title")}`}`, iconURL: client.user.displayAvatarURL() })
                .setDescription(`${descriptionTicketDentro.replace("#ID", thread.id).replace("#STAFF", `${TicketOpen.get(`${interaction.channel.id}.staff`) === null ? "\`Nenhum staff assumiu ainda.\`" : `<@${TicketOpen.get(`${interaction.channel.id}.staff`)}>`}`).replace("#USER", `<@${TicketOpen.get(`${thread.id}.userOpen`)}>`)}`)
                .addFields(
                    {
                        name: `Ticket Name`, value: `\`${buttons.get("ticket").length === 0 ? buttonClickIndefinido.label : buttonClick.label}\``, inline: true
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
                    new ButtonBuilder().setCustomId(`assumirTicket`).setLabel(`Assumir Ticket`).setEmoji(`1297703551598067764`).setStyle(General.get("buttonsColor")),
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
            await sendMessage(thread, {
                content: contentTopic,
                embeds: [ticketAberto],
                components: [rowTicketAberto]
            });
        }
    }
        async function sendMessage(channel, content) {
            await channel.send(content);
        }
    }
}