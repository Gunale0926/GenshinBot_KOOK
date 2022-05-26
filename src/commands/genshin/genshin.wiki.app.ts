import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
import genshindb, { QueryOptions,Languages} from 'genshin-db';
const language:QueryOptions = { queryLanguages: [Languages.ChineseSimplified], resultLanguage: Languages.ChineseSimplified };
const all:QueryOptions = { matchCategories: true,queryLanguages: [Languages.ChineseSimplified], resultLanguage: Languages.ChineseSimplified };
class GenshinWiki extends AppCommand {
    code = 'wiki'; // 只是用作标记
    trigger = 'wiki'; // 用于触发的文字
    help = '`.查询 类别（角色、天赋、命之座、材料、圣遗物、料理、怪物、武器） 名称`'; // 帮助文字
    intro = 'Genshin Items Query';
    func: AppFunc<BaseSession> = async (session) => {
        if (!session.args.length) {
            return session.reply(this.help);
        }
        var card = new Card()
        var res = null;
        try{
        switch (session.args[0]){
            case '角色':
                if(!session.args[1]){
                    res = genshindb.characters('names', all)
                    var item:any,itemtext:string='';
                    for (item of res)
                        itemtext+=`${item}\n`;
                    card
                        .addTitle('角色列表')
                        .addText(itemtext);
                }else{
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
                }
                break;
            case '天赋':
                if(!session.args[1]){
                    res = genshindb.talents('names', all)
                    var item:any,itemtext:string='';
                    for (item of res)
                        itemtext+=`${item}\n`;
                    card
                        .addTitle('天赋列表')
                        .addText(itemtext);
                }else{
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
                }
                break;
            case '命之座':
                if(!session.args[1]){
                    res = genshindb.constellations('names', all)
                    var item:any,itemtext:string='';
                    for (item of res)
                        itemtext+=`${item}\n`;
                    card
                        .addTitle('命之座列表')
                        .addText(itemtext);
                }else{
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
                }
                break;
            case '材料':
                 if(!session.args[1]){
                    res = genshindb.materials('names', all)
                    var item:any,itemtext:string='';
                    for (item of res)
                        itemtext+=`${item}\n`;
                    card
                        .addTitle('材料列表')
                        .addText(itemtext);
                }else{
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
                }
                break;
            case '圣遗物':
                if(!session.args[1]){
                    res = genshindb.artifacts('names', all)
                    var item:any,itemtext:string='';
                    for (item of res)
                        itemtext+=`${item}\n`;
                    card
                        .addTitle('圣遗物列表')
                        .addText(itemtext);
                }else{
                res = genshindb.artifacts(session.args[1],language);
                card
                        .addTitle(`${res.name}`)
                        .addText('`2装备:`')
                        .addText(`> ${res['2pc']}`)
                        .addText('`4装备:`')
                        .addText(`> ${res['4pc']}`);
                }
                break;
            case '料理':
                if(!session.args[1]){
                    res = genshindb.foods('names', all)
                    var item:any,itemtext:string='';
                    for (item of res)
                        itemtext+=`${item}\n`;
                    card
                        .addTitle('料理列表')
                        .addText(itemtext);
                }else{
                res = genshindb.foods(session.args[1],language);
                var rare : string = '';
                var rarity = Number(res.rarity);
                while (rarity > 0){
                    rare += ":star:"
                    rarity--
                }
                card
                        .addTitle(`**${res.name}**\n${rare}`)
                        .addText(`\`${res.foodfilter}\``)
                        .addText(`> ${res.effect}`);
                var ing:any;
                for (ing of res.ingredients)
                    card.addText(`\`${ing.name}\` x ${ing.count}`)
                card.addText(`[Fandom](${res.url.fandom})`);
                }
                break;
            case '怪物':
                if(!session.args[1]){
                    res = genshindb.enemies('names', all)
                    var item:any,itemtext:string='';
                    for (item of res)
                        itemtext+=`${item}\n`;
                    card
                        .addTitle('怪物列表')
                        .addText(itemtext);
                }else{
                res = genshindb.enemies(session.args[1],language);
                card
                        .addTitle(`${res.name}`)
                        .addText(`~~${res.specialname}~~`)
                        .addText(`\`${res.category}\``)
                        .addText(`> ${res.description}`);
                var rew:any,rewtext:string='掉落物:\n';
                for (rew of res.rewardpreview)
                    rewtext+=`\`${rew.name}\` `;
                card.addText(rewtext)
                }
                break;
            case '武器':
                if(!session.args[1]){
                    res = genshindb.weapons('names', all)
                    var item:any,itemtext:string='';
                    for (item of res)
                        itemtext+=`${item}\n`;
                    card
                        .addTitle('武器列表')
                        .addText(itemtext);
                }else{
                res = genshindb.weapons(session.args[1],language);
                var rare : string = '';
                var rarity = Number(res.rarity)
                while (rarity > 0){
                    rare += ":star:"
                    rarity--
                }
                var effect = res.effect.replace("{0}",res.r1+'~'+res.r5)
                card
                        .addText(`**${res.name}**\n${rare}`)
                //,true,'left',{type: "image", src: res.images.image ,size: "lg"})
                        .addText(`\`${res.weapontype}\` \`${res.substat} : ${res.subvalue}\``)
                        .addText(effect)
                        .addText(`> ${res.description}`)
                        .addText(`[Fandom](${res.url.fandom})`);
                }
                break;
            default:
                return session.sendCard(new Card().addTitle(`无类别「${session.args[0]}」`).addText('输入`.查询`查看帮助'))
        }}
        catch{
            return session.sendCard(new Card().addTitle(`无条目「${session.args[1]}」`))
        }
        if(res==undefined)
            return session.sendCard(new Card().addTitle(`无条目「${session.args[1]}」`))
        session.sendCard(card)
    };
}

export const genshinWiki = new GenshinWiki();
