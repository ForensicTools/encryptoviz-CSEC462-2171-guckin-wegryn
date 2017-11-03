#Alex Guckin & Greg Wegryn
#psudeocode for skeleton of collection engine.  i want this engine to 
#find computers on the network and determine what ports are open on those computers.
#this way i can figure out how much encryption is on the network.  

import nmap #need to install python-nmap via PIP
import json # need to learn json 


nm = nmap.PortScanner()
nm.scan('10.21.0.6/32', '53') #testing functionality
print json.dumps({'4': 5, '6': 7}, indent=2,  separators=(',',':'))


print(nm.scaninfo())
print(nm.all_hosts())
