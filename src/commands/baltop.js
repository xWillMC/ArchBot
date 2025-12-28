import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { CURRENCIES } from "../constants/currencies.js";
import {
  getBaltopAll,
  getBaltopCurrency
} from "../services/archmc/economyService.js";
import { getCache, setCache } from "../services/cacheService.js";

export const data = new SlashCommandBuilder()
  .setName("baltop")
  .setDescription("View ArchMC balance leaderboards")
  .addStringOption(opt =>
    opt
      .setName("currency")
      .setDescription("Specific currency")
      .setAutocomplete(true)
  );

export async function autocomplete(interaction) {
  const focused = interaction.options.getFocused().toLowerCase();

  const filtered = CURRENCIES.filter(c =>
    c.toLowerCase().includes(focused)
  ).slice(0, 25);

  await interaction.respond(
    filtered.map(c => ({ name: c, value: c }))
  );
}

export async function execute(interaction) {
  await interaction.deferReply();

  const currency = interaction.options.getString("currency");
  const cacheKey = `baltop:${currency ?? "all"}`;

  let data = getCache(cacheKey, 90_000);

  if (!data) {
    data = currency
      ? await getBaltopCurrency(currency)
      : await getBaltopAll();

    setCache(cacheKey, data);
  }

  const embed = new EmbedBuilder()
    .setTitle(
      currency
        ? `🏆 ${currency} Baltop`
        : "🏆 Global Baltop"
    )
    .setColor(0xf1c40f);

  data.slice(0, 10).forEach((entry, i) => {
    embed.addFields({
      name: `#${i + 1} ${entry.username}`,
      value: entry.amount.toString()
    });
  });

  await interaction.editReply({ embeds: [embed] });
}
