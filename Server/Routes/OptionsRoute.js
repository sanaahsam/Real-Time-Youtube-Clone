import express from "express";
import {
  dislike,
  likes,
  views,
  searchList,
  Subscription,
} from "../Controllers/OptionConrollers.js";

const OptionRoute = express.Router();

//like route
OptionRoute.post("/like/:id", likes);

//dislike route

OptionRoute.post("/dislike/:id", dislike);

//increase views route

OptionRoute.put("/view/:id", views);

OptionRoute.get("/listTitle", searchList);

OptionRoute.put("/subscribe", Subscription);
export default OptionRoute;
