import { Users } from "../Models/UserModels.js";
import path from "path";

//sign up route function

export const Signin = async (req, res) => {
  const { Email, Name, Picture, Channel } = req.body;

  try {
    const UserExist = await Users.findOne({ Email });

    //if user exist that mean they already signup with this email then we will just simply send the exist user - UserExist data in the response and return

    if (UserExist) {
      res.status(200).json({
        _id: UserExist._id,
        email: UserExist.Email,
        handle: UserExist.Handle,
        name: UserExist.Name,
        profile: UserExist.Picture,
        ischannel: UserExist.Channel,
        Subscribers: UserExist.subscribers,
        Subscriptions: UserExist.subscriptions,
      });

      return;
    }

    //if user didnt exist then will will add the new user data to database and simply send the newuser data in response

    const newUser = new Users({
      Email,
      Name,
      Picture,
      Channel,
    });

    //saving new user data to database

    await newUser.save();

    //sending newuser data to to the clintside

    res.status(200).json({
      _id: newUser._id,
      email: newUser.Email,
      name: newUser.Name,
      profile: newUser.Picture,
      ischannel: newUser.Channel,
      Subscribers: newUser.subscribers,
      Subscriptions: newUser.subscriptions,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

//creating user channel  in this i am simplying updating few things and just adding handle to the exist user and then sending to the client side

export const ChannelCreation = async (req, res) => {
  const { Email, Name, Handle, Channel } = req.body;

  try {
    // Check if the user exists in the database
    let UserExist = await Users.findOne({ Email });

    // Updating object
    if (!UserExist) {
      // If user does not exist, create a new one
      UserExist = new Users({
        Email,
        Name,
        Handle,
        Channel,
      });
    } else {
      // If user exists, update its details
      UserExist.Email = Email;
      UserExist.Name = Name;
      UserExist.Handle = Handle;
      UserExist.Channel = Channel;
    }

    // Check if a picture was uploaded
    if (req.file) {
      const filePath = req.file.path;
      UserExist.Picture = filePath; // Save the filename of the uploaded picture with full path
    }

    // Save the user object to the database
    await UserExist.save();

    console.log({
      _id: UserExist._id,
      email: UserExist.Email,
      handle: UserExist.Handle,
      name: UserExist.Name,
      profile: UserExist.Picture,
      ischannel: UserExist.Channel,
      Subscribers: UserExist.subscribers,
      Subscriptions: UserExist.subscriptions,
    });

    res.status(200).json({
      _id: UserExist._id,
      email: UserExist.Email,
      handle: UserExist.Handle,
      name: UserExist.Name,
      profile: UserExist.Picture,
      ischannel: UserExist.Channel,
      Subscribers: UserExist.subscribers,
      Subscriptions: UserExist.subscriptions,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};
