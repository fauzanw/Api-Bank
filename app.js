// Module
let express            = require("express");
let app                = express();
let bodyParser         = require("body-parser");
let helmet             = require("helmet");
let jwt                = require("jsonwebtoken");
let Validation         = require("./middleware/Validation");

// Controller
let UserController     = require("./controllers/UserController");
let BankController     = require("./controllers/BankController");
let TransferController = require("./controllers/TransferController");
// URL
let BaseUrl            = "/api/v1"

// Configuration Express
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((request, response, next) => {
  Model = require("./models/Model");
  Res   = require("./controllers/ResponseController")
  req   = request;
  res   = response;
  next();
});

// User Controller
app.post(BaseUrl + '/user/register',Validation.Register, UserController.registerUser);
app.post(BaseUrl + '/user/login',Validation.Login, UserController.loginUser);
app.get(BaseUrl + '/user/profile/:user_id', UserController.profileUser)

// Transfer Controller
app.post(BaseUrl + '/transfer/saldo',Validation.transferSaldo, TransferController.transferSaldo)

// Bank 
app.get(BaseUrl + '/bank/:id_bank', BankController.getBankById);
app.post(BaseUrl + '/bank/buat', BankController.buatBank);
app.get(BaseUrl + '/bank/', BankController.getAllBank)


app.listen(1337, () => {
	console.log("Server running on port : 1337")
});