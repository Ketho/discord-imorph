const item = require('../commands/item')
const itemset = require('../commands/itemset')
const mount = require('../commands/mount')
const npc = require('../commands/npc')

var mod_roles = {
	'617959629208551424' : true, // 'iMorph Developer'
	'617958911395495947' : true, // 'Moderator'
	'634176868462886912' : true, // 'Other developers'
	'623220680258748436' : true, // 'Bots'
	'621575632446554113' : true // 'MEE6'
}

var request_channels = { // only allow querying imorph commands in these channels
	'654453865680338984' : true, // morph-requests
	'628386954534191125' : true // bot-testing
}

var hearts = [
	':heart:',
	':blue_heart:',
	':green_heart:',
	':yellow_heart:',
	':purple_heart:',
]

var MSG_THROTTLE = 1800

var keyword_ban = [
	'ban',
	'bans',
	'banned',
	'bannable',
]

var keyword_update = [
	'update',
	'updates',
	'updated',
]

function findKeyword(str, words) {
	let found
	words.forEach(function(item) {
		if (str.search('\\b'+item+'\\b') > -1) {
			found = true
			return
		}
	})
	return found
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

var cd = [0, 0]

function getTime() {	
	return Date.now() / 1000
}

module.exports = (client, message) => {
	let content = message.content
	let lowerStr = content.toLowerCase()
	// check only for the first role
	let isModerator = message.member && mod_roles[message.member._roles[0]] 

	if (content.startsWith('.') && request_channels[message.channel.id]) {
		if (lowerStr.startsWith('.itemset'))
			itemset(message)
		else if (lowerStr.startsWith('.item'))
			item(message)
		else if (lowerStr.startsWith('.mount'))
			mount(message)
		else if (lowerStr.startsWith('.npc') || lowerStr.startsWith('.morph'))
			npc(message)
	}
	else if (content == 'ping' && isModerator)
		message.reply('pong')
	else if (content == 'good bot' && isModerator)
		message.channel.send(hearts[getRandomInt(hearts.length)])
	else if (content == '<@!591060107740053520> who are you?' && message.author.id == '207457149926899713')
		message.channel.send('I\'m Hina Amano from <https://myanimelist.net/anime/38826/Tenki_no_Ko>'
			+', my source code is on <https://github.com/Ketho/discord-imorph>')
/*
	// they have been abusing poor hina
	else if (findKeyword(lowerStr, keyword_ban) && !isModerator && getTime()-cd[0] > MSG_THROTTLE) {
		message.reply('morphing is against EULA, however no one has been banned for it in over 10 years since morphing has existed. '
			+'Use at your own risk\n<https://blizzard.com/company/legal/eula.html>\nhttps://imgur.com/LziutOu')
		cd[0] = getTime()
	}
	else if (findKeyword(lowerStr, keyword_update) && !isModerator && getTime()-cd[1] > MSG_THROTTLE) {
		message.reply('see the first post in <#617979089478877184> for the latest iMorph update information')
		cd[1] = getTime()
	}
*/
}
