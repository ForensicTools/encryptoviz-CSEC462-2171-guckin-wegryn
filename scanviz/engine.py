import nmap

def scan(input):
	nm = nmap.PortScanner()
	nm.scan(input, '22')
	return {
		"scaninfo": nm.scaninfo(),
		"hosts": nm.all_hosts()
	}


