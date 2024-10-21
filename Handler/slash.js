const fs = require("fs")

module.exports = {

  run: (client) => {
    
    const SlashsArray = []

    fs.readdir(`././ComandosSlash/`, (erro, pasta) => {
      if (erro) {
        console.error('Falha ao ler o diretório:', erro);
        return;
      }
      pasta.forEach(subpasta => {
        fs.readdir(`././ComandosSlash/${subpasta}/`, (erro, arquivos) => {
          if (erro) {
            console.error(`Falha ao ler subpasta ${subpasta}:`, erro);
            return;
          }
          arquivos.forEach(arquivo => {
            if (!arquivo.endsWith('.js')) return;
            let cmd = require(`../ComandosSlash/${subpasta}/${arquivo}`);
            if (!cmd.name) return;
            client.slashCommands.set(cmd.name, cmd);
            SlashsArray.push(cmd);
          });
        });
      });
    });

    client.on("ready", async () => {
      await client.application.commands.set(SlashsArray);
    });
  }
}