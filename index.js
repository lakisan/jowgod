weconst {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./comm4nd/help')
const apikeyimgbb = '04b9e9337ecb1ceb0250f81549301785'
const banmsgporn = 'Hmmm, ja sabe né...'
const { cv1} = require('./comm4nd')
const { credits } = require('./src/credits')
const { tipo } = require('./src/tipo')
const { } = require('./src/about')
const { idioma } = require('./src/idioma')
const { music } = require('./src/music')
const { flix } = require('./src/flix')
const { fga } = require('./src/fga')
const { produtos } = require('./src/produtos')
const { entretenimento } = require('./src/entretenimento')
const { maker } = require('./src/maker')
const { adms } = require('./src/adms')
const { novela } = require('./src/novela')
const { suspense } = require('./src/suspense')
const { horror } = require('./src/horror')
const { poesia } = require('./src/poesia')
const { romance } = require('./src/romance')
const { biblioteca } = require('./src/biblioteca')
const { consultas } = require('./src/consultas')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const request = require('request')
const imgbb = require('imgbb-uploader')
const FormData = require('form-data')
const imgbbUploader = require('imgbb-uploader')
const imageToBase64 = require('image-to-base64')
const { removeBackgroundFromImageFile } = require('remove.bg')
const lolis = require('lolis.life')
const loli = new lolis()
const double = Math.floor(Math.random() * 2) + 1
const antifake = JSON.parse(fs.readFileSync('./src/antifake.json'))
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
const key = JSON.parse(fs.readFileSync('./src/key.json'))
const gerador = JSON.parse(fs.readFileSync('./banco/gerador.json'))
const cnh = JSON.parse(fs.readFileSync('./banco/cnh.json'))
const pis = JSON.parse(fs.readFileSync('./banco/pis.json'))
const placa = JSON.parse(fs.readFileSync('./banco/placa.json'))
const cc = JSON.parse(fs.readFileSync('./banco/cc.json'))
const antiporn = JSON.parse(fs.readFileSync('./src/antiporn.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
prefix = setting.prefix
apilol = setting.apilol
apitobz = setting.apitobz
apizeks = setting.apizeks
blocked = []
ban = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const thoth = new WAConnection()
	thoth.logger.level = 'warn'
	console.log(banner.string)
	thoth.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./BarBar.json') && thoth.loadAuthInfo('./BarBar.json')
	thoth.on('connecting', () => {
		start('2', 'Connecting...')
	})
	thoth.on('open', () => {
		success('2', 'Connected')
	})
	await thoth.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./BarBar.json', JSON.stringify(thoth.base64EncodedAuthInfo(), null, '\t'))

	thoth.on('group-participants-update', async (anu) => {
		const mdata = await thoth.groupMetadata(anu.jid)
		if(antifake.includes(anu.jid)) {
			if (anu.action == 'add'){
				num = anu.participants[0]
				if(!num.split('@')[0].startsWith(55)) {
					thoth.sendMessage(mdata.id, 'Corre, o travador chegou', MessageType.text)
					setTimeout(async function () {
						thoth.groupRemove(mdata.id, [num])
					}, 1000)
				}
			}
		}
		
		if (!welkom.includes(anu.jid)) return
		try {
			mem = anu.participants[0]
            try {
                var pp_user = await thoth.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
            } catch (e) {
                var pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add') {
            	num = anu.participants[0]
                anu_img = await getBuffer(`https://api.lolhuman.xyz/api/welcomeimage?apikey=ZidanGanzz&img=${pp_user}&text=MayBot`)
                group_info = await thoth.groupMetadata(anu.jid)
                welkam = `@${num.split('@')[0]} da uma olhadinha nas regras.`
                thoth.sendMessage(anu.jid, anu_img, MessageType.image, { caption: welkam })
            } else if (anu.action == 'remove') {
            	num = anu.participants[0]
                anu_img = await getBuffer(`https://api.lolhuman.xyz/api/welcomeimage?apikey=ZidanGanzz&img=${pp_user}&text=Bye\nMayBot`)
                group_info = await thoth.groupMetadata(anu.jid)
                out = `1 minuto de silêncio`
                thoth.sendMessage(anu.jid, anu_img, MessageType.image, { caption: out })
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	thoth.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	thoth.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = setting.apiKey 
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
			const jam = moment.tz('America/Sao_Paulo').format('HH:mm')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
            var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: 'Irei fazer, mas se você esperar um pouquinho a gente volta a conversar.',
				success: '✔️ Sucesso ✔️',			
				error: {
					stick: 'Vish mana, não consegui fazer.',
					Iv: '❌ Link inválido ❌'
				},
				only: {
					group: '❌ Este comando só pode ser usado em grupos! ❌',
					ownerG: '❌ Este comando só pode ser usado pelo dono do grupo! ❌',
					ownerB: 'Que isso mana ? você não é o Thoth',				
					admin: '❌ Você não é adm! ❌',
					Badmin: '❌ Preciso ser adm!❌'
				}
			}

			const botNumber = thoth.user.jid
			const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`]
			const isGroup = from.endsWith('@g.us')
			const tescuk = ["0@s.whatsapp.net"]
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await thoth.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isKey = isGroup ? key.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isAntiFake = isGroup ? antifake.includes(from) : false
			const isAntiPorn = isGroup ? antiporn.includes(from) : false
			const isBanned = ban.includes(sender)
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			pushname = thoth.contacts[sender] != undefined ? thoth.contacts[sender].vname || thoth.contacts[sender].notify : undefined
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				thoth.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				thoth.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? thoth.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : thoth.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
            const costum = (pesan, tipe, target, target2) => {
		     	thoth.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
			
			if (messagesC.includes("#kick")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/ban.mp3');
               thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}			

			if (messagesC.includes("bodia")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/bd.mp3');
				thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}
		    
			if (messagesC.includes("bonoite")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/bn.mp3');
               thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}			
			
			if (messagesC.includes("on.")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/on.mp3');
               thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}		
			
			if (messagesC.includes("May")){
				thoth.updatePresence(from, Presence.composing)
				reply("Fala, krl.")
		}

			if (messagesC.includes("kiss")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/kiss.mp3');
               thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}
			
			if (messagesC.includes("roleta")){
				thoth.updatePresence(from, Presence.composing)
				tujuh = fs.readFileSync('./assets/roleta.mp4');
               thoth.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
			}
	
			 //function antilink 
				if (messagesC.includes("://chat.whatsapp.com/")){
					if (!isGroup) return
					if (isGroupAdmins) return reply('Sua sorte é que você é adm')
					thoth.updatePresence(from, Presence.composing)
					if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
					var kic = `${sender.split("@")[0]}@s.whatsapp.net`
						reply(`Poxa ${sender.split("@")[0]} não pode link`)
						thoth.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
					}
			
			//função antiporn
			if ((isAntiPorn && isBotGroupAdmins)) {
				if(!mek.message) return
				if (type === MessageType.image) {
					savedFilename = await thoth.downloadAndSaveMediaMessage (mek)
					imgbbUploader(apikeyimgbb, savedFilename).then(async function(response) {
						anu = await fetchJson(`sua api`)

						if(anu[0].className === 'Porn' && isGroupAdmins)  {
							await thoth.sendMessage(from,adminmsgporn, MessageType.text, {quoted: mek})
							return
							
						} else if(anu[0].className === 'Porn' && !isGroupAdmins) {
							await thoth.sendMessage(from,banmsgporn, MessageType.text, {quoted: mek})
							setTimeout(async function () {
								thoth.groupRemove(from, [sender])
							}, 2000)
							return
						}
						
						if(anu[0].className === 'Hentai' && isGroupAdmins) {
							await thoth.sendMessage(from,adminmsgporn, MessageType.text, {quoted: mek})
							return

						}  else if(anu[0].className === 'Hentai' && !isGroupAdmins) {
							await thoth.sendMessage(from,banmsgporn, MessageType.text, {quoted: mek})
							setTimeout(async function () {
								thoth.groupRemove(from, [sender])
							}, 2000)
							return
						}
						
						if(anu[0].className === 'Sexy') return thoth.sendMessage(from,'Cuidado com oq manda em amigo, to com antiporn ativado', MessageType.text, {quoted: mek})
						
						fs.unlinkSync(savedFilename)

					}).catch((error) => console.error(error));
				}
			}
			
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			let authorname = thoth.contacts[from] != undefined ? thoth.contacts[from].vname || thoth.contacts[from].notify : undefined	
			if (authorname != undefined) { } else { authorname = groupName }	
			
			//thoth
			exports.apikeyimgbb = apikeyimgbb
			exports.banmsgporn = banmsgporn
			
			function addMetadata(packname, author) {	
				if (!packname) packname = 'WABot'; if (!author) author = 'MayBot';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	

			}
			switch(command) {
				case 'antifake':
					try {
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isAntiFake) return reply('Ja esta ativo')
						antifake.push(from)
						fs.writeFileSync('./src/antifake.json', JSON.stringify(antifake))
						reply('Ativou com sucesso o recurso de antifake neste grupo✔️')
					} else if (Number(args[0]) === 0) {
						antifake.splice(from, 1)
						fs.writeFileSync('./src/antifake.json', JSON.stringify(antifake))
						reply('Desativou com sucesso o recurso de antifake neste grupo✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					} catch {
						reply('Deu erro, tente novamente :/')
					}
								 break
case 'menu':			 
case 'comandos':
menuimg = fs.readFileSync('./assets/menuimg.jpg')
thoth.sendMessage(from, menuimg, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝐌𝐀𝐘 𝐁𝐎𝐓", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./assets/menuimg.jpg')} } }, caption: cv1.wpp(pushname)})
lima = fs.readFileSync('./assets/menuv.mp3');
thoth.sendMessage(from, lima, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'lista':
case 'help':			 
menuimg = fs.readFileSync('./assets/help.jpg')
thoth.sendMessage(from, menuimg, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝐌𝐀𝐘 𝐁𝐎𝐓", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('./assets/menuimg.jpg')} } }, caption: cv1.wpp(pushname)})
lima = fs.readFileSync('./assets/menuv.mp3');
thoth.sendMessage(from, lima, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'idioma':
if (!isGroup) return reply(mess.only.group)
menuimg = fs.readFileSync('./assets/menuimg.jpg')
thoth.sendMessage(from, menuimg, image, {quoted: mek, caption: idioma(prefix), text})
lima = fs.readFileSync('./assets/id.mp3');
thoth.sendMessage(from, lima, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'music':
if (!isGroup) return reply(mess.only.group)
thoth.sendMessage(from, music(prefix, sender), text, { quoted: mek })
break
case 'biblioteca':
if (!isGroup) return reply(mess.only.group)
thoth.sendMessage(from, biblioteca(prefix, sender), text, { quoted: mek })
break
				case 'produtos':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, produtos(prefix, sender), text, { quoted: mek })
						break
				case 'adms':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, adms(prefix, sender), text, { quoted: mek })
						break
				case 'fga':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, fga(prefix, sender), text, { quoted: mek })
						break
				case 'maker':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, maker(prefix, sender), text, { quoted: mek })
						break
				case 'entretenimento':
				    if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, entretenimento(prefix, sender), text, { quoted: mek })
						break
				case 'about':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, about(prefix, sender), text, { quoted: mek })
						break
				case 'novela':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, novela(prefix, sender), text, { quoted: mek })
						break
				case 'suspense':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, suspense(prefix, sender), text, { quoted: mek })
						break
				case 'romance':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, romance(prefix, sender), text, { quoted: mek })
						break
				case 'horror':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, horror(prefix, sender), text, { quoted: mek })
						break
				case 'poesia':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, poesia(prefix, sender), text, { quoted: mek })
						break
				case 'tipografia':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, tipo(prefix, sender), text, { quoted: mek })
						break
				case 'consultas':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, consultas(prefix, sender), text, { quoted: mek })
						break
				case 'credits':
				    if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, credits(prefix, sender), text, { quoted: mek })
						break
				case 'flix':
					if (!isGroup) return reply(mess.only.group)
						thoth.sendMessage(from, flix(prefix, sender), text, { quoted: mek })
						break
				case 'info':
					me = thoth.user
					uptime = process.uptime()
					teks = `*Nome* : ${me.name}\n*Número* : @${me.jid.split('@')[0]}\n*Prefixo* : ${prefix}\n*Total de block* : ${blocked.length}\n*Tempo on* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					thoth.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'blocklist':
					teks = 'Pessoas com block :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					thoth.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 'igdl':
                    if (args.length == 0) return reply(`Exemplo: ${prefix + command} https://www.instagram.com/reel/COMGkhfgoxL/?igshid=1i4igoefclynv`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`https://api.lolhuman.xyz/api/instagram?apikey=${apilol}&url=${ini_url}`)
                    ini_url = ini_url.result
                    ini_type = image
                    if (ini_url.includes(".mp4")) ini_type = video
                    ini_buffer = await getBuffer(ini_url)
                    await thoth.sendMessage(from, ini_buffer, ini_type, { quoted: mek })
                    break
                case 'twtdl':
                    if (args.length == 0) return reply(`Exemplo: ${prefix + command} https://twitter.com/Moriz_7/status/1384858796921663490?s=19`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`https://api.lolhuman.xyz/api/twitter?apikey=${apilol}&url=${ini_url}`)
                    ini_url = ini_url.result
                    ini_url = ini_url[ini_url.length - 1].link
                    ini_buffer = await getBuffer(ini_url)
                    await thoth.sendMessage(from, ini_buffer, video, { quoted: mek })
                    break
                 case 'fbdl':
                    if (args.length == 0) return reply(`Exemplo: ${prefix + command} https://fb.watch/59qyGFhndG/`)
                    ini_url = args[0]
                    ini_url = await fetchJson(`https://api.lolhuman.xyz/api/facebook?apikey=${apilol}&url=${ini_url}`)
                    ini_url = ini_url.result[0].link
                    ini_buffer = await getBuffer(ini_url)
                    await thoth.sendMessage(from, ini_buffer, video, { quoted: mek })
                    break
					case 'shipp':		
	            	if (args.length < 1) return reply('marque o casal!')
					rate = body.slice(1)
					const ti =['5','10','18','29','38','44*','60','63','75','84','98','101','30','95','76','83','45','34']
					const kl = ti[Math.floor(Math.random() * ti.length)]
					thoth.sendMessage(from, 'Olha o casalzin: *'+rate+'*\n\nA chance de dar certo é : '+ kl+'%', text, { quoted: mek })
					break
		   case 'semoji':
                    if (args.length == 0) return reply(`Exemplo: ${prefix + command} 😭`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/smoji/${emoji}?apikey=847de7716f17a51eeba4235c`)
                    thoth.sendMessage(from, ini_buffer, sticker, { quoted: mek})
                    break
                case 'ytplay':
                    if (args.length == 0) return reply(`Exemplo: ${prefix + command} Major RD`)
                    query = args.join(" ")
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/ytplay?apikey=ZidanGanzz$&query=${query}`)
                    get_result = get_result.result
                    get_info = get_result.info
                    ini_txt = `Título : ${get_info.title}\n`
                    ini_txt += `Uploader : ${get_info.uploader}\n`
                    ini_txt += `Duração : ${get_info.duration}\n`
                    ini_txt += `View : ${get_info.view}\n`
                    ini_txt += `Like : ${get_info.like}\n`
                    ini_txt += `Dislike : ${get_info.dislike}\n`
                    ini_txt += `Descrição :\n ${get_info.description}\n`
                    ini_buffer = await getBuffer(get_info.thumbnail)
                    await thoth.sendMessage(from, ini_buffer, image, { quoted: mek, caption: ini_txt })
                    get_audio = await getBuffer(get_result.audio[3].link)
                    await thoth.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_info.title}.mp3`, quoted: mek })
                    get_video = await getBuffer(get_result.video[0].link)
                    await thoth.sendMessage(from, get_video, video, { mimetype: 'video/mp4', filename: `${get_info.title}.mp4`, quoted: mek })
                    break
				case 's':
				case 'sticker':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await thoth.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('MayBOT', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									thoth.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)	
									fs.unlinkSync(ran)	
								})
								/*thoth.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await thoth.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Falha no momento da conversão ${tipe} para stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ${addMetadata('JOWGOD', authorname)} ${ran} -o ${ran}`, async (error) => {
									if (error) return reply(mess.error.stick)
									thoth.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
									fs.unlinkSync(media)
									fs.unlinkSync(ran)
								})
								/*thoth.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)*/
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await thoth.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = '3b8594f4cb11895f4084291bc655e510'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Falha, ocorreu um erro, tente novamente mais tarde.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ranw} -o ${ranw}`, async (error) => {
									if (error) return reply(mess.error.stick)
									thoth.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
									fs.unlinkSync(ranw)
								})
								//thoth.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await thoth.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								thoth.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`Coloque na legenda da ft ${prefix}sticker ou tente novamente`)
					}
					break
				case 's2':
				case 'fga2':
				case 'sticker2':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        filePath = await thoth.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.png')
                        file_name2 = getRandom('.webp')
                        request({
                            url: `https://api.lolhuman.xyz/api/removebg?apikey=ZidanGanzz${apilol}`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function(error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ffmpeg(`./${file_name}`)
                                .input(file_name)
                                .on('error', function(err) {
                                    console.log(err)
                                    fs.unlinkSync(file_name)
                                })
                                .on('end', function() {
                                    thoth.sendMessage(from, fs.readFileSync(file_name2), sticker, { quoted: mek })
                                    fs.unlinkSync(file_name2)
                                })
                                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                                .toFormat('webp')
                                .save(file_name2)
                        });
                    } else {
                        reply(`Marque a foto ou tente novamente`)
                    }
                    break
                case 'yt':
					if (args.length < 1) return reply('Preciso do link!')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`sua api`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `Estou baixando seu vídeo`
					thumb = await getBuffer(anu.thumb)
					thoth.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					thoth.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}`, quoted: mek})
					break
			    case 'ocr':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        var filePath = await thoth.downloadAndSaveMediaMessage(encmedia, filename = getRandom());
                        var form = new FormData();
                        var stats = fs.statSync(filePath);
                        var fileSizeInBytes = stats.size;
                        var fileStream = fs.createReadStream(filePath);
                        form.append('img', fileStream, { knownLength: fileSizeInBytes });
                        var options = {
                            method: 'POST',
                            credentials: 'include',
                            body: form
                        }
                        get_result = await fetchJson(`https://api.lolhuman.xyz/api/ocr?apikey=ZidanGanzz${apilol}`, {...options })
                        fs.unlinkSync(filePath)
                        get_result = get_result.result
                        reply(`Resultado : ${get_result}`)
                    } else {
                        reply(`Marque a foto ou tente novamente`)
                    }
                    break
					
