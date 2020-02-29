
var data = require('../data/mount.json')

module.exports = message => {
	let msgname = message.content.match(/\.mount (.+)/)
	if (msgname) {
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				let obj = data[key]
				let name = obj.name, source = obj.source
				fmsg = msgname[1].toLowerCase().replace("'", "")
				fname = name.toLowerCase().replace("'", "")
				fsource = source.toLowerCase().replace("'", "")
				if (fname.indexOf(fmsg) > -1 || fsource.indexOf(fmsg) > -1) {
					let source = obj.item ? "item="+obj.item : "spell="+obj.spell
					message.channel.send("**"+name+"**  <https://classic.wowhead.com/"+source+">\n`.mount "+key+"`")
					return
				}
			}
		}
		message.channel.send("Could not find \""+msgname[1]+"\"")
	}
}
