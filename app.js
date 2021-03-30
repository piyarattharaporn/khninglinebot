// Reply using AIML

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const AIMLInterpreter = require('aimlinterpreter')

const app = express()
const port = process.env.PORT || 4000
const aimlInterpreter = new AIMLInterpreter({ name:'สวัสดีเจ้า คนิ้งเจ้า'})

aimlInterpreter.loadAIMLFilesIntoArray(['./test-aiml.xml'])

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    aimlInterpreter.findAnswerInLoadedAIMLFiles(msg, (answer, wildCardArray, input) => {
        reply(reply_token, answer)
    })
    res.sendStatus(200)
})

AIMLInterpreter = require('./AIMLInterpreter');

var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
aimlInterpreter.loadAIMLFilesIntoArray(['./test.aiml.xml']);

var callback = function(answer, wildCardArray, input){
    console.log(answer + ' | ' + wildCardArray + ' | ' + input);
};

var caseCallback = function(answer, wildCardArray, input){
  if (answer == this) {
    console.log(answer + ' | ' + wildCardArray + ' | ' + input);
  } else {
    console.log('ERROR:', answer);
    console.log('   Expected:', this.toString());
  }
};


// Test bot attributes
aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your name?', callback);

// Test setting and getting variable values
aimlInterpreter.findAnswerInLoadedAIMLFiles('My name is Ben.', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('What is my name?', callback);

// Test srai tag
aimlInterpreter.findAnswerInLoadedAIMLFiles('Who are you?', callback);

// Test random tag
aimlInterpreter.findAnswerInLoadedAIMLFiles('Give me a letter.', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test srai in random.', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test wildcard What is my name?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test multiple beautiful wildcards you are', callback);

// Test sr tag
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test sr tag What is my name?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test sr in random What is my name?', callback);

// Test star tag
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test the star tag repeat what I said', callback);

// Test that tag
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test the that tag', callback)
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test that-tag. match',callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test that-tag. dont match', callback);

// Test condition tag
aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your feeling today?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('How are you feeling today?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Tell me about your feelings', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles("You feel crumpy", callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your feeling today?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles("You feel happy", callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('How are you feeling today?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your feeling today?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Tell me about your feelings', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles("You feel sad", callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('How are you feeling today?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('What is your feeling today?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Tell me about your feelings', callback);

// Test wildcards
aimlInterpreter.findAnswerInLoadedAIMLFiles('Explain HANA', callback);

//Test Think tag
aimlInterpreter.findAnswerInLoadedAIMLFiles('I am 123', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('How old am I?', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('What do you know about me?', callback);

//Test condition and srai
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test condition and srai', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles("You feel happy", callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test condition and srai', callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles("You feel crumpy", callback);
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test condition and srai', callback);

// Test finding nothing
aimlInterpreter.findAnswerInLoadedAIMLFiles('Test the wildcard pattern!', callback);

// Case insensitive testing
aimlInterpreter.findAnswerInLoadedAIMLFiles('You feel BAD', caseCallback.bind('I feel BAD!'));
aimlInterpreter.findAnswerInLoadedAIMLFiles('You feel good', caseCallback.bind('I feel good!'));
aimlInterpreter.findAnswerInLoadedAIMLFiles('You feel hAPPy', caseCallback.bind('I feel HAPPy!')); // INTENTIONAL ERROR CHECKING
aimlInterpreter.findAnswerInLoadedAIMLFiles('You feel FINEeeeee', caseCallback.bind('I feel FINEEEEEE!')); // INTENTIONAL ERROR CHECKING


app.listen(port)

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {m3Ke76tZcHwlkq1Nk0m8CHYRlv0RTMRuCul/HLLpSNpznORYlNycYwZlWx0fdaE6sotmTx8KXLJtsOOBZ3L47kOGF4TWQcFGKk3ACKHzpZ3Kq/7kAyOTvNt8dFy3xFpXjgsHkUNXu9YvrJBHeySAjQdB04t89/1O/w1cDnyilFU=}'
    }

    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })

    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}