
var data = require('../data/npc.json')

module.exports = message => {
	var msgid = message.content.match(/\.npc (\d+)/)
	var msgname = message.content.match(/\.npc (.+)/)
	if (msgid) {
		var id = msgid[1]
		var obj = data[id]
		if (obj) {
			if (obj.data == 11686)
				message.channel.send("There is no DisplayID for **"+obj.name+"**  <https://classic.wowhead.com/npc="+id+">")
			else
				message.channel.send("<https://classic.wowhead.com/npc="+id+">\n`.npc "+obj.name+"`\n`.morph "+obj.displayinfo+"`")
		}
		else
			message.channel.send("Could not find npc \""+id+"\"")
	}
	else if (msgname) {
		var npcName = msgname[1].toLowerCase().replace("'", "")
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				var obj = data[key]
				var fname = obj.name.toLowerCase().replace("'", "")
				if (fname.indexOf(npcName) > -1) {
					message.channel.send("<https://classic.wowhead.com/npc="+key+">\n`.npc "+obj.name+"`\n`.morph "+obj.displayinfo+"`")
					return
				}
			}
		}
		message.channel.send("Could not find \""+msgname[1]+"\"")
	}
}
