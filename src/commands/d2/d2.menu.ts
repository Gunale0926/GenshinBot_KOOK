import { Card, MenuCommand } from 'kbotify';
import { d2Query } from './d2-query.app';

class D2Menu extends MenuCommand {
    code = 'd2';
    trigger = 'd2';
    help = '如需测试请发送".d2 query"';
    intro = '菜单';
    menu = new Card().addText('一些卡片里需要展示的东西').toString();
    useCardMenu = true; // 使用卡片菜单
}

export const d2Menu = new D2Menu(d2Query);
