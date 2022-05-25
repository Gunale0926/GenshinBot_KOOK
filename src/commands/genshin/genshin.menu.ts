import { Card, MenuCommand } from 'kbotify';
import {genshinPlayer} from './genshin.player.app'
import {genshinWiki} from './genshin.wiki.app'
class GenshinMenu extends MenuCommand {
    code = 'genshin';
    trigger = 'genshin';
    help = '如需测试请发送".genshin"';
    intro = '菜单';
    menu = new Card().addText('一些卡片里需要展示的东西').toString();
    useCardMenu = true; // 使用卡片菜单
}

export const genshinMenu = new GenshinMenu(genshinPlayer,genshinWiki);
