import { bot } from 'init/client';
import { d2Menu } from './commands/d2/d2.menu';
import {genshinMenu} from './commands/genshin/genshin.menu'
bot.messageSource.on('message', (e) => {
    bot.logger.debug(`received:`, e);
});

bot.addCommands(d2Menu,genshinMenu);

bot.connect();
bot.logger.debug('system init success');
