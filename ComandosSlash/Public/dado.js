const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dado')
        .setDescription('Rola um dado de 6 lados'),
    async execute(interaction) {
        // Gera um número aleatório entre 1 e 6
        const resultado = Math.floor(Math.random() * 6) + 1;
        await interaction.reply(`Você rolou um ${resultado}!`);
    },
};
