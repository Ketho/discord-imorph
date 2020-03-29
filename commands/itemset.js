
var data = require('../data/itemset.json')

const util = require("../util")
var sanitizeString = util.sanitizeString

module.exports = message => {
	let msgname = message.content.match(/\.itemset (.+)/)
	if (msgname) {
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				let obj = data[key]
				let lname = sanitizeString(obj)
				let rname = sanitizeString(msgname[1])
				if (lname.indexOf(rname) > -1) {
					message.channel.send("**"+obj+"**  <https://classic.wowhead.com/item-set="+key+">\n`.itemset "+key+"`")
					return
				}
			}
		}
		message.channel.send("Could not find \""+msgname[1]+"\"")
	}
}
