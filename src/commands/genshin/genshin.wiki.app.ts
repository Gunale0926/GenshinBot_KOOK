import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
const genshindb = require('genshin-db');
const language = { queryLanguages: 'ChineseSimplified', resultLanguage: 'ChineseSimplified' }
class GenshinWiki extends AppCommand {
    code = 'wiki'; // 只是用作标记
    trigger = 'wiki'; // 用于触发的文字
    help = '`.genshin wiki Item`'; // 帮助文字
    intro = 'Genshin Items Query';
    func: AppFunc<BaseSession> = async (session) => {
        if (!session.args.length) {
            return session.reply(this.help);
        }
        var card = new Card()
        switch (session.args[0]){
            case "角色":
                var res = await genshindb.characters(session.args[1],language);
                var rare : string = '';
                var rarity = Number(res.rarity)
                while (rarity > 0){
                    rare += ":star:"
                    rarity--
                }
                card.addTitle(res.fullname + "   " + rare).addImage(res.images.icon).addText(`元素：${res.element}`).addText(res.description).addText(`[Fandom](${res.url.fandom})`);
                break;
            case "天赋":
                var res = await genshindb.talents(session.args[1],language)
                console.log(res)
                card.addText(res.combat1.name).addDivider().addTitle
                break;
            case "命之作":
                var res = await genshindb.constellations(session.args[1],language)
                card.addText("**"+res.fullname+"**",true,'left',{type: "image", src: res.images.icon, size: "sm"});
                break;
        }
        if(card)
            session.sendCard(card)
    };
}

export const genshinWiki = new GenshinWiki();
