
var data = require('../data/mount.json')

module.exports = message => {
	let msgname = message.content.match(/\.mount (.+)/)
	if (msgname) {
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				let obj = data[key]
				let lname = obj.name.toLowerCase().replace("'", "")
				let lsource = obj.source.toLowerCase().replace("'", "")
				let rname = msgname[1].toLowerCase().replace("'", "")
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
