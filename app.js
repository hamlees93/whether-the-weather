const express = require(`express`);
const bodyParser = require(`body-parser`);
const exphbs = require(`express-handlebars`);
const app = express();
const port = process.env.PORT || 3000;
let server = require('http').Server(app);

app.engine(`handlebars`, exphbs({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//As require is synchronous, we must require routes here, where they initially were
app.use(require(`./routes`));

//Not essential, but a nice touch
server.listen(process.env.PORT || port);