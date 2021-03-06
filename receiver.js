var amqp = require('amqplib/callback_api');

var url = {
  'hostname': '127.0.0.1',
  'port': 5672,
  'vhost': 'vhost_mmr',
  'username': 'user_mmr',
  'password': '123'
}

amqp.connect(url, function (err, conn) {
  conn.createChannel(function (err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {
      durable: false
    });
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function (msg) {
      console.log(" [x] Received %s", JSON.parse(msg.content.toString()).data);
    }, {
      noAck: true
    });
  });
});