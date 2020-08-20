install libraries :
	- npm install

task runner in dev mode : 
	- npm run dev

generate the dist/ folder for production :
	- npm run generate

API access : 
	- access to the data is controlled by the api, the code for retrieving the data is located in the API/ folder
	- you can see an example of the working API on this url : https://ocde.wedodata.fr/paris21_api/getGeography.php?rand=344158


UPDATE `indicators` SET poverty_line= '$1.25' WHERE poverty_line = '1.25'
UPDATE `indicators` SET poverty_line= '$4.00' WHERE poverty_line = '4'
UPDATE `indicators` SET poverty_line= '$2.50' WHERE poverty_line = '2.5'
UPDATE `indicators` SET poverty_line= '$5.50' WHERE poverty_line = '5.5'
UPDATE `indicators` SET poverty_line= '$3.20' WHERE poverty_line = '3.2'
UPDATE `indicators` SET poverty_line= '$1.90' WHERE poverty_line = '1.9'