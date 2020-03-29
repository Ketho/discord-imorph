
var data = require('../data/item.json')
var rev = {}

const util = require("../util")
var sanitizeString = util.sanitizeString

for (let k in data) {
	let lowerName = sanitizeString(data[k].name)
	rev[lowerName] = {
		"id" : k,
		"name" : data[k].name,
		"slot" : data[k].slot,
	}
}

module.exports = message => {
	let msgid = message.content.match(/\.item (\d+)/)
	let msgname = message.content.match(/\.item (.+)/)
	if (msgid) {
		let id = msgid[1]
		let obj = data[id]
		if (obj)
			message.channel.send("**"+obj.name+"**  <https://classic.wowhead.com/item="+id+">\n`.item "+obj.slot+" "+id+"`")
		else
			message.channel.send("Could not find \""+id+"\"")
	}
	else if (msgname) {
		let rname = sanitizeString(msgname[1])
		if (rev[rname]) {
			let obj = rev[rname]
			message.channel.send("**"+obj.name+"**  <https://classic.wowhead.com/item="+obj.id+">\n`.item "+obj.slot+" "+obj.id+"`")
		}
		else {
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					let obj = data[key]
					let lname = sanitizeString(obj.name)
					if (lname.indexOf(rname) > -1) {
						message.channel.send("**"+obj.name+"**  <https://classic.wowhead.com/item="+key+">\n`.item "+obj.slot+" "+key+"`")
						return
					}
				}
			}
			message.channel.send("Could not find \""+msgname[1]+"\"")
		}
	}
}
