const User = require('../models/user');
const { authSchema } = require('../helpers/validation_schema')
async function handleGetAllUsers(req,res) {
  const allDbUsers = await User.find({});
  res.render('home', {
    users: allDbUsers,
  })
  // return res.json(allDbUsers);
  
}

async function handleGetUserById(req, res){
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res){
  await User.findByIdAndUpdate(req.params.id, req.body);
  return res.status(200).json({ status: "Success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id)
  return res.json({ status: "Success" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if(!body || !body.email || !body.name){
    return res.status(400).json({ msg: 'All fields are required' })
  }
  const result = await authSchema.validateAsync(req.body);
  console.log(result);

  const user = await User.create({
    email: body.email,
    name: body.name,
    age: body.age,
    city: body.city,
    zipCode: body.zipCode
  });

  return res.status(201).json({msg: "success", id: user._id});
}

function createNewUser(req, res){
  return res.render('newUser');
}

function deleteUser(req, res){
  id = req.params.id;
  console.log(`id is ${id}`);
  req.method = 'DELETE';
  console.log(req.method);
  console.log(req.url);
  req.url = `/worko/user/${id}`;
  console.log(req.url);

  res.redirect(req.url);
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
  createNewUser,
  deleteUser,
}