
var data = require('../data/itemset.json')

module.exports = message => {
	let msgname = message.content.match(/\.itemset (.+)/)
	if (msgname) {
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				let obj = data[key]
				let lname = obj.toLowerCase().replace("'", "")
				let rname = msgname[1].toLowerCase().replace("'", "")
				if (lname.indexOf(rname) > -1) {
					message.channel.send("**"+obj+"**  <https://classic.wowhead.com/item-set="+key+">\n`.itemset "+key+"`")
					return
				}
			}
		}
		message.channel.send("Could not find \""+msgname[1]+"\"")
	}
}
