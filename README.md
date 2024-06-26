
# Worko.ai Assignment

This project successfully displays the users along with their details. The response page being rendered from the serever. It also lets you perform all the CRUD operations.
Additional Features:
- Creates a log file that records the timestamps.
- EJS view engine is used, that renders the response data on the server side.

## Getting Started 

1. Installation
#### Requirements
- Node.js >= 18
- MongoDB >= 3.2

```bash
    git clone 
    cd 
    npm install 
```

2. Run Application
```bash
    npm Start
```

3. Configuration
By default MongoDB connection string is mongodb://127.0.0.1.27017/
Change it with environment variables
```md
DB_URL=mongodb://127.0.0.1.27017/[DB_Name]
```
- MongoDB connection
```javascript
connectMongoDb(process.env.DB_URL)
.then(() => console.log('MongoDB connected!'));
```

## Components

1. Models
```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true,
    unique: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is invalid");
      }
    }
  },
  name: {
    type: String, 
    required: true, 
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: Number,
  }
}, {timestamps: true });

const User = mongoose.model("user", userSchema);
```
2. Views
![showUsers](https://github.com/Boy-Bird/Worko.ai/assets/87183051/9fb5be69-404b-4d45-bd55-4cf097156a6f)
![createUser](https://github.com/Boy-Bird/Worko.ai/assets/87183051/126a8894-a6b2-4b5f-a32a-1de66bb6f25b)

3. Routes
```javascript
const router = express.Router();

router.get("/newUser", createNewUser);

router.get("/delete/:id", deleteUser);

router.route("/user").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/user/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);
```

4. Validation
```javascript
const Joi = require('@hapi/joi');

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  name: Joi.string().min(2).required(),
  age: Joi.string(),
  city: Joi.string().min(2),
  zipCode: Joi.number().greater(999).less(100000000),
})

module.exports = { authSchema }
```
