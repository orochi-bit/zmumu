const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ApplicationCommandType, isStringSelectMenu, StringSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType, RoleSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")
const { General, buttons } = require("../../DataBaseJson/index")
const { owner } = require("../../config.json")
const { panel } = require("../../Functions/panel")
const { gerenciarTicket } = require("../../Functions/gerenciarTicket")
const { gerenciarCanais } = require("../../Functions/gerenciarCanais")
const { gerenciarCargos } = require("../../Functions/gerenciarCargos")
const { gerenciarPayments } = require("../../Functions/gerenciarPayments")
const { gerenciarFuncoes } = require("../../Functions/gerenciarFuncoes")
const { gerenciarBot } = require("../../Functions/gerenciarBot")

module.exports = {
    name: "interactionCreate",
    run: async (interaction, client, message) => {

        if (interaction.isStringSelectMenu() && interaction.customId === "panelSelectMenu") {
            const option = interaction.values[0];
            if (option === "sistemaOnOff") {
                if (General.get("sistema") == true) {
                    General.set("sistema", false)
                    panel(client, interaction)
                } else if (General.get("sistema") == false) {
                    General.set("sistema", true)
                    panel(client, interaction)
                }
            }

            if (option === "gerenciarTicket") {
                gerenciarTicket(client, interaction)
            }

            if (option === "gerenciarCanais") {
                gerenciarCanais(client, interaction)
            }

            if (option === "gerenciarCargos") {
                gerenciarCargos(client, interaction)
            }

            if (option === "gerenciarPayments") {
                gerenciarPayments(client, interaction)
            }

            if (option === "gerenciarFunções") {
                gerenciarFuncoes(client, interaction)
            }

            if (option === "gerenciarBot") {
                gerenciarBot(client, interaction)
            }
        }

        if (interaction.isChannelSelectMenu() && interaction.customId === "channelLogsSelect") {
            const option = interaction.values[0]

            General.set("channelLogs", option);
            gerenciarCanais(client, interaction);
        }

        if (interaction.isChannelSelectMenu() && interaction.customId === "channelFeedbacksSelect") {
            const option = interaction.values[0]

            General.set("channelFeedbacks", option);
            gerenciarCanais(client, interaction);
        }

        if (interaction.isButton() && interaction.customId === "changeChannelLogs") {
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
                            new ChannelSelectMenuBuilder()
                                .setCustomId(`channelLogsSelect`)
                                .setPlaceholder(`Clique aqui para selecionar uma opção`)
                                .setMaxValues(1)
                                .setChannelTypes(ChannelType.GuildText)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder().setCustomId(`voltarCanais`).setLabel(`Voltar`).setEmoji(`1242108570472812625`).setStyle(2)
                        )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "changeChannelFeedbacks") {
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
                            new ChannelSelectMenuBuilder()
                                .setCustomId(`channelFeedbacksSelect`)
                                .setPlaceholder(`Clique aqui para selecionar uma opção`)
                                .setMaxValues(1)
                                .setChannelTypes(ChannelType.GuildText)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder().setCustomId(`voltarCanais`).setLabel(`Voltar`).setEmoji(`1242108570472812625`).setStyle(2)
                        )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "changeCargoStaff") {
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
                            new RoleSelectMenuBuilder()
                                .setCustomId(`changeCargoStaffSelect`)
                                .setPlaceholder(`Clique aqui para selecionar uma opção`)
                                .setMaxValues(1)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder().setCustomId(`voltarCargos`).setLabel(`Voltar`).setEmoji(`1242108570472812625`).setStyle(2)
                        )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "changeCargoMember") {
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
                            new RoleSelectMenuBuilder()
                                .setCustomId(`changeCargoMemberSelect`)
                                .setPlaceholder(`Clique aqui para selecionar uma opção`)
                                .setMaxValues(1)
                        ),
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder().setCustomId(`removeCargoMember`).setLabel(`Remover Cargo`).setEmoji(`1242108658469568553`).setStyle(4).setDisabled(General.get("cargoMember") === null ? true : false),
                            new ButtonBuilder().setCustomId(`voltarCargos`).setLabel(`Voltar`).setEmoji(`1242108570472812625`).setStyle(2)
                        )
                ]
            })
        }

        if (interaction.isButton() && interaction.customId === "changePaymentsOnOff") {
            if (General.get("payments.sistema") === true) {
                General.set("payments.sistema", false)
                gerenciarPayments(client, interaction)
            } else if (General.get("payments.sistema") === false) {
                General.set("payments.sistema", true)
                gerenciarPayments(client, interaction)
            }
        }

        if (interaction.isButton() && interaction.customId === "changePix") {

            const modal = new ModalBuilder()
                .setCustomId(`modalChavePix`)
                .setTitle(`Alterar Chave Pix`)

            const option1 = new TextInputBuilder()
                .setCustomId(`chavePix`)
                .setLabel(`Sua Chave Pix:`)
                .setPlaceholder(`Coloque sua chave pix aqui`)
                .setStyle(TextInputStyle.Short)
                .setMaxLength(350)
                .setRequired(true)

            const optionx1 = new ActionRowBuilder().addComponents(option1)

            modal.addComponents(optionx1)
            await interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalChavePix") {
            const optionx1 = interaction.fields.getTextInputValue("chavePix")

            General.set("payments.pix", optionx1);
            gerenciarPayments(client, interaction);
        }

        if (interaction.isButton() && interaction.customId === "changeQrCode") {

            const modal = new ModalBuilder()
                .setCustomId(`modalQrCode`)
                .setTitle(`Alterar Qr Code`)

            const option1 = new TextInputBuilder()
                .setCustomId(`qrCode`)
                .setLabel(`Seu URL Qr Code:`)
                .setPlaceholder(`https://`)
                .setStyle(TextInputStyle.Short)
                .setMaxLength(500)
                .setRequired(true)

            const optionx1 = new ActionRowBuilder().addComponents(option1)

            modal.addComponents(optionx1)
            await interaction.showModal(modal)
        }

        if (interaction.isModalSubmit() && interaction.customId === "modalQrCode") {
            const optionx1 = interaction.fields.getTextInputValue("qrCode")

            function link(n) {
                const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                return urlRegex.test(n)
            }

            if (!link(optionx1)) return interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `A URL do banner está inválida, tente novamente usando uma URL válida.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true })

            General.set("payments.qrcode");
            gerenciarPayments(client, interaction);
        }

        if (interaction.isRoleSelectMenu() && interaction.customId === "changeCargoStaffSelect") {
            const option = interaction.values[0]

            General.set("cargoSuportt", option);
            gerenciarCargos(client, interaction);
        }

        if (interaction.isRoleSelectMenu() && interaction.customId === "changeCargoMemberSelect") {
            const option = interaction.values[0]

            General.set("cargoMember", option);
            gerenciarCargos(client, interaction);
        }

        if (interaction.isButton() && interaction.customId === "removeCargoMember") {

            General.delete("cargoMember")
            gerenciarCargos(client, interaction)
        }

        if (interaction.isStringSelectMenu() && interaction.customId === "selectOptionsView") {
            const option = interaction.values[0]
            const buttonClickOption = buttons.get("ticket").find((button) => `${button.customId}_2` === option)

            if (buttonClickOption) {

                const buttonView = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder().setCustomId(`buttonViewSla`).setLabel(buttonClickOption.label).setStyle(buttonClickOption.style.replace("Azul", 1).replace("Cinza", 2).replace("Verde", 3).replace("Vermelho", 4)).setDisabled(true)
                    )

                if (buttonClickOption.emoji) {
                    buttonView.components[0].setEmoji(buttonClickOption.emoji)
                }

                interaction.reply({ content: `Você está vendo a opção **${buttonClickOption.label}**`, components: [buttonView], ephemeral: true })
            }
        }

        if (interaction.isButton() && interaction.customId === "adicionarFunção") {

            const modal = new ModalBuilder()
                .setCustomId(`modalAddFuncao`)
                .setTitle(`Adicionar uma função`)

            const option1 = new TextInputBuilder()
                .setCustomId(`nomeButtonAdd`)
                .setLabel(`Qual será o nome para o botão?`)
                .setPlaceholder(`Coloque o novo nome aqui`)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(75)


            const option2 = new TextInputBuilder()
                .setCustomId(`colorButtonAdd`)
                .setLabel(`Qual será a cor para o botão?`)
                .setPlaceholder(`Azul/Cinza/Verde/Vermelho`)
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(8)

            const option3 = new TextInputBuilder()
                .setCustomId(`emojiButtonAdd`)
                .setLabel(`Qual será o emoji para o botão (OPCIONAL)?`)
                .setPlaceholder(`Coloque o novo emoji aqui`)
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
                .setMaxLength(100)

            const optionx1 = new ActionRowBuilder().addComponents(option1)
            const optionx2 = new ActionRowBuilder().addComponents(option2)
            const optionx3 = new ActionRowBuilder().addComponents(option3)

            modal.addComponents(optionx1, optionx2, optionx3);
            await interaction.showModal(modal)

        }

        if (interaction.isModalSubmit() && interaction.customId === "modalAddFuncao") {
            const nameButton = interaction.fields.getTextInputValue("nomeButtonAdd")
            const emojiButton = interaction.fields.getTextInputValue("emojiButtonAdd")
            const colorButton = interaction.fields.getTextInputValue("colorButtonAdd")

            const nameExists = buttons.get("ticket").find(button => button.customId === nameButton);
            if (nameExists) {
                return interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Já existe uma função com este nome, tente novamente usando outro nome!`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true });
            }

            const emojiRegex = /<a?:[a-zA-Z0-9_]+:\d+>|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/;
            if (emojiButton) {
                if (!emojiRegex.test(emojiButton)) {
                    interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `O emoji está inválido, tente novamente usando um emoji válido`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true })
                    return;
                }
            }

            const validColors = ["Azul", "Cinza", "Verde", "Vermelho"];

            if (!validColors.includes(colorButton)) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                   .setAuthor({
                      name: `A cor está inválida, tente novamente usando apenas ${validColors.join(" / ")}`,
                      iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048"
                    })
                   .setColor(General.get("colorOfice"))
                ],
                ephemeral: true
              });
            }

            if (!emojiButton) {
                buttons.push("ticket", {
                    "customId": nameButton,
                    "label": nameButton,
                    "style": colorButton
                })
            } else if (emojiButton) {
                buttons.push("ticket", {
                    "customId": nameButton,
                    "label": nameButton,
                    "emoji": emojiButton,
                    "style": colorButton
                })
            }
            gerenciarFuncoes(client, interaction)
        }

        if (interaction.isButton() && interaction.customId === "removerFunção") {
            const modal = new ModalBuilder()
                .setCustomId("removecategory_modal")
                .setTitle("Remover Categoria");

            const text = new TextInputBuilder()
                .setCustomId("text")
                .setLabel("Qual é o nome da categoria?")
                .setStyle(1)
                .setPlaceholder("Exemplo: Abrir Ticket")
                .setRequired(true);

                const textx1 = new ActionRowBuilder().addComponents(text)

            modal.addComponents(textx1);
            await interaction.showModal(modal);
        }

        if (interaction.isModalSubmit() && interaction.customId === "removecategory_modal") {
            const text = interaction.fields.getTextInputValue("text");
            const a = buttons.get(`ticket`)
            buttons.set(`ticket`, [])
            a.map((rs) => {
                if (rs.customId !== text) {
                    buttons.push(`ticket`,
                        {
                            "customId": rs.customId,
                            "label": rs.label,
                            "emoji": rs.emoji,
                            "style": rs.style
                        }
                    )
                }
            })
            gerenciarFuncoes(client, interaction)
        }

        if (interaction.isButton() && interaction.customId === "gerenciarBotName") {

            const modal = new ModalBuilder()
            .setCustomId(`modalBotName`)
            .setTitle(`Alterar Nome Bot`)

            const option1 = new TextInputBuilder()
            .setCustomId(`nameBotText`)
            .setLabel(`Qual será o novo nome para o bot?`)
            .setPlaceholder(`Coloque o novo nome do bot aqui`)
            .setRequired(true)
            .setMaxLength(100)
            .setStyle(TextInputStyle.Short)

            const optionx1 = new ActionRowBuilder().addComponents(option1)

            modal.addComponents(optionx1);
            await interaction.showModal(modal);

        }

        if (interaction.isModalSubmit() && interaction.customId === "modalBotName") {
            const nameBot = interaction.fields.getTextInputValue("nameBotText")

            interaction.client.user.setUsername(nameBot).then(() => {
                interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Nome do BOT alterado com êxito.`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true })
            }).catch(() => {
                interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `O nome do BOT não foi alterado, ocorreu um erro, tente novamente mais tarde!`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true })
            })
            
        }

        if (interaction.isButton() && interaction.customId === "gerenciarBotAvatar") {

            const modal = new ModalBuilder()
            .setCustomId(`modalBotAvatar`)
            .setTitle(`Alterar Avatar Bot`)

            const option1 = new TextInputBuilder()
            .setCustomId(`avatarBotURL`)
            .setLabel(`Insira a URL para o avatar do BOT`)
            .setPlaceholder(`https://`)
            .setRequired(true)
            .setMaxLength(250)
            .setStyle(TextInputStyle.Short)

            const optionx1 = new ActionRowBuilder().addComponents(option1)

            modal.addComponents(optionx1);
            await interaction.showModal(modal);

        }

        if (interaction.isModalSubmit() && interaction.customId === "modalBotAvatar") {
            const avatarURL = interaction.fields.getTextInputValue("avatarBotURL")

            function link(n) {
                const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                return urlRegex.test(n)
            }

            if (!link(avatarURL)) return interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `A URL do avatar está inválida, tente novamente usando uma URL válida.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true })

            interaction.client.user.setAvatar(avatarURL).then(() => {
                interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Avatar do BOT alterado com êxito.`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true })
            }).catch(() => {
                interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Erro ao trocar o avatar do BOT, tente novamente mais tarde!`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true })
            })
        }

        if (interaction.isButton() && interaction.customId === "gerenciarBotBanner") {

            const modal = new ModalBuilder()
            .setCustomId(`modalBotBanner`)
            .setTitle(`Alterar Banner Bot`)

            const option1 = new TextInputBuilder()
            .setCustomId(`bannerBotURL`)
            .setLabel(`Insira a URL para o banner do BOT`)
            .setPlaceholder(`https://`)
            .setRequired(true)
            .setMaxLength(250)
            .setStyle(TextInputStyle.Short)

            const optionx1 = new ActionRowBuilder().addComponents(option1)

            modal.addComponents(optionx1);
            await interaction.showModal(modal);

        }

        const cooldowns = new Map();

        if (interaction.isModalSubmit() && interaction.customId === "modalBotBanner") {
            const bannerURL = interaction.fields.getTextInputValue("bannerBotURL");
            const userId = interaction.user.id;
        
            if (cooldowns.has(userId) && cooldowns.get(userId) > Date.now()) {
                const remainingTime = Math.floor((cooldowns.get(userId) - Date.now()) / 60000) + 1;
                return interaction.reply({ embeds: [ new EmbedBuilder().setAuthor({ name: `Você deve esperar ${remainingTime} minutos antes de alterar o banner novamente.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice")) ], ephemeral: true });
            }
        
            function link(n) {
                const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                return urlRegex.test(n);
            }
        
            if (!link(bannerURL)) {
                return interaction.reply({ embeds: [ new EmbedBuilder().setAuthor({ name: `A URL do banner está inválida, tente novamente usando uma URL válida.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }) .setColor(General.get("colorOfice")) ], ephemeral: true });
            }
        
            cooldowns.set(userId, Date.now() + 30000);
        
            interaction.client.user.setBanner(bannerURL).then(() => {
                interaction.reply({ embeds: [ new EmbedBuilder() .setAuthor({ name: `Banner do BOT alterado com êxito.`,iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048"}).setColor(General.get("colorOfice")) ], ephemeral: true });
            }).catch(() => {
                interaction.reply({ embeds: [ new EmbedBuilder().setAuthor({ name: `Erro ao trocar o banner do BOT, tente novamente mais tarde!`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor(General.get("colorOfice")) ], ephemeral: true });
            });
        }

        if (interaction.isButton() && interaction.customId === 'gerenciarBotStatus') {
                
            const modal = new ModalBuilder()
            .setCustomId('modalstatusbot')
            .setTitle('Alterar Status')
            
            const text = new TextInputBuilder()
            .setCustomId('presenca')
            .setLabel('ESCOLHA O TIPO DE PRESENÇA:')
            .setPlaceholder('Online, Ausente, Invisível ou Não Perturbar')
            .setRequired(true)
            .setStyle(1)
            
            const text2 = new TextInputBuilder()
            .setCustomId('texto')
            .setLabel('ESCREVA O TEXTO DA ATIVIDADE:')
            .setPlaceholder('Dando Suporte')
            .setRequired(true)
            .setStyle(1)
            
            modal.addComponents(new ActionRowBuilder().addComponents(text), new ActionRowBuilder().addComponents(text2))
            await interaction.showModal(modal)
         }

         if (interaction.isModalSubmit() && interaction.customId === "modalstatusbot") {
            const presence = interaction.fields.getTextInputValue("presenca")
            const texto = interaction.fields.getTextInputValue("texto")
            
            switch (presence) {
               case 'Online':
                General.set(`status.presence`, 'online');
                 break;
               case 'Ausente':
                General.set(`status.presence`, 'idle');
                 break;
               case 'Invisivel':
                General.set(`status.presence`, 'invisible');
                 break;
               case 'Não Perturbar':
                General.set(`status.presence`, 'dnd');
                 break;
               default: 
                 return interaction.reply({ content: `ERROR: Você inseriu um TIPO incorreto de STATUS`, ephemeral: true })
            }
            
            General.set(`status.texto`, texto);
            interaction.reply({ content: `✅ | Status do bot alterado com sucesso!`, ephemeral: true })

            function link(n) {
                const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                return urlRegex.test(n)
            }
            function corregex(cor) {
                const corRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/
                return corRegex.test(cor)
            }
         }

        if (interaction.isButton() && interaction.customId === "resetarFunções") {
            buttons.set("ticket", []);
            gerenciarFuncoes(client, interaction);
        }

        if (interaction.isButton() && interaction.customId === "voltarPanel") {
            panel(client, interaction);
        }

        if (interaction.isButton() && interaction.customId === "voltarCanais") {
            gerenciarCanais(client, interaction);
        }

        if (interaction.isButton() && interaction.customId === "voltarCargos") {
            gerenciarCargos(client, interaction);
        }

    }
}