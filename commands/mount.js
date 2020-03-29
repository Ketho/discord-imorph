
var data = require('../data/mount.json')

const util = require("../util")
var sanitizeString = util.sanitizeString

module.exports = message => {
	let msgname = message.content.match(/\.mount (.+)/)
	if (msgname) {
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				let obj = data[key]
				let lname = sanitizeString(obj.name)
				let lsource = sanitizeString(obj.source)
				let rname = sanitizeString(msgname[1])
				if (lname.indexOf(rname) > -1 || lsource.indexOf(rname) > -1) {
					let linkType = obj.item ? "item="+obj.item : "spell="+obj.spell
					message.channel.send("**"+obj.name+"**  <https://classic.wowhead.com/"+linkType+">\n`.mount "+key+"`")
					return
				}
			}
		}
		message.channel.send("Could not find \""+msgname[1]+"\"")
	}
}
