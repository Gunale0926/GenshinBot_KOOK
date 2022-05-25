import { GenshinKit } from '@genshin-kit/core'
import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
const genshin = new GenshinKit()
genshin.loginWithCookie("ltoken=iu2KBizZd4MgpYYcZn51IJAsFciQG5lYQtcMAJCG; ltuid=22699283; _MHYUUID=605099cf-5a8d-4e59-88be-691cc19a2aaa; _ga=GA1.2.52442877.1653397058; _gat=1; _gid=GA1.2.734606303.1653397058; CNZZDATA1275023096=1021988705-1653395701-%7C1653453330; account_id=22699283; cookie_token=b8yAQmS7ohuR4UFrkkZHm5yiLjuIOam9lfN4hvhU; UM_distinctid=180f624ef79245-03346d31d82c1d8-3b62684b-1fa400-180f624ef7ab8e")
genshin.setServerLocale("zh-cn")
class GenshinPlayer extends AppCommand {
    code = 'player'; // 只是用作标记
    trigger = 'player'; // 用于触发的文字
    help = '`.genshin player UID`'; // 帮助文字
    intro = 'Genshin Player Query';
    func: AppFunc<BaseSession> = async (session) => {
        if (!session.args.length) {
            return session.reply(this.help);
        }
        var uid = Number(session.args[0])
        genshin.getUserInfo(uid)
            .then(function(res: any){
                var card = new Card().addTitle('(IN DEV) Genshin UID:' + uid)
                var avatar:any
                for (avatar of res.avatars)
                {
                    card.addText(avatar.name + " LV:" +avatar.level,true,'left',{type: "image", src: avatar.image, size: "sm"});

                }
                session.sendCard(card)
        })
    };
}

export const genshinPlayer = new GenshinPlayer();
