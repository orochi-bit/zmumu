const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ChannelType } = require("discord.js")
const { buttons, TicketOpen, General } = require("../../DataBaseJson")
const { owner } = require("../../config.json")

module.exports = {
    name: `ticket`,
    description: `[🚧] Envie o painel de ticket`,
    type: ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {
        if (interaction.user.id !== owner) { interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Você não tem permissão para fazer isso.`, iconURL: "https://cdn.discordapp.com/emojis/1242108596662177872.png?size=2048" }).setColor('#808080')], ephemeral: true }); return; }

        await interaction.reply({ embeds: [new EmbedBuilder().setAuthor({ name: `Ticket enviado com êxito.`, iconURL: "https://cdn.discordapp.com/emojis/1242109065639759892.png?size=2048" }).setColor(General.get("colorOfice"))], ephemeral: true })

        const embedOpen = new EmbedBuilder()
        .setAuthor({ name: `${General.get("ticket.title") === "" ? "Ticket" : `${General.get("ticket.title")}`}`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`${General.get("ticket.description") === "" ? "Descrição não definida." : `${General.get("ticket.description")}`}`)
        .setColor(General.get("colorOfice"))
        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
        .setTimestamp()

        if (General.get("ticket.miniatura")) {
            embedOpen.setThumbnail(`${General.get("ticket.miniatura")}`)
        }

        if (General.get("ticket.banner")) {
            embedOpen.setImage(`${General.get("ticket.banner")}`)
        }

        let componentsArray = [];
        let row = new ActionRowBuilder();
        let buttonsToSend = buttons.get("ticket").length === 0 ? buttons.get("ticket0") : buttons.get("ticket")
        
        buttonsToSend.forEach((button, index) => {
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId(`${button.customId}_1`)
                    .setLabel(button.label)
                    .setStyle(button.style.replace("Azul", 1).replace("Cinza", 2).replace("Verde", 3).replace("Vermelho", 4))
            );

            if (button.emoji) {
                row.components[0].setEmoji(button.emoji)
            }

      
            if ((index + 1) % 5 === 0 || index === buttonsToSend.length - 1) {
                componentsArray.push(row);
                row = new ActionRowBuilder();
            }
        });

        interaction.channel.send({
            embeds: [embedOpen],
            components: componentsArray
        });
    }
}