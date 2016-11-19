# LINE Chatbot based on Watson conversation API


# Prerequisite cloud service
You should get the accounts from those cloud services.


## IBM Watson Conversation

Please refer this URL (https://www.ibm.com/watson/developercloud/conversation.html?cm_mc_uid=74122503855814660919737&cm_mc_sid_50200000=1471361662) to get Watson conversation API user id via IBM Bluemix cloud service.


## LINE Messaging API

Please refer this URL (https://business.line.me/services/bot) to get LINE Messaging account.


## The Digital Certificates 

You should get the digital certificates you need in order to enable HTTPS (SSL/TLS) 
please refer this URL (https://letsencrypt.org/) to get free the digital certificates


## Runtime environment for Node

The runtime environment must be able to communicate with the Watson service endpoint. My recommended environment is Virtual Server in Bluemix Infrastructure (EX SoftLayer). the minimum resource is a CPU 1 core and RAM 1 Gbyte.

Tested Node version is v4.4.7. the "ndenv" environment is better than OS bundled Node due to choose Node version easy by any folder. Any OS is OK if it can run ndenv.


# Install prerequisite package

~~~
$ npm install fs async line-msg-api watson-developer-cloud
~~~



# How to configure Chatbot

The configuration files are in the etc folder. you should edit the files following guide.

* line_api_credential.json.sample
* encript_fullchain.crt.sample
* encript.key.sample
* conversation_credentials.json.sample
* conversation_workspace_id.json.sample


## line_api_credential.json

"line_api_credential.json.sample" should be changed the file name to "line_api_credential.json". In this JSON file, "accessToken" and "channelSecret" are from LINE Developer Web page. In "server" section, "key" and "cert" are the file name that is the digital certificates. 

"port" in "server" section should be same port number in Webhook URL on LINE Developer Web page.



## encript_fullchain.crt and encript.key

You should remove ".sample" and but these file is a fake. you can get these file from Let's Encrypt (https://letsencrypt.org/).



## conversation_credentials.json

In "conversation_credentials.json.sample" file, "username" and "password" are the credentials of IBM Watson conversation in IBM Bluemix. the values of "verstion" and "version_date" should not be changed. ".sample" in the file name should be removed.



## conversation_workspace_id.json

After ordering the Watson conversation API service, please click "Launch tool" icon. you should click "import workspace" icon in the next web page. At "Import a workspace" dialog, you should choose  "schema_conversation/basic_conv1.json".

After importing workspace, you can get "workspace_id" value from the "view details" in the Workspace of tool web page.




# How to start the LINE Chatbot

To start chatbot, you should execute below command in "line_chatbot" folder.

~~~
$ ./chatbot.js
~~~

you can see a conversation history in logs folder.


Please Enjoy a conversation with IBM Watson !