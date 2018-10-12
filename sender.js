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
    var msg = 'Hello World!';

    ch.assertQueue(q, {
      durable: false
    });
    ch.sendToQueue(q, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function () {
    conn.close();
    process.exit(0)
  }, 500);
});