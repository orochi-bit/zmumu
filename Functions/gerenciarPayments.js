const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ApplicationCommand, ApplicationCommandType, SelectMenuBuilder, StringSelectMenuBuilder } = require("discord.js")
const { owner } = require("../config.json")
const { General } = require("../DataBaseJson/index")

async function gerenciarPayments(client, interaction) {
    interaction.update({
        embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `Ticket Tópico V2`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`- **Selecione abaixo qual opção de pagamento você deseja configurar:**`)
            .addFields(
                {
                    name: `Chave Pix`, value: `${General.get("payments.sistema") === true ? "\`Ligado\`" : `\`Desligado\``}`, inline: true
                },
                {
                    name: `Chave Pix`, value: `${General.get("payments.pix") === "" ? "\`Não definido.\`" : `\`${General.get("payments.pix")}\``}`, inline: true
                },
                {
                    name: `Qr Code`, value: `${General.get("payments.qrcode") === "" ? "\`Não definido.\`" : `**[Clique Aqui](${General.get("payments.qrcode")})**`}`, inline: true
                }
            )
            .setColor('#808080')
            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
            .setTimestamp()
        ],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId(`changePaymentsOnOff`).setLabel(General.get("payments.sistema") === true ? "Sistema Ligado" : "Sistema Desligado").setEmoji(`1297578681887359016`).setStyle(General.get("payments.sistema") === true ? 4 : 2),
                new ButtonBuilder().setCustomId(`changePix`).setLabel(`Chave Pix`).setEmoji(`1297586328417992828`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`changeQrCode`).setLabel(`Qr Code`).setEmoji(`1297608520828719146`).setStyle(General.get("buttonsColor")),
                new ButtonBuilder().setCustomId(`voltarPanel`).setLabel(`Voltar`).setEmoji(`1297592608079745095`).setStyle(2)
            )
        ],
        ephemeral: true
    })
}

module.exports = {
    gerenciarPayments
}