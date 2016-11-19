# LINE Chatbot based on Watson conversation API

# Prerequisite cloud service
You should get the accounts from those cloud services.

## IBM Watson Conversation
Please refer this URL (https://www.ibm.com/watson/developercloud/conversation.html?cm_mc_uid=74122503855814660919737&cm_mc_sid_50200000=1471361662) to get Watson conversation API user id via IBM Bluemix cloud service.

## LINE Messaging API
Please refer this URL (https://business.line.me/services/bot) to get LINE Messaging account.

## The Digital Certificates 
you should get the digital certificates you need in order to enable HTTPS (SSL/TLS) 
please refer this URL (https://letsencrypt.org/) to get free the digital certificates


# Install prerequisite package

~~~
$ npm install fs async line-msg-api watson-developer-cloud
~~~


# How to configure this code

The configuration files are in the etc folder. you should edit the files following guide.

* line_api_credential.json.sample
* encript_fullchain.crt.sample
* encript.ley.sample
* conversation_credentials.json.sample
* conversation_workspace_id.json.sample
