case 'cc2':
anu = await fetchJson(`sua api`, {method:'get'})
teks = `*♻️NÚMERO*: ${anu.result.card.number}\n*♻️TIPO*: ${anu.result.card.network}\n*♻️CVV*: ${anu.result.card.cvv}\n*♻️PIN*: ${anu.result.card.pin}\n*♻️DINHEIRO*: ${anu.result.card.balance}\n*♻️EXPIRAR-MÊS*: Personalizado\n*♻️EXPIRARAR-ANO*: Personalizar\n*♻️PAÍS*: ${anu.result.customer.country}\n*♻️NOME*: ${anu.result.customer.name}\n𝗠𝗔𝗬 𝗕𝗢𝗧`
thoth.sendMessage(from, teks, text, {quoted: mek})

break					
case 'hentai':
gatauda = body.slice(6)
if (!isGroup) return reply(mess.only.group)
if (!isNsfw) return reply('Ligue o nsfw')
reply(mess.wait)
anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=${apitobz}`, {method: 'get'})
buffer = await getBuffer(anu.result)
thoth.sendMessage(from, buffer, image, {quoted: mek, caption: 'Sapecagens 😈'})
break
case 'happymod':
if (!isGroup) return reply(mess.only.group)
data = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(10)}&apikey=${apitobz}`)
hupo = data.result[0] 
teks = `*Nome*: ${data.result[0].title}\n*versão*: ${hupo.version}\n*Tamanho:* ${hupo.size}\n*Link*: ${hupo.link}\n 𝗠𝗔𝗬 𝗕𝗢𝗧`
buffer = await getBuffer(hupo.image)
thoth.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
await limitAdd(sender)
break					
case 'blowjob':
if (!isGroup) return reply(mess.only.group)
if (!isNsfw) return reply('Ligue o nsfw')
ranp = getRandom('.gif')
rano = getRandom('.webp')
anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=${apitobz}`, {method: 'get'})
if (anu.error) return reply(anu.error)
exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
fs.unlinkSync(ranp)
if (err) return reply(ind.stikga())
buffer = fs.readFileSync(rano)
thoth.sendMessage(from, buffer, sticker, {quoted: mek})
fs.unlinkSync(rano)
})
await limitAdd(sender)
break
case 'kiss':
ranp = getRandom('.gif')
rano = getRandom('.webp')
anu = await fetchJson(`https://tobz-api.herokuapp.com/api/kiss?apikey=847de7716f17a51eeba4235c${apitobz}`, {method: 'get'})
if (anu.error) return reply(anu.error)
exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
fs.unlinkSync(ranp)
if (err) return reply(ind.stikga())
buffer = fs.readFileSync(rano)
thoth.sendMessage(from, buffer, sticker, {quoted: mek})
fs.unlinkSync(rano)
})
await limitAdd(sender)
break	
case 'cry':
ranp = getRandom('.gif')
rano = getRandom('.webp')
anu = await fetchJson(`https://tobz-api.herokuapp.com/api/cry?apikey=${apitobz}`, {method: 'get'})
if (anu.error) return reply(anu.error)
exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
fs.unlinkSync(ranp)
if (err) return reply(ind.stikga())
buffer = fs.readFileSync(rano)
thoth.sendMessage(from, buffer, sticker, {quoted: mek})
fs.unlinkSync(rano)
})
await limitAdd(sender)
break					
case 'loli':
gatauda = body.slice(6)
if (!isGroup) return reply(mess.only.group)
if (!isNsfw) return reply('Ligue o nsfw')
reply(mess.wait)
anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=${apitobz}`, {method: 'get'})
buffer = await getBuffer(anu.result)
thoth.sendMessage(from, buffer, image, {quoted: mek, caption: 'Policiaaaaaaa 🚓'})
break
case 'add':
try {
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('Você quer adicionar um gênio?')
if (args[0].startsWith('08')) return reply('Use o código do país, mas')
try {
num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
thoth.groupAdd(from, [num])
} catch (e) {
console.log('Error :', e)
reply('Falha ao adicionar destino, talvez porque é privado')
}
} catch {
reply(msgerr)
}
break
case 'diario':
if (args.length < 1) return reply(ind.wrongf())
ct = body.slice(7)
ct = await getBuffer(`https://api.zeks.xyz/api/nulis?text=${ct}&apikey=pivinz${apizeks}`)
thoth.sendMessage(from, ct, image, {caption: 'May Bot🐒', quoted: mek})
break
case 'freefire':
if (args.length == 0) return reply(`Exemplo: ${prefix + command} Thoth`)
ini_txt = args.join(" ")
getBuffer(`https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=ZidanGanzz&text=${ini_txt}`).then((gambar) => {
thoth.sendMessage(from, gambar, image, { quoted: mek })
})
break
case 'map':
if(!isGroup) return reply(mess.only.group)
anu = await fetchJson(`sua api`, {method: 'get'})
buffer = await getBuffer(anu.gambar)
thoth.sendMessage(from, buffer, image, {quoted: mek, caption: `${body.slice(5)}`})
await limitAdd(sender)
break
case 'translate':
if (args.length == 0) return reply(`Examplo: ${prefix + command} en macaco`)
kode_negara = args[0]
args.shift()
ini_txt = args.join(" ")
get_result = await fetchJson(`https://api.lolhuman.xyz/api/translate/auto/${kode_negara}?apikey=ZidanGanzz&text=${ini_txt}`)
get_result = get_result.result
init_txt = `De : ${get_result.from}\n`
init_txt += `Para : ${get_result.to}\n`
init_txt += `Original : ${get_result.original}\n`
init_txt += `Tradução : ${get_result.translated}\n`
init_txt += `Pronuncia : ${get_result.pronunciation}\n`
reply(init_txt)
break
case 'pinterest2':
if (args.length == 0) return reply(`Exemplo: ${prefix + command} loli kawaii`)
query = args.join(" ")
ini_url = await fetchJson(`https://api.lolhuman.xyz/api/pinterest?apikey=${apilol}&query=${query}`)
ini_url = ini_url.result
ini_buffer = await getBuffer(ini_url)
await thoth.sendMessage(from, ini_buffer, image, { quoted: mek })
break
case 'roletahard':
if(!isGroup) return reply(mess.only.group)
if(!isBotGroupAdmins) return reply(mess.only.Badmin)
if(!isGroupAdmins) return reply(mess.only.admin)
reply('Girando o tambor...🔫\n*Se preparem para as consequências 😈*')
setTimeout(async function() {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
mem = groupMembers[r].jid
if(mem.includes(ownerNumber)) {
r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
mem = groupMembers[r].jid
}
await thoth.sendMessage(from, `💥O @${mem.split('@')[0]} Não teve sorte💥\n*😈 Agora se prepare para as consequências 😈*`, text, {contextInfo: {"mentionedJid": [mem]}})
await thoth.groupRemove(from, [mem])
await thoth.sendMessage(from, `👻O @${mem.split('@')[0]} teve sua vida ceifada👻`)
}, 10000)
break
case 'antiporn':
try {
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (!isBotGroupAdmins) return reply(mess.only.Badmin)
if (args.length < 1) return reply('Hmmmm')
if (Number(args[0]) === 1) {
if (isAntiPorn) return reply('Ja esta ativo')
antiporn.push(from)
fs.writeFileSync('./src/antiporn.json', JSON.stringify(antiporn))
reply('Ativou com sucesso o recurso de antipornô neste grupo✔️')
} else if (Number(args[0]) === 0) {
antiporn.splice(from, 1)
fs.writeFileSync('./src/antiporn.json', JSON.stringify(antiporn))
reply('Desativou com sucesso o recurso de antipornô neste grupo✔️')
} else {
reply('1 para ativar, 0 para desativar')
}
} catch {
reply(msgerr)
}
break
				case 'tts':
					if (args.length < 1) return thoth.sendMessage(from, 'Qual é o código da linguagem ?', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return thoth.sendMessage(from, 'Cadê o texto', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Muito grande')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('falha:(')
							thoth.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
case 'mp3':
thoth.updatePresence(from, Presence.composing) 
if (!isQuotedVideo) return reply('Marque o video pfv')
reply(mess.wait)
encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
media = await thoth.downloadAndSaveMediaMessage(encmedia)
ran = getRandom('.mp4')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return reply('❌ Falha ao converter vídeo para mp3 ❌')
buffer = fs.readFileSync(ran)
thoth.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: mek})
fs.unlinkSync(ran)
})
break
case 'setprefix':
if (args.length < 1) return
if (!isOwner) return reply(mess.only.ownerB)
prefix = args[0]
setting.prefix = prefix
fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
reply(`Prefixo mudado para : ${prefix}`)
break 
case 'membros':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
members_id = []
teks = (args.length > 1) ? body.slice(8).trim() : ''
teks += '\n\n'
for (let mem of groupMembers) {
teks += `*Chamando todos os membros* @${mem.jid.split('@')[0]}\n`
members_id.push(mem.jid)
}
mentions(teks, members_id, true)
break
case 'nsfw':  

