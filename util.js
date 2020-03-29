function sanitizeString(s) {	
	return s.trim().toLowerCase().replace("'", "")
}

module.exports = {
	sanitizeString
}
