
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
				message.channel.send("<https://classic.wowhead.com/npc="+id+">\n`.npc "+obj.name+"`\n`.morph "+obj.display+"`")
		}
		else
			message.channel.send("Could not find npc \""+id+"\"")
	}
	else if (msgname) {
		let rname = sanitizeString(msgname[1])
		if (rev[rname]) {
			let obj = rev[rname]
			message.channel.send("<https://classic.wowhead.com/npc="+obj.id+">\n`.npc "+obj.name+"`\n`.morph "+obj.display+"`")
		}
		else {
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					let obj = data[key]
					let lname = sanitizeString(obj.name)
					if (lname.indexOf(rname) > -1) {
						message.channel.send("<https://classic.wowhead.com/npc="+key+">\n`.npc "+obj.name+"`\n`.morph "+obj.display+"`")
						return
					}
				}
			}
			message.channel.send("Could not find \""+msgname[1]+"\"")
		}
	}
}
