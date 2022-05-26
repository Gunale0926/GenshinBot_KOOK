import { entMenu } from 'commands/ent/ent.menu';
import { entRandom } from 'commands/ent/ent.random.app';
import { genshinWiki } from 'commands/genshin/genshin.wiki.app';
import { bot } from 'init/client';
import { d2Menu } from './commands/d2/d2.menu';
import { genshinMenu } from './commands/genshin/genshin.menu'
bot.messageSource.on('message', (e) => {
    bot.logger.debug(`received:`, e);
});

bot.addCommands(d2Menu,genshinMenu,entMenu);
bot.addAlias(genshinWiki,'查询')
bot.addAlias(entRandom,'随机')
bot.connect();
bot.logger.debug('system init success');
