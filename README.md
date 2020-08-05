# Restaurant Site Using Reactjs

# Installing json-server
-  json-server is a node module, and hence can be installed globally by typing the following at the command prompt
    npm install json-server -g 
 
   If you are using OSX or Linux, use sudo at the front of the command. This will install json-server that can be started from the command line from any folder on your computer.
# Configuring the Server
   At any convenient location on your computer, create a new folder named json-server, and move to this folder.
   
   Download the db.json file :
   
   https://d3c33hcgiwev3.cloudfront.net/mNhQRT-6EeieJwrYiMRpMg_99c854b03fba11e8bac2b7a30cba3e24_db.json?Expires=1594598400&Signature=g0euEoATCMpmgTfuGmlua6zC-j4y~1G80-eL-b9-oKjoFMnT0OjWt8sXMpzkQhIvJFWfXGQAM~Fr8TlKu8yRni6wDv7rxz3aDm9nShdb-VM~dcvBRptR3yg50eHncZTmH8WLHLG0iUJzuXAlHPe-SNPd22pZ8t4LYWmwgX-ASG0_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A 
    
   Move to this folder in your terminal window, and type the following at the command prompt to start the server:
      json-server --watch db.json -p 3001 -d 2000 
     
   This should start up a server at port number 3001 on your machine. 

Now Open above files in Your editor and in cmd run npm install for installing of node_modules after installing node_modules folder run npm start and your application run succesfully

# Ignore Build folder
Build Folder is one which you make your own therefore delete Build folder of my repository

# Building your own Distribution Folder
   To build the distribution folder containing your React application, type the following at the prompt:
      npm run build
   This should build a distribution folder named build containing all your application files
# Deploying your React Application
   1. To deploy your React application you need a server. Fortunately we already have the json-server available on our computer.
   2. Copy the contents of the build folder to the public folder of your json-server (that you created previously)
   3. Now your React application can be accessed at the link http://localhost:3001/.
   4. If you are setting up a server on the cloud or anywhere, all that you need to do is copy the contents of the build folder to the server side to deploy your React application. The exact procedure depends on the cloud service provider that you choose to use. Please consult their documentation to see the procedure to set up the server.
