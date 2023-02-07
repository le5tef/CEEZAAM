sudo openssl genrsa -out local.key 2048
sudo openssl rsa -in local.key -out local.key.rsa
sudo openssl req -new -key local.key.rsa -subj /CN=local -out local.csr -config local.conf
sudo openssl x509 -req -extensions v3_req -days 3650 -in local.csr -signkey local.key.rsa -out local.crt -extfile local.conf
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain local.crt
