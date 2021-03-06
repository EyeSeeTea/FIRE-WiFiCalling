# FIRE-WiFiCalling
WiFi Calling App to be used with LibreServer

## Environment configuration

To configure basic dev environment

First of all, in your OS, install npm and nodejs. 

Example in Ubuntu:
```
sudo apt-get install npm nodejs
```

```
sudo npm install -g ionic@2.2.3 cordova
```

(optional, probably for the future)
```
sudo npm install -g bower
```

Create an account in https://apps.ionic.io

Then clone this repo and add android platform
```
git clone git@github.com:EyeSeeTea/FIRE-WiFiCalling.git
cd FIRE-WiFiCalling
ionic platform add android
```

To natively execute the project configure in android studio the project contained in platform/android folder

To see in real time the development in a browser
```
ionic serve 
```

If you want to see it with an android wrapper
```
ionic lab
```

To upload it to your ionic account
```
ionic login
```
(Introduce your credentials)
```
ionic upload
```

# Documentation
https://ionicframework.com/developers/
