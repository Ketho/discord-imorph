
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

var removed = [
	17802, // "Thunderfury, Blessed Blade of the Windseeker DEPRECATED"
]

removed.forEach(function(item) {
	delete data[item]
})

function sendItemMessage(message, id, name, slot) {
	message.channel.send("**"+name+"**  <https://classic.wowhead.com/item="+id+">\n`.item "+slot+" "+id+"`")
}

module.exports = message => {
	let msgid = message.content.match(/\.item (\d+)/)
	let msgname = message.content.match(/\.item (.+)/)
	if (msgid) {
		let id = msgid[1]
		let obj = data[id]
		if (obj)
			sendItemMessage(message, id, obj.name, obj.slot)
		else
			message.channel.send("Could not find Item ID "+id)
	}
	else if (msgname) {
		let rname = sanitizeString(msgname[1])
		if (rev[rname]) {
			let obj = rev[rname]
			sendItemMessage(message, obj.id, obj.name, obj.slot)
		}
		else {
			for (let key in data) {
				if (data.hasOwnProperty(key)) {
					let obj = data[key]
					let lname = sanitizeString(obj.name)
					if (lname.indexOf(rname) > -1) {
						sendItemMessage(message, key, obj.name, obj.slot)
						return
					}
				}
			}
			message.channel.send("Could not find \""+msgname[1]+"\"")
		}
	}
}
