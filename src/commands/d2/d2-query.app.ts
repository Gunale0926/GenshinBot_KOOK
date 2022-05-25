import { AppCommand, AppFunc, BaseSession } from 'kbotify';
import axios from 'axios';
var header = {'X-API-Key': 'c7255abf509e48b682e3804b7b6bf218'}
class D2Query extends AppCommand {
    code = 'query'; // 只是用作标记
    trigger = 'query'; // 用于触发的文字
    help = '`.d2 query ThisismyName#CODE`'; // 帮助文字
    intro = '查询';
    func: AppFunc<BaseSession> = async (session) => {
        if (!session.args.length) {
            return session.reply(this.help);
        }
        var name = session.args[0].split("#")[0]
        var code = session.args[0].split("#")[1]
        var memberId: any = (await axios.post('https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayerByBungieName/-1/',{displayName : name,displayNameCode : code},{headers: header})).data.Response[0].membershipId
        var stats: any = (await axios.get('https://www.bungie.net/Platform/Destiny2/3/Account/'+memberId+'/Stats',{headers: header}))
        console.log(await axios.get('https://api.genshin.dev'))
    };
}

export const d2Query = new D2Query();
