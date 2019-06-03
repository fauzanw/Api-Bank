// Module
const express            = require("express");
const app                = express();
const bodyParser         = require("body-parser");
const helmet             = require("helmet");
const jwt                = require("jsonwebtoken");
const Validation         = require("./middleware/Validation");

// Controller
const UserController     = require("./controllers/UserController");
const BankController     = require("./controllers/BankController");
const TransferController = require("./controllers/TransferController");
const WithdrawController = require("./controllers/WithdrawController")
// URL
const BaseUrl            = "/api/v1"

// Configuration Express
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Middleware
app.use((request, response, next) => {
  FormatRupiah  = require("rupiah-format");
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

// Bank Controller
app.get(BaseUrl + '/bank/:id_bank', BankController.getBankById);
app.post(BaseUrl + '/bank/buat', BankController.buatBank);
app.get(BaseUrl + '/bank/', BankController.getAllBank)

// Withdraw Controller
app.post(BaseUrl + '/withdraw', WithdrawController.withdraw)

app.listen(1337, () => {
	console.log("Server running on port : 1337")
});