
var data = require('../data/item.json')

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
		let itemName = msgname[1].toLowerCase().replace("'", "")
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				let obj = data[key]
				let fname = obj.name.toLowerCase().replace("'", "")
				if (fname.indexOf(itemName) > -1) {
					message.channel.send("**"+obj.name+"**  <https://classic.wowhead.com/item="+key+">\n`.item "+obj.slot+" "+key+"`")
					return
				}
			}
		}
		message.channel.send("Could not find \""+msgname[1]+"\"")
	}
}
