# BabyOnBoard-Web

## Installing and running BabyOnBOard Web app:

# On Terminal

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

