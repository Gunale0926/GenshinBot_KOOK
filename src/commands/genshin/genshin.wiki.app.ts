import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import genshindb, { QueryOptions,Languages } from 'genshin-db';
import { bot } from 'init/client';
const language:QueryOptions = { queryLanguages: [Languages.ChineseSimplified], resultLanguage: Languages.ChineseSimplified };
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
        var res = null;
        switch (session.args[0]){
            case '角色':
                res = genshindb.characters(session.args[1],language);
                var rare : string = '';
                var rarity = Number(res.rarity)
                while (rarity > 0){
                    rare += ":star:"
                    rarity--
                }
                card
                        .addText(`**${res.fullname}**\n${rare}`,true,'left',{type: "image", src: res.images.icon ,size: "lg"})
                        .addText(`\`${res.element}\` \`${res.weapontype}\` \`${res.substat}\``)
                        .addText(`> ${res.description}`)
                        .addText(`*${res.constellation}*\n*${res.birthday}*`)
                        .addText(`[Fandom](${res.url.fandom})`);
                break;
            case '天赋':
                res = genshindb.talents(session.args[1],language);
                card
                        .addTitle('天赋')
                        .addDivider()
                        .addTitle(res.combat1.name)
                        .addText(`${res.combat1.info}`)
                        .addDivider()
                        .addTitle(res.combat2.name)
                        .addText(`${res.combat2.info}`)
                        .addDivider()
                        .addTitle(res.combat3.name)
                        .addText(`${res.combat3.info}`)
                        .addDivider();
                break;
            case '命之座':
                res = genshindb.constellations(session.args[1],language);
                card
                        .addTitle(`命之座: ${res.name}`)
                        .addDivider()
                        .addText(`**${res.c1.name}**\n${res.c1.effect}`,true,'left',{type: "image", src: res.images.c1 ,size: "lg"})
                        .addText(`**${res.c2.name}**\n${res.c2.effect}`,true,'left',{type: "image", src: res.images.c2 ,size: "lg"})
                        .addText(`**${res.c3.name}**\n${res.c3.effect}`,true,'left',{type: "image", src: res.images.c3 ,size: "lg"})
                        .addText(`**${res.c4.name}**\n${res.c4.effect}`,true,'left',{type: "image", src: res.images.c4 ,size: "lg"})
                        .addText(`**${res.c5.name}**\n${res.c5.effect}`,true,'left',{type: "image", src: res.images.c5 ,size: "lg"})
                        .addText(`**${res.c6.name}**\n${res.c6.effect}`,true,'left',{type: "image", src: res.images.c6 ,size: "lg"});
                break;
            case '材料':
                res = genshindb.materials(session.args[1],language)
                card
                    .addTitle(res.name)
                    .addText(`\`${res.materialtype}\``)
                    .addText(`> ${res.description}`)
                //,true,'left',{type: "image", src: res.images.fandom ,size: "lg"}
                var mattext:string='',mat:any;
                for (mat of res.source)
                    mattext+=mat
                card
                    .addText(`**获取方式：**${mattext}`)
                    .addText(`[Fandom](${res.url.fandom})`);
                break;
        }
        if(card)
            session.sendCard(card)
    };
}

export const genshinWiki = new GenshinWiki();
