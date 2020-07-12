function sanitizeString(s) {	
	return s.trim().toLowerCase().replace(/['\[\]]/g, "")
}

module.exports = {
	sanitizeString
}
