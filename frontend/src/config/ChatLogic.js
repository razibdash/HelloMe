export const getSender=(loggerUser,users)=>{
  return users[0]._id === loggerUser._id ? users[1].name : users[0].name;
}