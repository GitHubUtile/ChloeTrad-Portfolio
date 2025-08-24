# DNS Security Configuration for chloetrad.com

## Required DNS Records for GitHub Pages

### A Records (for apex domain)
```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @  
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

### CNAME Record (for www subdomain)
```
Type: CNAME
Name: www
Value: githubutile.github.io
```

### Security TXT Record (GitHub Domain Verification)
```
Type: TXT
Name: _github-pages-challenge-GitHubUtile
Value: [Get this from GitHub Settings > Pages > Verified domains]
```

### Additional Security Records

#### CAA Record (Certificate Authority Authorization)
```
Type: CAA
Name: @
Value: 0 issue "letsencrypt.org"
Value: 0 issue "github.com"  
Value: 0 iodef "mailto:chloetrad1@gmail.com"
```

#### SPF Record (Email Security)
```
Type: TXT
Name: @
Value: "v=spf1 -all"
```

## Security Monitoring

1. Enable HTTPS enforcement in GitHub Pages settings
2. Set up domain monitoring alerts
3. Regularly check DNS records for unauthorized changes
4. Monitor certificate transparency logs
