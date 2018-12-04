const express = require(`express`);
const bodyParser = require(`body-parser`);
const exphbs = require(`express-handlebars`);
const mongoose = require(`mongoose`);
const app = express();
const port = process.env.PORT || 3000;
let server = require('http').Server(app);

mongoose.connect(`mongodb://localhost/contact_app`, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on(`error`, error => console.log(error));

app.engine(`handlebars`, exphbs({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//As require is synchronous, we must require routes here, where they initially were
app.use(require(`./routes`));

//Not essential, but a nice touch
server.listen(port, () => {
    console.log("App is running on port " + port);
});