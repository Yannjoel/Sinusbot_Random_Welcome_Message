registerPlugin({
    name: 'Random Welcome Message',
    version: '1.0',
    backends: ['ts3'],
    description: 'This plugin will let the bot greet everyone with a random message from a predefined message list.',
    author: 'Yannick Huber', //inspired by "Welcome" by Sinusbot Team' (Michael Friese, Max Schmitt, Jonas Bögle)
    vars: [{
        name: 'type',
        title: 'Message-Type',
        type: 'select',
        options: [
            'Private chat',
            'Poke'
        ]
    }, {
        name: 'messages',
        title: 'The messages that should be displayed. (%n = nickname)',
        type: 'array',
	vars: [
	   {
		name: 'message',
		type: 'string',
		indent:2,
		placeholder: 'Your joke'
	   }
	]
    }]
}, (_, { type, messages }) => {

    //returns int with min <= return < max
    function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
    }

    const event = require('event')

    event.on('clientMove', ({ client, fromChannel }) => {

	let message = messages[getRandomInt(0,messages.length)].message;
	let msg = message.replace('%n', client.name())
	if (type == 0) {
	    client.chat(msg)
	} else {
	    client.poke(msg)
	}
    })
})
