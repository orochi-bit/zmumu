const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require("discord.js");

module.exports = {
    name: `say`,
    description: `[💭] Enviar uma mensagem`,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "type",
            description: "Qual o tipo?",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: `Content`,
                    value: `content`
                },
                {
                    name: `Embed`,
                    value: `embed`
                }
            ]
        }
    ],

    run: async (client, interaction) => {
        const type = interaction.options.getString("type");

        if (type === 'content') {
            const modalContent = new ModalBuilder()
               .setCustomId(`modalContent`)
               .setTitle(`Enviar Content`);

            const option1 = new TextInputBuilder()
               .setCustomId(`contentText`)
               .setLabel(`Qual será a mensagem?`)
               .setPlaceholder(`Coloque sua mensagem aqui`)
               .setStyle(TextInputStyle.Paragraph)
               .setRequired(true)
               .setMaxLength(1500);

            const optionx1 = new ActionRowBuilder().addComponents(option1);

            modalContent.addComponents(optionx1);
            await interaction.showModal(modalContent);

            const submittedInteraction = await interaction.awaitModalSubmit({
                time: 120000,
            });

            const contentText = submittedInteraction.fields.getTextInputValue("contentText");

            await submittedInteraction.reply({ content: `✅ | Content enviada com êxito.`, ephemeral: true });

            submittedInteraction.channel.send({
                content: contentText, components: [
                    new ActionRowBuilder()
                       .addComponents(
                            new ButtonBuilder().setCustomId(`slaContent`).setLabel(`Mensagem Do Sistema`).setStyle(2).setDisabled(true)
                        )
                ]
            });
        }

        if (type === 'embed') {
            const modalEmbed = new ModalBuilder()
               .setCustomId(`modalEmbed`)
               .setTitle(`Enviar Embed`);

            const option1 = new TextInputBuilder()
               .setCustomId(`EmbedTitle`)
               .setLabel(`Qual será o título?`)
               .setPlaceholder(`Coloque seu título aqui`)
               .setStyle(TextInputStyle.Short)
               .setRequired(true)
               .setMaxLength(100);

            const option2 = new TextInputBuilder()
               .setCustomId(`EmbedDesc`)
               .setLabel(`Qual será a descrição?`)
               .setPlaceholder(`Coloque sua descrição aqui`)
               .setStyle(TextInputStyle.Paragraph)
               .setRequired(false)
               .setMaxLength(1000);

            const option3 = new TextInputBuilder()
               .setCustomId(`EmbedBanner`)
               .setLabel(`Qual será o banner?`)
               .setPlaceholder(`https://`)
               .setStyle(TextInputStyle.Short)
               .setRequired(false)
               .setMaxLength(250);

            const option4 = new TextInputBuilder()
               .setCustomId(`EmbedFooter`)
               .setLabel(`Qual será a footer?`)
               .setPlaceholder(`Coloque uma mensagem para a footer aqui`)
               .setStyle(TextInputStyle.Short)
               .setRequired(false)
               .setMaxLength(150);

            const option5 = new TextInputBuilder()
               .setCustomId(`EmbedColor`)
               .setLabel(`Qual será a cor?`)
               .setPlaceholder(`Coloque uma cor para a embed`)
               .setStyle(TextInputStyle.Short)
               .setRequired(false)
               .setMaxLength(7);

            const optionx1 = new ActionRowBuilder().addComponents(option1);
            const optionx2 = new ActionRowBuilder().addComponents(option2);
            const optionx3 = new ActionRowBuilder().addComponents(option3);
            const optionx4 = new ActionRowBuilder().addComponents(option4);
            const optionx5 = new ActionRowBuilder().addComponents(option5);

            modalEmbed.addComponents(optionx1, optionx2, optionx3, optionx4, optionx5);
            await interaction.showModal(modalEmbed);

            const submittedInteraction = await interaction.awaitModalSubmit({
                time: 120000,
            });

            const EmbedTitle = submittedInteraction.fields.getTextInputValue("EmbedTitle");
            const EmbedDesc = submittedInteraction.fields.getTextInputValue("EmbedDesc");
            const EmbedBanner = submittedInteraction.fields.getTextInputValue("EmbedBanner");
            const EmbedFooter = submittedInteraction.fields.getTextInputValue("EmbedFooter");
            const EmbedColor = submittedInteraction.fields.getTextInputValue("EmbedColor");

            const hexColorRegex = /^#?[0-9A-Fa-f]{6}$/;

            function link(n) {
                const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
                return urlRegex.test(n);
            }

            if (EmbedBanner) {
                if (!link(EmbedBanner)) return submittedInteraction.reply({ content: `⚠️ | Seu banner está com uma URL inválida, tente novamente usando uma URL válida!`, ephemeral: true });
            }

            if (EmbedColor && !EmbedColor.match(hexColorRegex)) {
                return submittedInteraction.reply({ content: `⚠️ | Seu código de cor está inválido. Use um código de cor hexadecimal válido (#00FFFF)!`, ephemeral: true });
            }

            submittedInteraction.reply({ content: `✅ | Embed enviada com êxito.`, ephemeral: true });

            const embed = new EmbedBuilder()
              .setTitle(EmbedTitle);

            if (EmbedDesc) {
                embed.setDescription(EmbedDesc);
            }

            if (EmbedBanner) {
                embed.setImage(EmbedBanner);
            }

            if (EmbedFooter) {
                embed.setFooter({ text: `${EmbedFooter}`, iconURL: client.user.displayAvatarURL() });
            }

            if (EmbedColor) {
                embed.setColor(EmbedColor)
            }

            submittedInteraction.channel.send({
                embeds: [embed], components: [
                    new ActionRowBuilder()
                      .addComponents(
                            new ButtonBuilder().setCustomId(`slaEmbed`).setLabel(`Mensagem Do Sistema`).setStyle(2).setDisabled(true)
                        )
                ]
            });
        }
    }
};