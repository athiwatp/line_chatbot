#!/usr/bin/env node
//
// LINEからの日本語テキストのメッセージを受けて、
// Watson Conversationで応答するチャットボット
//
// 作者 Maho Takara    takara@jp.ibm.com
//
// 2016/11/19  初版
//

var fs = require('fs');
var async = require('async');

// LINE MESSAGE API
var LineMsgApi = require('line-msg-api');
var line_cnf = require('./etc/line_api_credential.json');
var bot = new LineMsgApi(line_cnf);

// IBM Watson Conversation
var watson = require('watson-developer-cloud');
var conv_auth = require('./etc/conversation_credentials.json');
var conv_wsid = require('./etc/conversation_workspace_id.json');
var conversation = watson.conversation(conv_auth);

// User session managemnt 
var users = {};

// Folder for downloaded files
const DOWNLOAD = "downloads";
// Floder for logfile
const LOGDIR = "logs";

// Geting a message
bot.on(function (msg) {
    id = msg.events[0].source.userId;
    date = new Date(msg.events[0].timestamp);
    time = date.toLocaleString();

    async.series([
	function(callback) {
	    if (users[id] == undefined ) {
		bot.getProfile(id,function(err,profile) {
		    users[id] = { 
			profile: profile,
			response: {},
			count: 0,
			start_time: time,
			last_time: time
		    };
		    callback(null);
		});
	    } else {
		callback(null);
	    }
	}],function(err, results) {
	    users[id].count = users[id].count + 1;
	    users[id].last_time = time;
	    displaySenderInfo(users[id]);
	    eventHandler(msg,users[id]);
	});
});

// Session status
function displaySenderInfo(session) {
    console.log("= Display Name: ", session.profile.displayName);
    console.log("= LINE ID: ", session.profile.userId);
    console.log("= Number of conversation: ", session.count);
    console.log("= Start time: ", session.start_time);
    console.log("= Last update time: ", session.last_time);
}

// JSON log writer
function jsonLogWriter(json_data) {
    text_data = JSON.stringify(json_data, null, 2);
    text_data = text_data + "\n"
    console.log(text_data);
    fpath = LOGDIR + "/" + "chat_log.txt"
    fs.appendFileSync(fpath, text_data ,'utf8');
}


// Chatbot main 
function eventHandler(msg,user_handler) {
    if (msg.events[0].message.type == 'text') {
	console.log("Message ----");
	replyMessage = msg.events[0].message.text;

	// Call Watson conversation 
	conversation.message({
	    workspace_id: conv_wsid.workspace_id,
	    input: {'text': msg.events[0].message.text},
	    context: user_handler.response.context
	},function(err, response) {
	    if (err) {
		console.log('error:', err);
	    }
	    else {
		var textMsg = "";
		for(i = 0; i < response.output.text.length; i++) {
		    textMsg = textMsg + " " + response.output.text[i];
		}
		user_handler.response = response;
		// Reply the message to the LINE user.
		bot.replyMessage(
		    msg.events[0].replyToken, 
		    textMsg);
		jsonLogWriter(user_handler);
		
	    }
	});

    } else if (msg.events[0].message.type == 'image') {
	console.log("Image ----");
	fpath = DOWNLOAD + "/" + user_handler.profile.userId 
	    + "_" + msg.events[0].message.id + ".jpg"
	bot.getContent(msg.events[0].message.id,fpath);
	console.log("The image file is saved at ", fpath);
    } else if (msg.events[0].message.type == 'audio') {
	console.log("Sound ----");
	fpath = DOWNLOAD + "/" + user_handler.profile.userId
	    + "_" + msg.events[0].message.id + ".mp4"
	bot.getContent(msg.events[0].message.id,fpath);
	console.log("The sound file is saved at ", fpath);
    } else if (msg.events[0].message.type == 'sticker') {
	console.log("Sticker ----");
	console.log(msg.events[0].message);
	// Replay the sticker to the sender
	MessageObj = {
	    "type": "sticker",
	    "packageId": "1",
	    "stickerId": "3"
	};
	bot.replyMessageObject(msg.events[0].replyToken, MessageObj);
    } else {
	console.log("Other ----");
	console.log(msg.events[0]);
    }
}





