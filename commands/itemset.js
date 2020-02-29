
var data = require('../data/itemset.json')

module.exports = message => {
	let msgid = message.content.match(/\.itemset (\d+)/)
	let msgname = message.content.match(/\.itemset (.+)/)
	if (msgid) {
		let id = msgid[1]
		let setName = data[id]
		if (setName)
			message.channel.send("**"+setName+"**  <https://classic.wowhead.com/item-set="+id+">\n`.itemset "+id+"`")
		else
			message.channel.send("Could not find itemset \""+id+"\"")
	}
	else if (msgname) {
		let fmsg = msgname[1].toLowerCase().replace("'", "")
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				let obj = data[key]
				let fname = obj.toLowerCase().replace("'", "")
				if (fname.indexOf(fmsg) > -1) {
					message.channel.send("**"+obj+"**  <https://classic.wowhead.com/item-set="+key+">\n`.itemset "+key+"`")
					return
				}
			}
		}
		message.channel.send("Could not find \""+msgname[1]+"\"")
	}
}
