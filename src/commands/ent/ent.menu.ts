import { Card, MenuCommand } from 'kbotify';
class EntMenu extends MenuCommand {
    code = 'ent';
    trigger = 'ent';
    help = '如需测试请发送".ent"';
    intro = '菜单';
    menu = new Card().addText('娱乐').toString();
    useCardMenu = true; // 使用卡片菜单
}

export const entMenu = new EntMenu();
