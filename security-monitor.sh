#!/bin/bash
# Security Monitoring Script for chloetrad.com

echo "=== Domain Security Check ==="
echo "Date: $(date)"
echo

# Check DNS A records
echo "Checking A records:"
dig +short chloetrad.com A

echo
echo "Checking CNAME for www:"
dig +short www.chloetrad.com CNAME

echo
echo "Checking GitHub Pages status:"
curl -s -I https://chloetrad.com | head -5

echo
echo "Checking HTTPS redirect:"
curl -s -I http://chloetrad.com | grep -i location

echo
echo "Checking certificate:"
echo | openssl s_client -servername chloetrad.com -connect chloetrad.com:443 2>/dev/null | openssl x509 -noout -issuer -subject

echo
echo "=== Security Check Complete ==="
