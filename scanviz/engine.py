import nmap
import json

def scan(input):
	scanner = nmap.PortScanner()
	scanner.scan(input, "20,21,22,23,25,53,80,443,67,68,69,88,445", \
		arguments="-sV --traceroute", sudo=True)
	results = scanner.__dict__["_scan_result"]["scan"]
 	return {
		"port_data": analyze_ports(results),
		"map_data": map_network(results) #, input.split("/")[0])
	}

def analyze_ports(scan_info):
	results = {}
	for ip in scan_info:
		for port in scan_info[ip]["tcp"]:
			if port not in results:
				results[port] = [ 0,0,0 ]
			state = scan_info[ip]["tcp"][port]["state"]

			if state == ("open"):
				results[port][0] += 1
			elif state == ("filtered"):
                                       results[port][1] += 1
			else: #closed
				results[port][2] += 1
	for port in results:
		total_ips = sum(results[port])
		for i in range(len(results[port])):
			results[port][i] = round((float(results[port][i])/float(total_ips) * 100),1)
	return results



def map_network(scan_info):
	local_ip = "localhost"
	VE = {local_ip : []}
	for ip in scan_info:
		if "trace_route" in scan_info[ip]:
			route = scan_info[ip]["trace_route"]
			for i in range(len(route)):
				print route[i]
				if route[i] not in VE:
					VE[route[i]] = []
				if i == 0:
					VE[local_ip].append(route[i])
				else:
					VE[route[i - 1]].append(route[i])
	nodes = []
	edges = []
	edge_id = 0
	for ip in VE:
		nodes.append({
			"id" : ip,
			"label" : ip,
			"size" : 3
		})
		for edge in VE[ip]:
			edges.append({
				"id" : str(edge_id),
				"source" : ip,
				"target" : edge
			})
			edge_id += 1
	return { "nodes" : nodes, "edges" : edges }

#print json.dumps(scan("10.22.0.8/32"), indent=1)

