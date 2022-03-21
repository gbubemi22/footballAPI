<<<<<<< HEAD
const League = require("../models/LeagueModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");


const createLeague =  async (req, res) => {
  
  req.body.user = req.body;
  const league = await League.create(req.body);
  res.status(StatusCodes.CREATED).json({ league });
};

const getAllLeagues = async (req, res) => {
  const leagues = await League.find({});

  res.status(StatusCodes.OK).json({ leagues, count: leagues.length });
  console.log(leagues);
};

const getSingleLeague = async (req, res) => {
  const { id: leagueId } = req.params;

  const league = await League.findOne({ _id: leagueId });

  if (!league) {
    throw new CustomError.NotFoundError(`No league with id : ${leagueId}`);
  }

  res.status(StatusCodes.OK).json({ league });
};

const updateLeague = async (req, res) => {
  const { id: leagueId } = req.params;

  const league = await League.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!league) {
    throw new CustomError.NotFoundError(`No league with id : ${leagueId}`);
  }

  res.status(StatusCodes.OK).json({ league });
};

const deleteLeague = async (req, res) => {
  const { id: leagueId } = req.params;

  const league = await League.findOne({ _id: leagueId });

  if (!league) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  await league.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! League removed." });
};


const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const logo = req.files.image;

  if (!logo.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024* 5;

  if (logo.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 5MB'
    );
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${logo.name}`
  );
  await logo.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${logo.name}` });
};


module.exports = {
  createLeague,
  getAllLeagues,
  getSingleLeague,
  updateLeague,
  deleteLeague,
  uploadImage,
};
=======
const League = require('../models/LeagueModel')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors');
const path = require('path');





const createLeague =  async (req, res) =>{
    req.body.user = req.body;
    const league = await League.create(req.body);
    res.status(StatusCodes.CREATED).json({ league });   
}


const getAllLeagues = async (req, res) =>{
    const leagues = await League.find({ });

    res.status(StatusCodes.OK).json({ leagues, count: leagues.length }); 
    console.log(leagues)
}


const getSingleLeague = async (req, res) => {
    const { id: leagueId } = req.params;

    const league = await League.findOne({ _id: leagueId })
  
    if (!league) {
      throw new CustomError.NotFoundError(`No league with id : ${leagueId}`);
    }
  
    res.status(StatusCodes.OK).json({ league });   
    
}


const updateLeague =  async (req, res) => {
    const { id: leagueId } = req.params;

    const league = await League.findOneAndUpdate({ _id: productId }, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!league) {
      throw new CustomError.NotFoundError(`No league with id : ${leagueId}`);
    }
  
    res.status(StatusCodes.OK).json({ league });  
}



const deleteLeague =  async (req, res) =>{
    const { id: leagueId } = req.params;

    const league = await League.findOne({ _id: leagueId });
  
    if (!league) {
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    await league.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! League removed.' });   
}


module.exports = {
    createLeague,
    getAllLeagues,
    getSingleLeague,
    updateLeague,
    deleteLeague
}
>>>>>>> 918a5f82c0ccfb60e88115b12ca4cde95a5e2f87
