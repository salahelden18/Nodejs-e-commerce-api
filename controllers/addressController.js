const Address = require("../models/addressModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

// get all addresses for admins use
exports.getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find();

    res.status(200).json({
      status: "success",
      results: addresses.length,
      data: addresses,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.getAddress = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.addressId);

    if (!address) {
      return next(new ErrorHandler("No Address With The Provided Id", 404));
    }

    if (req.user.role === "admin") {
      res.status(200).json({
        status: "success",
        data: address,
      });
    } else {
      if (address.user === req.user._id.toString()) {
        return res.status(200).json({
          status: "success",
          data: address,
        });
      } else {
        return next(
          new ErrorHandler(
            "You Can Not Address That Does Not Belonging To You",
            403
          )
        );
      }
    }
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

// creating new address
exports.createAddress = async (req, res, next) => {
  try {
    const { province, district, fullAddress, flatNo, floorNo, phoneNumber } =
      req.body;

    if (
      !province ||
      !district ||
      !fullAddress ||
      !flatNo ||
      !floorNo ||
      !phoneNumber
    ) {
      return next(
        "Please Make Sure That You Provided All The Required Fileds",
        400
      );
    }

    const address = new Address(req.body);
    address.user = req.user._id;
    await address.save();

    //First Way
    // const user = await User.findById(address.user);
    // user.addresses.push(address._id);
    // await user.save();

    //Second Way
    await User.updateOne(
      { _id: address.user },
      { $push: { addresses: address._id } }
    );

    res.status(201).json({
      status: "success",
      data: address,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

// Update User's Address
exports.updateUserAddress = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.addressId);

    if (!address) {
      return next(
        new ErrorHandler("There Is No Address With The Provided Id", 404)
      );
    }

    if (req.user.role === "admin") {
      const updatedAddress = await Address.findByIdAndUpdate(
        req.params.addressId,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: updatedAddress,
      });
    } else {
      if (address.user === req.user._id.toString()) {
        const updatedAddress = await Address.findByIdAndUpdate(
          req.params.addressId,
          req.body,
          { new: true, runValidators: true }
        );
        res.status(200).json({
          status: "success",
          data: updatedAddress,
        });
      } else {
        return next(
          new ErrorHandler(
            "You Can Not Update An Address That Is Not Belonging To You",
            403
          )
        );
      }
    }
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

// deleting the user's address
exports.deleteUserAddress = async (req, res, next) => {
  try {
    const address = await Address.findById(req.params.addressId);

    if (!address) {
      return next(
        new ErrorHandler("There Is No Address With The Provided Id", 404)
      );
    }

    if (req.user.role === "admin") {
      await Address.findByIdAndDelete(req.params.addressId);

      await User.updateOne(
        { _id: address.user },
        { $pull: { addresses: address._id } }
      );

      res.status(200).json({
        status: "success",
        data: null,
      });
    } else {
      if (address.user === req.user._id.toString()) {
        await Address.findByIdAndDelete(req.params.addressId);

        await User.updateOne(
          { _id: address.user },
          { $pull: { addresses: address._id } }
        );

        res.status(200).json({
          status: "success",
          data: null,
        });
      } else {
        return next(
          new ErrorHandler(
            "You Cannot Delete An Address Which Is Not Belonging To You",
            403
          )
        );
      }
    }
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};
