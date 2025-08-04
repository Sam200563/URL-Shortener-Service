const validurl = require("valid-url");
const Url = require("../models/Url");
const { nanoid } = require("nanoid");
const User = require("../models/User");

const planLimits = {
  Free: 10,
  Bronze: 15,
  Silver: 25,
  Gold: Infinity,
};

const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  console.log("Recevied longurl", longUrl);

  if (!longUrl) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide a url." });
  }

  if (!validurl.isUri(longUrl)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid url format  is provided" });
  }

  try {
    const userId = req.user?.id;
    let user = null;
    if (userId) {
      user = await User.findById(userId);
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      const now = new Date();
      if (
        user.plan !== "Free" &&
        user.plan !== "Gold" &&
        (!user.planExpiresAt || user.planExpiresAt < now)
      ) {
        return res.status(403).json({
          success: false,
          message: "Your plan has expired.please upgrade.",
        });
      }

      // if(user.plan !== 'Gold' && (!user.planExpiresAt || user.planExpiresAt < now)){
      //     return res.status(403).json({success:false,message:'Your plan has expired.please upgrade.'})
      // }

      const limit = planLimits[user.plan] || 0;
      console.log("Checking limits...");
      console.log("User:", user.email);
      console.log("Plan:", user.plan);
      console.log("totalshortLinks:", user.totalshortLinks);
      console.log("Limit:", limit);
      if (user.totalshortLinks >= limit) {
        return res.status(403).json({
          success: false,
          message: "Link limit reached.Upgrade your plan to continue",
        });
      }
    }

    let url = await Url.findOne({ longUrl });
    if (url) {
      return res.status(200).json({ success: true, data: url });
    }

    //const {nanoid}=await import('nanoid')
    const urlCode = nanoid(7);
    const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

    const newdataUrl = {
      longUrl,
      shortUrl,
      urlCode,
    };

    // if(req.user && req.user.id){
    //     newdataUrl.user = req.user.id;
    // }
    if (userId) newdataUrl.user = userId;
    url = await Url.create(newdataUrl);
    if (userId) {
      user.totalshortLinks += 1;
      await user.save();
    }
    return res.status(201).json({ success: true, data: url });

    //res.status(200).json({success:true,message:'Url is new and valid .url generated successfully',data:{longurl,shortUrl,urlcode}})
  } catch (error) {
    console.error("Database error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
  //res.status(200).json({ success: true, message: 'URL is valid!', data: { receivedUrl: longurl } });
};

const redirectTourl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(301, url.longUrl);
      //return res.status(200).json({success:true,message:'URL found',data:url})
    } else {
      return res.status(404).json({ success: false, message: "URL not found" });
    }
  } catch (error) {
    console.error("server error", error);
    return res
      .status(500)
      .json({ success: false, message: "Interna; server error" });
  }

  //res.status(200).json({success:true,message:'Redirect is working',capturedCode:code})
};

module.exports = { shortenUrl, redirectTourl };
