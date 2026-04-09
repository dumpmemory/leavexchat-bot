# WallChat

[![Powered by Wechaty](https://img.shields.io/badge/Powered%20By-Wechaty-blue.svg)](https://github.com/Wechaty/wechaty)

使用 Telegram Bot 收发 WeChat 文字、语音、图片、视频、Telegram 静态贴纸等消息

## 安装准备

1. 安装 [Bun](https://bun.sh) 运行时
2. 访问 https://t.me/BotFather, 申请你的 `bot token`
3. 安装 ffmpeg (可选，将 Telegram 语音（oga 文件）转换成 mp3 发送给微信)

## 快速开始

### 1. 克隆并安装依赖

```bash
git clone https://github.com/UnsignedInt8/leavexchat-bot.git
cd leavexchat-bot
bun install
```

### 2. 安装 Puppeteer Chromium 系统依赖（Ubuntu/Debian）

```bash
apt-get install -y \
  libatk1.0-0 libatk-bridge2.0-0 libatspi2.0-0 \
  libcups2 libgbm1 \
  libpango-1.0-0 libcairo2 \
  libxcomposite1 libxdamage1 libxfixes3 libxrandr2 \
  libasound2t64
```

### 3. 配置并启动

复制配置文件模板，填写你的 bot token：

```bash
cp config-example.json config.json
```

`config.json` 字段说明请参照 [config-example.json](./config-example.json)。

```bash
# 使用配置文件启动
bun start -c config.json

# 或不带配置文件（交互式输入 token）
bun start
```

## 进程守护

推荐使用 PM2 保持后台运行，实现会话恢复（大幅降低扫码频次）：

```bash
npm i -g pm2
pm2 start --interpreter=bun src/index.ts -- -c config.json
pm2 save
```

## Bot 命令

| 命令         | 说明                         | 示例                                   |
| ------------ | ---------------------------- | -------------------------------------- |
| /start       | 启动会话                     |                                        |
| /login       | 请求登录                     |                                        |
| /logout      | 登出 WeChat                  |                                        |
| /groupon     | 开启接收群消息               |                                        |
| /groupoff    | 关闭接收群消息               |                                        |
| /officialon  | 开启接收公众号消息           |                                        |
| /officialoff | 关闭接收公众号消息           |                                        |
| /selfon      | 开启接收自己的消息           |                                        |
| /selfoff     | 关闭接收自己的消息           |                                        |
| /find        | 查找联系人并设置为当前联系人 | /find ABC                              |
| /lock        | 锁定当前联系人               |                                        |
| /unlock      | 取消锁定当前联系人           |                                        |
| /findandlock | 查找并锁定为当前联系人       | /findandlock ABC                       |
| /current     | 显示当前联系人               |                                        |
| /agree       | 同意好友请求                 | /agree [reqid]                         |
| /disagree    | 忽略好友请求                 | /disagree [reqid]                      |
| /forwardto   | 转发消息给联系人             | /forwardto [联系人]                    |
| /mute        | 静音指定群                   | 先引用一条群消息, 再 /mute             |
| /unmute      | 启用指定群消息               | /unmute 群名[可不填，则启用全部群消息] |
| /help        | 显示帮助                     |                                        |

除了 `/find` 和 `/findandlock` 必须带有要查找的联系人名字，其它命令均可无参数

## 使用注意

1. ~~根据 Wechaty 说明，2017 年 6 月之后注册的 Wechat 账号无法登陆网页版 Wechat，因此无法使用此 bot 代收消息~~ 已经支持所有wechat账号登陆

2. 为保证安全，bot 只会在自己的聊天记录保留最近 **200** 条消息 (默认 200)

3. 直接在 Telegram 里回复消息的对象**默认**是最近收到消息的发送者（个人或群），如果担心回复错了，请手动指定回复某条消息（最近 200 条以内）。可以手动 /lock /unlock 锁定当前联系人

4. 2.1.0 以上版本已经支持发送图片、视频、文档，但不支持发送可被 Wechat 自动识别为音频的消息

5. 如果使用 VPS，WeChat 会检测到异地登陆，并发出提示。可以在本地运行该 bot，只需在配置文件里填写好 socks5, http 代理信息即可

## Telegram Bot 快捷命令支持

命令说明在[此处](./src/strings/BotFather.txt)，粘贴到 BotFather 中即可启用 Telegram Bot 输入框提示

## License

MPL-2.0
