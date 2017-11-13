import nmap

def scan(input):
	nm = nmap.PortScanner()
	data = input.split("/")
	data2 = data[0] + "/" + data[1] # I don't know why it works but it does
	ports = [ 22,23 ]
	results = {}

	for i in ports:
		nm.scan(data2, str(i))
		results[str(i)] = {}
		for ip in nm.all_hosts():
			results[str(i)][ip] = nm[ip].tcp(i)["state"]

	print nm.all_hosts()
	return results
		

#	nm.scan(data2, "22-23")
# 	return {
#		"scaninfo": nm.scaninfo(),
#		"hosts": nm.all_hosts()
#	}