if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (args.length < 1) return reply('Hmmmm')
if ((args[0]) === '1') {
if (isNsfw) return reply('O modo NSFW está ativo')
nsfw.push(from)
fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
reply(`\`\`\`✓Modo nsfw ativado com sucesso\`\`\` *${groupMetadata.subject}*`)
} else if ((args[0]) === '0') {
if (!isNsfw) return reply('Mode Nsfw Off')
nsfw.splice(from, 1)
fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
reply(`\`\`\`✓Modo nsfw desativado com sucesso\`\`\` *${groupMetadata.subject}*`)
} else {
reply('1 para ligar, 0 para desligar')
}
break
case 'xhamster':
if (!isGroup) return reply(mess.only.group)
if (!isNsfw) return reply('Ligue o nsfw')
if (args.length == 0) return reply(`*Exemplo : ${prefix + command} Japanese*`)
query = args.join(" ")
get_result = await fetchJson(`http://lolhuman.herokuapp.com/api/xhamstersearch?apikey=ZidanGanzz&query=${query}`)
get_result = get_result.result
ini_txt = ""
for (var x of get_result) {
ini_txt += `Título : ${x.title}\n`
ini_txt += `Views : ${x.views}\n`
ini_txt += `Duração : ${x.duration}\n`
ini_txt += `Link : ${x.link}\n\n`
}
reply(ini_txt)
break
case 'stickerwa':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (args.length == 0) return reply(`*Exemplo : ${prefix + command} monkey*`)
query = args.join(" ")
get_result = await fetchJson(`http://lolhuman.herokuapp.com/api/stickerwa?apikey=ZidanGanzz&query=${query}`)
get_result = get_result.result[0].stickers
for (var x of get_result) {
ini_buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/convert/towebp?apikey=ZidanGanzz&img=${x}`)
thoth.sendMessage(from, ini_buffer, sticker)
}
break
case 'dado':
if (!isGroup) return reply(mess.only.group)
ranp = getRandom('.png')
rano = getRandom('.webp')
random = `${Math.floor(Math.random() * 6)}`
hasil = 'sua api' + random + '.png'
exec(`wget ${hasil} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
fs.unlinkSync(ranp)
if (err) return reply(mess.error.stick)
buffer = fs.readFileSync(rano)
thoth.sendMessage(from, buffer, sticker, {quoted: mek})
fs.unlinkSync(rano)
})
break
		case 'semoji':
			        if (!isGroup) return reply(mess.only.group)
                    if (args.length == 0) return reply(`*Exemplo: ${prefix + command} 😭*`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await getBuffer(`http://
