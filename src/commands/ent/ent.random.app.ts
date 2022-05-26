import { AppCommand, AppFunc, BaseSession, Card } from 'kbotify';
class EntRandom extends AppCommand {
    code = 'random'; // 只是用作标记
    trigger = 'random'; // 用于触发的文字
    help = '`.ent random`'; // 帮助文字
    intro = '随机数';
    func: AppFunc<BaseSession> = async (session) => {
        return session.reply("随机数："+getRandomInt());
    };
}
function getRandomInt() {
  return Math.floor(Math.random() * 6) + 1;
}
export const entRandom = new EntRandom();
