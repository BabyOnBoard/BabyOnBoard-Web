# BabyOnBoard-Web

## Installing and running BabyOnBOard Web app:

### On Terminal

````
sudo apt-get update 
sudo apt-get install npm
sudo npm install n -g 
sudo n latest
sudo npm install -g @angular/cli 
````

In case you get stuck in an infinit loop on this last one, try: 

````
sudo npm install --unsafe-perm -g @angular/cli
````

In some cases, just cloning this repository wont work because of the initial configuration Angular 2 creates at the start of a new project. 
In order for it to work, create a new project:

````
ng new babyonboard
cd babyonboard
````

and replace the scr folder with the one on this repository. 

## The app

The Baby on Board Web app is intended to run alongside the Baby on Board API (https://github.com/BabyOnBoard/BabyOnBoard-API}{https://github.com/BabyOnBoard/BabyOnBoard-API). It communicates with it by HTTP protocol requirements. 

Its purpose is to allert the user in case the baby on the babycrib stops breathing, show the baby's temperature, heartbeat and breathing status and the baby him/herself via live video stream only by beeing connected on the same network, no internet required. It also allows the user to pick a movement for the baby-crib to perform and choose for how long so the baby can sleep.
