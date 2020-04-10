
var data = require('../data/npc.json')
var rev = {}

const util = require("../util")
var sanitizeString = util.sanitizeString

for (let k in data) {
	let lowerName = sanitizeString(data[k].name)
	rev[lowerName] = {
		"id" : k,
		"name" : data[k].name,
		"display" : data[k].display,
	}
}

var removed = [
	3957, // "Jainay Featherbreeze"
]

removed.forEach(function(item) {
	delete data[item]
})

function sendNpcMessage(message, id, name, display) {
	message.channel.send("<https://classic.wowhead.com/npc="+id+">\n`.npc "+name+"`\n`.morph "+display+"`")
}

module.exports = message => {
	let msgid = message.content.match(/\.npc (\d+)/)
	let msgname = message.content.match(/\.npc (.+)/)
	if (msgid) {
		let id = msgid[1]
		let obj = data[id]
		if (obj) {
			if (obj.data == 11686)
				message.channel.send("There is no DisplayID for **"+obj.name+"**  <https://classic.wowhead.com/npc="+id+">")
			else
				sendNpcMessage(message, id, obj.name, obj.display)
		}
		else
			message.channel.send("Could not find NPC ID "+id)
	}
	else if (msgname) {
		let rname = sanitizeString(msgname[1])
		if (rev[rname]) {
			let obj = rev[rname]
			sendNpcMessage(message, obj.id, obj.name, obj.display)
		}
		else {
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					let obj = data[key]
					let lname = sanitizeString(obj.name)
					if (lname.indexOf(rname) > -1) {
						sendNpcMessage(message, key, obj.name, obj.display)
						return
					}
				}
			}
			message.channel.send("Could not find \""+msgname[1]+"\"")
		}
	}
}
