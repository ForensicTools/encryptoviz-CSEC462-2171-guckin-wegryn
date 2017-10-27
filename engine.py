#Alex Guckin & Greg Wegryn
#psudeocode for skeleton of collection engine.  i want this engine to 
#find computers on the network and determine what ports are open on those computers.
#this way i can figure out how much encryption is on the network.  

import nmap #need to install python-nmap via PIP

nm = nmap.PortScanner()
nm.scan('10.0.0.1', '22') #testing functionality
nm.command_line() 'nmap -n -p 22-sV 10.0.0.1'

print(nm.scaninfo())
print(nm.all_hosts())